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
      {safePathSegments.map(([x, y, z, width, length, rotationY], i) => {
        // E-W roads (rotationY ≈ PI/2) must NOT use rotationY in the Euler tuple —
        // rotation={[-PI/2, PI/2, 0]} collapses all vertices to X=0, producing a
        // vertical wall. Instead keep rotation flat and swap geometry dimensions
        // so the plane stretches along X (length) with width along Z.
        const isEW = Math.abs(rotationY - Math.PI / 2) < 0.01;
        return (
          <mesh
            key={`side-path-${i}`}
            rotation={[-Math.PI / 2, isEW ? 0 : rotationY, 0]}
            position={[x, y, z]}
          >
            <planeGeometry args={isEW ? [length, width, 1, 1] : [width, length, 1, 1]} />
            <meshToonMaterial color="#c4a26a" gradientMap={gradientMap} />
          </mesh>
        );
      })}

      {/* Lakes — flattened dodecahedra, rounded and sunk flush into the terrain */}
      {safeLakePositions.map(([x, y, z, width, length, rotationY], i) => (
        <mesh
          key={`lake-${i}`}
          position={[x, y - 0.3, z]}
          rotation={[0, rotationY, 0]}
          scale={[width * 0.5, 0.32, length * 0.5]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshToonMaterial color="#5aaed4" gradientMap={gradientMap} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}
