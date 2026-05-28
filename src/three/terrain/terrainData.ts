// Static world data shared across all terrain sub-components.
// Edit positions here — all sub-components read from this single source.

export const TREE_GROUND_OFFSET = -0.5;

export const mountainFootprints: [number, number, number][] = [
  // Near background mountains (in tree-spawn zone)
  [0, -20, 5.5],
  [-13, -18, 4.5],
  [15, -20, 4.0],
];

// [x, y, z, scale, rotationY]  — door (local +Z) faces the nearest road:
//   rotY = +PI/2  → door faces +X (cabin is WEST  of N-S road)
//   rotY = -PI/2  → door faces -X (cabin is EAST  of N-S road)
//   rotY =  0     → door faces +Z (cabin is NORTH of E-W road)
//   rotY =  PI    → door faces -Z (cabin is SOUTH of E-W road)
export const cabinPositions: [number, number, number, number, number][] = [
  // ── Upper town (negative Z — mountain side) ──────────────────────────
  [-2.4, -0.72,  -2.2, 0.95,  Math.PI / 2],  // main path, left side
  [ 2.4, -0.72,  -6.2, 0.90, -Math.PI / 2],  // main path, right side
  [-8.5, -0.72,  -7.5, 0.90,  Math.PI / 2],  // left branch, west side
  [ 8.8, -0.72,  -9.5, 0.88, -Math.PI / 2],  // right branch, east side
  [-11.0, -0.72, -13.5, 0.92,  Math.PI / 2], // left branch, west side
  [ 8.1, -0.72, -13.8, 1.00,  0],            // summit platform
  [-2.4, -0.72, -16.0, 0.92,  Math.PI / 2],  // main path, left side

  // ── Lower town (positive Z — town expansion side) ────────────────────
  [ 2.4, -0.72,   2.0, 0.90, -Math.PI / 2],  // main path, right side
  [-2.4, -0.72,   2.5, 0.88,  Math.PI / 2],  // main path, left side
  [ 5.0, -0.72,   3.0, 0.92,  0],            // Z=5 cross st — north side
  [-5.0, -0.72,   3.0, 0.88,  0],            // Z=5 cross st — north side
  [ 5.5, -0.72,   7.5, 0.88,  Math.PI],      // Z=5 south / facing road
  [-5.5, -0.72,   7.5, 0.88,  Math.PI],      // Z=5 south / facing road
  [ 5.5, -0.72,  11.5, 0.86,  Math.PI],      // Z=10 south side
  [-5.5, -0.72,  11.5, 0.86,  Math.PI],      // Z=10 south side
  [ 5.0, -0.72,  13.5, 0.84,  0],            // Z=15 north side
  [-5.0, -0.72,  13.5, 0.84,  0],            // Z=15 north side
  [ 5.8, -0.72,  11.8, 0.88,  Math.PI / 2],  // X=+7.5 branch, west side
  [ 9.2, -0.72,  12.0, 0.88, -Math.PI / 2],  // X=+7.5 branch, east side
  [-5.8, -0.72,  11.8, 0.88, -Math.PI / 2],  // X=-7.5 branch, east side
  [-9.2, -0.72,  11.8, 0.88,  Math.PI / 2],  // X=-7.5 branch, west side
];

export const treePositions: [number, number, number][] = [
  // Original corridor
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
  // Far left wing
  [-15.2, -0.34, -5.4], [-16.8, -0.34, -8.6], [-15.6, -0.34, -11.8],
  [-17.4, -0.34, -14.2], [-18.0, -0.34, -7.2], [-19.2, -0.34, -4.0],
  [-14.4, -0.34, -2.6], [-20.0, -0.34, -10.5], [-19.5, -0.34, -16.8],
  // Far right wing
  [14.8, -0.34, -5.1], [16.2, -0.34, -8.4], [15.4, -0.34, -11.6],
  [17.1, -0.34, -14.5], [18.3, -0.34, -7.0], [19.0, -0.34, -4.2],
  [14.2, -0.34, -2.8], [20.1, -0.34, -10.2], [19.4, -0.34, -16.6],
  // Foreground left/right
  [-15.4, -0.32, -1.2], [-17.2, -0.3, 2.0],
  [15.1, -0.32, -1.5], [16.8, -0.3, 1.8],
  // Deep back (near mountain bases)
  [-8.8, -0.34, -16.8], [-7.6, -0.34, -19.0],
  [9.6, -0.34, -17.1], [8.4, -0.34, -19.2],
  [-14.2, -0.34, -19.8], [14.0, -0.34, -20.4],
  [-11.2, -0.34, -21.6], [11.0, -0.34, -22.0],
  // Dense mid-corridor fill
  [-3.8, -0.36, -3.6], [3.6, -0.36, -3.9],
  [-4.6, -0.34, -8.4], [4.4, -0.34, -8.8],
  [-5.6, -0.34, -10.8], [5.4, -0.34, -11.2],
  [-11.4, -0.34, -5.6], [11.2, -0.34, -6.0],
  [-14.6, -0.34, -11.6], [14.4, -0.34, -12.0],
  [-16.0, -0.34, -3.8], [15.8, -0.34, -4.2],
  [-18.6, -0.34, -13.0], [18.4, -0.34, -13.4],
  [-20.4, -0.34, -7.8], [20.2, -0.34, -8.2],
  // Outer perimeter — wide spread
  [-22.0, -0.3, -2.0], [22.0, -0.3, -2.4],
  [-24.0, -0.3, -6.0], [24.0, -0.3, -6.4],
  [-23.0, -0.3, -10.0], [23.0, -0.3, -10.4],
  [-24.0, -0.3, -14.0], [24.0, -0.3, -14.4],
  [-22.0, -0.3, -18.0], [22.0, -0.3, -18.4],
  [-25.0, -0.3, -20.0], [25.0, -0.3, -20.4],
  [-26.0, -0.3, -10.0], [26.0, -0.3, -10.4],
  [-28.0, -0.3, -4.0], [28.0, -0.3, -4.4],
  [-28.0, -0.3, -16.0], [28.0, -0.3, -16.4],
  [-30.0, -0.3, -8.0], [30.0, -0.3, -8.4],
  // Positive Z outer perimeter
  [-22.0, -0.3, 4.0], [22.0, -0.3, 4.4],
  [-24.0, -0.3, 8.0], [24.0, -0.3, 8.4],
  [-22.0, -0.3, 12.0], [22.0, -0.3, 12.4],
  [-24.0, -0.3, 16.0], [24.0, -0.3, 16.4],
  [-28.0, -0.3, 6.0], [28.0, -0.3, 6.4],
  [-28.0, -0.3, 12.0], [28.0, -0.3, 12.4],
  [-30.0, -0.3, 2.0], [30.0, -0.3, 2.4],
  [-30.0, -0.3, 16.0], [30.0, -0.3, 16.4],
  // Lower town (positive Z)
  [-2.6, -0.38, 2.8], [2.4, -0.38, 3.2],
  [-5.8, -0.35, 4.8], [5.6, -0.35, 5.2],
  [-2.2, -0.36, 7.2], [2.0, -0.36, 7.6],
  [-9.4, -0.34, 5.8], [9.2, -0.34, 6.2],
  [-12.0, -0.34, 4.4], [11.8, -0.34, 4.8],
  [-6.6, -0.35, 8.8], [6.4, -0.35, 9.2],
  [-11.2, -0.34, 9.0], [11.0, -0.34, 9.4],
  [-3.6, -0.36, 11.2], [3.4, -0.36, 11.6],
  [-8.6, -0.34, 11.8], [8.4, -0.34, 12.2],
  [-13.6, -0.34, 7.6], [13.4, -0.34, 8.0],
  [-5.6, -0.35, 13.6], [5.4, -0.35, 14.0],
  [-12.2, -0.34, 12.8], [12.0, -0.34, 13.2],
  [-2.8, -0.38, 15.4], [2.6, -0.38, 15.8],
  [-9.8, -0.34, 15.2], [9.6, -0.34, 15.6],
  [-15.0, -0.34, 10.4], [14.8, -0.34, 10.8],
  [-16.4, -0.34, 6.0], [16.2, -0.34, 6.4],
];

export const rockPositions: [number, number, number, number][] = [
  // Upper town rocks
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
  // Lower town rocks (positive Z)
  [-3.2, -0.62, 3.8, 0.36], [3.0, -0.64, 4.4, 0.32],
  [-6.4, -0.63, 7.8, 0.42], [6.2, -0.64, 8.2, 0.38],
  [-10.8, -0.62, 6.6, 0.40], [10.6, -0.64, 7.0, 0.36],
  [-5.2, -0.63, 12.0, 0.44], [5.0, -0.64, 12.4, 0.38],
  [-13.0, -0.63, 11.4, 0.46], [12.8, -0.64, 11.8, 0.40],
];

export const lanternPositions: [number, number, number][] = [
  // Upper town path (negative Z)
  [1.2, -0.72, -0.8], [-1.2, -0.72, -2.5], [1.1, -0.72, -4.8],
  [-1.1, -0.72, -9.5], [1.0, -0.72, -9.8], [-1.0, -0.72, -12.2],
  [1.2, -0.72, -14.9], [3.4, -0.72, -16.1], [-3.3, -0.72, -16.4],
  [6.2, -0.72, -11.8], [-6.2, -0.72, -11.7], [9.2, -0.72, -7.2],
  [-9.2, -0.72, -7.0],
  // Lower town path (positive Z) — continues the alternating pattern
  [-1.2, -0.72, 2.5], [1.1, -0.72, 4.8],
  [-1.0, -0.72, 7.4], [1.2, -0.72, 10.0],
  [-1.1, -0.72, 12.6], [1.0, -0.72, 15.2],
  // Cross-street corners
  [-8.0, -0.72, 5.2], [8.0, -0.72, 5.2],
  [-8.0, -0.72, 10.2], [8.0, -0.72, 10.2],
  [-8.0, -0.72, 15.4], [8.0, -0.72, 15.4],
];

export const sidePathSegments: [number, number, number, number, number, number][] = [
  // Upper town branches (negative Z)
  [-6.8, -0.778, -7.0, 2.0, 20.0, 0.08],
  [6.9, -0.778, -7.3, 2.1, 20.0, -0.09],
  [-9.8, -0.778, -12.8, 1.9, 11.0, 0.22],
  [9.6, -0.778, -12.4, 1.9, 11.0, -0.22],
  [0.1, -0.778, -18.0, 2.2, 12.0, 0],
  // Lower town — cross streets (E-W, rotationY ≈ PI/2)
  [0, -0.778, 5.0, 2.2, 22.0, 1.5708],
  [0, -0.778, 10.0, 2.2, 20.0, 1.5708],
  [0, -0.778, 15.0, 2.0, 18.0, 1.5708],
  // Lower town — N-S branch roads
  [-7.5, -0.778, 7.5, 2.0, 12.0, 0.04],
  [7.5, -0.778, 7.5, 2.0, 12.0, -0.04],
  [-10.5, -0.778, 12.0, 1.8, 8.0, 0],
  [10.5, -0.778, 12.0, 1.8, 8.0, 0],
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
  // Upper town shrubs
  [-11.4, -0.75, -2.2, 0.78], [11.1, -0.75, -2.5, 0.72],
  [-13.5, -0.75, -10.4, 0.84], [13.3, -0.75, -11.2, 0.8],
  [-10.8, -0.75, -17.1, 0.76], [10.6, -0.75, -17.4, 0.78],
  // Lower town shrubs (positive Z)
  [-12.4, -0.75, 3.8, 0.80], [12.2, -0.75, 4.2, 0.76],
  [-14.8, -0.75, 8.4, 0.82], [14.6, -0.75, 8.8, 0.78],
  [-12.6, -0.75, 14.0, 0.80], [12.4, -0.75, 14.4, 0.76],
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

export function isNearLake(x: number, z: number, padding = 0): boolean {
  return lakePositions.some(([cx, , cz, width, length]) =>
    Math.hypot(x - cx, z - cz) < Math.max(width, length) * 0.55 + padding,
  );
}

// Single stone bridge at [-6.2, z=-10.2], deck 5.0×1.8
export function isNearBridge(x: number, z: number, padding = 0): boolean {
  return Math.abs(x - (-6.2)) < 2.8 + padding && Math.abs(z - (-10.2)) < 1.4 + padding;
}

// Returns true if (x, z) falls on any road surface (main path or side/branch paths).
// E-W segments (rotY ≈ PI/2) stretch along X; N-S segments stretch along Z.
export function isOnPath(x: number, z: number, padding = 0): boolean {
  // Main N-S path — width 3.2, center X=0, Z from ~-23 to ~+21
  if (Math.abs(x) < 1.6 + padding && z > -24 && z < 22) return true;
  return sidePathSegments.some(([px, , pz, width, length, rotY]) => {
    const isEW = Math.abs(rotY - Math.PI / 2) < 0.01;
    const hx = ((isEW ? length : width) / 2) + padding;
    const hz = ((isEW ? width : length) / 2) + padding;
    return Math.abs(x - px) < hx && Math.abs(z - pz) < hz;
  });
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
    !isNearRiver(x, z, 0.6) &&
    !isNearLake(x, z, 0.8) &&
    !isNearBridge(x, z, 0.6) &&
    !isOnPath(x, z, 0.8),
);

export const safeRockPositions = rockPositions.filter(
  ([x, , z]) =>
    !isInsideMountain(x, z, 0.6) &&
    !isNearCabin(x, z, 0.7) &&
    !isNearRiver(x, z, 0.4) &&
    !isNearLake(x, z, 0.5) &&
    !isNearBridge(x, z, 0.4),
);

export const safeShrubPositions = shrubPositions.filter(
  ([x, , z]) =>
    !isNearCabin(x, z, 0.8) &&
    !isNearRiver(x, z, 0.5) &&
    !isNearLake(x, z, 0.6) &&
    !isNearBridge(x, z, 0.5),
);

export const safeLakePositions = lakePositions.filter(([x, , z, width, length]) => {
  const lakeRadius = Math.max(width, length) * 0.5;
  return (
    !isInsideMountain(x, z, lakeRadius * 0.75) &&
    !isNearCabin(x, z, lakeRadius + 1.5) &&
    !isNearRiver(x, z, lakeRadius)
  );
});
