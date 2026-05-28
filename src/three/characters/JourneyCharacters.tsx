"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

import { getTerrainHeightAt } from "@/lib";

// Low-poly toon character — torso + legs + arms + head, cel-shaded
function Character({
  position,
  bodyColor,
  shirtColor,
  skinColor,
  scale = 1,
  groupRef,
}: {
  position: [number, number, number];
  bodyColor: string;
  shirtColor: string;
  skinColor: string;
  scale?: number;
  groupRef?: React.RefObject<Group | null>;
}) {
  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Legs */}
      <mesh position={[-0.1, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.44, 0.18]} />
        <meshToonMaterial color={bodyColor} />
      </mesh>
      <mesh position={[0.1, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.44, 0.18]} />
        <meshToonMaterial color={bodyColor} />
      </mesh>
      {/* Torso / shirt */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.42, 0.5, 0.28]} />
        <meshToonMaterial color={shirtColor} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.3, 0.7, 0]}>
        <boxGeometry args={[0.15, 0.42, 0.18]} />
        <meshToonMaterial color={skinColor} />
      </mesh>
      <mesh position={[0.3, 0.7, 0]}>
        <boxGeometry args={[0.15, 0.42, 0.18]} />
        <meshToonMaterial color={skinColor} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.34, 0.34, 0.3]} />
        <meshToonMaterial color={skinColor} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.3, -0.02]}>
        <boxGeometry args={[0.36, 0.14, 0.32]} />
        <meshToonMaterial color="#2a1a0e" />
      </mesh>
    </group>
  );
}

// Simple low-poly dog — body + head + tail
function Dog({
  position,
  color,
  tailRef,
  scale = 1,
  groupRef,
}: {
  position: [number, number, number];
  color: string;
  tailRef?: React.RefObject<Group | null>;
  scale?: number;
  groupRef?: React.RefObject<Group | null>;
}) {
  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.52, 0.3, 0.28]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh position={[0.32, 0.38, 0]}>
        <boxGeometry args={[0.28, 0.26, 0.24]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Snout */}
      <mesh position={[0.48, 0.32, 0]}>
        <boxGeometry args={[0.14, 0.14, 0.18]} />
        <meshToonMaterial color="#c8a070" />
      </mesh>
      {/* Ears */}
      <mesh position={[0.26, 0.54, 0.1]}>
        <boxGeometry args={[0.1, 0.16, 0.07]} />
        <meshToonMaterial color="#7a5030" />
      </mesh>
      <mesh position={[0.26, 0.54, -0.1]}>
        <boxGeometry args={[0.1, 0.16, 0.07]} />
        <meshToonMaterial color="#7a5030" />
      </mesh>
      {/* Legs */}
      {([[0.18, 0.05, 0.1], [0.18, 0.05, -0.1], [-0.18, 0.05, 0.1], [-0.18, 0.05, -0.1]] as [number,number,number][]).map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.1, 0.2, 0.1]} />
          <meshToonMaterial color={color} />
        </mesh>
      ))}
      {/* Wagging tail */}
      <group ref={tailRef} position={[-0.32, 0.3, 0]}>
        <mesh rotation={[0, 0, 0.45]}>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshToonMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

export default function JourneyCharacters() {
  const arthurRef     = useRef<Group>(null);
  const wifeRef       = useRef<Group>(null);
  const laikaRef      = useRef<Group>(null);
  const laikaTailRef  = useRef<Group>(null);
  const kiraRef       = useRef<Group>(null);
  const kiraTailRef   = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // All four characters in the Dog Park enclosure (matches DogPark.tsx at X=-3, Z=-5.5)
    const px = -3.0;
    const pz = -5.5;

    // Arthur — slow outer stroll, offset half-circle from wife so they rarely overlap
    const ax = px + Math.cos(t * 0.38 + Math.PI) * 1.5;
    const az = pz + Math.sin(t * 0.38 + Math.PI) * 1.2;
    if (arthurRef.current) {
      arthurRef.current.position.set(ax, getTerrainHeightAt(ax, az), az);
      arthurRef.current.rotation.y = Math.atan2(
        -Math.sin(t * 0.38 + Math.PI) * 1.2,
        -Math.cos(t * 0.38 + Math.PI) * 1.5,
      );
    }

    // Wife — slightly faster inner loop
    const wx = px + Math.cos(t * 0.55 + 0.4) * 1.1;
    const wz = pz + Math.sin(t * 0.55 + 0.4) * 0.9;
    if (wifeRef.current) {
      wifeRef.current.position.set(wx, getTerrainHeightAt(wx, wz), wz);
      wifeRef.current.rotation.y = Math.atan2(
        -Math.sin(t * 0.55 + 0.4) * 0.9,
        -Math.cos(t * 0.55 + 0.4) * 1.1,
      );
    }

    // Laika — energetic outer circuit with running bounce
    const lx = px + Math.cos(t * 0.9) * 1.8;
    const lz = pz + Math.sin(t * 1.1) * 1.5;
    if (laikaRef.current) {
      laikaRef.current.position.set(lx, getTerrainHeightAt(lx, lz) + 0.05 + Math.abs(Math.sin(t * 5.5)) * 0.05, lz);
      laikaRef.current.rotation.y = Math.atan2(-Math.sin(t * 0.9) * 1.5, -Math.cos(t * 1.1) * 1.8);
    }

    // Kira — slightly different orbit, offset phase
    const kx = px + Math.cos(t * 1.05 + 1.6) * 1.6;
    const kz = pz + Math.sin(t * 0.95 + 1.2) * 1.3;
    if (kiraRef.current) {
      kiraRef.current.position.set(kx, getTerrainHeightAt(kx, kz) + 0.05 + Math.abs(Math.sin(t * 5.5 + 1.1)) * 0.05, kz);
      kiraRef.current.rotation.y = Math.atan2(-Math.sin(t * 1.05 + 1.6) * 1.3, -Math.cos(t * 0.95 + 1.2) * 1.6);
    }

    // Tail wag
    if (laikaTailRef.current) laikaTailRef.current.rotation.z = 0.45 + Math.sin(t * 7) * 0.55;
    if (kiraTailRef.current)  kiraTailRef.current.rotation.z  = 0.45 + Math.sin(t * 7 + 1.1) * 0.5;
  });

  return (
    <group>
      {/* Arthur — dark blue jeans, light blue shirt */}
      <Character
        position={[-4.5, -0.16, -5.5]}
        bodyColor="#3a5080"
        shirtColor="#4a72b8"
        skinColor="#d4a87a"
        scale={0.72}
        groupRef={arthurRef}
      />

      {/* Wife — purple/pink outfit */}
      <Character
        position={[-3.0, -0.1, -5.5]}
        bodyColor="#6f4c8b"
        shirtColor="#c06c84"
        skinColor="#d7ab86"
        scale={0.7}
        groupRef={wifeRef}
      />

      {/* Laika — golden dog */}
      <Dog
        position={[-2.2, -0.36, -5.5]}
        color="#c8883a"
        groupRef={laikaRef}
        tailRef={laikaTailRef}
        scale={0.85}
      />

      {/* Kira — dark dog */}
      <Dog
        position={[-3.8, -0.38, -5.5]}
        color="#161616"
        groupRef={kiraRef}
        tailRef={kiraTailRef}
        scale={0.78}
      />
    </group>
  );
}
