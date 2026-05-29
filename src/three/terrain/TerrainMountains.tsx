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

      {/* ── CAVE OF CHALLENGES ZONE  center: [-7, -26]  ── */}

      {/* Tight ring of peaks encircling the cave */}
      <mesh position={[-2, 1.5, -22]} rotation={[0, 0.6, 0]}>
        <coneGeometry args={[3.8, 7, 7]} />
        <meshToonMaterial color="#3a5e48" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-13, 2, -23]} rotation={[0, 1.8, 0]}>
        <coneGeometry args={[4.5, 8, 8]} />
        <meshToonMaterial color="#2e5242" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[2, 1.2, -26]} rotation={[0, 0.3, 0]}>
        <coneGeometry args={[3.2, 6, 6]} />
        <meshToonMaterial color="#3d6450" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-16, 1.8, -26]} rotation={[0, 2.4, 0]}>
        <coneGeometry args={[4.0, 7.5, 7]} />
        <meshToonMaterial color="#334e3e" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-4, 1.0, -30]} rotation={[0, 1.0, 0]}>
        <coneGeometry args={[3.5, 6.5, 7]} />
        <meshToonMaterial color="#3a5c48" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-12, 1.6, -30]} rotation={[0, 0.4, 0]}>
        <coneGeometry args={[4.2, 7.5, 8]} />
        <meshToonMaterial color="#2e4e3c" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-7, 2.5, -33]} rotation={[0, 1.5, 0]}>
        <coneGeometry args={[5.0, 9.5, 8]} />
        <meshToonMaterial color="#28463a" gradientMap={gradientMap} />
      </mesh>
      {/* Wide forested flanks flanking the cave */}
      <mesh position={[4, 0.8, -23]} rotation={[0, 2.0, 0]}>
        <sphereGeometry args={[3.2, 8, 6]} />
        <meshToonMaterial color="#486858" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-24, 0.6, -38]} rotation={[0, 0.9, 0]}>
        <sphereGeometry args={[3.8, 8, 6]} />
        <meshToonMaterial color="#3e5e4e" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[1, 0.5, -29]} rotation={[0, 1.3, 0]}>
        <sphereGeometry args={[2.8, 8, 6]} />
        <meshToonMaterial color="#426050" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-17, 0.4, -29]} rotation={[0, 0.7, 0]}>
        <sphereGeometry args={[3.4, 8, 6]} />
        <meshToonMaterial color="#385848" gradientMap={gradientMap} />
      </mesh>
      {/* Tall sentinels — frame the cave entrance dramatically */}
      <mesh position={[-1, 3.0, -24]} rotation={[0, 0.2, 0]}>
        <coneGeometry args={[2.8, 8.5, 6]} />
        <meshToonMaterial color="#253c30" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-14, 3.2, -24]} rotation={[0, 2.1, 0]}>
        <coneGeometry args={[3.0, 9.0, 6]} />
        <meshToonMaterial color="#1e3428" gradientMap={gradientMap} />
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

      {/* ── BEHIND START — positive Z range (Z: +15 to +55) ── */}

      {/* First row — Z: 15 to 22 */}
      <mesh position={[-14, 2, 16]} rotation={[0, 1.2, 0]}>
        <coneGeometry args={[5.5, 9, 7]} />
        <meshToonMaterial color="#4a7a5a" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[16, 2.5, 17]} rotation={[0, 2.0, 0]}>
        <coneGeometry args={[6, 10, 8]} />
        <meshToonMaterial color="#3a6848" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-26, 1.5, 15]} rotation={[0, 0.8, 0]}>
        <coneGeometry args={[4.5, 7.5, 6]} />
        <meshToonMaterial color="#527050" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[28, 1.8, 16]} rotation={[0, 1.6, 0]}>
        <coneGeometry args={[5, 8, 7]} />
        <meshToonMaterial color="#486858" gradientMap={gradientMap} />
      </mesh>

      {/* Second row — Z: 25 to 34 */}
      <mesh position={[-6, 4, 28]} rotation={[0, 0.9, 0]}>
        <coneGeometry args={[8, 14, 9]} />
        <meshToonMaterial color="#2d5248" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[8, 3.5, 26]} rotation={[0, 2.4, 0]}>
        <coneGeometry args={[7, 12, 8]} />
        <meshToonMaterial color="#356050" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-20, 3, 30]} rotation={[0, 0.3, 0]}>
        <coneGeometry args={[6.5, 11, 7]} />
        <meshToonMaterial color="#3a5c4a" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[22, 2.8, 29]} rotation={[0, 1.8, 0]}>
        <coneGeometry args={[6, 10, 8]} />
        <meshToonMaterial color="#426848" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-34, 2, 24]} rotation={[0, 0.6, 0]}>
        <coneGeometry args={[5.5, 9, 6]} />
        <meshToonMaterial color="#4a6050" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[34, 2.2, 25]} rotation={[0, 2.2, 0]}>
        <coneGeometry args={[5, 8.5, 7]} />
        <meshToonMaterial color="#3e5c4c" gradientMap={gradientMap} />
      </mesh>
      {/* Wide forested hills — break up silhouette */}
      <mesh position={[-10, 0.6, 20]} rotation={[0, 0.4, 0]}>
        <sphereGeometry args={[3.8, 8, 6]} />
        <meshToonMaterial color="#527850" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[12, 0.7, 21]} rotation={[0, 1.8, 0]}>
        <sphereGeometry args={[4.0, 8, 6]} />
        <meshToonMaterial color="#4e7248" gradientMap={gradientMap} />
      </mesh>

      {/* Third row — Z: 36 to 46 — taller, darker, more distant */}
      <mesh position={[0, 6, 40]} rotation={[0, 0.5, 0]}>
        <coneGeometry args={[10, 18, 9]} />
        <meshToonMaterial color="#223848" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-18, 5, 38]} rotation={[0, 1.3, 0]}>
        <coneGeometry args={[8.5, 15, 8]} />
        <meshToonMaterial color="#1e3a42" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[20, 4.5, 42]} rotation={[0, 2.1, 0]}>
        <coneGeometry args={[8, 13, 8]} />
        <meshToonMaterial color="#253e4c" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-32, 3.5, 36]} rotation={[0, 0.7, 0]}>
        <coneGeometry args={[6.5, 11, 7]} />
        <meshToonMaterial color="#1c3440" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[33, 4, 37]} rotation={[0, 1.9, 0]}>
        <coneGeometry args={[7, 12, 7]} />
        <meshToonMaterial color="#20384a" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-10, 5.5, 44]} rotation={[0, 0.2, 0]}>
        <coneGeometry args={[9, 16, 9]} />
        <meshToonMaterial color="#1a3040" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[10, 5, 46]} rotation={[0, 2.6, 0]}>
        <coneGeometry args={[8.5, 14, 8]} />
        <meshToonMaterial color="#1e3444" gradientMap={gradientMap} />
      </mesh>
      {/* Far fill silhouettes — Z: 50-55 */}
      <mesh position={[-24, 4, 52]} rotation={[0, 0.4, 0]}>
        <coneGeometry args={[9, 16, 7]} />
        <meshToonMaterial color="#162838" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[26, 4.5, 50]} rotation={[0, 1.5, 0]}>
        <coneGeometry args={[9.5, 17, 8]} />
        <meshToonMaterial color="#1a2c3c" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-8, 7, 54]} rotation={[0, 0.9, 0]}>
        <coneGeometry args={[11, 20, 9]} />
        <meshToonMaterial color="#121e2e" gradientMap={gradientMap} />
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
