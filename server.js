const http = require('http');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'students.json');
const PORT = process.env.PORT || 3000;

function loadStudents() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveStudents(students) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2), 'utf8');
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

const contentTypeMap = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

function sendFile(res, filePath) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = contentTypeMap[ext] || 'application/octet-stream';
  const data = fs.readFileSync(filePath);

  res.writeHead(200, { 'Content-Type': contentType });
  res.end(data);
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/register') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { fullName, branch, email, number, password } = data;

        if (!fullName || !branch || !email || !number || !password) {
          return sendJson(res, 400, { success: false, message: 'All fields are required.' });
        }

        if (password.length < 8) {
          return sendJson(res, 400, { success: false, message: 'Password is too short.' });
        }

        const students = loadStudents();
        students.push({ fullName, branch, email, number, password, registeredAt: new Date().toISOString() });
        saveStudents(students);

        sendJson(res, 200, { success: true, message: 'Registration saved.' });
      } catch (error) {
        sendJson(res, 400, { success: false, message: 'Invalid request payload.' });
      }
    });
  } else if (req.method === 'GET') {
    const requestedPath = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(__dirname, requestedPath);
    sendFile(res, filePath);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Not found.' }));
  }
});

server.listen(PORT, () => {
  console.log(`Student registration server listening on http://localhost:${PORT}`);
});
