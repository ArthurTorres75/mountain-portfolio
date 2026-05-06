"use client";

// Low-poly toon terrain — Monument Valley / Journey style
// All meshToonMaterial for flat-shading cel look
export default function MountainTerrain() {
  const TREE_GROUND_OFFSET = -0.5;
  const mountainFootprints: [number, number, number][] = [
    [-8, -22, 7],
    [0, -26, 9],
    [10, -20, 6],
    [0, -16, 5.5],
    [-5.5, -10, 4],
    [6.5, -9, 3.8],
  ];

  const isInsideMountain = (x: number, z: number, padding = 0) => {
    return mountainFootprints.some(([mx, mz, radius]) => {
      return Math.hypot(x - mx, z - mz) < radius + padding;
    });
  };

  const treePositions: [number, number, number][] = [
    [1.8, -0.4, -0.8],
    [-1.6, -0.4, -1.4],
    [4.5, -0.3, -2.2],
    [-4.0, -0.3, -2.8],
    [2.6, -0.3, -5.5],
    [-3.2, -0.4, -6.2],
    [5.8, -0.3, -7.0],
    [-6.4, -0.35, -4.8],
    [6.8, -0.28, -4.9],
    [-7.5, -0.3, -9.2],
    [7.9, -0.32, -9.8],
    [-5.1, -0.34, -12.0],
    [5.2, -0.35, -12.4],
    [-2.8, -0.36, -14.2],
    [2.9, -0.36, -14.6],
    [-9.4, -0.34, -12.2],
    [-10.3, -0.34, -15.0],
    [9.1, -0.34, -13.2],
    [10.0, -0.34, -15.2],
    [-8.5, -0.32, -7.6],
    [8.8, -0.34, -6.7],
    [-12.8, -0.34, -3.2],
    [12.4, -0.34, -3.5],
    [-13.6, -0.34, -8.2],
    [13.1, -0.34, -8.8],
    [-12.1, -0.34, -16.4],
    [12.6, -0.34, -16.9],
    [-6.8, -0.34, -18.2],
    [6.9, -0.34, -18.4],
  ];

  const rockPositions: [number, number, number, number][] = [
    [-1.4, -0.6, -3.5, 0.4],
    [1.7, -0.65, -7.2, 0.3],
    [-1.8, -0.6, -10.0, 0.5],
    [2.2, -0.65, -12.4, 0.35],
    [-5.8, -0.64, -5.6, 0.34],
    [6.2, -0.64, -6.1, 0.32],
    [-7.2, -0.62, -10.6, 0.46],
    [7.3, -0.66, -11.1, 0.38],
    [-4.4, -0.63, -14.9, 0.44],
    [4.8, -0.63, -15.2, 0.42],
    [0.3, -0.62, -17.4, 0.52],
    [-9.0, -0.64, -11.7, 0.34],
    [8.7, -0.64, -13.6, 0.36],
    [-10.2, -0.64, -14.4, 0.4],
    [9.9, -0.64, -15.8, 0.45],
    [-12.7, -0.64, -4.7, 0.38],
    [12.6, -0.64, -5.2, 0.34],
    [-13.2, -0.64, -17.6, 0.42],
    [13.1, -0.64, -17.8, 0.4],
  ];

  const cabinPositions: [number, number, number, number][] = [
    [-2.4, -0.72, -2.2, 0.95],
    [3.4, -0.72, -6.2, 0.9],
    [-9.6, -0.72, -12.8, 0.95],
    [8.1, -0.72, -13.8, 1.0],
    [-12.4, -0.72, -6.4, 0.9],
    [11.6, -0.72, -9.1, 0.88],
    [0.4, -0.72, -18.5, 0.92],
  ];

  const lanternPositions: [number, number, number][] = [
    [1.2, -0.72, -0.8],
    [-1.2, -0.72, -2.5],
    [1.1, -0.72, -4.8],
    [-1.1, -0.72, -7.2],
    [1.0, -0.72, -9.8],
    [-1.0, -0.72, -12.2],
    [1.2, -0.72, -14.9],
    [3.4, -0.72, -16.1],
    [-3.3, -0.72, -16.4],
    [6.2, -0.72, -11.8],
    [-6.2, -0.72, -11.7],
    [9.2, -0.72, -7.2],
    [-9.2, -0.72, -7.0],
  ];

  const sidePathSegments: [number, number, number, number, number, number][] = [
    [-6.8, -0.778, -7.0, 2.0, 20.0, 0.08],
    [6.9, -0.778, -7.3, 2.1, 20.0, -0.09],
    [-9.8, -0.778, -12.8, 1.9, 11.0, 0.22],
    [9.6, -0.778, -12.4, 1.9, 11.0, -0.22],
    [0.1, -0.778, -18.0, 2.2, 12.0, 0],
  ];

  const brokenPathCuts: [number, number, number, number, number, number][] = [
    [0, -0.777, -4.2, 3.2, 1.35, 0],
    [0, -0.777, -10.7, 3.6, 1.35, 0],
    [-6.6, -0.777, -13.7, 2.5, 1.2, 0.28],
    [6.8, -0.777, -14.1, 2.5, 1.2, -0.22],
    [-8.6, -0.777, -7.6, 2.2, 1.15, 0.12],
    [8.8, -0.777, -7.4, 2.2, 1.15, -0.12],
  ];

  const lakePositions: [number, number, number, number, number, number][] = [
    [-5.5, -0.76, 0.5, 5.0, 4.0, 0],
    [-14.2, -0.758, -0.8, 5.6, 3.8, 0.12],
    [14.0, -0.758, -1.2, 5.8, 4.0, -0.16],
    [-14.8, -0.758, -14.2, 6.2, 4.4, 0.1],
    [14.6, -0.758, -15.4, 6.0, 4.2, -0.14],
    [0.0, -0.758, 8.2, 6.4, 4.6, 0.04],
  ];

  const shrubPositions: [number, number, number, number][] = [
    [-11.4, -0.75, -2.2, 0.78],
    [11.1, -0.75, -2.5, 0.72],
    [-13.5, -0.75, -10.4, 0.84],
    [13.3, -0.75, -11.2, 0.8],
    [-10.8, -0.75, -17.1, 0.76],
    [10.6, -0.75, -17.4, 0.78],
  ];

  const isNearCabin = (x: number, z: number, padding = 0) => {
    return cabinPositions.some(([cx, , cz, scale]) => {
      const radius = 1.2 * scale;
      return Math.hypot(x - cx, z - cz) < radius + padding;
    });
  };

  const safeTreePositions = treePositions.filter(
    ([x, , z]) => !isInsideMountain(x, z, 0.9) && !isNearCabin(x, z, 1.05)
  );
  const safeRockPositions = rockPositions.filter(
    ([x, , z]) => !isInsideMountain(x, z, 0.6) && !isNearCabin(x, z, 0.7)
  );
  const safeLakePositions = lakePositions.filter(([x, , z, width, length]) => {
    const lakeRadius = Math.max(width, length) * 0.5;
    return !isInsideMountain(x, z, lakeRadius * 0.75) && !isNearCabin(x, z, lakeRadius + 1.5);
  });

  return (
    <group>
      {/* Main ground — soft sage green */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[80, 80, 1, 1]} />
        <meshToonMaterial color="#4a7c59" />
      </mesh>

      {/* Path — warm sandy trail through the world */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.78, -1]}>
        <planeGeometry args={[3.2, 44, 1, 1]} />
        <meshToonMaterial color="#c8a96e" />
      </mesh>

      {/* Secondary trails around the world */}
      {sidePathSegments.map(([x, y, z, width, length, rotationY], i) => (
        <mesh key={`side-path-${i}`} rotation={[-Math.PI / 2, rotationY, 0]} position={[x, y, z]}>
          <planeGeometry args={[width, length, 1, 1]} />
          <meshToonMaterial color="#c4a26a" />
        </mesh>
      ))}

      {/* Background mountain range — deep teal/indigo */}
      <mesh position={[-8, 4, -22]}>
        <coneGeometry args={[7, 11, 5]} />
        <meshToonMaterial color="#2d4a6b" />
      </mesh>
      <mesh position={[0, 5.5, -26]}>
        <coneGeometry args={[9, 14, 6]} />
        <meshToonMaterial color="#1e3a5a" />
      </mesh>
      <mesh position={[10, 3.5, -20]}>
        <coneGeometry args={[6, 9, 5]} />
        <meshToonMaterial color="#2a4560" />
      </mesh>

      {/* Mid mountain — the main peak the player climbs toward */}
      <mesh position={[0, 3.2, -16]}>
        <coneGeometry args={[5.5, 9, 7]} />
        <meshToonMaterial color="#3d6b85" />
      </mesh>
      <mesh position={[-5.5, 2, -10]}>
        <coneGeometry args={[4, 6.5, 6]} />
        <meshToonMaterial color="#4a7a6a" />
      </mesh>
      <mesh position={[6.5, 1.8, -9]}>
        <coneGeometry args={[3.8, 5.8, 6]} />
        <meshToonMaterial color="#3e6e5e" />
      </mesh>

      {/* Snow caps hugging the mountain peaks */}
      <mesh position={[0, 7.25, -16]}>
        <coneGeometry args={[2.1, 2.1, 7]} />
        <meshToonMaterial color="#e8eef5" />
      </mesh>
      <mesh position={[0, 11.55, -26]}>
        <coneGeometry args={[2.7, 2.4, 6]} />
        <meshToonMaterial color="#f0f4fa" />
      </mesh>
      <mesh position={[-8, 7.65, -22]}>
        <coneGeometry args={[1.6, 1.8, 5]} />
        <meshToonMaterial color="#eef3f9" />
      </mesh>
      <mesh position={[10, 7.35, -20]}>
        <coneGeometry args={[1.35, 1.5, 5]} />
        <meshToonMaterial color="#e9eff6" />
      </mesh>

      {/* Foreground hills — rolling green */}
      <mesh position={[-3.5, 0, -3.5]}>
        <sphereGeometry args={[2.2, 6, 5]} />
        <meshToonMaterial color="#5e9166" />
      </mesh>
      <mesh position={[4.2, -0.2, -4]}>
        <sphereGeometry args={[2.0, 6, 5]} />
        <meshToonMaterial color="#527d5a" />
      </mesh>
      <mesh position={[-4.5, -0.3, 1.5]}>
        <sphereGeometry args={[1.6, 6, 4]} />
        <meshToonMaterial color="#5e9166" />
      </mesh>

      {/* Simple low-poly trees — trunk + canopy */}
      {safeTreePositions.map((pos, i) => (
        <group key={i} position={[pos[0], pos[1] + TREE_GROUND_OFFSET, pos[2]]}>
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.08, 0.14, 0.9, 5]} />
            <meshToonMaterial color="#7a5c3a" />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[0.65, 1.5, 5]} />
            <meshToonMaterial color="#3a7d44" />
          </mesh>
          <mesh position={[0, 2.3, 0]}>
            <coneGeometry args={[0.44, 1.1, 5]} />
            <meshToonMaterial color="#4a9454" />
          </mesh>
        </group>
      ))}

      {/* Rocks scattered along the path */}
      {safeRockPositions.map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]}>
          <dodecahedronGeometry args={[s, 0]} />
          <meshToonMaterial color="#8a8070" />
        </mesh>
      ))}

      {/* Wooden cabins for lived-in atmosphere */}
      {cabinPositions.map(([x, y, z, scale], i) => (
        <group key={`cabin-${i}`} position={[x, y, z]} scale={scale}>
          <mesh position={[0, 0.48, 0]}>
            <boxGeometry args={[1.6, 0.95, 1.3]} />
            <meshToonMaterial color="#8c6a44" />
          </mesh>
          <mesh position={[0, 1.18, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[1.25, 0.85, 4]} />
            <meshToonMaterial color="#6b4c32" />
          </mesh>
          <mesh position={[0, 0.35, 0.67]}>
            <boxGeometry args={[0.35, 0.58, 0.05]} />
            <meshToonMaterial color="#4e3a28" />
          </mesh>
        </group>
      ))}

      {/* Lantern line along the path */}
      {lanternPositions.map(([x, y, z], i) => (
        <group key={`lantern-${i}`} position={[x, y, z]}>
          <mesh position={[0, 0.58, 0]}>
            <cylinderGeometry args={[0.05, 0.06, 1.2, 6]} />
            <meshToonMaterial color="#6f5b47" />
          </mesh>
          <mesh position={[0, 1.24, 0]}>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
            <meshStandardMaterial color="#F5C842" emissive="#F5C842" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* Broken cuts on trails and main path */}
      {brokenPathCuts.map(([x, y, z, width, length, rotationY], i) => (
        <group key={`path-cut-${i}`} position={[x, y, z]} rotation={[0, rotationY, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width, length, 1, 1]} />
            <meshToonMaterial color="#3d5f79" />
          </mesh>
          <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width * 0.76, length * 0.7, 1, 1]} />
            <meshToonMaterial color="#4a90b8" />
          </mesh>
        </group>
      ))}

      {/* Low-poly shrubs for surrounding population */}
      {shrubPositions.map(([x, y, z, scale], i) => (
        <group key={`shrub-${i}`} position={[x, y, z]} scale={scale}>
          <mesh>
            <dodecahedronGeometry args={[0.7, 0]} />
            <meshToonMaterial color="#5a8f5f" />
          </mesh>
          <mesh position={[0.5, 0.05, -0.3]}>
            <dodecahedronGeometry args={[0.42, 0]} />
            <meshToonMaterial color="#4f8255" />
          </mesh>
        </group>
      ))}

      {/* Lakes around the world */}
      {safeLakePositions.map(([x, y, z, width, length, rotationY], i) => (
        <mesh key={`lake-${i}`} rotation={[-Math.PI / 2, rotationY, 0]} position={[x, y, z]}>
          <planeGeometry args={[width, length, 1, 1]} />
          <meshToonMaterial color="#4a90b8" transparent opacity={0.75} />
        </mesh>
      ))}

      {/* Hidden sanctuary platform */}
      <group position={[-9.6, -0.72, -12.8]}>
        <mesh>
          <cylinderGeometry args={[1.25, 1.45, 0.32, 10]} />
          <meshToonMaterial color="#9b8f7f" />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.92, 1.02, 0.2, 10]} />
          <meshToonMaterial color="#d3c7ad" />
        </mesh>
      </group>

      {/* Summit viewpoint platform and beacon */}
      <group position={[8.1, -0.72, -13.8]}>
        <mesh>
          <cylinderGeometry args={[1.45, 1.8, 0.36, 10]} />
          <meshToonMaterial color="#9b8f7f" />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[1.15, 1.25, 0.24, 10]} />
          <meshToonMaterial color="#c3b7a2" />
        </mesh>
        <mesh position={[0.35, 1.0, -0.15]}>
          <cylinderGeometry args={[0.08, 0.1, 1.3, 6]} />
          <meshToonMaterial color="#6f5b47" />
        </mesh>
        <mesh position={[0.35, 1.8, -0.15]}>
          <sphereGeometry args={[0.18, 14, 14]} />
          <meshStandardMaterial color="#F5C842" emissive="#F5C842" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </group>
  );
}
