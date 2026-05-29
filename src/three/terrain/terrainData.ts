// Static world data shared across all terrain sub-components.
// Edit positions here — all sub-components read from this single source.

export const TREE_GROUND_OFFSET = -0.5;

export const mountainFootprints: [number, number, number][] = [
  // Near background mountains (in tree-spawn zone)
  [0, -20, 5.5],
  [-13, -18, 4.5],
  [15, -20, 4.0],
  // Mid background mountains
  [-8, -30, 6.5],
  [24, -32, 5.0],
  [-22, -28, 7.5],
  [10, -26, 5.0],
  [32, -30, 5.5],
  [-30, -34, 6.0],
  // Far background mountains
  [0, -42, 10.0],
  [-16, -40, 8.0],
  [18, -44, 7.0],
  [-28, -44, 6.0],
  [30, -42, 6.5],
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
  [-8.5, -0.72,  -7.5, 0.90, -Math.PI / 2],  // bridge cabin — door faces away from river (west)
  [ 8.8, -0.72,  -9.5, 0.88, -Math.PI / 2],  // right branch, east side
  [-11.7, -0.72, -13.5, 0.92,  Math.PI / 2], // pulled back west so the door sits at the street edge
  // summit cabin removed — replaced by a dedicated two-story lookout in TerrainStructures
  [-2.4, -0.72, -13.0, 0.92,  Math.PI / 2],  // moved north, clear of center mountain foot

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
  [12.4, -0.34, -3.5], [-13.6, -0.34, -8.2],
  [13.1, -0.34, -8.8], [-12.1, -0.34, -16.4], [12.6, -0.34, -16.9],
  [-6.8, -0.34, -18.2], [6.9, -0.34, -18.4],
  // Far left wing
  [-15.2, -0.34, -5.4], [-16.8, -0.34, -8.6], [-15.6, -0.34, -11.8],
  [-17.4, -0.34, -14.2], [-18.0, -0.34, -7.2],
  [-20.0, -0.34, -10.5], [-19.5, -0.34, -16.8],
  // Far right wing
  [14.8, -0.34, -5.1], [16.2, -0.34, -8.4], [15.4, -0.34, -11.6],
  [17.1, -0.34, -14.5], [18.3, -0.34, -7.0], [19.0, -0.34, -4.2],
  [14.2, -0.34, -2.8], [20.1, -0.34, -10.2], [19.4, -0.34, -16.6],
  // Foreground left/right
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
  [15.8, -0.34, -4.2],
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
  // Between mountains (z: -22 to -35) — fills the mountain base zone
  [-5.0, -0.34, -23.0], [5.2, -0.34, -23.4],
  [-9.8, -0.34, -23.8], [10.2, -0.34, -24.2],
  [-14.0, -0.34, -23.2], [14.4, -0.34, -23.6],
  [-18.0, -0.34, -22.8], [18.4, -0.34, -23.0],
  [-6.2, -0.34, -26.0], [6.6, -0.34, -26.4],
  [-11.4, -0.34, -25.6], [11.8, -0.34, -26.0],
  [-16.8, -0.34, -25.2], [17.2, -0.34, -25.6],
  [-20.5, -0.34, -24.0], [21.0, -0.34, -24.4],
  [-7.4, -0.34, -29.0], [7.8, -0.34, -29.4],
  [-13.2, -0.34, -28.6], [13.6, -0.34, -29.0],
  [-19.0, -0.34, -27.4], [19.4, -0.34, -27.8],
  [-4.0, -0.34, -31.0], [4.4, -0.34, -31.4],
  [-9.0, -0.34, -32.0], [9.4, -0.34, -32.4],
  [-14.6, -0.34, -31.6], [15.0, -0.34, -32.0],
  [-21.0, -0.34, -30.2], [21.4, -0.34, -30.6],
  [-6.0, -0.34, -34.2], [6.4, -0.34, -34.6],
  [-11.0, -0.34, -34.8], [11.4, -0.34, -35.2],
  [-17.5, -0.34, -33.6], [17.9, -0.34, -34.0],
  // Cave of Projects surroundings — dense ring around [-7, -26]
  [-12.0, -0.34, -22.4], [-3.2, -0.34, -22.6],
  [-1.4, -0.34, -24.8], [-1.2, -0.34, -27.6],
  [-2.6, -0.34, -30.8], [-6.8, -0.34, -31.8],
  [-11.6, -0.34, -31.0], [-13.0, -0.34, -27.8],
  [-12.8, -0.34, -24.8],
  // Sanctuary surroundings — ring around [-18, -24]
  [-23.5, -0.34, -21.1], [-12.9, -0.34, -21.3],
  [-24.5, -0.34, -24.1], [-12.1, -0.34, -24.3],
  [-23.9, -0.34, -27.1], [-12.7, -0.34, -27.3],
  [-18.1, -0.34, -28.9], [-17.9, -0.34, -19.9],
  [-21.3, -0.34, -20.3], [-14.9, -0.34, -20.5],
  // Far mountain zone (z: -36 to -40) — between mid and far peaks
  [-10.4, -0.34, -36.2], [10.8, -0.34, -36.6],
  [-15.8, -0.34, -36.0], [16.2, -0.34, -36.4],
  [-24.0, -0.34, -35.8], [24.4, -0.34, -36.2],
  [-12.0, -0.34, -38.4], [12.4, -0.34, -38.8],
  [-20.0, -0.34, -37.0], [20.4, -0.34, -37.4],
  [-26.5, -0.34, -37.6], [26.9, -0.34, -38.0],
  [-9.2, -0.34, -39.6], [9.6, -0.34, -40.0],
  [-22.8, -0.34, -39.2], [23.2, -0.34, -39.6],
  // Extended outer flanks (x: ±32-36, z: -2 to -18)
  [-32.0, -0.3, -2.0], [32.0, -0.3, -2.4],
  [-34.0, -0.3, -6.0], [34.0, -0.3, -6.4],
  [-33.0, -0.3, -10.0], [33.0, -0.3, -10.4],
  [-34.0, -0.3, -14.0], [34.0, -0.3, -14.4],
  [-32.0, -0.3, -18.0], [32.0, -0.3, -18.4],
  [-36.0, -0.3, -4.0], [36.0, -0.3, -4.4],
  [-36.0, -0.3, -12.0], [36.0, -0.3, -12.4],
  // Extended outer flanks (x: ±32-36, z: 2 to 14)
  [-32.0, -0.3, 2.0], [32.0, -0.3, 2.4],
  [-34.0, -0.3, 6.0], [34.0, -0.3, 6.4],
  [-32.0, -0.3, 10.0], [32.0, -0.3, 10.4],
  [-34.0, -0.3, 14.0], [34.0, -0.3, 14.4],
  [-36.0, -0.3, 8.0], [36.0, -0.3, 8.4],
  // Deep inner center (x: ±2-4, z: -23 to -32)
  [-3.0, -0.34, -24.5], [3.4, -0.34, -24.9],
  [-2.4, -0.34, -27.8], [2.8, -0.34, -28.2],
  [-3.6, -0.34, -31.6], [4.0, -0.34, -32.0],
  // Dog park trees — at fence gaps between benches, clear of equipment & paths
  [-13.25, -0.34,  6.6], [-18.75, -0.34,  6.6],   // north fence, between benches
  [-13.25, -0.34, -4.6], [-18.75, -0.34, -4.6],   // south fence, between benches
  [-22.5,  -0.34,  2.5], [-22.5,  -0.34, -0.5],   // west fence, between benches
  [-9.5,   -0.34,  2.5], [-9.5,   -0.34, -2.6],   // east fence, clear of entry gap
  // West grove — outside park (x < -23), frames the park from behind
  [-24.0, -0.34,  0.5], [-24.5, -0.34,  3.0], [-24.2, -0.34, -2.0],
  [-25.5, -0.34,  1.5], [-24.8, -0.34,  5.5], [-25.0, -0.34, -3.5],
  [-26.0, -0.34,  3.5], [-26.5, -0.34,  0.0],
  // Positive Z perimeter extension (z: 18-24)
  [-22.0, -0.3, 18.0], [22.0, -0.3, 18.4],
  [-24.0, -0.3, 20.0], [24.0, -0.3, 20.4],
  [-20.0, -0.3, 22.0], [20.0, -0.3, 22.4],
  [-28.0, -0.3, 18.0], [28.0, -0.3, 18.4],
  [-26.0, -0.3, 22.0], [26.0, -0.3, 22.4],
  [-30.0, -0.3, 20.0], [30.0, -0.3, 20.4],
  // Lower town (positive Z)
  [-2.6, -0.38, 2.8], [2.4, -0.38, 3.2],
  [-5.8, -0.35, 4.8], [5.6, -0.35, 5.2],
  [-2.2, -0.36, 7.2], [2.0, -0.36, 7.6],
  [9.2, -0.34, 6.2],
  [11.8, -0.34, 4.8],
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
  [16.2, -0.34, 6.4],
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
  [9.9, -0.64, -15.8, 0.45],
  [12.6, -0.64, -5.2, 0.34], [-13.2, -0.64, -17.6, 0.42],
  [13.1, -0.64, -17.8, 0.4],
  // Mountain zone rocks (z: -22 to -35) — larger boulders near bases
  [-3.0, -0.60, -23.5, 0.62], [3.4, -0.60, -24.0, 0.55],
  [-8.2, -0.60, -24.8, 0.70], [8.6, -0.60, -25.2, 0.65],
  [-13.0, -0.60, -24.4, 0.58], [13.4, -0.60, -24.8, 0.60],
  [-17.6, -0.60, -23.8, 0.72], [18.0, -0.60, -24.2, 0.68],
  [-5.6, -0.60, -27.2, 0.80], [6.0, -0.60, -27.6, 0.75],
  [-10.8, -0.60, -27.8, 0.65], [11.2, -0.60, -28.2, 0.62],
  [-20.0, -0.60, -26.8, 0.78], [20.4, -0.60, -27.2, 0.74],
  [-7.0, -0.60, -31.4, 0.88], [7.4, -0.60, -31.8, 0.84],
  [-13.8, -0.60, -30.8, 0.70], [14.2, -0.60, -31.2, 0.68],
  [-18.8, -0.60, -29.6, 0.82], [19.2, -0.60, -30.0, 0.78],
  [-4.4, -0.60, -33.8, 0.90], [4.8, -0.60, -34.2, 0.85],
  [-10.0, -0.60, -34.6, 0.75], [10.4, -0.60, -35.0, 0.72],
  [-16.0, -0.60, -33.4, 0.80], [16.4, -0.60, -33.8, 0.76],
  // Cave of Projects rocks — mossy boulders around [-7, -26]
  [-11.8, -0.60, -23.2, 0.68], [-3.4, -0.60, -23.4, 0.60],
  [-1.6, -0.60, -26.0, 0.55], [-1.8, -0.60, -28.8, 0.62],
  [-3.8, -0.60, -31.2, 0.70], [-11.2, -0.60, -31.6, 0.65],
  [-13.4, -0.60, -26.6, 0.72], [-13.2, -0.60, -23.6, 0.58],
  // Cave entrance rubble — framing the mouth (front + west side, clear of river)
  [-8.6, -0.60, -22.0, 0.55], [-9.6, -0.60, -22.4, 0.62],
  [-10.2, -0.60, -22.9, 0.50], [-9.0, -0.60, -22.7, 0.58],
  // Sanctuary rocks — smaller stones around [-18, -24]
  [-23.1, -0.62, -22.3, 0.48], [-13.3, -0.62, -22.5, 0.44],
  [-23.7, -0.62, -25.3, 0.52], [-12.7, -0.62, -25.5, 0.50],
  [-22.9, -0.62, -27.5, 0.46], [-13.1, -0.62, -27.7, 0.44],
  [-18.0, -0.62, -29.3, 0.50], [-17.9, -0.62, -19.5, 0.46],
  // Far mountain zone rocks (z: -36 to -40) — large boulders
  [-11.2, -0.60, -36.8, 0.90], [11.6, -0.60, -37.2, 0.85],
  [-16.6, -0.60, -36.4, 0.80], [17.0, -0.60, -36.8, 0.78],
  [-24.8, -0.60, -36.2, 0.88], [25.2, -0.60, -36.6, 0.84],
  [-20.8, -0.60, -38.0, 0.92], [21.2, -0.60, -38.4, 0.88],
  [-9.8, -0.60, -39.2, 0.75], [10.2, -0.60, -39.6, 0.72],
  // Outer flank rocks (x: ±30-36)
  [-31.0, -0.62, -3.0, 0.50], [31.0, -0.62, -3.4, 0.48],
  [-33.0, -0.62, -8.0, 0.54], [33.0, -0.62, -8.4, 0.52],
  [-31.0, -0.62, -14.0, 0.46], [31.0, -0.62, -14.4, 0.44],
  [-35.0, -0.62, -6.0, 0.58], [35.0, -0.62, -6.4, 0.55],
  [-33.0, -0.62, 4.0, 0.50], [33.0, -0.62, 4.4, 0.48],
  [-31.0, -0.62, 10.0, 0.52], [31.0, -0.62, 10.4, 0.50],
  // West grove rocks — outside park fence (x < -23)
  [-24.2, -0.62,  1.2, 0.50], [-24.8, -0.62,  3.8, 0.46],
  [-25.5, -0.62, -1.5, 0.44], [-25.0, -0.62,  5.2, 0.52],
  [-26.2, -0.62,  2.4, 0.56], [-24.5, -0.62, -3.0, 0.48],
  // Lower town rocks (positive Z)
  [-3.2, -0.62, 3.8, 0.36], [3.0, -0.64, 4.4, 0.32],
  [10.6, -0.64, 7.0, 0.36],
  [-5.2, -0.63, 12.0, 0.44], [5.0, -0.64, 12.4, 0.38],
  [-13.0, -0.63, 11.4, 0.46], [12.8, -0.64, 11.8, 0.40],
];

export const lanternPositions: [number, number, number][] = [
  // ── Main N-S path — alternating edges (x=±1.5), spaced, skipping intersections ──
  // Upper (negative Z)
  [1.5, -0.72, -1.0], [-1.5, -0.72, -3.5], [1.5, -0.72, -6.8],
  [-1.5, -0.72, -8.2], [1.5, -0.72, -11.2], [-1.5, -0.72, -13.6],
  [1.5, -0.72, -15.8], [-1.5, -0.72, -19.2], [1.5, -0.72, -21.5],
  // Lower (positive Z) — skip z≈5/10/15 cross-street intersections
  [-1.5, -0.72, 2.5], [1.5, -0.72, 7.5], [-1.5, -0.72, 12.5],
  [1.5, -0.72, 17.8], [-1.5, -0.72, 20.5],
  // ── Cross street z=5 — north curb (z=6.3), clear of south sidewalk + car lanes ──
  [-9.5, -0.72, 6.3], [-4.5, -0.72, 6.3], [4.5, -0.72, 6.3], [9.5, -0.72, 6.3],
  // ── Cross street z=10 — south curb (z=8.7), clear of north sidewalk ──
  [-9.5, -0.72, 8.7], [-4.5, -0.72, 8.7], [4.5, -0.72, 8.7], [9.5, -0.72, 8.7],
  // ── Upper-right branch [6.9,-7.3] — inner (west) edge x=5.9 ──
  [5.9, -0.72, -4.0], [5.9, -0.72, -9.0], [5.9, -0.72, -13.5],
  // ── Lower-right branch [7.5,7.5] — west edge x=6.5 (peds walk east x=8.7) ──
  [6.5, -0.72, 5.0], [6.5, -0.72, 9.5], [6.5, -0.72, 13.0],
  // ── Lower-left branch [-7.5,7.5] — east edge x=-6.5 (peds walk west x=-8.7) ──
  [-6.5, -0.72, 9.5], [-6.5, -0.72, 13.0],
  // ── Summit branch [9.6,-12.4] — east edge, lights the road up to the viewpoint ──
  [10.4, -0.72, -8.5], [10.4, -0.72, -12.5], [10.4, -0.72, -16.0],
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
  // West street — E-W, connects main path (x=0) to dog park entry (x=-9)
  [-5.5, -0.778, 1.0, 2.0, 11.0, 1.5708],
];

export const lakePositions: [number, number, number, number, number, number][] = [
  [-5.5, -0.76, 0.5, 5.0, 4.0, 0],
  [14.0, -0.758, -1.2, 5.8, 4.0, -0.16],
  [-14.8, -0.758, -14.2, 6.2, 4.4, 0.1],
  [14.6, -0.758, -15.4, 6.0, 4.2, -0.14],
  // [0.0, -0.758, 8.2, ...] removed — sat on top of the main path at X=0
];

export const shrubPositions: [number, number, number, number][] = [
  // Upper town shrubs
  [11.1, -0.75, -2.5, 0.72],
  // Dog park shrubs — clear of equipment, benches, trees, paths
  [-17.5, -0.75, 4.5, 0.62], [-20.5, -0.75, 2.5, 0.58],
  [-13.5, -0.75, -10.4, 0.84], [13.3, -0.75, -11.2, 0.8],
  [-10.8, -0.75, -17.1, 0.76], [10.6, -0.75, -17.4, 0.78],
  // Lower town shrubs (positive Z)
  [12.2, -0.75, 4.2, 0.76],
  [-14.8, -0.75, 8.4, 0.82], [14.6, -0.75, 8.8, 0.78],
  [-12.6, -0.75, 14.0, 0.80], [12.4, -0.75, 14.4, 0.76],
  // Cave of Projects surroundings — cave center: [-7, -26]
  [-11.0, -0.75, -22.5, 0.82], [-4.0, -0.75, -22.8, 0.76],
  [-2.8, -0.75, -27.0, 0.80], [-11.5, -0.75, -27.4, 0.84],
  [-3.5, -0.75, -30.0, 0.78], [-10.8, -0.75, -30.2, 0.80],
  // Cave entrance brush — framing the mouth (front + west side)
  [-8.4, -0.75, -22.6, 0.68], [-9.8, -0.75, -23.2, 0.62], [-10.2, -0.75, -22.3, 0.58],
  // Sanctuary surroundings — sanctuary center: [-18, -24]
  [-22.0, -0.75, -21.7, 0.82], [-14.3, -0.75, -21.9, 0.76],
  [-22.3, -0.75, -26.3, 0.80], [-14.0, -0.75, -26.5, 0.84],
];

// [x, y, z, color] — world-space flower positions with petal color
// cave: spiritual/mysterious (purples, blues, gold)
// sanctuary: warm/golden (ambers, soft pinks, white)
export const flowerPositions: [number, number, number, string][] = [
  // West grove flowers — behind dog park, warm/nature colors
  [-16.5, -0.72,  3.5, "#f0a0c0"], [-17.5, -0.72,  1.5, "#f5c842"],
  [-16.0, -0.72, -1.2, "#e8806a"], [-19.2, -0.72,  2.5, "#c0e060"],
  [-20.0, -0.72,  0.8, "#f0a0c0"], [-18.8, -0.72, -0.5, "#f5c842"],
  [-21.0, -0.72,  2.4, "#9070e0"], [-17.0, -0.72,  4.2, "#7ec8f5"],
  // Cave of Projects — ring around [-7, -26], radius 4-8
  [-10.2, -0.72, -23.0, "#b084f0"], [-4.8, -0.72, -22.6, "#7ec8f5"],
  [-2.0, -0.72, -25.2, "#c084e0"], [-2.4, -0.72, -28.0, "#f5c842"],
  [-4.2, -0.72, -30.5, "#9070e0"], [-10.0, -0.72, -30.8, "#7ec8f5"],
  [-12.0, -0.72, -28.6, "#b084f0"], [-12.4, -0.72, -24.2, "#c084e0"],
  [-7.0, -0.72, -22.0, "#f5c842"], [-1.4, -0.72, -26.8, "#9070e0"],
  // Sanctuary — ring around [-18, -24], radius 3-7
  [-22.5, -0.72, -21.5, "#f5c842"], [-13.7, -0.72, -21.7, "#ffe09a"],
  [-23.5, -0.72, -24.1, "#f0a0c0"], [-13.1, -0.72, -24.3, "#f5c842"],
  [-22.7, -0.72, -26.7, "#ffe09a"], [-13.9, -0.72, -26.9, "#f0a0c0"],
  [-18.0, -0.72, -28.3, "#f5c842"], [-17.9, -0.72, -20.3, "#ffe09a"],
  [-20.7, -0.72, -20.9, "#f0a0c0"], [-15.5, -0.72, -21.1, "#f5c842"],
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

// Two-story summit lookout cabin (not in cabinPositions — rendered directly)
export const SUMMIT_CABIN: [number, number] = [12.0, -13.8];

export function isNearCabin(x: number, z: number, padding = 0): boolean {
  if (Math.hypot(x - SUMMIT_CABIN[0], z - SUMMIT_CABIN[1]) < 1.6 + padding) return true;
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

// Dog park enclosure — center [-16, 1], half-extents 7×6 (x -23..-9, z -5..7)
// Used to keep loose rocks/shrubs out of the managed park interior.
export function isInDogPark(x: number, z: number, padding = 0): boolean {
  return x > -23 - padding && x < -9 + padding && z > -5 - padding && z < 7 + padding;
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
    !isNearBridge(x, z, 0.4) &&
    !isOnPath(x, z, 0.3) &&
    !isInDogPark(x, z, 0.5),
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
