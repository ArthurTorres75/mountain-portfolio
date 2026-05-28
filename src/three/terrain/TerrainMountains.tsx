"use client";

import { getToonGradientMap } from "@/lib/toonGradient";

export default function TerrainMountains() {
  const gradientMap = getToonGradientMap();

  return (
    <group>
      {/* ── FAR BACKGROUND  Z: -38 to -44  (partially fogged, silhouettes) ── */}

      {/* Tallest center peak */}
      <mesh position={[0, 5, -42]} rotation={[0, 0.8, 0]}>
        <coneGeometry args={[10, 18, 8]} />
        <meshToonMaterial color="#1a3352" gradientMap={gradientMap} />
      </mesh>

      {/* Far left peak */}
      <mesh position={[-16, 3.5, -40]} rotation={[0, 1.4, 0]}>
        <coneGeometry args={[8, 14, 7]} />
        <meshToonMaterial color="#1e3a5a" gradientMap={gradientMap} />
      </mesh>

      {/* Far right peak */}
      <mesh position={[18, 3, -44]} rotation={[0, 2.2, 0]}>
        <coneGeometry args={[7, 12, 8]} />
        <meshToonMaterial color="#253f5e" gradientMap={gradientMap} />
      </mesh>

      {/* Far fill silhouettes — fully fogged, add depth */}
      <mesh position={[-28, 2, -44]} rotation={[0, 0.5, 0]}>
        <coneGeometry args={[6, 10, 6]} />
        <meshToonMaterial color="#162840" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[30, 2.5, -42]} rotation={[0, 1.9, 0]}>
        <coneGeometry args={[6.5, 11, 6]} />
        <meshToonMaterial color="#1c3050" gradientMap={gradientMap} />
      </mesh>

      {/* ── MID BACKGROUND  Z: -26 to -34 ── */}

      {/* Left mid peak */}
      <mesh position={[-8, 3, -30]} rotation={[0, 0.6, 0]}>
        <coneGeometry args={[6.5, 11, 8]} />
        <meshToonMaterial color="#2d5870" gradientMap={gradientMap} />
      </mesh>

      {/* Right mid — no snow, green/teal, lower */}
      <mesh position={[24, 1.5, -32]} rotation={[0, 3.2, 0]}>
        <coneGeometry args={[5, 8, 7]} />
        <meshToonMaterial color="#3a6858" gradientMap={gradientMap} />
      </mesh>

      {/* Left mid wide forested hill */}
      <mesh position={[-22, 1, -28]} rotation={[0, 1.1, 0]}>
        <coneGeometry args={[7.5, 8, 9]} />
        <meshToonMaterial color="#3d6b50" gradientMap={gradientMap} />
      </mesh>

      {/* ── NEAR BACKGROUND  Z: -16 to -22  (main climb target) ── */}

      <mesh position={[0, 2, -20]} rotation={[0, 0.3, 0]}>
        <coneGeometry args={[5.5, 9, 9]} />
        <meshToonMaterial color="#3d6b85" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-13, 1, -18]} rotation={[0, 2.5, 0]}>
        <coneGeometry args={[4.5, 7, 8]} />
        <meshToonMaterial color="#4a6e5a" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[15, 1, -20]} rotation={[0, 0.9, 0]}>
        <coneGeometry args={[4, 6.5, 7]} />
        <meshToonMaterial color="#4a7a6a" gradientMap={gradientMap} />
      </mesh>

      {/* ── FOREGROUND ROLLING HILLS  Z: -6 to -14 ── */}

      <mesh position={[-22, 0, -8]} rotation={[0, 0.7, 0]}>
        <sphereGeometry args={[2.4, 8, 6]} />
        <meshToonMaterial color="#5e9166" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[20, -0.2, -10]} rotation={[0, 1.4, 0]}>
        <sphereGeometry args={[2.6, 8, 6]} />
        <meshToonMaterial color="#527d5a" gradientMap={gradientMap} />
      </mesh>
      {/* Moved away from bridge — was colliding at [-9, -11] */}
      <mesh position={[-18, -0.1, -12]} rotation={[0, 0.2, 0]}>
        <sphereGeometry args={[3.0, 9, 7]} />
        <meshToonMaterial color="#4e8060" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[17, -0.1, -13]} rotation={[0, 1.8, 0]}>
        <sphereGeometry args={[2.8, 8, 6]} />
        <meshToonMaterial color="#4a7855" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-26, 0.2, -14]} rotation={[0, 0.5, 0]}>
        <sphereGeometry args={[3.4, 9, 7]} />
        <meshToonMaterial color="#3d6b45" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[26, 0, -12]} rotation={[0, 2.3, 0]}>
        <sphereGeometry args={[2.6, 8, 6]} />
        <meshToonMaterial color="#527050" gradientMap={gradientMap} />
      </mesh>

      {/* ── EXTRA MID-RANGE PEAKS (fills sparse right side) ── */}

      <mesh position={[32, 2, -30]} rotation={[0, 1.6, 0]}>
        <coneGeometry args={[5.5, 9.5, 8]} />
        <meshToonMaterial color="#3a5e70" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-30, 1.5, -34]} rotation={[0, 0.3, 0]}>
        <coneGeometry args={[6, 10, 7]} />
        <meshToonMaterial color="#2d4e60" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[10, 2.5, -26]} rotation={[0, 2.8, 0]}>
        <coneGeometry args={[5, 8.5, 8]} />
        <meshToonMaterial color="#385870" gradientMap={gradientMap} />
      </mesh>
    </group>
  );
}
