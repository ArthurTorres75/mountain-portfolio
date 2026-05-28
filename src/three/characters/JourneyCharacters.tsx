"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

import { getTerrainHeightAt } from "@/lib";

function Character({
  position,
  bodyColor,
  shirtColor,
  skinColor,
  hairColor,
  longHair = false,
  necklace = false,
  scale = 1,
  groupRef,
}: {
  position: [number, number, number];
  bodyColor: string;
  shirtColor: string;
  skinColor: string;
  hairColor: string;
  longHair?: boolean;
  necklace?: boolean;
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
      {/* Torso */}
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
      {/* Hair — top cap */}
      <mesh position={[0, 1.3, -0.01]}>
        <boxGeometry args={[0.36, 0.13, 0.32]} />
        <meshToonMaterial color={hairColor} />
      </mesh>
      {/* Long hair — back panel for wife */}
      {longHair && (
        <>
          <mesh position={[0, 0.9, -0.17]}>
            <boxGeometry args={[0.34, 0.6, 0.06]} />
            <meshToonMaterial color={hairColor} />
          </mesh>
          <mesh position={[0, 0.56, -0.18]}>
            <boxGeometry args={[0.30, 0.4, 0.06]} />
            <meshToonMaterial color={hairColor} />
          </mesh>
        </>
      )}
      {/* Necklace */}
      {necklace && (
        <mesh position={[0, 0.88, 0.12]}>
          <boxGeometry args={[0.22, 0.03, 0.03]} />
          <meshToonMaterial color="#d4a840" />
        </mesh>
      )}
    </group>
  );
}

// Laika — black, athletic, pointy ears, tan markings, pink collar
function LaikaModel({
  scale = 1,
  groupRef,
  tailRef,
}: {
  scale?: number;
  groupRef?: React.RefObject<Group | null>;
  tailRef?: React.RefObject<Group | null>;
}) {
  return (
    <group ref={groupRef} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.58, 0.28, 0.26]} />
        <meshToonMaterial color="#111111" />
      </mesh>
      {/* Chest patch */}
      <mesh position={[0.23, 0.27, 0]}>
        <boxGeometry args={[0.1, 0.15, 0.19]} />
        <meshToonMaterial color="#d4c0a0" />
      </mesh>
      {/* Head */}
      <mesh position={[0.37, 0.4, 0]}>
        <boxGeometry args={[0.3, 0.28, 0.26]} />
        <meshToonMaterial color="#111111" />
      </mesh>
      {/* Tan face mask */}
      <mesh position={[0.49, 0.37, 0]}>
        <boxGeometry args={[0.1, 0.18, 0.18]} />
        <meshToonMaterial color="#c09050" />
      </mesh>
      {/* Snout */}
      <mesh position={[0.55, 0.32, 0]}>
        <boxGeometry args={[0.13, 0.12, 0.14]} />
        <meshToonMaterial color="#a87840" />
      </mesh>
      {/* Nose */}
      <mesh position={[0.62, 0.35, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.06]} />
        <meshToonMaterial color="#080808" />
      </mesh>
      {/* Pointy ears — 3-segment cone = triangular/low-poly */}
      <mesh position={[0.31, 0.64, 0.09]} rotation={[0.15, 0, 0.1]}>
        <coneGeometry args={[0.07, 0.22, 3]} />
        <meshToonMaterial color="#111111" />
      </mesh>
      <mesh position={[0.31, 0.64, -0.09]} rotation={[-0.15, 0, -0.1]}>
        <coneGeometry args={[0.07, 0.22, 3]} />
        <meshToonMaterial color="#111111" />
      </mesh>
      {/* Inner ear highlight */}
      <mesh position={[0.34, 0.64, 0.09]} rotation={[0.15, 0, 0.1]}>
        <coneGeometry args={[0.04, 0.15, 3]} />
        <meshToonMaterial color="#5a3020" />
      </mesh>
      <mesh position={[0.34, 0.64, -0.09]} rotation={[-0.15, 0, -0.1]}>
        <coneGeometry args={[0.04, 0.15, 3]} />
        <meshToonMaterial color="#5a3020" />
      </mesh>
      {/* Legs */}
      {(
        [
          [0.18, 0.07, 0.1],
          [0.18, 0.07, -0.1],
          [-0.18, 0.07, 0.1],
          [-0.18, 0.07, -0.1],
        ] as [number, number, number][]
      ).map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.1, 0.2, 0.1]} />
          <meshToonMaterial color="#111111" />
        </mesh>
      ))}
      {/* White paws */}
      {(
        [
          [0.18, -0.02, 0.1],
          [0.18, -0.02, -0.1],
          [-0.18, -0.02, 0.1],
          [-0.18, -0.02, -0.1],
        ] as [number, number, number][]
      ).map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.11, 0.06, 0.11]} />
          <meshToonMaterial color="#d4c8b4" />
        </mesh>
      ))}
      {/* Pink collar */}
      <mesh position={[0.37, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.13, 0.024, 6, 14]} />
        <meshToonMaterial color="#e91e63" />
      </mesh>
      {/* Collar tag */}
      <mesh position={[0.37, 0.16, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.02]} />
        <meshToonMaterial color="#f4c430" />
      </mesh>
      {/* Tail — curves upward */}
      <group ref={tailRef} position={[-0.33, 0.3, 0]}>
        <mesh rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.07, 0.28, 0.07]} />
          <meshToonMaterial color="#111111" />
        </mesh>
      </group>
    </group>
  );
}

// Kira — golden fluffy puppy, floppy ears, compact body, purple collar
function KiraModel({
  scale = 1,
  groupRef,
  tailRef,
}: {
  scale?: number;
  groupRef?: React.RefObject<Group | null>;
  tailRef?: React.RefObject<Group | null>;
}) {
  return (
    <group ref={groupRef} scale={scale}>
      {/* Body — rounder/fluffier */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.5, 0.32, 0.3]} />
        <meshToonMaterial color="#c8a050" />
      </mesh>
      {/* Head — wider/rounder than Laika */}
      <mesh position={[0.32, 0.43, 0]}>
        <boxGeometry args={[0.32, 0.32, 0.3]} />
        <meshToonMaterial color="#c8a050" />
      </mesh>
      {/* Fluff top of head */}
      <mesh position={[0.32, 0.62, 0]}>
        <boxGeometry args={[0.3, 0.12, 0.28]} />
        <meshToonMaterial color="#d4b860" />
      </mesh>
      {/* Snout */}
      <mesh position={[0.5, 0.37, 0]}>
        <boxGeometry args={[0.14, 0.14, 0.18]} />
        <meshToonMaterial color="#b89048" />
      </mesh>
      {/* Nose */}
      <mesh position={[0.57, 0.4, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.06]} />
        <meshToonMaterial color="#2a1a0a" />
      </mesh>
      {/* Floppy ears — hang slightly outward/downward */}
      <mesh position={[0.27, 0.44, 0.18]} rotation={[0.5, 0, 0.25]}>
        <boxGeometry args={[0.12, 0.22, 0.09]} />
        <meshToonMaterial color="#b89040" />
      </mesh>
      <mesh position={[0.27, 0.44, -0.18]} rotation={[-0.5, 0, -0.25]}>
        <boxGeometry args={[0.12, 0.22, 0.09]} />
        <meshToonMaterial color="#b89040" />
      </mesh>
      {/* Legs */}
      {(
        [
          [0.16, 0.07, 0.1],
          [0.16, 0.07, -0.1],
          [-0.16, 0.07, 0.1],
          [-0.16, 0.07, -0.1],
        ] as [number, number, number][]
      ).map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.1, 0.2, 0.1]} />
          <meshToonMaterial color="#c8a050" />
        </mesh>
      ))}
      {/* Purple collar */}
      <mesh position={[0.32, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.12, 0.024, 6, 14]} />
        <meshToonMaterial color="#9c27b0" />
      </mesh>
      {/* Collar tag */}
      <mesh position={[0.32, 0.17, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.02]} />
        <meshToonMaterial color="#f4c430" />
      </mesh>
      {/* Tail */}
      <group ref={tailRef} position={[-0.28, 0.28, 0]}>
        <mesh rotation={[0, 0, 0.45]}>
          <boxGeometry args={[0.08, 0.24, 0.09]} />
          <meshToonMaterial color="#c8a050" />
        </mesh>
      </group>
    </group>
  );
}

export default function JourneyCharacters() {
  const arthurRef    = useRef<Group>(null);
  const wifeRef      = useRef<Group>(null);
  const laikaRef     = useRef<Group>(null);
  const laikaTailRef = useRef<Group>(null);
  const kiraRef      = useRef<Group>(null);
  const kiraTailRef  = useRef<Group>(null);

  useFrame((state) => {
    const t  = state.clock.getElapsedTime();
    const px = -3.0;
    const pz = -5.5;

    const ax = px + Math.cos(t * 0.38 + Math.PI) * 1.5;
    const az = pz + Math.sin(t * 0.38 + Math.PI) * 1.2;
    if (arthurRef.current) {
      arthurRef.current.position.set(ax, getTerrainHeightAt(ax, az), az);
      arthurRef.current.rotation.y = Math.atan2(
        -Math.sin(t * 0.38 + Math.PI) * 1.2,
        -Math.cos(t * 0.38 + Math.PI) * 1.5,
      );
    }

    const wx = px + Math.cos(t * 0.55 + 0.4) * 1.1;
    const wz = pz + Math.sin(t * 0.55 + 0.4) * 0.9;
    if (wifeRef.current) {
      wifeRef.current.position.set(wx, getTerrainHeightAt(wx, wz), wz);
      wifeRef.current.rotation.y = Math.atan2(
        -Math.sin(t * 0.55 + 0.4) * 0.9,
        -Math.cos(t * 0.55 + 0.4) * 1.1,
      );
    }

    const lx = px + Math.cos(t * 0.9) * 1.8;
    const lz = pz + Math.sin(t * 1.1) * 1.5;
    if (laikaRef.current) {
      laikaRef.current.position.set(
        lx,
        getTerrainHeightAt(lx, lz) + 0.05 + Math.abs(Math.sin(t * 5.5)) * 0.05,
        lz,
      );
      laikaRef.current.rotation.y = Math.atan2(
        -Math.sin(t * 0.9) * 1.5,
        -Math.cos(t * 1.1) * 1.8,
      );
    }

    const kx = px + Math.cos(t * 1.05 + 1.6) * 1.6;
    const kz = pz + Math.sin(t * 0.95 + 1.2) * 1.3;
    if (kiraRef.current) {
      kiraRef.current.position.set(
        kx,
        getTerrainHeightAt(kx, kz) + 0.05 + Math.abs(Math.sin(t * 5.5 + 1.1)) * 0.05,
        kz,
      );
      kiraRef.current.rotation.y = Math.atan2(
        -Math.sin(t * 1.05 + 1.6) * 1.3,
        -Math.cos(t * 0.95 + 1.2) * 1.6,
      );
    }

    if (laikaTailRef.current) laikaTailRef.current.rotation.z = 0.5 + Math.sin(t * 7) * 0.55;
    if (kiraTailRef.current)  kiraTailRef.current.rotation.z  = 0.45 + Math.sin(t * 7 + 1.1) * 0.5;
  });

  return (
    <group>
      {/* Arthur — white polo, dark charcoal pants, warm brown skin, short dark hair */}
      <Character
        position={[-4.5, -0.16, -5.5]}
        bodyColor="#38342e"
        shirtColor="#f0ece6"
        skinColor="#bf8a5e"
        hairColor="#1a1008"
        scale={0.72}
        groupRef={arthurRef}
      />
      {/* Wife — black top, beige pants, warm brown skin, long black hair, gold necklace */}
      <Character
        position={[-3.0, -0.1, -5.5]}
        bodyColor="#c0a07a"
        shirtColor="#1c1c1c"
        skinColor="#c49070"
        hairColor="#0c0906"
        longHair
        necklace
        scale={0.70}
        groupRef={wifeRef}
      />
      {/* Laika — black dog */}
      <LaikaModel
        groupRef={laikaRef}
        tailRef={laikaTailRef}
        scale={0.85}
      />
      {/* Kira — golden puppy */}
      <KiraModel
        groupRef={kiraRef}
        tailRef={kiraTailRef}
        scale={0.72}
      />
    </group>
  );
}
