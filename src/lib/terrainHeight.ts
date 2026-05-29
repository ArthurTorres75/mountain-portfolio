const BASE_GROUND_Y = -0.8;

const MOUNDS: [number, number, number, number][] = [
  [-8, -22, 7, 2.6],
  [0, -26, 9, 3.2],
  [10, -20, 6, 2.2],
  [0, -16, 5.5, 1.8],
  [19, -30, 4, 1.2],
  [-22, 10, 2.2, 0.9],
  [4.2, -4, 2.0, 0.8],
  [-4.5, 1.5, 1.6, 0.65],
];

// [centerX, centerZ, topY, radius]
const PLATFORMS: [number, number, number, number][] = [
  [-9.6, -12.8, -0.36, 1.15],
];

export function getTerrainHeightAt(x: number, z: number): number {
  let height = BASE_GROUND_Y;

  for (const [cx, cz, radius, peak] of MOUNDS) {
    const distance = Math.hypot(x - cx, z - cz);
    if (distance >= radius) {
      continue;
    }

    const t = 1 - distance / radius;
    const moundY = BASE_GROUND_Y + peak * t * t;
    if (moundY > height) {
      height = moundY;
    }
  }

  for (const [cx, cz, topY, radius] of PLATFORMS) {
    const distance = Math.hypot(x - cx, z - cz);
    if (distance < radius && topY > height) {
      height = topY;
    }
  }

  return height;
}
