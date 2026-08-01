const fs = require('fs-extra');
const path = require('path');
const AdmZip = require('adm-zip');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

// Usage:
//  node scripts/generate-icons.js --zip=icons/app.zip --out=icons-output
// Dependencies: adm-zip sharp png-to-ico fs-extra

async function main() {
  const argv = require('minimist')(process.argv.slice(2));
  const zipPath = argv.zip || 'icons/app.zip';
  const outDir = argv.out || 'icons-output';

  if (!await fs.pathExists(zipPath)) {
    console.error('Zip not found:', zipPath);
    process.exit(1);
  }

  await fs.remove(outDir);
  await fs.mkdirp(outDir);

  const tmpDir = path.join(outDir, 'tmp_src');
  await fs.mkdirp(tmpDir);

  // Extract zip
  console.log('Extracting', zipPath, '->', tmpDir);
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(tmpDir, true);

  // Find candidate source images: prefer svg, then largest png
  const files = await fs.readdir(tmpDir);
  const candidates = [];
  await (async () => {
    for (const f of files) {
      const full = path.join(tmpDir, f);
      const stat = await fs.stat(full);
      if (stat.isFile()) {
        const ext = path.extname(f).toLowerCase();
        if (ext === '.svg' || ext === '.png' || ext === '.webp') candidates.push(full);
      }
    }
  })();

  if (candidates.length === 0) {
    console.error('No SVG/PNG/WebP files found inside zip. Put a high-resolution PNG or SVG in the zip.');
    process.exit(1);
  }

  // Pick best candidate: prefer svg, otherwise largest pixel area (guess via sharp metadata)
  let source = candidates[0];
  for (const c of candidates) {
    if (path.extname(c).toLowerCase() === '.svg') {
      source = c;
      break;
    }
  }

  if (path.extname(source).toLowerCase() !== '.svg') {
    // choose largest by pixel area
    let bestArea = 0;
    for (const c of candidates) {
      try {
        const m = await sharp(c).metadata();
        const area = (m.width || 0) * (m.height || 0);
        if (area > bestArea) {
          bestArea = area;
          source = c;
        }
      } catch (e) {
        // ignore
      }
    }
  }

  console.log('Using source image:', source);

  // Utility to render source to PNG with given size
  async function renderPng(size, dest) {
    // size: integer (square)
    await fs.mkdirp(path.dirname(dest));
    const ext = path.extname(source).toLowerCase();
    if (ext === '.svg') {
      await sharp(source)
        .resize(size, size, {fit: 'contain'})
        .png({compressionLevel: 9})
        .toFile(dest);
    } else {
      // raster source; use resize cover to fill
      await sharp(source)
        .resize(size, size, {fit: 'cover'})
        .png({compressionLevel: 9})
        .toFile(dest);
    }
  }

  // ---------- iOS AppIcon.appiconset ----------
  const iosDir = path.join(outDir, 'ios', 'AppIcon.appiconset');
  await fs.mkdirp(iosDir);

  // Minimal set recommended for App Store & devices. Each entry: size (pt), scales available
  const iosImages = [
    {idiom: 'iphone', size: 20, scales: [2,3]},
    {idiom: 'iphone', size: 29, scales: [1,2,3]},
    {idiom: 'iphone', size: 40, scales: [2,3]},
    {idiom: 'iphone', size: 60, scales: [2,3]},
    {idiom: 'ipad', size: 20, scales: [1,2]},
    {idiom: 'ipad', size: 29, scales: [1,2]},
    {idiom: 'ipad', size: 40, scales: [1,2]},
    {idiom: 'ipad', size: 76, scales: [1,2]},
    {idiom: 'ipad', size: 83.5, scales: [2]},
    {idiom: 'ios-marketing', size: 1024, scales: [1]}
  ];

  const iosContents = {images: [], info: {version: 1, author: 'xcode'}};

  for (const entry of iosImages) {
    for (const scale of entry.scales) {
      const px = Math.round(entry.size * scale);
      // filename
      const filename = `icon_${entry.size}pt@${scale}x.png`.replace('.', '_');
      const dest = path.join(iosDir, filename);
      console.log('Rendering iOS', filename, px);
      await renderPng(px, dest);

      iosContents.images.push({
        idiom: entry.idiom,
        size: `${entry.size}x${entry.size}`,
        scale: `${scale}x`,
        filename
      });
    }
  }

  await fs.writeJson(path.join(iosDir, 'Contents.json'), iosContents, {spaces: 2});

  // ---------- Android mipmap ----------
  const androidBase = path.join(outDir, 'android');
  await fs.mkdirp(androidBase);
  // launcher sizes: mdpi=48, hdpi=72, xhdpi=96, xxhdpi=144, xxxhdpi=192
  const androidSizes = [
    {folder: 'mipmap-mdpi', size: 48},
    {folder: 'mipmap-hdpi', size: 72},
    {folder: 'mipmap-xhdpi', size: 96},
    {folder: 'mipmap-xxhdpi', size: 144},
    {folder: 'mipmap-xxxhdpi', size: 192}
  ];

  for (const as of androidSizes) {
    const dir = path.join(androidBase, as.folder);
    await fs.mkdirp(dir);
    const dest = path.join(dir, 'ic_launcher.png');
    console.log('Rendering Android', dest, as.size);
    await renderPng(as.size, dest);
  }

  // Also create adaptive icon layers if possible (simple approach: reuse same image as foreground, and blurred/resized for background)
  const adaptiveDir = path.join(androidBase, 'mipmap-anydpi-v26');
  await fs.mkdirp(adaptiveDir);
  const fg = path.join(adaptiveDir, 'ic_launcher_foreground.png');
  const bg = path.join(adaptiveDir, 'ic_launcher_background.png');
  console.log('Rendering Android adaptive layers', fg, bg);
  await renderPng(432, fg); // high-res foreground
  // for background, render a blurred/resized square
  const bgTmp = path.join(adaptiveDir, 'bg_tmp.png');
  await renderPng(432, bgTmp);
  await sharp(bgTmp).resize(108, 108).blur(10).extend({top:162, bottom:162, left:162, right:162, background: {r:255,g:255,b:255,alpha:0}}).png().toFile(bg);
  await fs.remove(bgTmp);

  // ---------- Windows .ico ----------
  const winDir = path.join(outDir, 'windows');
  await fs.mkdirp(winDir);
  // Sizes for ICO
  const icoSizes = [16, 24, 32, 48, 64, 128, 256];
  const icoPngs = [];
  for (const s of icoSizes) {
    const tmpP = path.join(winDir, `ico_${s}.png`);
    await renderPng(s, tmpP);
    icoPngs.push(tmpP);
  }

  const icoBuffer = await pngToIco(icoPngs);
  const icoPath = path.join(winDir, 'app_icon.ico');
  await fs.writeFile(icoPath, icoBuffer);
  console.log('Wrote Windows .ico ->', icoPath);

  // Cleanup tmp
  await fs.remove(tmpDir);

  console.log('\nDone. Output directory:', outDir);
  console.log(' - iOS AppIcon.appiconset:', iosDir);
  console.log(' - Android mipmap folders:', androidBase);
  console.log(' - Windows ICO:', icoPath);
  console.log('\nYou can copy the generated folders into your Xcode/Android/Windows projects.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
