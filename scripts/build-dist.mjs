import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const assetDir = join(root, 'assets');

const filesToCopy = [
  'index.html',
  'privacy.html',
  '404.html',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  'styles.css',
  'script.js',
];

if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}

mkdirSync(join(distDir, 'assets'), { recursive: true });

for (const file of filesToCopy) {
  cpSync(join(root, file), join(distDir, file));
}

cpSync(assetDir, join(distDir, 'assets'), { recursive: true });
