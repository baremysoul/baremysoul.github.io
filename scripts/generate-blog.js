const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const sanitizeHtml = require("sanitize-html");

const blogFolder = path.join(__dirname, "../content/blog");
const outputFile = path.join(__dirname, "../blog-index.json");

const posts = [];

if (fs.existsSync(blogFolder)) {
  const files = fs.readdirSync(blogFolder)
    .filter(file => file.endsWith(".md") || file.endsWith(".markdown"));

  for (const file of files) {
    const filePath = path.join(blogFolder, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    if (!data.title) continue;

    const html = marked.parse(content);

    posts.push({
      title: data.title,
      date: data.date || "",
      description: data.description || "",
      thumbnail: data.thumbnail || "",
      slug: path.parse(file).name,
      body: sanitizeHtml(html)
    });
  }
}

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), "utf8");

console.log(`Generated blog-index.json with ${posts.length} posts.`);
