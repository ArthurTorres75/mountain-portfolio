"use client";

import { getToonGradientMap } from "@/lib/toonGradient";
import { cabinPositions, safeLanternPositions, safeRockPositions } from "./terrainData";

export default function TerrainStructures({ isDay = true }: { isDay?: boolean }) {
  const gradientMap = getToonGradientMap();
  const windowGlow  = isDay ? 0.12 : 1.8;
  const lanternGlow = isDay ? 0.0  : 2.2;

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
          {/* Front window — warm interior glow (lit at night) */}
          <mesh position={[0.52, 0.58, 0.66]}>
            <boxGeometry args={[0.32, 0.28, 0.04]} />
            <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={windowGlow} />
          </mesh>
          {/* Side window — matching warm glow */}
          <mesh position={[0.81, 0.58, 0.1]}>
            <boxGeometry args={[0.04, 0.28, 0.28]} />
            <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={windowGlow} />
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
          {/* Light box — lit at night */}
          <mesh position={[0, 1.24, 0]}>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
            <meshStandardMaterial color="#F5C842" emissive="#F5C842" emissiveIntensity={lanternGlow} />
          </mesh>
        </group>
      ))}

      {/* Sanctuary platform — hidden between mountains */}
      <group position={[-18.0, -0.72, -24.0]}>
        <mesh>
          <cylinderGeometry args={[1.25, 1.45, 0.32, 10]} />
          <meshToonMaterial color="#9b8f7f" gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.92, 1.02, 0.2, 10]} />
          <meshToonMaterial color="#d3c7ad" gradientMap={gradientMap} />
        </mesh>
      </group>

      {/* Summit viewpoint — two-story lookout cabin in the green, one lantern
          away from the branch road. Rotated PI so door + balcony face the road. */}
      <group position={[12.0, -0.72, -13.8]} rotation={[0, Math.PI, 0]}>
        {/* Stone foundation */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[1.74, 0.16, 1.54]} />
          <meshToonMaterial color="#5c4a38" gradientMap={gradientMap} />
        </mesh>
        {/* First-floor walls */}
        <mesh position={[0, 0.68, 0]}>
          <boxGeometry args={[1.6, 1.0, 1.4]} />
          <meshToonMaterial color="#8c6a44" gradientMap={gradientMap} />
        </mesh>
        {/* Floor divider band */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[1.7, 0.1, 1.5]} />
          <meshToonMaterial color="#6b5040" gradientMap={gradientMap} />
        </mesh>
        {/* Second-floor walls (slightly smaller) */}
        <mesh position={[0, 1.74, 0]}>
          <boxGeometry args={[1.5, 0.98, 1.3]} />
          <meshToonMaterial color="#97744c" gradientMap={gradientMap} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.35, 0.9, 4]} />
          <meshToonMaterial color="#5a3c22" gradientMap={gradientMap} />
        </mesh>
        {/* Chimney */}
        <mesh position={[-0.45, 2.75, 0.3]}>
          <boxGeometry args={[0.18, 0.8, 0.18]} />
          <meshToonMaterial color="#6b5040" gradientMap={gradientMap} />
        </mesh>
        {/* Door — first floor, faces +X (toward the street) */}
        <mesh position={[0.81, 0.5, -0.25]}>
          <boxGeometry args={[0.05, 0.64, 0.4]} />
          <meshToonMaterial color="#3e2a18" gradientMap={gradientMap} />
        </mesh>
        {/* Porch step */}
        <mesh position={[0.97, 0.04, -0.25]}>
          <boxGeometry args={[0.3, 0.1, 0.5]} />
          <meshToonMaterial color="#7a6252" gradientMap={gradientMap} />
        </mesh>
        {/* Second-floor balcony on the street side (+X) */}
        <mesh position={[0.86, 1.28, 0]}>
          <boxGeometry args={[0.45, 0.06, 1.2]} />
          <meshToonMaterial color="#6f5b47" gradientMap={gradientMap} />
        </mesh>
        {[-0.55, 0, 0.55].map((z, i) => (
          <mesh key={`brail-${i}`} position={[1.06, 1.45, z]}>
            <boxGeometry args={[0.04, 0.3, 0.04]} />
            <meshToonMaterial color="#6f5b47" gradientMap={gradientMap} />
          </mesh>
        ))}
        <mesh position={[1.06, 1.6, 0]}>
          <boxGeometry args={[0.04, 0.04, 1.2]} />
          <meshToonMaterial color="#6f5b47" gradientMap={gradientMap} />
        </mesh>
        {/* First-floor window (+X, beside door) */}
        <mesh position={[0.81, 0.68, 0.42]}>
          <boxGeometry args={[0.04, 0.34, 0.3]} />
          <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={windowGlow} />
        </mesh>
        {/* First-floor window (+Z) */}
        <mesh position={[-0.35, 0.68, 0.71]}>
          <boxGeometry args={[0.34, 0.34, 0.04]} />
          <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={windowGlow} />
        </mesh>
        {/* Second-floor window (+X, opens to balcony) */}
        <mesh position={[0.76, 1.74, 0]}>
          <boxGeometry args={[0.04, 0.36, 0.4]} />
          <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={windowGlow} />
        </mesh>
        {/* Second-floor window (+Z) */}
        <mesh position={[0, 1.74, 0.66]}>
          <boxGeometry args={[0.36, 0.36, 0.04]} />
          <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={windowGlow} />
        </mesh>
        {/* Flag pole on the roof peak */}
        <mesh position={[0, 3.3, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 1.1, 6]} />
          <meshToonMaterial color="#6f5b47" gradientMap={gradientMap} />
        </mesh>
        {/* Summit beacon — high emissiveIntensity for Bloom (always lit) */}
        <mesh position={[0, 4.0, 0]}>
          <sphereGeometry args={[0.18, 14, 14]} />
          <meshStandardMaterial color="#F5C842" emissive="#F5C842" emissiveIntensity={3.0} />
        </mesh>
      </group>
    </group>
  );
}
