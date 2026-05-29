"use client";

import type { RefObject } from "react";
import type { Group, Mesh } from "three";

export interface LimbRefs {
  legL?: RefObject<Mesh | null>;
  legR?: RefObject<Mesh | null>;
  armL?: RefObject<Mesh | null>;
  armR?: RefObject<Mesh | null>;
}

export interface DogLegRefs {
  fl?: RefObject<Mesh | null>; // front-left
  fr?: RefObject<Mesh | null>; // front-right
  bl?: RefObject<Mesh | null>; // back-left
  br?: RefObject<Mesh | null>; // back-right
}

interface CharacterProps {
  position: [number, number, number];
  bodyColor: string;
  shirtColor: string;
  skinColor: string;
  hairColor: string;
  longHair?: boolean;
  necklace?: boolean;
  scale?: number;
  rotation?: [number, number, number];
  groupRef?: RefObject<Group | null>;
  limbs?: LimbRefs;
}

export function Character({
  position, bodyColor, shirtColor, skinColor, hairColor,
  longHair = false, necklace = false, scale = 1, rotation, groupRef, limbs,
}: CharacterProps) {
  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      <mesh ref={limbs?.legL} position={[-0.1, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.44, 0.18]} />
        <meshToonMaterial color={bodyColor} />
      </mesh>
      <mesh ref={limbs?.legR} position={[0.1, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.44, 0.18]} />
        <meshToonMaterial color={bodyColor} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.42, 0.5, 0.28]} />
        <meshToonMaterial color={shirtColor} />
      </mesh>
      <mesh ref={limbs?.armL} position={[-0.3, 0.7, 0]}>
        <boxGeometry args={[0.15, 0.42, 0.18]} />
        <meshToonMaterial color={skinColor} />
      </mesh>
      <mesh ref={limbs?.armR} position={[0.3, 0.7, 0]}>
        <boxGeometry args={[0.15, 0.42, 0.18]} />
        <meshToonMaterial color={skinColor} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.34, 0.34, 0.3]} />
        <meshToonMaterial color={skinColor} />
      </mesh>
      <mesh position={[0, 1.3, -0.01]}>
        <boxGeometry args={[0.36, 0.13, 0.32]} />
        <meshToonMaterial color={hairColor} />
      </mesh>
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
      {necklace && (
        <mesh position={[0, 0.88, 0.12]}>
          <boxGeometry args={[0.22, 0.03, 0.03]} />
          <meshToonMaterial color="#d4a840" />
        </mesh>
      )}
    </group>
  );
}

interface DogModelProps {
  scale?: number;
  groupRef?: RefObject<Group | null>;
  tailRef?: RefObject<Group | null>;
  legs?: DogLegRefs;
}

export function LaikaModel({ scale = 1, groupRef, tailRef, legs }: DogModelProps) {
  return (
    <group ref={groupRef} scale={scale}>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.58, 0.28, 0.26]} />
        <meshToonMaterial color="#111111" />
      </mesh>
      <mesh position={[0.23, 0.27, 0]}>
        <boxGeometry args={[0.1, 0.15, 0.19]} />
        <meshToonMaterial color="#d4c0a0" />
      </mesh>
      <mesh position={[0.37, 0.4, 0]}>
        <boxGeometry args={[0.3, 0.28, 0.26]} />
        <meshToonMaterial color="#111111" />
      </mesh>
      <mesh position={[0.49, 0.37, 0]}>
        <boxGeometry args={[0.1, 0.18, 0.18]} />
        <meshToonMaterial color="#c09050" />
      </mesh>
      <mesh position={[0.55, 0.32, 0]}>
        <boxGeometry args={[0.13, 0.12, 0.14]} />
        <meshToonMaterial color="#a87840" />
      </mesh>
      <mesh position={[0.62, 0.35, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.06]} />
        <meshToonMaterial color="#080808" />
      </mesh>
      <mesh position={[0.31, 0.64, 0.09]} rotation={[0.15, 0, 0.1]}>
        <coneGeometry args={[0.07, 0.22, 3]} />
        <meshToonMaterial color="#111111" />
      </mesh>
      <mesh position={[0.31, 0.64, -0.09]} rotation={[-0.15, 0, -0.1]}>
        <coneGeometry args={[0.07, 0.22, 3]} />
        <meshToonMaterial color="#111111" />
      </mesh>
      {/* Individual leg refs for running animation */}
      <mesh ref={legs?.fl} position={[0.18, 0.07, 0.1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} /><meshToonMaterial color="#111111" />
      </mesh>
      <mesh ref={legs?.fr} position={[0.18, 0.07, -0.1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} /><meshToonMaterial color="#111111" />
      </mesh>
      <mesh ref={legs?.bl} position={[-0.18, 0.07, 0.1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} /><meshToonMaterial color="#111111" />
      </mesh>
      <mesh ref={legs?.br} position={[-0.18, 0.07, -0.1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} /><meshToonMaterial color="#111111" />
      </mesh>
      {/* White paws */}
      {([[0.18,-0.02,0.1],[0.18,-0.02,-0.1],[-0.18,-0.02,0.1],[-0.18,-0.02,-0.1]] as [number,number,number][]).map((p,i)=>(
        <mesh key={i} position={p}><boxGeometry args={[0.11,0.06,0.11]}/><meshToonMaterial color="#d4c8b4"/></mesh>
      ))}
      <mesh position={[0.37, 0.3, 0]} rotation={[0, Math.PI/2, 0]}>
        <torusGeometry args={[0.13, 0.024, 6, 14]} /><meshToonMaterial color="#e91e63" />
      </mesh>
      <mesh position={[0.37, 0.16, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.02]} /><meshToonMaterial color="#f4c430" />
      </mesh>
      <group ref={tailRef} position={[-0.33, 0.3, 0]}>
        <mesh rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.07, 0.28, 0.07]} /><meshToonMaterial color="#111111" />
        </mesh>
      </group>
    </group>
  );
}

export function KiraModel({ scale = 1, groupRef, tailRef, legs }: DogModelProps) {
  return (
    <group ref={groupRef} scale={scale}>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.5, 0.32, 0.3]} /><meshToonMaterial color="#c8a050" />
      </mesh>
      <mesh position={[0.32, 0.43, 0]}>
        <boxGeometry args={[0.32, 0.32, 0.3]} /><meshToonMaterial color="#c8a050" />
      </mesh>
      <mesh position={[0.32, 0.62, 0]}>
        <boxGeometry args={[0.3, 0.12, 0.28]} /><meshToonMaterial color="#d4b860" />
      </mesh>
      <mesh position={[0.5, 0.37, 0]}>
        <boxGeometry args={[0.14, 0.14, 0.18]} /><meshToonMaterial color="#b89048" />
      </mesh>
      <mesh position={[0.57, 0.4, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.06]} /><meshToonMaterial color="#2a1a0a" />
      </mesh>
      <mesh position={[0.27, 0.44, 0.18]} rotation={[0.5, 0, 0.25]}>
        <boxGeometry args={[0.12, 0.22, 0.09]} /><meshToonMaterial color="#b89040" />
      </mesh>
      <mesh position={[0.27, 0.44, -0.18]} rotation={[-0.5, 0, -0.25]}>
        <boxGeometry args={[0.12, 0.22, 0.09]} /><meshToonMaterial color="#b89040" />
      </mesh>
      <mesh ref={legs?.fl} position={[0.16, 0.07, 0.1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} /><meshToonMaterial color="#c8a050" />
      </mesh>
      <mesh ref={legs?.fr} position={[0.16, 0.07, -0.1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} /><meshToonMaterial color="#c8a050" />
      </mesh>
      <mesh ref={legs?.bl} position={[-0.16, 0.07, 0.1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} /><meshToonMaterial color="#c8a050" />
      </mesh>
      <mesh ref={legs?.br} position={[-0.16, 0.07, -0.1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} /><meshToonMaterial color="#c8a050" />
      </mesh>
      <mesh position={[0.32, 0.3, 0]} rotation={[0, Math.PI/2, 0]}>
        <torusGeometry args={[0.12, 0.024, 6, 14]} /><meshToonMaterial color="#9c27b0" />
      </mesh>
      <mesh position={[0.32, 0.17, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.02]} /><meshToonMaterial color="#f4c430" />
      </mesh>
      <group ref={tailRef} position={[-0.28, 0.28, 0]}>
        <mesh rotation={[0, 0, 0.45]}>
          <boxGeometry args={[0.08, 0.24, 0.09]} /><meshToonMaterial color="#c8a050" />
        </mesh>
      </group>
    </group>
  );
}
