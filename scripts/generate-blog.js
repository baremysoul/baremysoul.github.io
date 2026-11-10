const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const sanitizeHtml = require("sanitize-html");

const root = path.join(__dirname, "..");

// CHO PHÉP ẢNH TRONG BÀI VIẾT (mặc định sanitize-html sẽ xoá thẻ <img>)
const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"]
  },
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      target: "_blank",
      rel: "noopener noreferrer"
    })
  }
};

function renderMarkdown(text) {
  if (!text || !String(text).trim()) return "";
  return sanitizeHtml(marked.parse(String(text)), sanitizeOptions);
}

// ĐỌC CÁC FILE MARKDOWN TRONG COLLECTION
function readCollection(folderName) {
  const folder = path.join(root, "content", folderName);

  if (!fs.existsSync(folder)) return [];

  return fs.readdirSync(folder)
    .filter(file => file.endsWith(".md") || file.endsWith(".markdown"))
    .map(file => {
      const filePath = path.join(folder, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);

      return {
        ...data,
        slug: path.parse(file).name,
        body: renderMarkdown(content)
      };
    });
}

// ĐỌC FILE HỌC VẤN CỐ ĐỊNH
function readEducation() {
  const filePath = path.join(root, "content", "education", "education.md");

  if (!fs.existsSync(filePath)) return {};

  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);

  return data;
}

// CHUYỂN DANH SÁCH CMS THÀNH MẢNG CHUỖI
function getList(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map(item =>
      typeof item === "string"
        ? item
        : item.item || item.skill || ""
    )
    .filter(Boolean);
}

// SẮP XẾP THEO NGÀY MỚI NHẤT
function sortByDate(items) {
  return items.sort(
    (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
  );
}

// ĐỊNH DẠNG NGÀY: 07/11/2026
function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-GB", { timeZone: "Asia/Ho_Chi_Minh" });
}

function withFormattedDate(items) {
  return items.map(item => ({ ...item, date: formatDate(item.date) }));
}

// BÀI VIẾT & HOẠT ĐỘNG: 3 ngôn ngữ. Ô tiếng Anh/Hàn bỏ trống sẽ dùng tiếng Việt.
// Vẫn đọc được bài cũ chỉ có title / description / nội dung (chưa chia ngôn ngữ).
function buildArticleLang(item, lang) {
  const pick = key => item[key + "_" + lang] || item[key + "_vi"] || item[key] || "";
  const bodyMd = item["body_" + lang] || item.body_vi;

  return {
    title: pick("title"),
    description: pick("description"),
    body: bodyMd ? renderMarkdown(bodyMd) : (item.body || "")
  };
}

function buildArticles(folderName) {
  return withFormattedDate(
    sortByDate(
      readCollection(folderName)
        .filter(item => item.title_vi || item.title_en || item.title_ko || item.title)
        .map(item => ({
          slug: item.slug,
          date: item.date || "",
          thumbnail: item.thumbnail || "",
          vi: buildArticleLang(item, "vi"),
          en: buildArticleLang(item, "en"),
          ko: buildArticleLang(item, "ko")
        }))
    )
  );
}

// 1. BLOG
const blogPosts = buildArticles("blog");

// 2. ACTIVITIES
const activities = buildArticles("activities");

// 3. PROJECTS (tiếng Anh/Hàn bỏ trống sẽ tự dùng bản tiếng Việt)
function buildProjectLang(project, lang) {
  const vi = lang === "vi";
  const pick = key => project[key + "_" + lang] || (vi ? "" : project[key + "_vi"]) || "";
  const detailsOwn = getList(project["details_" + lang]);
  const detailsVi = getList(project.details_vi);

  return {
    title: pick("title") || project.title_en || project.title_ko || "",
    subtitle: pick("subtitle"),
    body: renderMarkdown(pick("body")),
    details: detailsOwn.length ? detailsOwn : (vi ? [] : detailsVi)
  };
}

const projects = sortByDate(
  readCollection("projects")
    .filter(project => project.title_vi || project.title_en || project.title_ko)
    .map(project => ({
      slug: project.slug,
      date: project.date || "",
      thumbnail: project.thumbnail || "",
      url: project.url || "",
      github: project.github || "",
      vi: buildProjectLang(project, "vi"),
      en: buildProjectLang(project, "en"),
      ko: buildProjectLang(project, "ko")
    }))
);

// 4. SKILLS (bỏ trống bản dịch sẽ dùng tiếng Việt)
const skills = readCollection("skills")
  .filter(skill => skill.title_vi || skill.title_en || skill.title_ko)
  .map(skill => {
    const build = lang => {
      const items = getList(skill["items_" + lang]);
      return {
        title: skill["title_" + lang] || skill.title_vi || "",
        items: items.length ? items : getList(skill.items_vi)
      };
    };
    return { slug: skill.slug, vi: build("vi"), en: build("en"), ko: build("ko") };
  });

// 5. EDUCATION
const educationData = readEducation();

const education = {
  vi: {
    school: educationData.school_vi || "",
    major: educationData.major_vi || "",
    language: getList(educationData.language_vi),
    it: getList(educationData.it_vi)
  },
  en: {
    school: educationData.school_en || "",
    major: educationData.major_en || "",
    language: getList(educationData.language_en),
    it: getList(educationData.it_en)
  },
  ko: {
    school: educationData.school_ko || "",
    major: educationData.major_ko || "",
    language: getList(educationData.language_ko),
    it: getList(educationData.it_ko)
  }
};

// XUẤT FILE JSON
function writeJSON(fileName, data) {
  fs.writeFileSync(
    path.join(root, fileName),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

writeJSON("blog-index.json", blogPosts);
writeJSON("activities-index.json", activities);
writeJSON("project-index.json", projects);
writeJSON("skill-index.json", skills);
writeJSON("education-index.json", education);

console.log(`Generated ${blogPosts.length} blog posts.`);
console.log(`Generated ${activities.length} activities.`);
console.log(`Generated ${projects.length} projects.`);
console.log(`Generated ${skills.length} skill groups.`);
console.log("Generated education data.");
