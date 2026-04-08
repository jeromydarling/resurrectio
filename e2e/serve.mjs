// Simple SPA server for Playwright E2E tests
// Serves dist/ with fallback to index.html for client-side routing
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const DIST = join(import.meta.dirname, '..', 'dist');
const PORT = 4173;

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
};

const indexHtml = readFileSync(join(DIST, 'index.html'));

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const filePath = join(DIST, url.pathname);

  // Try serving the exact file
  if (url.pathname !== '/' && existsSync(filePath) && !filePath.endsWith('/')) {
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(readFileSync(filePath));
    return;
  }

  // SPA fallback — serve index.html for all routes
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(indexHtml);
}).listen(PORT, '127.0.0.1', () => {
  console.log(`SPA server running at http://127.0.0.1:${PORT}`);
});
