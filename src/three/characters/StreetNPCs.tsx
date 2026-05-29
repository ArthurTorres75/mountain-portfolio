"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { ensurePedSlot } from "./trafficRegistry";

// Each NPC walks back and forth between two waypoints
interface NPCDef {
  from: [number, number, number];
  to:   [number, number, number];
  speed: number;
  body:  string;
  shirt: string;
  skin:  string;
  hair:  string;
  initialProgress?: number;
}

// Sidewalks: just outside each road edge (main road edge x=±1.6, cross edge z±1.1)
const NPCS: NPCDef[] = [
  // Main N-S road — east sidewalk (x=2.3, clear of car lane x=1)
  { from: [2.3, -0.72, 1],    to: [2.3, -0.72, 12],   speed: 0.80, body: "#2a4a8a", shirt: "#e8d8c0", skin: "#c4906a", hair: "#1a0a0a", initialProgress: 0.1 },
  // Main N-S road — west sidewalk (x=-2.3)
  { from: [-2.3, -0.72, -1],  to: [-2.3, -0.72, -12], speed: 0.60, body: "#4a3a2a", shirt: "#8a3a2a", skin: "#d4a07a", hair: "#3a2a1a", initialProgress: 0.5 },
  // Cross street z=5 — south sidewalk (z=3.4, clear of car lane z=4.5)
  { from: [-5.5, -0.72, 3.4], to: [5.5, -0.72, 3.4],  speed: 0.70, body: "#3a5a3a", shirt: "#c8b090", skin: "#b87850", hair: "#0a0a0a", initialProgress: 0.3 },
  // Cross street z=10 — north sidewalk (z=11.6)
  { from: [-4.5, -0.72, 11.6],to: [4.5, -0.72, 11.6], speed: 0.90, body: "#6a4a3a", shirt: "#d4c4a0", skin: "#bf8a5e", hair: "#1a1008", initialProgress: 0.7 },
  // East branch road x=7.5 — east sidewalk (x=8.7)
  { from: [8.7, -0.72, 7],    to: [8.7, -0.72, 14],   speed: 0.65, body: "#3a3a5a", shirt: "#f0e8d0", skin: "#c8a07a", hair: "#4a2a0a", initialProgress: 0.2 },
  // West branch road x=-7.5 — west sidewalk (x=-8.7)
  { from: [-8.7, -0.72, 7],   to: [-8.7, -0.72, 14],  speed: 0.75, body: "#5a3a3a", shirt: "#a0c0a0", skin: "#d4a888", hair: "#0a0808", initialProgress: 0.8 },
];

function NPCCharacter({
  def,
  slot,
}: {
  def: NPCDef;
  slot: number;
}) {
  const groupRef  = useRef<Group>(null);
  const legLRef   = useRef<Mesh>(null);
  const legRRef   = useRef<Mesh>(null);
  const armLRef   = useRef<Mesh>(null);
  const armRRef   = useRef<Mesh>(null);
  const progressRef = useRef(def.initialProgress ?? 0);
  const dirRef      = useRef(1); // 1 = from→to, -1 = to→from

  // Mark this pedestrian inactive when hidden/unmounted so cars don't brake for a ghost
  useEffect(() => {
    ensurePedSlot(slot).active = true;
    return () => { ensurePedSlot(slot).active = false; };
  }, [slot]);

  useFrame((_, delta) => {
    progressRef.current += delta * def.speed * dirRef.current * 0.1;

    if (progressRef.current >= 1) { progressRef.current = 1; dirRef.current = -1; }
    if (progressRef.current <= 0) { progressRef.current = 0; dirRef.current =  1; }

    const p = progressRef.current;
    const x = def.from[0] + (def.to[0] - def.from[0]) * p;
    const z = def.from[2] + (def.to[2] - def.from[2]) * p;
    const y = def.from[1] + Math.abs(Math.sin(p * Math.PI * 14)) * 0.025;

    // Publish live position for car yield logic
    const slotRef = ensurePedSlot(slot);
    slotRef.x = x;
    slotRef.z = z;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);

      // Face direction of travel
      const dx = (def.to[0] - def.from[0]) * dirRef.current;
      const dz = (def.to[2] - def.from[2]) * dirRef.current;
      if (Math.abs(dx) + Math.abs(dz) > 0.001) {
        groupRef.current.rotation.y = Math.atan2(dx, dz);
      }
    }

    // Leg & arm swing — opposite phase
    const swing = Math.sin(p * Math.PI * 28) * 0.4;
    if (legLRef.current) legLRef.current.rotation.x =  swing;
    if (legRRef.current) legRRef.current.rotation.x = -swing;
    if (armLRef.current) armLRef.current.rotation.x = -swing * 0.6;
    if (armRRef.current) armRRef.current.rotation.x =  swing * 0.6;
  });

  return (
    <group ref={groupRef} position={def.from} scale={0.70}>
      {/* Legs */}
      <mesh ref={legLRef} position={[-0.1, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.44, 0.18]} />
        <meshToonMaterial color={def.body} />
      </mesh>
      <mesh ref={legRRef} position={[0.1, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.44, 0.18]} />
        <meshToonMaterial color={def.body} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.42, 0.5, 0.28]} />
        <meshToonMaterial color={def.shirt} />
      </mesh>
      {/* Arms */}
      <mesh ref={armLRef} position={[-0.3, 0.7, 0]}>
        <boxGeometry args={[0.15, 0.42, 0.18]} />
        <meshToonMaterial color={def.skin} />
      </mesh>
      <mesh ref={armRRef} position={[0.3, 0.7, 0]}>
        <boxGeometry args={[0.15, 0.42, 0.18]} />
        <meshToonMaterial color={def.skin} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.34, 0.34, 0.3]} />
        <meshToonMaterial color={def.skin} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.3, -0.01]}>
        <boxGeometry args={[0.36, 0.13, 0.32]} />
        <meshToonMaterial color={def.hair} />
      </mesh>
    </group>
  );
}

export default function StreetNPCs({ isDay = true }: { isDay?: boolean }) {
  if (!isDay) return null;

  return (
    <group>
      {NPCS.map((def, i) => (
        <NPCCharacter key={`npc-${i}`} def={def} slot={i} />
      ))}
    </group>
  );
}
