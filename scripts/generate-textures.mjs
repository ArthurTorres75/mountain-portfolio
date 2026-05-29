import { PNG } from "pngjs";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/textures");
mkdirSync(OUT, { recursive: true });

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function setPixel(png, x, y, r, g, b, a = 255) {
  if (x < 0 || x >= png.width || y < 0 || y >= png.height) return;
  const idx = (png.width * y + x) * 4;
  png.data[idx] = r;
  png.data[idx + 1] = g;
  png.data[idx + 2] = b;
  png.data[idx + 3] = a;
}

function fillRect(png, x0, y0, w, h, r, g, b, a = 255) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      setPixel(png, x, y, r, g, b, a);
    }
  }
}

function fillGradientV(png, x0, y0, w, h, [r1, g1, b1], [r2, g2, b2]) {
  for (let y = y0; y < y0 + h; y++) {
    const t = (y - y0) / h;
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    for (let x = x0; x < x0 + w; x++) {
      setPixel(png, x, y, r, g, b);
    }
  }
}

// Fill triangle using scanline
function fillTriangle(png, x0, y0, x1, y1, x2, y2, r, g, b, a = 255) {
  const minY = Math.max(0, Math.min(y0, y1, y2));
  const maxY = Math.min(png.height - 1, Math.max(y0, y1, y2));
  for (let y = minY; y <= maxY; y++) {
    const xs = [];
    const edges = [[x0,y0,x1,y1],[x1,y1,x2,y2],[x2,y2,x0,y0]];
    for (const [ax,ay,bx,by] of edges) {
      if ((ay <= y && by > y) || (by <= y && ay > y)) {
        xs.push(Math.round(ax + (y - ay) / (by - ay) * (bx - ax)));
      }
    }
    if (xs.length >= 2) {
      xs.sort((a, b) => a - b);
      for (let x = xs[0]; x <= xs[xs.length - 1]; x++) {
        setPixel(png, x, y, r, g, b, a);
      }
    }
  }
}

function save(png, name) {
  const buffer = PNG.sync.write(png);
  writeFileSync(join(OUT, name), buffer);
  console.log(`✓ ${name}`);
}

// ─── House ────────────────────────────────────────────────────────────────────
function generateHouse() {
  const png = new PNG({ width: 512, height: 512, filterType: -1 });

  // White background
  fillRect(png, 0, 0, 512, 512, 255, 255, 255);

  // Wall
  const [wr, wg, wb] = hexToRgb("#D4A96A");
  fillRect(png, 0, 128, 512, 384, wr, wg, wb);

  // Wall shading bottom
  for (let y = 128; y < 512; y++) {
    const t = (y - 128) / 384;
    const shade = Math.round(t * 40);
    for (let x = 0; x < 512; x++) {
      setPixel(png, x, y, wr - shade, wg - shade, wb - shade);
    }
  }

  // Roof
  const [rr, rg, rb] = hexToRgb("#8B4513");
  fillTriangle(png, 0, 128, 256, 0, 512, 128, rr, rg, rb);

  // Roof highlight
  fillTriangle(png, 256, 0, 512, 128, 256, 64, rr + 20, rg + 10, rb + 5);

  // Door
  const [dr, dg, db] = hexToRgb("#5C3317");
  fillRect(png, 196, 330, 120, 182, dr, dg, db);

  // Door knob
  const cx = 306, cy = 422, radius = 8;
  for (let y = cy - radius; y <= cy + radius; y++) {
    for (let x = cx - radius; x <= cx + radius; x++) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2) {
        setPixel(png, x, y, 245, 200, 66);
      }
    }
  }

  // Window left
  const [wr2, wg2, wb2] = hexToRgb("#A8D8EA");
  fillRect(png, 60, 200, 110, 90, wr2, wg2, wb2);
  fillRect(png, 60, 200, 110, 6, dr, dg, db);
  fillRect(png, 60, 284, 110, 6, dr, dg, db);
  fillRect(png, 60, 200, 6, 90, dr, dg, db);
  fillRect(png, 164, 200, 6, 90, dr, dg, db);
  fillRect(png, 112, 200, 6, 90, dr, dg, db);
  fillRect(png, 60, 242, 110, 6, dr, dg, db);

  // Window right
  fillRect(png, 342, 200, 110, 90, wr2, wg2, wb2);
  fillRect(png, 342, 200, 110, 6, dr, dg, db);
  fillRect(png, 342, 284, 110, 6, dr, dg, db);
  fillRect(png, 342, 200, 6, 90, dr, dg, db);
  fillRect(png, 446, 200, 6, 90, dr, dg, db);
  fillRect(png, 394, 200, 6, 90, dr, dg, db);
  fillRect(png, 342, 242, 110, 6, dr, dg, db);

  save(png, "house.png");
}

// ─── Tree (billboard sprite, transparent bg) ──────────────────────────────────
function generateTree() {
  const png = new PNG({ width: 256, height: 512, filterType: -1 });

  // Transparent background
  png.data.fill(0);

  // Trunk
  const [tr, tg, tb] = hexToRgb("#6B4226");
  fillRect(png, 108, 370, 40, 142, tr, tg, tb);

  // Canopy layers
  const layers = [
    { y: 300, w: 120, color: "#2D6A4F", highlight: "#3D8A62" },
    { y: 200, w: 160, color: "#40916C", highlight: "#52B78A" },
    { y: 80,  w: 200, color: "#52B788", highlight: "#6DD9A2" },
  ];

  for (const layer of layers) {
    const [cr, cg, cb] = hexToRgb(layer.color);
    const [hr, hg, hb] = hexToRgb(layer.highlight);
    const cx = 128;
    const top = layer.y;
    const base = layer.y + 100;
    const half = layer.w / 2;

    // Base triangle
    fillTriangle(png, cx - half, base, cx, top, cx + half, base, cr, cg, cb);
    // Highlight right side
    fillTriangle(png, cx, top, cx + half, base, cx, base - 40, hr, hg, hb);
  }

  save(png, "tree.png");
}

// ─── Horizon panorama ─────────────────────────────────────────────────────────
function generateHorizon() {
  const png = new PNG({ width: 1024, height: 256, filterType: -1 });

  // Sky gradient: dark blue → orange → golden
  fillGradientV(png, 0, 0, 1024, 256, [26, 26, 46], [245, 200, 66]);

  // Add orange band in middle
  for (let y = 80; y < 180; y++) {
    const t = (y - 80) / 100;
    const r = Math.round(26 + (232 - 26) * Math.sin(t * Math.PI));
    const g = Math.round(26 + (147 - 26) * Math.sin(t * Math.PI));
    for (let x = 0; x < 1024; x++) {
      const idx = (1024 * y + x) * 4;
      png.data[idx] = Math.min(255, png.data[idx] + r * 0.4);
      png.data[idx + 1] = Math.min(255, png.data[idx + 1] + g * 0.2);
    }
  }

  // Mountain layers — back to front
  const mountainLayers = [
    {
      color: "#2C3E50",
      points: [0,180, 150,80, 300,160, 450,60, 600,150, 750,70, 900,140, 1024,100, 1024,256, 0,256],
    },
    {
      color: "#3D5A73",
      points: [0,210, 120,130, 250,190, 400,110, 550,180, 700,120, 850,170, 1024,130, 1024,256, 0,256],
    },
    {
      color: "#5B7FA6",
      points: [0,230, 100,170, 220,220, 360,155, 500,210, 650,160, 800,200, 1024,170, 1024,256, 0,256],
    },
  ];

  for (const layer of mountainLayers) {
    const [r, g, b] = hexToRgb(layer.color);
    const pts = layer.points;
    // Scanline fill for polygon
    for (let y = 0; y < 256; y++) {
      const xs = [];
      for (let i = 0; i < pts.length - 2; i += 2) {
        const ax = pts[i], ay = pts[i + 1];
        const bx = pts[i + 2], by = pts[i + 3];
        if ((ay <= y && by > y) || (by <= y && ay > y)) {
          xs.push(Math.round(ax + (y - ay) / (by - ay) * (bx - ax)));
        }
      }
      if (xs.length >= 2) {
        xs.sort((a, b) => a - b);
        for (let x = xs[0]; x <= xs[xs.length - 1]; x++) {
          setPixel(png, x, y, r, g, b);
        }
      }
    }
  }

  // Warm glow at horizon center
  for (let y = 150; y < 256; y++) {
    for (let x = 0; x < 1024; x++) {
      const dist = Math.sqrt((x - 512) ** 2 + (y - 256) ** 2);
      const strength = Math.max(0, 1 - dist / 380) * 0.4;
      const idx = (1024 * y + x) * 4;
      png.data[idx] = Math.min(255, png.data[idx] + 245 * strength);
      png.data[idx + 1] = Math.min(255, png.data[idx + 1] + 200 * strength);
      png.data[idx + 2] = Math.min(255, png.data[idx + 2] + 66 * strength);
    }
  }

  save(png, "horizon.png");
}

generateHouse();
generateTree();
generateHorizon();
console.log("\nAll textures generated in public/textures/");
