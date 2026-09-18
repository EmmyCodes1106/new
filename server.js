const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

if (!fs.existsSync(PUBLIC_DIR)) {
  console.error(`❌ Could not find the "public" folder at: ${PUBLIC_DIR}`);
  console.error('   Make sure you extracted the whole project (including the public/ folder)');
  console.error('   and are running "npm start" from inside the estate-etag-system folder.');
  process.exit(1);
}

// Serve static assets (HTML, CSS, client-side JS) from /public
app.use(express.static(PUBLIC_DIR));

// Named routes for each page, in the order a person moves through the site.
// (express.static above already serves these by filename, e.g. /login.html —
// these routes just give the app clean, extension-free URLs as well.)
const pages = {
  '/': 'index.html',
  '/login': 'login.html',
  '/register': 'register.html',
  '/dashboard': 'dashboard.html',
  '/profile': 'profile.html',
  '/vehicle-registration': 'vehicle-registration.html',
  '/etag-application': 'etag-application.html',
  '/scan': 'scan.html',
};

Object.entries(pages).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, file));
  });
});

// Anything else falls back to the landing page
app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Estate E-Tag System running at http://localhost:${PORT}`);
});
