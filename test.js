const fs = require('fs');
const path = require('path');

const root = __dirname;
const requiredFiles = ['index.html', 'index.js', 'script.js', 'style.css'];
let failed = false;

console.log('Running tests...');

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  const exists = fs.existsSync(fullPath);
  process.stdout.write(`Checking ${file}... `);
  if (!exists) {
    console.log('MISSING');
    failed = true;
  } else {
    console.log('OK');
  }
}

const fileChecks = [
  {
    file: 'index.html',
    name: 'HTML includes script.js',
    test: (content) => /<script\s+src=["']\.\/script\.js["']/.test(content),
  },
  {
    file: 'script.js',
    name: 'script.js references form id sbmt',
    test: (content) => /getElementById\(['"]sbmt['"]\)/.test(content),
  },
  {
    file: 'script.js',
    name: 'script.js validates password length',
    test: (content) => /pass_val\.length\s*<\s*8/.test(content),
  },
  {
    file: 'script.js',
    name: 'script.js validates mobile number input',
    test: (content) => /num_val\s*===\s*""/.test(content),
  },
];

for (const check of fileChecks) {
  const filePath = path.join(root, check.file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP ${check.name} (${check.file} does not exist)`);
    failed = true;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  process.stdout.write(`Checking ${check.name}... `);
  if (check.test(content)) {
    console.log('OK');
  } else {
    console.log('FAIL');
    failed = true;
  }
}

if (failed) {
  console.error('\nSome tests failed.');
  process.exit(1);
}

console.log('\nAll tests passed.');
