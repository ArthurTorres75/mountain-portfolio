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
  const arthurRef = useRef<Group>(null);
  const laikaRef = useRef<Group>(null);
  const laikaTailRef = useRef<Group>(null);
  const kiraRef = useRef<Group>(null);
  const kiraTailRef = useRef<Group>(null);
  const jesusRef = useRef<Group>(null);
  const wifeRef = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Dog Park movement: wife stays near Laika and Kira while all three move on terrain.
    const dogParkX = -2.2;
    const dogParkZ = -5.1;

    const laikaX = dogParkX + Math.cos(t * 0.9) * 1.7;
    const laikaZ = dogParkZ + Math.sin(t * 1.1) * 1.4;
    if (laikaRef.current) {
      laikaRef.current.position.set(laikaX, getTerrainHeightAt(laikaX, laikaZ) + 0.05, laikaZ);
      laikaRef.current.rotation.y = Math.atan2(-Math.sin(t * 0.9), -Math.cos(t * 1.1));
    }

    const kiraX = dogParkX + Math.cos(t * 1.0 + 1.6) * 1.5;
    const kiraZ = dogParkZ + Math.sin(t * 0.95 + 1.2) * 1.25;
    if (kiraRef.current) {
      kiraRef.current.position.set(kiraX, getTerrainHeightAt(kiraX, kiraZ) + 0.05, kiraZ);
      kiraRef.current.rotation.y = Math.atan2(-Math.sin(t * 1.0 + 1.6), -Math.cos(t * 0.95 + 1.2));
    }

    const wifeX = dogParkX + Math.cos(t * 0.6 + 0.4) * 0.95;
    const wifeZ = dogParkZ + Math.sin(t * 0.6 + 0.4) * 0.8;
    if (wifeRef.current) {
      wifeRef.current.position.set(wifeX, getTerrainHeightAt(wifeX, wifeZ), wifeZ);
      wifeRef.current.rotation.y = Math.atan2(dogParkX - wifeX, dogParkZ - wifeZ);
    }

    // Sanctuary NPC patrol, grounded to terrain.
    const sanctuaryX = -9.6 + Math.cos(t * 0.45) * 0.7;
    const sanctuaryZ = -12.8 + Math.sin(t * 0.45) * 0.55;
    if (jesusRef.current) {
      jesusRef.current.position.set(sanctuaryX, getTerrainHeightAt(sanctuaryX, sanctuaryZ), sanctuaryZ);
      jesusRef.current.rotation.y = Math.atan2(-Math.sin(t * 0.45), -Math.cos(t * 0.45));
    }

    // Base town NPC walk loop, grounded to terrain.
    const arthurX = 0.2 + Math.cos(t * 0.42) * 0.7;
    const arthurZ = 2.2 + Math.sin(t * 0.42) * 0.55;
    if (arthurRef.current) {
      arthurRef.current.position.set(arthurX, getTerrainHeightAt(arthurX, arthurZ), arthurZ);
      arthurRef.current.rotation.y = Math.atan2(-Math.sin(t * 0.42), -Math.cos(t * 0.42));
    }

    if (laikaTailRef.current) {
      laikaTailRef.current.rotation.z = 0.45 + Math.sin(t * 7) * 0.55;
    }
    if (kiraTailRef.current) {
      kiraTailRef.current.rotation.z = 0.45 + Math.sin(t * 7 + 1.1) * 0.5;
    }
  });

  return (
    <group>
      {/* Arthur — main character, blue shirt */}
      <Character
        position={[0, -0.16, 2.2]}
        bodyColor="#3a5080"
        shirtColor="#4a72b8"
        skinColor="#d4a87a"
        scale={0.72}
        groupRef={arthurRef}
      />

      {/* Laika — golden dog */}
      <Dog
        position={[1.1, -0.36, 2.5]}
        color="#c8883a"
        groupRef={laikaRef}
        tailRef={laikaTailRef}
        scale={0.85}
      />

      {/* Kira — darker dog */}
      <Dog
        position={[-1.0, -0.38, 2.55]}
        color="#161616"
        groupRef={kiraRef}
        tailRef={kiraTailRef}
        scale={0.78}
      />

      {/* Jesus NPC at the hidden sanctuary */}
      <Character
        position={[-9.6, 0.18, -12.8]}
        bodyColor="#3a5080"
        shirtColor="#4a72b8"
        skinColor="#d4a87a"
        scale={0.68}
        groupRef={jesusRef}
      />

      {/* Wife NPC runs/walks with the dogs at Dog Park */}
      <Character
        position={[-2.0, -0.1, -5.1]}
        bodyColor="#6f4c8b"
        shirtColor="#c06c84"
        skinColor="#d7ab86"
        scale={0.7}
        groupRef={wifeRef}
      />
    </group>
  );
}
