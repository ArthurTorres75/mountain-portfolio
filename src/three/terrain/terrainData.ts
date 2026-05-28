// Static world data shared across all terrain sub-components.
// Edit positions here — all sub-components read from this single source.

export const TREE_GROUND_OFFSET = -0.5;

export const mountainFootprints: [number, number, number][] = [
  [-8, -22, 7],
  [0, -26, 9],
  [10, -20, 6],
  [0, -16, 5.5],
  [19, -30, 4],
];

export const cabinPositions: [number, number, number, number][] = [
  [-2.4, -0.72, -2.2, 0.95],
  [3.4, -0.72, -6.2, 0.9],
  [-9.6, -0.72, -12.8, 0.95],
  [8.1, -0.72, -13.8, 1.0],
  [-12.4, -0.72, -6.4, 0.9],
  [11.6, -0.72, -9.1, 0.88],
  [0.4, -0.72, -18.5, 0.92],
];

export const treePositions: [number, number, number][] = [
  [1.8, -0.4, -0.8], [-1.6, -0.4, -1.4], [4.5, -0.3, -2.2],
  [-4.0, -0.3, -2.8], [2.6, -0.3, -5.5], [-3.2, -0.4, -6.2],
  [5.8, -0.3, -7.0], [-6.4, -0.35, -4.8], [6.8, -0.28, -4.9],
  [-7.5, -0.3, -9.2], [7.9, -0.32, -9.8], [-5.1, -0.34, -12.0],
  [5.2, -0.35, -12.4], [-2.8, -0.36, -14.2], [2.9, -0.36, -14.6],
  [-9.4, -0.34, -12.2], [-10.3, -0.34, -15.0], [9.1, -0.34, -13.2],
  [10.0, -0.34, -15.2], [-8.5, -0.32, -7.6], [8.8, -0.34, -6.7],
  [-12.8, -0.34, -3.2], [12.4, -0.34, -3.5], [-13.6, -0.34, -8.2],
  [13.1, -0.34, -8.8], [-12.1, -0.34, -16.4], [12.6, -0.34, -16.9],
  [-6.8, -0.34, -18.2], [6.9, -0.34, -18.4],
];

export const rockPositions: [number, number, number, number][] = [
  [-1.4, -0.6, -3.5, 0.4], [1.7, -0.65, -7.2, 0.3],
  [-1.8, -0.6, -10.0, 0.5], [2.2, -0.65, -12.4, 0.35],
  [-5.8, -0.64, -5.6, 0.34], [6.2, -0.64, -6.1, 0.32],
  [-7.2, -0.62, -10.6, 0.46], [7.3, -0.66, -11.1, 0.38],
  [-4.4, -0.63, -14.9, 0.44], [4.8, -0.63, -15.2, 0.42],
  [0.3, -0.62, -17.4, 0.52], [-9.0, -0.64, -11.7, 0.34],
  [8.7, -0.64, -13.6, 0.36], [-10.2, -0.64, -14.4, 0.4],
  [9.9, -0.64, -15.8, 0.45], [-12.7, -0.64, -4.7, 0.38],
  [12.6, -0.64, -5.2, 0.34], [-13.2, -0.64, -17.6, 0.42],
  [13.1, -0.64, -17.8, 0.4],
];

export const lanternPositions: [number, number, number][] = [
  [1.2, -0.72, -0.8], [-1.2, -0.72, -2.5], [1.1, -0.72, -4.8],
  [-1.1, -0.72, -7.2], [1.0, -0.72, -9.8], [-1.0, -0.72, -12.2],
  [1.2, -0.72, -14.9], [3.4, -0.72, -16.1], [-3.3, -0.72, -16.4],
  [6.2, -0.72, -11.8], [-6.2, -0.72, -11.7], [9.2, -0.72, -7.2],
  [-9.2, -0.72, -7.0],
];

export const sidePathSegments: [number, number, number, number, number, number][] = [
  [-6.8, -0.778, -7.0, 2.0, 20.0, 0.08],
  [6.9, -0.778, -7.3, 2.1, 20.0, -0.09],
  [-9.8, -0.778, -12.8, 1.9, 11.0, 0.22],
  [9.6, -0.778, -12.4, 1.9, 11.0, -0.22],
  [0.1, -0.778, -18.0, 2.2, 12.0, 0],
];

export const lakePositions: [number, number, number, number, number, number][] = [
  [-5.5, -0.76, 0.5, 5.0, 4.0, 0],
  [-14.2, -0.758, -0.8, 5.6, 3.8, 0.12],
  [14.0, -0.758, -1.2, 5.8, 4.0, -0.16],
  [-14.8, -0.758, -14.2, 6.2, 4.4, 0.1],
  [14.6, -0.758, -15.4, 6.0, 4.2, -0.14],
  // [0.0, -0.758, 8.2, ...] removed — sat on top of the main path at X=0
];

export const shrubPositions: [number, number, number, number][] = [
  [-11.4, -0.75, -2.2, 0.78], [11.1, -0.75, -2.5, 0.72],
  [-13.5, -0.75, -10.4, 0.84], [13.3, -0.75, -11.2, 0.8],
  [-10.8, -0.75, -17.1, 0.76], [10.6, -0.75, -17.4, 0.78],
];

// River centerline — western corridor from mountain spring (Z=-17) to town lake (Z=0.5)
// Each entry: [centerX, centerZ, clearRadius]. Mirrors AnimatedWater RIVER_SEGMENTS exactly.
export const RIVER_CORRIDOR: [number, number, number][] = [
  // Extended south to terrain edge (spring at Z≈-37)
  [-4.8, -37.0, 2.0],
  [-4.6, -32.5, 2.2],
  [-4.8, -28.0, 2.3],
  [-5.0, -24.0, 2.4],
  [-5.2, -20.5, 2.5],
  [-5.5, -17.5, 2.8],
  [-6.0, -14.0, 2.8],
  [-6.5, -10.5, 2.8],
  [-6.5,  -7.5, 2.8],
  [-6.0,  -4.5, 3.0],
  [-5.5,  -1.5, 3.0],
  [-5.5,   0.5, 3.8],
];

export function isNearRiver(x: number, z: number, padding = 0): boolean {
  return RIVER_CORRIDOR.some(([cx, cz, radius]) => Math.hypot(x - cx, z - cz) < radius + padding);
}

export function isInsideMountain(x: number, z: number, padding = 0): boolean {
  return mountainFootprints.some(([mx, mz, radius]) => Math.hypot(x - mx, z - mz) < radius + padding);
}

export function isNearCabin(x: number, z: number, padding = 0): boolean {
  return cabinPositions.some(([cx, , cz, scale]) => Math.hypot(x - cx, z - cz) < 1.2 * scale + padding);
}

// Side paths and lanterns also get filtered from the river corridor
export const safeLanternPositions = lanternPositions.filter(
  ([x, , z]) => !isNearRiver(x, z, 0.5),
);

// Side path segments: filter entire segment if its center falls in the river
export const safePathSegments = sidePathSegments.filter(
  ([x, , z]) => !isNearRiver(x, z, 1.0),
);

export const safeTreePositions = treePositions.filter(
  ([x, , z]) =>
    !isInsideMountain(x, z, 0.9) &&
    !isNearCabin(x, z, 1.05) &&
    !isNearRiver(x, z, 0.6),
);

export const safeRockPositions = rockPositions.filter(
  ([x, , z]) =>
    !isInsideMountain(x, z, 0.6) &&
    !isNearCabin(x, z, 0.7) &&
    !isNearRiver(x, z, 0.4),
);

export const safeLakePositions = lakePositions.filter(([x, , z, width, length]) => {
  const lakeRadius = Math.max(width, length) * 0.5;
  return (
    !isInsideMountain(x, z, lakeRadius * 0.75) &&
    !isNearCabin(x, z, lakeRadius + 1.5) &&
    !isNearRiver(x, z, lakeRadius)
  );
});
