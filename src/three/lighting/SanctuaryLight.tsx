"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight } from "three";

interface SanctuaryLightProps {
  intensity?: number;
}

export function SanctuaryLight({ intensity = 1.2 }: SanctuaryLightProps) {
  const lightRef = useRef<PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime();
    lightRef.current.intensity = intensity + (Math.sin(t * 0.65) + 1) * 0.42;
    lightRef.current.position.x = Math.sin(t * 0.42) * 0.7;
  });

  return <pointLight ref={lightRef} position={[0, 6, 0]} intensity={intensity} color="#F5C842" />;
}
