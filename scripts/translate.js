// TỰ DỊCH nội dung tiếng Việt sang tiếng Anh và tiếng Hàn bằng Google Gemini API (có gói miễn phí).
//
// Cách hoạt động:
//  - Quét các file trong content/ (blog, activities, projects, skills, education).
//  - Với mỗi ô có đuôi _vi (ví dụ title_vi) mà ô _en / _ko tương ứng còn TRỐNG
//    thì dịch rồi điền vào.
//  - Ô nào đã có nội dung (do bạn tự viết hoặc đã dịch trước đó) thì KHÔNG bị ghi đè.
//    Muốn dịch lại: xoá trống ô _en / _ko trong trang quản trị rồi lưu.
//  - Nếu dịch lỗi hoặc thiếu API key thì bỏ qua, web vẫn build bình thường
//    và tự dùng bản tiếng Việt cho ô chưa có bản dịch.

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
// Thử lần lượt các model; model nào hết hạn mức hoặc không tồn tại thì chuyển sang model kế tiếp.
// Muốn ép dùng một model cụ thể: đặt biến GEMINI_MODEL.
const MODELS = process.env.GEMINI_MODEL
  ? [process.env.GEMINI_MODEL]
  : ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const FOLDERS = ["blog", "activities", "projects", "skills", "education"];
const LANGS = { en: "English", ko: "Korean" };

const isBlank = v => {
  if (v == null) return true;
  if (typeof v === "string") return !v.trim();
  if (Array.isArray(v)) return v.every(isBlank);
  return false;
};

// Chỉ dịch chuỗi hoặc danh sách chuỗi
const isTranslatable = v =>
  (typeof v === "string" && v.trim() !== "") ||
  (Array.isArray(v) && v.length > 0 && v.every(x => typeof x === "string"));

// Tìm các ô cần dịch cho một ngôn ngữ: { title: "...", items: [...] }
function collectJobs(data, lang) {
  const jobs = {};
  for (const key of Object.keys(data)) {
    const m = key.match(/^(.+)_vi$/);
    if (!m) continue;
    const base = m[1];
    if (isTranslatable(data[key]) && isBlank(data[`${base}_${lang}`])) {
      jobs[base] = data[key];
    }
  }
  return jobs;
}

// Kiểm tra kết quả AI trả về có đúng cấu trúc không
function validate(jobs, result) {
  if (!result || typeof result !== "object") return false;
  return Object.keys(jobs).every(k => {
    const a = jobs[k];
    const b = result[k];
    if (typeof a === "string") return typeof b === "string" && b.trim() !== "";
    return Array.isArray(b) && b.length === a.length && b.every(x => typeof x === "string");
  });
}

// Điền bản dịch vào data. translateFn(jobs, langCode) -> object
async function processData(data, translateFn) {
  let changed = false;
  const out = { ...data };

  for (const lang of Object.keys(LANGS)) {
    const jobs = collectJobs(out, lang);
    if (!Object.keys(jobs).length) continue;

    const result = await translateFn(jobs, lang);
    if (!validate(jobs, result)) {
      console.warn(`  ! Kết quả dịch sang ${lang} không hợp lệ, bỏ qua.`);
      continue;
    }
    for (const k of Object.keys(jobs)) {
      out[`${k}_${lang}`] = result[k];
      changed = true;
    }
  }
  return { changed, data: out };
}

async function callGemini(jobs, langCode, apiKey) {
  const language = LANGS[langCode];
  const system = [
    `You translate content for the personal portfolio website of a Vietnamese student of Korean Studies.`,
    `Translate the Vietnamese values of the JSON object the user sends into ${language}.`,
    `Rules:`,
    `- Return ONLY a JSON object with exactly the same keys and structure. Strings stay strings; arrays stay arrays with the same number of items.`,
    `- Keep Markdown/HTML syntax, line breaks, URLs and image paths exactly as they are.`,
    `- Do not translate people's names. Use the commonly used ${language} name for organizations, schools and certificates when one exists.`,
    `- Natural, professional tone suitable for a job-seeking portfolio.`,
    langCode === "ko" ? `- Use polite formal Korean (합니다체).` : `- Use clear, natural English.`,
    `- No commentary and no code fences.`
  ].join("\n");

  let lastErr;
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: system }] },
              contents: [{ role: "user", parts: [{ text: JSON.stringify(jobs) }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
                maxOutputTokens: 16000
              }
            })
          }
        );

        if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status} (${model})`);
        if (res.status === 401 || res.status === 403) {
          const text = await res.text();
          console.warn(`  ! Gemini từ chối (${res.status}), kiểm tra lại GEMINI_API_KEY: ${text.slice(0, 200)}`);
          return null;
        }
        if (!res.ok) {
          // Ví dụ 400/404: tên model không dùng được -> thử model kế tiếp
          lastErr = new Error(`HTTP ${res.status} (${model}): ${(await res.text()).slice(0, 200)}`);
          break;
        }

        const json = await res.json();
        const cand = json.candidates && json.candidates[0];
        if (!cand) throw new Error("Phản hồi trống (có thể bị chặn nội dung)");
        if (cand.finishReason === "MAX_TOKENS") throw new Error("Bài quá dài, bị cắt giữa chừng");
        const text = ((cand.content && cand.content.parts) || []).map(p => p.text || "").join("");
        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");
        if (start < 0 || end < 0) throw new Error("Không có JSON trong phản hồi");
        return JSON.parse(text.slice(start, end + 1));
      } catch (err) {
        lastErr = err;
        await sleep(5000 * attempt); // hạn mức miễn phí tính theo phút, chờ rồi thử lại
      }
    }
  }
  console.warn(`  ! Dịch sang ${langCode} thất bại: ${lastErr && lastErr.message}`);
  return null;
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("Chưa có GEMINI_API_KEY, bỏ qua bước tự dịch.");
    return;
  }

  const matter = require("gray-matter");
  let files = 0;
  let updated = 0;

  for (const folder of FOLDERS) {
    const dir = path.join(root, "content", folder);
    if (!fs.existsSync(dir)) continue;

    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith(".md") && !name.endsWith(".markdown")) continue;
      const file = path.join(dir, name);
      files++;

      try {
        const parsed = matter(fs.readFileSync(file, "utf8"));
        const { changed, data } = await processData(parsed.data, (jobs, lang) => {
          console.log(`Dịch ${folder}/${name} -> ${lang}: ${Object.keys(jobs).join(", ")}`);
          return callGemini(jobs, lang, apiKey).then(async r => { await sleep(3000); return r; });
        });

        if (changed) {
          fs.writeFileSync(file, matter.stringify(parsed.content, data), "utf8");
          updated++;
        }
      } catch (err) {
        console.warn(`  ! Bỏ qua ${folder}/${name}: ${err.message}`);
      }
    }
  }

  console.log(`Tự dịch: đã kiểm tra ${files} file, cập nhật ${updated} file.`);
}

if (require.main === module) {
  // Dịch lỗi không được làm hỏng việc đưa web lên
  main().catch(err => console.warn("Tự dịch gặp lỗi:", err.message));
}

module.exports = { collectJobs, validate, processData, callGemini };
