// Gom các file cần public vào thư mục "dist" để đưa lên hosting.
// (Không đưa node_modules, content, scripts... lên web.)
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

// Những thứ KHÔNG đưa lên web
const exclude = new Set([
  "node_modules", "dist", "content", "scripts",
  "package.json", "package-lock.json", "netlify.toml",
  "README.md", "wrangler.jsonc", "wrangler.toml"
]);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

let count = 0;
for (const name of fs.readdirSync(root)) {
  if (name.startsWith(".") || exclude.has(name)) continue;
  fs.cpSync(path.join(root, name), path.join(dist, name), { recursive: true });
  count++;
}

console.log(`Copied ${count} items to dist/`);
