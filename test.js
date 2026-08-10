const fs = require("fs");
const path = require("path");
const student = require("./students.json");

const root = __dirname;
const requiredFiles = [
  "index.html",
  "index.js",
  "script.js",
  "style.css",
  "students.json",
];
let failed = false;

console.log("Running tests...");
let i = 1;
for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  const exists = fs.existsSync(fullPath);

  if (!exists) {
    console.log(`TC-${i}:${file} exixts:Fail`);
    failed = true;
  } else {
    console.log(`TC-${i}:${file} exixts:PASS`);
  }
  i++;
}

check =[true,true,true,true]

for (let i = 0; i < student.length; i++) {
  if (!(student[i].fullName?.trim() !== "")) {
    check[0]=false;
    break;
  }
  
  if (!(student[i].email.includes("@"))) {
    check[1]=false;
    break;
  }
  
  if (!(student[i].number.length === 10)) {
    check[2]=false;
    break;
  }
  
  if (!(student[i].branch !== "")) {
    check[3]=false;
    console.log("num")
    break;
  }
}

for(let i=0;i<check.length;i++){
  if(check[i]){
    console.log(`TC-${i+6}:PASS`);
  }
}

console.log("all test case passed");
