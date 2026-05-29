"use client";

import { useMemo } from "react";
import { getToonGradientMap } from "@/lib/toonGradient";
import { safeLakePositions, safePathSegments } from "./terrainData";

export default function TerrainGround() {
  const gradientMap = getToonGradientMap();
  const remoteLargestLake = useMemo(() => {
    const townX = -5.5;
    const townZ = 0.5;
    const minDistSq = 64;
    return safeLakePositions
      .filter(([x, , z]) => {
        const dx = x - townX;
        const dz = z - townZ;
        return dx * dx + dz * dz > minDistSq;
      })
      .reduce<([number, number, number, number, number, number] | null)>((largest, lake) => {
        const size = Math.max(lake[3], lake[4]);
        if (!largest) return lake;
        return size > Math.max(largest[3], largest[4]) ? lake : largest;
      }, null);
  }, []);

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

      {/* Lakes — flattened dodecahedra */}
      {safeLakePositions
        .filter(([x, , z]) => !(remoteLargestLake && x === remoteLargestLake[0] && z === remoteLargestLake[2]))
        .map(([x, y, z, width, length, rotationY], i) => (
        <mesh
          key={`lake-${i}`}
          position={[x, y - 0.06, z]}
          rotation={[0, rotationY, 0]}
          scale={[width * 0.5, 0.32, length * 0.5]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshToonMaterial color="#5aaed4" gradientMap={gradientMap} transparent opacity={0.85} />
        </mesh>
      ))}

      {/* Largest far lake: uniform (non-stretched) dodeca and bigger diameter */}
      {remoteLargestLake && (
        <mesh
          position={[remoteLargestLake[0], remoteLargestLake[1] - 0.008, remoteLargestLake[2]]}
          rotation={[0, remoteLargestLake[5], 0]}
          scale={[Math.max(remoteLargestLake[3], remoteLargestLake[4]) * 0.72, 0.045, Math.max(remoteLargestLake[3], remoteLargestLake[4]) * 0.72]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshToonMaterial color="#5aaed4" gradientMap={gradientMap} transparent opacity={0.86} />
        </mesh>
      )}

    </group>
  );
}
