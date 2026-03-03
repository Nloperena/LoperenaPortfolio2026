/**
 * Converts hero media for web:
 * - Still-motion_of_me.mp4 → Still-motion_of_me.webm (VP9)
 * - professional-photo.jpg → professional-photo.webp
 *
 * Requires ffmpeg on PATH. Run from repo root: node scripts/convert-media.js
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const mp4Path = join(publicDir, 'Still-motion_of_me.mp4');
const webmPath = join(publicDir, 'Still-motion_of_me.webm');
const jpgPath = join(publicDir, 'professional-photo.jpg');
const webpPath = join(publicDir, 'professional-photo.webp');

function run(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error('Command failed:', cmd);
    process.exit(1);
  }
}

if (!existsSync(mp4Path)) {
  console.error('Missing:', mp4Path);
  process.exit(1);
}
console.log('Converting MP4 → WebM (VP9)...');
run(
  `ffmpeg -y -i "${mp4Path}" -c:v libvpx-vp9 -b:v 0 -crf 35 -an "${webmPath}"`
);
console.log('Created:', webmPath);

if (existsSync(jpgPath)) {
  console.log('Converting JPG → WebP...');
  run(
    `ffmpeg -y -i "${jpgPath}" -c:v libwebp -quality 85 "${webpPath}"`
  );
  console.log('Created:', webpPath);
} else {
  console.warn('No professional-photo.jpg found; skipping WebP.');
}

console.log('Done.');
