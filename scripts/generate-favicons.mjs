import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
  </defs>
  <!-- Squircle Background -->
  <rect width="512" height="512" rx="115" ry="115" fill="url(#bg-grad)" />
  
  <!-- Outer Calculator Frame -->
  <rect x="136" y="90" width="240" height="332" rx="40" ry="40" fill="none" stroke="#ffffff" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" />
  
  <!-- Screen -->
  <rect x="168" y="132" width="176" height="44" rx="10" ry="10" fill="#ffffff" />
  
  <!-- Keypad Row 1 -->
  <rect x="168" y="202" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
  <rect x="233" y="202" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
  <rect x="298" y="202" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
  
  <!-- Keypad Row 2 -->
  <rect x="168" y="264" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
  <rect x="233" y="264" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
  
  <!-- Keypad Row 3 -->
  <rect x="168" y="326" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
  <rect x="233" y="326" width="46" height="44" rx="10" ry="10" fill="#ffffff" />
  
  <!-- Tall Equals Button (Row 2 & 3 right) -->
  <rect x="298" y="264" width="46" height="106" rx="12" ry="12" fill="#ffffff" />
</svg>`;

function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngBuffers.length, 4);

  let offset = 6 + (pngBuffers.length * 16);
  const dirEntries = [];

  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);
}

async function main() {
  console.log('Generating favicons and brand icon assets...');
  const svgBuffer = Buffer.from(svgContent);

  // 1. Write SVGs
  fs.writeFileSync(path.resolve('public/icon.svg'), svgContent);
  fs.writeFileSync(path.resolve('src/app/icon.svg'), svgContent);
  console.log('✓ Wrote icon.svg');

  // 2. Generate PNG sizes
  const sizes = [16, 32, 48, 96, 180, 192, 512];
  const pngBuffers = {};

  for (const size of sizes) {
    const buf = await sharp(svgBuffer).resize(size, size).png().toBuffer();
    pngBuffers[size] = buf;
  }

  fs.writeFileSync(path.resolve('public/favicon-16x16.png'), pngBuffers[16]);
  fs.writeFileSync(path.resolve('public/favicon-32x32.png'), pngBuffers[32]);
  fs.writeFileSync(path.resolve('public/favicon-48x48.png'), pngBuffers[48]);
  fs.writeFileSync(path.resolve('public/favicon-96x96.png'), pngBuffers[96]);
  fs.writeFileSync(path.resolve('public/apple-touch-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.resolve('src/app/apple-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.resolve('public/icon-192.png'), pngBuffers[192]);
  fs.writeFileSync(path.resolve('public/icon-512.png'), pngBuffers[512]);
  console.log('✓ Wrote all PNG resolutions (16, 32, 48, 96, 180, 192, 512)');

  // 3. Generate multi-resolution favicon.ico (16, 32, 48)
  const icoData = createIco([
    { width: 16, height: 16, buffer: pngBuffers[16] },
    { width: 32, height: 32, buffer: pngBuffers[32] },
    { width: 48, height: 48, buffer: pngBuffers[48] }
  ]);
  fs.writeFileSync(path.resolve('public/favicon.ico'), icoData);
  fs.writeFileSync(path.resolve('src/app/favicon.ico'), icoData);
  console.log('✓ Wrote multi-resolution favicon.ico');

  // 4. Web Manifest for PWA & SEO
  const manifest = {
    name: "Calculat.dev",
    short_name: "Calculat",
    description: "Free, instant, accurate online calculators directory.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };
  fs.writeFileSync(path.resolve('public/site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('✓ Wrote site.webmanifest');

  // Clean test file if exists
  if (fs.existsSync('test-icon.png')) {
    fs.unlinkSync('test-icon.png');
  }

  console.log('🎉 All favicon and branding icon assets generated successfully!');
}

main().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
