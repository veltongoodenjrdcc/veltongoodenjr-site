/**
 * Visual QA script - screenshots at 375, 768, 1280px for key pages.
 * Playwright + Chromium are installed at C:\vgj-qa-modules.
 *
 * Usage:
 *   node scripts/visual-qa.mjs [base-url]
 *   node scripts/visual-qa.mjs https://veltongoodenjr.com
 *
 * Defaults to serving the local directory on http://localhost:4444.
 *
 * Run from the project root:
 *   cd "G:\My Drive\VGJ Systems\veltongoodenjrdcc-website"
 *   node --experimental-vm-modules scripts/visual-qa.mjs
 *
 * Or from C:\vgj-qa-modules to use its node_modules:
 *   node "G:\My Drive\VGJ Systems\veltongoodenjrdcc-website\scripts\visual-qa.mjs"
 */

import { createRequire } from 'module';
import { createServer } from 'http';
import { readFile, mkdir } from 'fs/promises';
import { extname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);

// Load Playwright from local C: install (avoids Google Drive path issues)
const PW_MODULES = 'C:\\vgj-qa-modules\\node_modules';
const { chromium } = require(`${PW_MODULES}\\@playwright\\test`);

const __dir = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dir, '..');
const SCREENSHOTS_DIR = join(ROOT, 'reports', 'screenshots');

const VIEWPORTS = [
  { width: 375,  height: 812,  label: 'mobile' },
  { width: 768,  height: 1024, label: 'tablet' },
  { width: 1280, height: 800,  label: 'desktop' },
];

const PAGES = [
  { path: '/',                    slug: 'home' },
  { path: '/about/',              slug: 'about' },
  { path: '/work/',               slug: 'work' },
  { path: '/creators-current/',   slug: 'creators-current' },
  { path: '/partnerships/',       slug: 'partnerships' },
  { path: '/contact/',            slug: 'contact' },
  { path: '/lead-flow-fix/',      slug: 'lead-flow-fix' },
];

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.mp4':  'video/mp4',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

async function serve(port) {
  const server = createServer(async (req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath.endsWith('/')) urlPath += 'index.html';

    const filePath = join(ROOT, urlPath);
    try {
      const data = await readFile(filePath);
      const ext = extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
      res.end(data);
    } catch {
      try {
        const data = await readFile(filePath + '.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    }
  });
  await new Promise((r) => server.listen(port, r));
  return server;
}

async function settleLazyMedia(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    const distance = Math.max(window.innerHeight * 0.85, 500);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let y = 0; y < document.documentElement.scrollHeight; y += distance) {
      window.scrollTo(0, y);
      await delay(90);
    }

    window.scrollTo(0, document.documentElement.scrollHeight);
    await delay(180);

    const mediaReady = Array.from(document.images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    });

    await Promise.race([
      Promise.all(mediaReady),
      delay(2500),
    ]);

    for (let i = 0; i < 8; i += 1) {
      window.scrollTo(0, 0);
      await delay(120);
      if (Math.abs(window.scrollY) < 1) break;
    }
  });
}

async function run() {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  const baseUrl = process.argv[2] || null;
  let server = null;
  let base = baseUrl;

  if (!base) {
    const PORT = 4444;
    server = await serve(PORT);
    base = `http://localhost:${PORT}`;
    console.log(`\n  Local server → ${base}`);
  }

  console.log(`  Screenshots → reports/screenshots/\n`);

  const browser = await chromium.launch({ headless: true });
  const errors = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    for (const pg of PAGES) {
      const url = base + pg.path;
      const file = join(SCREENSHOTS_DIR, `${pg.slug}--${vp.label}--${vp.width}px.png`);
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
        // Force all scroll-reveal elements visible for screenshots
        await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;transition:none!important}' });
        await settleLazyMedia(page);
        await page.waitForTimeout(300);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`  ✓  ${vp.label.padEnd(8)} ${pg.path}`);
      } catch (e) {
        console.log(`  ✗  ${vp.label.padEnd(8)} ${pg.path}  - ${e.message.split('\n')[0]}`);
        errors.push({ url, vp: vp.label, error: e.message.split('\n')[0] });
      }
    }

    await ctx.close();
  }

  await browser.close();
  if (server) server.close();

  if (errors.length) {
    console.log(`\n  ${errors.length} error(s):`);
    errors.forEach((e) => console.log(`    ${e.vp} ${e.url}`));
  } else {
    console.log(`\n  All screenshots captured.\n`);
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
