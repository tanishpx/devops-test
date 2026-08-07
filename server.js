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
  } else {
    sendJson(res, 404, { success: false, message: 'Not found.' });
  }
});

server.listen(PORT, () => {
  console.log(`Student registration server listening on http://localhost:${PORT}`);
});
