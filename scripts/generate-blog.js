
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const sanitizeHtml = require("sanitize-html");

const root = path.join(__dirname, "..");

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
        body: sanitizeHtml(marked.parse(content))
      };
    });
}

// ĐỌC FILE HỌC VẤN CỐ ĐỊNH
function readEducation() {
  const filePath = path.join(
    root,
    "content",
    "education",
    "education.md"
  );

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

// SẮP XẾP BÀI VIẾT THEO NGÀY MỚI NHẤT
function sortByDate(items) {
  return items.sort(
    (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
  );
}

// 1. BLOG
const blogPosts = sortByDate(
  readCollection("blog")
    .filter(post => post.title)
    .map(post => ({
      title: post.title || "",
      date: post.date || "",
      description: post.description || "",
      thumbnail: post.thumbnail || "",
      slug: post.slug,
      body: post.body || ""
    }))
);

// 2. ACTIVITIES
const activities = sortByDate(
  readCollection("activities")
    .filter(item => item.title)
    .map(item => ({
      title: item.title || "",
      date: item.date || "",
      description: item.description || "",
      thumbnail: item.thumbnail || "",
      slug: item.slug,
      body: item.body || ""
    }))
);

// 3. PROJECTS
const projects = readCollection("projects")
  .filter(project =>
    project.title_vi || project.title_en || project.title_ko
  )
  .map(project => ({
    slug: project.slug,
    thumbnail: project.thumbnail || "",
    url: project.url || "",
    github: project.github || "",

    vi: {
      title: project.title_vi || "",
      subtitle: project.subtitle_vi || "",
      details: getList(project.details_vi)
    },

    en: {
      title: project.title_en || "",
      subtitle: project.subtitle_en || "",
      details: getList(project.details_en)
    },

    ko: {
      title: project.title_ko || "",
      subtitle: project.subtitle_ko || "",
      details: getList(project.details_ko)
    }
  }));

// 4. SKILLS
const skills = readCollection("skills")
  .filter(skill =>
    skill.title_vi || skill.title_en || skill.title_ko
  )
  .map(skill => ({
    slug: skill.slug,

    vi: {
      title: skill.title_vi || "",
      items: getList(skill.items_vi)
    },

    en: {
      title: skill.title_en || "",
      items: getList(skill.items_en)
    },

    ko: {
      title: skill.title_ko || "",
      items: getList(skill.items_ko)
    }
  }));

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
