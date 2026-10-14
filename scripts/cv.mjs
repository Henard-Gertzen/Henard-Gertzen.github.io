// Prints the resume (src/pages/cv) to PDF with headless Chrome. Run after `npm run build`:
//
//   npm run cv
//
// The public version goes to public/cv.pdf (commit it; the site links it). The LinkedIn and
// private versions (employer, and phone number, from the git-ignored .env) are only built when
// CV_EMPLOYER and CV_PHONE are set, and are written to CV_LINKEDIN_PDF and CV_PRIVATE_PDF, which
// should be outside the repository.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), '');
const port = 4329;
const chrome = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((path) => path && existsSync(path));
if (!chrome) throw new Error('No Chrome or Edge found; set CHROME to its path.');
if (!existsSync('dist/cv/index.html')) throw new Error('No dist/cv/ yet: run `npm run build` first.');

// A minimal static server for dist/ (astro preview allows only one server per project).
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = createServer((req, res) => {
  let file = join('dist', decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' }).end(readFileSync(file));
});
await new Promise((ok) => server.listen(port, '127.0.0.1', ok));
try {
  await print(`http://127.0.0.1:${port}/cv/`, resolve('public/cv.pdf'));
  for (const [variant, setting] of [
    ['linkedin', 'CV_LINKEDIN_PDF'],
    ['private', 'CV_PRIVATE_PDF'],
  ]) {
    if (!existsSync(`dist/cv/${variant}/index.html`)) {
      console.log(`No ${variant} version: set CV_EMPLOYER (and CV_PHONE) in .env and rebuild to make one.`);
    } else if (!env[setting]) {
      console.log(`Skipped the ${variant} version: set ${setting} in .env to where it should go.`);
    } else {
      await print(`http://127.0.0.1:${port}/cv/${variant}/`, resolve(env[setting]));
    }
  }
} finally {
  server.close();
}

// Async, so the server above can answer Chrome while it prints.
async function print(url, out) {
  const profile = mkdtempSync(join(tmpdir(), 'cv-chrome-'));
  try {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--user-data-dir=${profile}`,
      '--virtual-time-budget=10000',
      `--print-to-pdf=${out}`,
      url,
    ];
    const code = await new Promise((done, fail) => {
      const child = spawn(chrome, args, { stdio: 'ignore' });
      const timer = setTimeout(() => child.kill(), 60_000);
      child.on('error', fail);
      child.on('exit', (status) => {
        clearTimeout(timer);
        done(status);
      });
    });
    if (code !== 0 || !existsSync(out)) throw new Error(`Chrome could not print ${url}`);
    console.log(`${url} -> ${out}`);
  } finally {
    rmSync(profile, { recursive: true, force: true });
  }
}
