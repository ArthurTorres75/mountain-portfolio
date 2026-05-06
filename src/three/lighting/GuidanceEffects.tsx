"use client";

import { Sparkles, Stars } from "@react-three/drei";

export default function GuidanceEffects() {
  return (
    <group>
      {/* Night sky — fewer stars, warm tint to match toon palette */}
      <Stars radius={90} depth={25} count={400} factor={3} saturation={0.15} speed={0.3} />

      {/* Golden dust along the path — guiding the player forward */}
      <Sparkles
        count={80}
        scale={[4, 3, 30]}
        position={[0, 1.2, -6]}
        size={2.2}
        speed={0.12}
        color="#FFE9A0"
      />

      {/* Sanctuary glow area — soft golden haze near the hidden vista */}
      <Sparkles
        count={40}
        scale={[8, 4, 8]}
        position={[0.3, 2, -12]}
        size={3}
        speed={0.08}
        color="#F5C842"
      />

      {/* Volumetric light rays — two soft golden shafts from above */}
      <mesh position={[-1.8, 5.5, -7]} rotation={[0.18, 0.08, 0.28]}>
        <coneGeometry args={[1.0, 9, 14, 1, true]} />
        <meshBasicMaterial color="#F5C842" transparent opacity={0.055} depthWrite={false} />
      </mesh>
      <mesh position={[2.2, 6, -9]} rotation={[0.14, -0.06, -0.22]}>
        <coneGeometry args={[1.1, 10, 14, 1, true]} />
        <meshBasicMaterial color="#FFE9A0" transparent opacity={0.045} depthWrite={false} />
      </mesh>

      {/* Summit glow — sunrise light at the top of the mountain */}
      <mesh position={[0, 8, -16]} rotation={[0, 0, 0]}>
        <coneGeometry args={[2.5, 14, 14, 1, true]} />
        <meshBasicMaterial color="#FFA040" transparent opacity={0.04} depthWrite={false} />
      </mesh>
    </group>
  );
}
