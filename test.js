const fs = require('fs');
const path = require('path');

const root = __dirname;
const requiredFiles = ['index.html', 'index.js', 'script.js', 'style.css','students.json'];
let failed = false;

console.log('Running tests...');
let i =1;
for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  const exists = fs.existsSync(fullPath);
  process.stdout.write(`Checking ${file}... `);
  if (!exists) {
    console.log(`TC-${i}:${file}exixts:Fail`);
    failed = true;
  } else {
    console.log(`TC-${i}:${file}exixts:PASS`);
  }
  i++;
}
console.log("all test case passed");

