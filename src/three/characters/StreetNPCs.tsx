"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { ensurePedSlot } from "./trafficRegistry";
import { isNearCabin } from "../terrain/terrainData";

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
  // Main N-S road — east sidewalk (x=2.3), gap between the roadside houses
  { from: [2.3, -0.72, 3.6], to: [2.3, -0.72, 11.5], speed: 0.80, body: "#2a4a8a", shirt: "#e8d8c0", skin: "#c4906a", hair: "#1a0a0a", initialProgress: 0.1 },
  // Main N-S road — west sidewalk (x=-2.3), gap between houses (z=-3.5..-8)
  { from: [-2.3, -0.72, -3.5], to: [-2.3, -0.72, -8.0], speed: 0.60, body: "#4a3a2a", shirt: "#8a3a2a", skin: "#d4a07a", hair: "#3a2a1a", initialProgress: 0.5 },
  // Cross street z=5 — south sidewalk (z=3.4), clear of the x=±5 houses
  { from: [-3.8, -0.72, 3.4], to: [3.8, -0.72, 3.4],  speed: 0.70, body: "#3a5a3a", shirt: "#c8b090", skin: "#b87850", hair: "#0a0a0a", initialProgress: 0.3 },
  // Cross street z=10 — north sidewalk (z=11.6), clear of the x=±5.5 houses
  { from: [-3.8, -0.72, 11.6],to: [3.8, -0.72, 11.6], speed: 0.90, body: "#6a4a3a", shirt: "#d4c4a0", skin: "#bf8a5e", hair: "#1a1008", initialProgress: 0.7 },
  // East branch road x=7.5 — east sidewalk (x=8.7), below the z=12 houses
  { from: [8.7, -0.72, 6.0],  to: [8.7, -0.72, 10.5], speed: 0.65, body: "#3a3a5a", shirt: "#f0e8d0", skin: "#c8a07a", hair: "#4a2a0a", initialProgress: 0.2 },
  // West branch road x=-7.5 — west sidewalk (x=-8.7), below the z=12 houses
  { from: [-8.7, -0.72, 6.0], to: [-8.7, -0.72, 10.5], speed: 0.75, body: "#5a3a3a", shirt: "#a0c0a0", skin: "#d4a888", hair: "#0a0808", initialProgress: 0.8 },
  // Far lake tourist promenade — access from street to lake loop
  { from: [10.5, -0.72, -16.3], to: [13.1, -0.72, -15.7], speed: 0.62, body: "#3b4a63", shirt: "#d6c7a8", skin: "#c99670", hair: "#24130b", initialProgress: 0.4 },
  // Far lake tourist promenade — segment around the lake edge
  { from: [16.3, -0.72, -14.0], to: [16.3, -0.72, -16.1], speed: 0.52, body: "#4d3d2f", shirt: "#9ab6cf", skin: "#d7ae88", hair: "#1a120c", initialProgress: 0.7 },
  // East-lake mirador — strollers on the boardwalk and deck (y on the deck surface)
  { from: [8.6, -0.55, -1.2], to: [13.5, -0.55, -1.2], speed: 0.50, body: "#3a4a6a", shirt: "#e0d2b0", skin: "#c89070", hair: "#201008", initialProgress: 0.15 },
  { from: [12.5, -0.55, -2.2], to: [12.5, -0.55, 0.0], speed: 0.42, body: "#5a3a3a", shirt: "#a8c0c8", skin: "#d4a888", hair: "#100a08", initialProgress: 0.6 },
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
    // Compute the candidate next position, clamping/bouncing at path ends
    let np = progressRef.current + delta * def.speed * dirRef.current * 0.1;
    if (np >= 1) { np = 1; dirRef.current = -1; }
    if (np <= 0) { np = 0; dirRef.current = 1; }

    const cx = def.from[0] + (def.to[0] - def.from[0]) * np;
    const cz = def.from[2] + (def.to[2] - def.from[2]) * np;

    // Never walk into a house — turn around before entering a cabin footprint
    if (isNearCabin(cx, cz, 0)) {
      dirRef.current = -dirRef.current;
    } else {
      progressRef.current = np;
    }

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
