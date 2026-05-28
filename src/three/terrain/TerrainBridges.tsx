"use client";

import { getToonGradientMap } from "@/lib/toonGradient";

// Single stone bridge crossing the western river at Z=-10.2.
// Bridges span the X axis (east→west). Width runs along Z.

export default function TerrainBridges() {
  const gradientMap = getToonGradientMap();

  return (
    <group>
      {/* ── Bridge: Stone — Forest crossing (Z = -10.2) ──────────── */}
      <group position={[-6.2, -0.62, -10.2]}>
        {/* Stone deck — long in X (span), walkable width in Z */}
        <mesh>
          <boxGeometry args={[5.0, 0.22, 1.8]} />
          <meshToonMaterial color="#7a7060" gradientMap={gradientMap} />
        </mesh>
        {/* Stone parapets — run along X at each Z edge */}
        {[-1.0, 1.0].map((zSide, i) => (
          <mesh key={i} position={[0, 0.10, zSide]}>
            <boxGeometry args={[5.0, 0.44, 0.32]} />
            <meshToonMaterial color="#686055" gradientMap={gradientMap} />
          </mesh>
        ))}
        {/* Mossy patches on top */}
        {[[-1.6, -0.4], [0.8, 0.5], [1.8, -0.2]].map(([xOff, zOff], i) => (
          <mesh key={i} position={[xOff, 0.17, zOff]}>
            <boxGeometry args={[0.5, 0.04, 0.4]} />
            <meshToonMaterial color="#4a7050" gradientMap={gradientMap} />
          </mesh>
        ))}
        {/* Pillar pair at each end (east and west banks) */}
        {[-2.6, 2.6].map((xOff, i) => (
          <group key={i} position={[xOff, 0, 0]}>
            <mesh position={[0, -0.3, -0.7]}>
              <boxGeometry args={[0.4, 0.62, 0.4]} />
              <meshToonMaterial color="#5e5448" gradientMap={gradientMap} />
            </mesh>
            <mesh position={[0, -0.3, 0.7]}>
              <boxGeometry args={[0.4, 0.62, 0.4]} />
              <meshToonMaterial color="#5e5448" gradientMap={gradientMap} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
