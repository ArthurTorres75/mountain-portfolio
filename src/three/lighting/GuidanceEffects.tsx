"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { MeshBasicMaterial, Mesh, PointLight } from "three";

// Sanctuary world position — hidden between the near-background mountains
const SX = -14.5;
const SY = 0.28;
const SZ = -15.5;

interface GuidanceEffectsProps {
  sanctuaryActivated: boolean;
}

export default function GuidanceEffects({ sanctuaryActivated }: GuidanceEffectsProps) {
  // Mount sparkles once activated — never unmount (divine permanence)
  const [showSparkles, setShowSparkles] = useState(false);

  const ray1Ref       = useRef<Mesh>(null);
  const ray2Ref       = useRef<Mesh>(null);
  const revealLightRef = useRef<PointLight>(null);
  const progressRef   = useRef(0);

  useEffect(() => {
    if (sanctuaryActivated) setShowSparkles(true);
  }, [sanctuaryActivated]);

  useFrame((state, delta) => {
    if (sanctuaryActivated && progressRef.current < 1) {
      // ~2.2 s to full reveal
      progressRef.current = Math.min(1, progressRef.current + delta * 0.45);
    }

    const p = progressRef.current;
    const t = state.clock.getElapsedTime();

    if (ray1Ref.current) {
      (ray1Ref.current.material as MeshBasicMaterial).opacity = 0.055 * p;
    }
    if (ray2Ref.current) {
      (ray2Ref.current.material as MeshBasicMaterial).opacity = 0.045 * p;
    }
    if (revealLightRef.current) {
      const pulse = (Math.sin(t * 0.65) + 1) * 0.3;
      revealLightRef.current.intensity = (1.5 + pulse) * p;
    }
  });

  return (
    <group>
      {/* Night sky — fewer stars, warm tint to match toon palette */}
      <Stars radius={90} depth={25} count={400} factor={3} saturation={0.15} speed={0.3} />

      {/* Sanctuary golden haze — revealed when player enters */}
      {showSparkles && (
        <Sparkles
          count={60}
          scale={[10, 5, 10]}
          position={[SX, SY + 2.2, SZ]}
          size={2.8}
          speed={0.09}
          color="#F5C842"
        />
      )}

      {/* Sanctuary volumetric light rays — start invisible, animate in */}
      <mesh ref={ray1Ref} position={[SX - 1.2, SY + 5.2, SZ + 0.6]} rotation={[0.18, 0.08, 0.28]}>
        <coneGeometry args={[1.0, 9, 14, 1, true]} />
        <meshBasicMaterial color="#F5C842" transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={ray2Ref} position={[SX + 1.2, SY + 5.7, SZ - 0.7]} rotation={[0.14, -0.06, -0.22]}>
        <coneGeometry args={[1.1, 10, 14, 1, true]} />
        <meshBasicMaterial color="#FFE9A0" transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Sanctuary reveal light — golden point light that pulses on activation */}
      <pointLight
        ref={revealLightRef}
        position={[SX, SY + 4, SZ]}
        intensity={0}
        color="#F5C842"
        distance={14}
        decay={2}
      />

      {/* Summit glow — sunrise light at the top of the mountain, always visible */}
      <mesh position={[0, 8, -16]} rotation={[0, 0, 0]}>
        <coneGeometry args={[2.5, 14, 14, 1, true]} />
        <meshBasicMaterial color="#FFA040" transparent opacity={0.04} depthWrite={false} />
      </mesh>
    </group>
  );
}
