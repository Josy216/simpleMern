
import fs from 'fs';
import path from 'path';
const baseDir = 'jocode-setup';
const folders = [
  'backend',
  'backend/routes',
  'backend/controllers',
  'backend/models',
  'backend/middleware',
  'backend/utils',
  'config',
  'public',
  'tests'
];

const boilerplateFiles = [
  { path: 'backend/index.js', content: `console.log("🚀 Jocode Starter Initialized!");` },
  { path: 'README.md', content: `# New Project\n\nGenerated using Jocode Dev Tool\n` },
  { path: '.gitignore', content: `node_modules\n.env\n` },
];

// Create base directory
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
  console.log(`📁 Base folder created: ${baseDir}`);
}

// Create folders
folders.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${fullPath}`);
  }
});

// Create files
boilerplateFiles.forEach(file => {
  const fullPath = path.join(baseDir, file.path);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, file.content);
    console.log(`📄 Created: ${fullPath}`);
  }
});

