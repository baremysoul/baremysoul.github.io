
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const sanitizeHtml = require("sanitize-html");

const root = path.join(__dirname, "..");

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

function getList(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map(item => typeof item === "string" ? item : item.item || item.skill || "")
    .filter(Boolean);
}

// BLOG
const blogPosts = readCollection("blog")
  .filter(post => post.title)
  .map(post => ({
    title: post.title,
    date: post.date || "",
    description: post.description || "",
    thumbnail: post.thumbnail || "",
    slug: post.slug,
    body: post.body
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// PROJECTS
const projects = readCollection("projects")
  .filter(project => project.title_vi || project.title_en || project.title_ko)
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

// SKILLS
const skills = readCollection("skills")
  .filter(skill => skill.title_vi || skill.title_en || skill.title_ko)
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

// EXPORT JSON FILES
fs.writeFileSync(
  path.join(root, "blog-index.json"),
  JSON.stringify(blogPosts, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(root, "project-index.json"),
  JSON.stringify(projects, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(root, "skill-index.json"),
  JSON.stringify(skills, null, 2),
  "utf8"
);

console.log(`Generated ${blogPosts.length} blog posts.`);
console.log(`Generated ${projects.length} projects.`);
console.log(`Generated ${skills.length} skill groups.`);
