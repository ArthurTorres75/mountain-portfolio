"use client";

import { getToonGradientMap } from "@/lib/toonGradient";
import { safeLakePositions, safePathSegments } from "./terrainData";

export default function TerrainGround() {
  const gradientMap = getToonGradientMap();

  return (
    <group>
      {/* Main ground — soft sage green */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[80, 80, 1, 1]} />
        <meshToonMaterial color="#4a7c59" gradientMap={gradientMap} />
      </mesh>

      {/* Main path — warm sandy trail */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.78, -1]}>
        <planeGeometry args={[3.2, 44, 1, 1]} />
        <meshToonMaterial color="#c8a96e" gradientMap={gradientMap} />
      </mesh>

      {/* Secondary trails — filtered from river corridor */}
      {safePathSegments.map(([x, y, z, width, length, rotationY], i) => (
        <mesh key={`side-path-${i}`} rotation={[-Math.PI / 2, rotationY, 0]} position={[x, y, z]}>
          <planeGeometry args={[width, length, 1, 1]} />
          <meshToonMaterial color="#c4a26a" gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* Lakes — animated-looking with slight transparency */}
      {safeLakePositions.map(([x, y, z, width, length, rotationY], i) => (
        <mesh key={`lake-${i}`} rotation={[-Math.PI / 2, rotationY, 0]} position={[x, y, z]}>
          <planeGeometry args={[width, length, 1, 1]} />
          <meshToonMaterial color="#5aaed4" gradientMap={gradientMap} transparent opacity={0.82} />
        </mesh>
      ))}
    </group>
  );
}
