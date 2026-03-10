#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'src', 'assets');
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const SKIP_EXTS = new Set(['.svg', '.gif']);

const QUALITY = {
  jpg: 80,
  jpeg: 80,
  png: 70,
  webp: 80,
  avif: 50
};

const stats = {
  processed: 0,
  skipped: 0,
  savedBytes: 0,
  generated: { webp: 0, avif: 0 }
};

const isImage = (file) => {
  const ext = path.extname(file).toLowerCase();
  return IMAGE_EXTS.has(ext) && !SKIP_EXTS.has(ext);
};

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function ensureOptimized(file) {
  const ext = path.extname(file).toLowerCase();
  if (!isImage(file)) {
    stats.skipped++;
    return;
  }

  const buf = await fs.promises.readFile(file);
  const input = sharp(buf, { sequentialRead: true });
  const meta = await input.metadata();

  // Recompress original for png/jpg
  let optimizedBuf = buf;
  try {
    if (ext === '.png') {
      optimizedBuf = await input.png({ quality: QUALITY.png, palette: true }).toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      optimizedBuf = await input.jpeg({ quality: QUALITY.jpg, mozjpeg: true }).toBuffer();
    } else if (ext === '.webp') {
      optimizedBuf = await input.webp({ quality: QUALITY.webp }).toBuffer();
    } else if (ext === '.avif') {
      optimizedBuf = await input.avif({ quality: QUALITY.avif }).toBuffer();
    }
  } catch (e) {
    // keep original on error
  }

  if (optimizedBuf.length < buf.length) {
    await fs.promises.writeFile(file, optimizedBuf);
    stats.savedBytes += (buf.length - optimizedBuf.length);
  }

  // Generate webp/avif variants next to original if smaller
  const base = file.replace(ext, '');
  const targets = [
    { format: 'webp', out: `${base}.webp`, options: { quality: QUALITY.webp } },
    { format: 'avif', out: `${base}.avif`, options: { quality: QUALITY.avif } }
  ];

  for (const t of targets) {
    try {
      const outExists = fs.existsSync(t.out);
      const outBuf = await sharp(buf).toFormat(t.format, t.options).toBuffer();
      if (!outExists) {
        // only write if smaller than original
        if (outBuf.length < buf.length) {
          await fs.promises.writeFile(t.out, outBuf);
          stats.generated[t.format] += 1;
        }
      }
    } catch (e) {
      // ignore variant errors
    }
  }

  stats.processed++;
}

async function main() {
  const start = Date.now();
  const roots = [
    ASSETS_DIR,
    path.join(ASSETS_DIR, 'images'),
    path.join(ASSETS_DIR, 'footer')
  ];
  const allFiles = [];
  for (const r of roots) {
    if (fs.existsSync(r)) {
      allFiles.push(...await walk(r));
    }
  }
  for (const f of allFiles) {
    await ensureOptimized(f);
  }
  const seconds = ((Date.now() - start) / 1000).toFixed(1);
  const kbSaved = (stats.savedBytes / 1024).toFixed(1);
  console.log(`Optimized ${stats.processed} files, skipped ${stats.skipped}.`);
  console.log(`Generated: webp=${stats.generated.webp}, avif=${stats.generated.avif}.`);
  console.log(`Saved ~${kbSaved} KiB in ${seconds}s.`);
}

main().catch((e) => {
  console.error('Image optimization failed:', e);
  process.exit(1);
});
