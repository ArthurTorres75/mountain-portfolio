"use client";

import { getToonGradientMap } from "@/lib/toonGradient";

export default function TerrainMountains() {
  const gradientMap = getToonGradientMap();

  return (
    <group>
      {/* Far background range — deep teal/indigo */}
      <mesh position={[-8, 4, -22]}>
        <coneGeometry args={[7, 11, 5]} />
        <meshToonMaterial color="#2d4a6b" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 5.5, -26]}>
        <coneGeometry args={[9, 14, 6]} />
        <meshToonMaterial color="#1e3a5a" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[10, 3.5, -20]}>
        <coneGeometry args={[6, 9, 5]} />
        <meshToonMaterial color="#2a4560" gradientMap={gradientMap} />
      </mesh>

      {/* Snow caps on the tallest peaks */}
      <mesh position={[0, 12.5, -26]}>
        <coneGeometry args={[2.8, 3.5, 6]} />
        <meshToonMaterial color="#dce8f0" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-8, 10.3, -22]}>
        <coneGeometry args={[2.0, 2.6, 5]} />
        <meshToonMaterial color="#dce8f0" gradientMap={gradientMap} />
      </mesh>

      {/* Mid-range — main peak the player climbs toward */}
      <mesh position={[0, 3.2, -16]}>
        <coneGeometry args={[5.5, 9, 7]} />
        <meshToonMaterial color="#3d6b85" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[19, 2, -30]}>
        <coneGeometry args={[4, 6.5, 6]} />
        <meshToonMaterial color="#4a7a6a" gradientMap={gradientMap} />
      </mesh>

      {/* Foreground rolling hills */}
      <mesh position={[-22, 0, 10]}>
        <sphereGeometry args={[2.2, 6, 5]} />
        <meshToonMaterial color="#5e9166" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[4.2, -0.2, -4]}>
        <sphereGeometry args={[2.0, 6, 5]} />
        <meshToonMaterial color="#527d5a" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-4.5, -0.3, 1.5]}>
        <sphereGeometry args={[1.6, 6, 4]} />
        <meshToonMaterial color="#5e9166" gradientMap={gradientMap} />
      </mesh>
    </group>
  );
}
