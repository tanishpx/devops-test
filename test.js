const fs = require("fs");
const path = require("path");
const student = require("./students.json");

const root = __dirname;
const file = [
  "index.html",
  "index.js",
  "script.js",
  "style.css",
  "students.json",
];
let failed = false;

console.log("Running tests...");
let i = 1;
for (let i=0;i<file.length;i++) {
  const fullPath = path.join(root, file[i]);
  const exists = fs.existsSync(fullPath);

  if (!exists) {
    console.log(`TC-${i}:${file[i]} exixts:Fail`);
    failed = true;
  } else {
    console.log(`TC-${i}:${file[i]} exixts:PASS`);
  }
}

check = [true, true, true, true];

for (let i = 0; i < student.length; i++) {
  if (!(student[i].fullName?.trim() !== "")) {
    check[0] = false;
    failed = true;
    break;
  }

  if (!student[i].email.includes("@")) {
    check[1] = false;
    break;
  }

  if (!(student[i].number.length === 10)) {
    check[2] = false;
    break;
  }

  if (!(student[i].branch !== "")) {
    check[3] = false;
    console.log("num");
    break;
  }
}
if (!failed) {
  for (let i = 0; i < check.length; i++) {
    if (check[i]) {
      console.log(`TC-${i + 6}:PASS`);
    }
  }
}
if(!failed){
  console.log("all test case passed");
}else{
  console.log("test failed");
}
