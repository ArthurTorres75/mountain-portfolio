"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Vector3, Fog, AmbientLight, HemisphereLight, DirectionalLight } from "three";

// Full day/night cycle duration in seconds
const CYCLE = 120;

interface Props {
  onDayChange: (isDay: boolean) => void;
}

export default function DayNightController({ onDayChange }: Props) {
  const { scene } = useThree();

  const skyRef     = useRef<any>(null);
  const ambRef     = useRef<AmbientLight>(null);
  const hemiRef    = useRef<HemisphereLight>(null);
  const dirRef     = useRef<DirectionalLight>(null);
  const moonRef    = useRef<DirectionalLight>(null);
  const wasDayRef  = useRef(true);
  const sunVec     = useRef(new Vector3(1, 0.12, 0));

  useFrame((state) => {
    const t     = state.clock.getElapsedTime();
    const phase = (t % CYCLE) / CYCLE;                   // 0→1 over full cycle
    const angle = phase * Math.PI * 2 - Math.PI / 2;    // starts at dawn

    const sunX  = Math.cos(angle);
    const sunY  = Math.sin(angle);
    const isDay = sunY > -0.15;

    // Update Sky shader uniform — no React re-render needed
    if (skyRef.current?.material?.uniforms?.sunPosition) {
      sunVec.current.set(sunX, sunY, 0.05);
      skyRef.current.material.uniforms.sunPosition.value.copy(sunVec.current);
    }

    // Smooth day factor: 0 = full night, 1 = full day
    const df = Math.max(0, Math.min(1, (sunY + 0.15) / 0.5));

    if (ambRef.current) {
      ambRef.current.intensity = 0.08 + df * 0.67;
      ambRef.current.color.setStyle(df > 0.5 ? "#ffecd4" : "#1a2a4a");
    }
    if (hemiRef.current) {
      hemiRef.current.intensity = 0.10 + df * 0.45;
    }
    if (dirRef.current) {
      dirRef.current.intensity = df * 1.4;
      dirRef.current.position.set(sunX * 12, Math.abs(sunY) * 12 + 2, 5);
    }
    if (moonRef.current) {
      moonRef.current.intensity = isDay ? 0 : 0.18 + Math.abs(sunY) * 0.22;
    }

    if (scene.fog instanceof Fog) {
      scene.fog.color.setStyle(isDay ? "#c8a06a" : "#05080f");
      scene.fog.near = isDay ? 28 : 18;
      scene.fog.far  = isDay ? 55 : 38;
    }

    if (isDay !== wasDayRef.current) {
      wasDayRef.current = isDay;
      onDayChange(isDay);
    }
  });

  return (
    <>
      <Sky ref={skyRef} distance={450000} sunPosition={[1, 0.12, 0]} />
      <ambientLight     ref={ambRef}  intensity={0.75} color="#ffecd4" />
      <hemisphereLight  ref={hemiRef} intensity={0.55} color="#ffe4a0" groundColor="#4a7c59" />
      <directionalLight ref={dirRef}  position={[8, 12, 5]}  intensity={1.4} color="#fff4d4" castShadow={false} />
      <directionalLight ref={moonRef} position={[-6, 10, 3]} intensity={0}   color="#8aa8cc" castShadow={false} />
    </>
  );
}
