"use client";

import { getToonGradientMap } from "@/lib/toonGradient";
import { cabinPositions, safeLanternPositions, safeRockPositions } from "./terrainData";

export default function TerrainStructures() {
  const gradientMap = getToonGradientMap();

  return (
    <group>
      {/* Rocks scattered along the path */}
      {safeRockPositions.map(([x, y, z, s], i) => (
        <mesh key={`rock-${i}`} position={[x, y, z]}>
          <dodecahedronGeometry args={[s, 0]} />
          <meshToonMaterial color="#8a8070" gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* Wooden cabins */}
      {cabinPositions.map(([x, y, z, scale, rotationY], i) => (
        <group key={`cabin-${i}`} position={[x, y, z]} scale={scale} rotation={[0, rotationY, 0]}>
          {/* Stone foundation */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[1.72, 0.12, 1.42]} />
            <meshToonMaterial color="#5c4a38" gradientMap={gradientMap} />
          </mesh>
          {/* Walls */}
          <mesh position={[0, 0.53, 0]}>
            <boxGeometry args={[1.6, 0.95, 1.3]} />
            <meshToonMaterial color="#8c6a44" gradientMap={gradientMap} />
          </mesh>
          {/* Roof */}
          <mesh position={[0, 1.18, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[1.25, 0.85, 4]} />
            <meshToonMaterial color="#5a3c22" gradientMap={gradientMap} />
          </mesh>
          {/* Chimney */}
          <mesh position={[0.3, 1.46, 0.1]}>
            <boxGeometry args={[0.18, 0.72, 0.18]} />
            <meshToonMaterial color="#6b5040" gradientMap={gradientMap} />
          </mesh>
          {/* Door */}
          <mesh position={[0, 0.37, 0.67]}>
            <boxGeometry args={[0.35, 0.58, 0.05]} />
            <meshToonMaterial color="#3e2a18" gradientMap={gradientMap} />
          </mesh>
          {/* Porch step */}
          <mesh position={[0, 0.07, 0.82]}>
            <boxGeometry args={[0.5, 0.07, 0.22]} />
            <meshToonMaterial color="#7a6252" gradientMap={gradientMap} />
          </mesh>
          {/* Front window — warm interior glow */}
          <mesh position={[0.52, 0.58, 0.66]}>
            <boxGeometry args={[0.32, 0.28, 0.04]} />
            <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={1.8} />
          </mesh>
          {/* Side window — matching warm glow */}
          <mesh position={[0.81, 0.58, 0.1]}>
            <boxGeometry args={[0.04, 0.28, 0.28]} />
            <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={1.8} />
          </mesh>
        </group>
      ))}

      {/* Lanterns along the path — filtered from river corridor */}
      {safeLanternPositions.map(([x, y, z], i) => (
        <group key={`lantern-${i}`} position={[x, y, z]}>
          {/* Pole */}
          <mesh position={[0, 0.58, 0]}>
            <cylinderGeometry args={[0.05, 0.06, 1.2, 6]} />
            <meshToonMaterial color="#6f5b47" gradientMap={gradientMap} />
          </mesh>
          {/* Light box */}
          <mesh position={[0, 1.24, 0]}>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
            <meshStandardMaterial color="#F5C842" emissive="#F5C842" emissiveIntensity={2.2} />
          </mesh>
        </group>
      ))}

      {/* Sanctuary platform — hidden between mountains */}
      <group position={[-14.5, -0.72, -15.5]}>
        <mesh>
          <cylinderGeometry args={[1.25, 1.45, 0.32, 10]} />
          <meshToonMaterial color="#9b8f7f" gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.92, 1.02, 0.2, 10]} />
          <meshToonMaterial color="#d3c7ad" gradientMap={gradientMap} />
        </mesh>
      </group>

      {/* Summit viewpoint platform and beacon */}
      <group position={[8.1, -0.72, -13.8]}>
        <mesh>
          <cylinderGeometry args={[1.45, 1.8, 0.36, 10]} />
          <meshToonMaterial color="#9b8f7f" gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[1.15, 1.25, 0.24, 10]} />
          <meshToonMaterial color="#c3b7a2" gradientMap={gradientMap} />
        </mesh>
        {/* Flag pole */}
        <mesh position={[0.35, 1.0, -0.15]}>
          <cylinderGeometry args={[0.08, 0.1, 1.3, 6]} />
          <meshToonMaterial color="#6f5b47" gradientMap={gradientMap} />
        </mesh>
        {/* Summit beacon — high emissiveIntensity for Bloom */}
        <mesh position={[0.35, 1.8, -0.15]}>
          <sphereGeometry args={[0.18, 14, 14]} />
          <meshStandardMaterial color="#F5C842" emissive="#F5C842" emissiveIntensity={3.0} />
        </mesh>
      </group>
    </group>
  );
}
