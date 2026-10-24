const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
fs.mkdirSync(out, { recursive: true });
for (const file of ['index.html', 'css', 'js']) fs.cpSync(path.join(root, file), path.join(out, file), { recursive: true });
console.log('Static game packaged in dist/');
