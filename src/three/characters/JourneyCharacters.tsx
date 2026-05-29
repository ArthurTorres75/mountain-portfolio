"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { getTerrainHeightAt } from "@/lib";
import { Character, LaikaModel, KiraModel } from "./CharacterModels";

// ── Path helpers ──────────────────────────────────────────────────────────────
// Park: CX=-16, CZ=1, HW=7, HL=6. Equipment rows at z≈4.5 and z≈-2.
// Runners stay in the CENTRAL clear band (z -0.5..3.3, x -12.5..-19.5),
// clear of equipment, benches (fence), trees (fence gaps) and visitors.
const ARTHUR_PATH: [number, number, number][] = [
  [-12.5,-0.72,  0.5], [-12.5,-0.72,  3.0], [-16.0,-0.72,  3.3],
  [-19.5,-0.72,  3.0], [-19.5,-0.72,  0.5], [-16.0,-0.72, -0.3],
];
const MARIA_PATH: [number, number, number][] = [
  [-13.0,-0.72,  0.8], [-13.0,-0.72,  2.6], [-16.0,-0.72,  2.9],
  [-19.0,-0.72,  2.6], [-19.0,-0.72,  0.8], [-16.0,-0.72,  0.0],
];
// Dogs run wider zigzags within the same central band
const LAIKA_PATH: [number, number, number][] = [
  [-12.5,-0.72,  1.5], [-14.0,-0.72,  3.2], [-16.0,-0.72,  3.3],
  [-18.0,-0.72,  3.2], [-19.5,-0.72,  1.5], [-18.0,-0.72, -0.4],
  [-16.0,-0.72, -0.5], [-14.0,-0.72, -0.4],
];
const KIRA_PATH: [number, number, number][] = [
  [-14.0,-0.72,  1.0], [-15.0,-0.72,  2.5], [-16.0,-0.72,  2.7],
  [-17.0,-0.72,  2.5], [-18.0,-0.72,  1.0], [-17.0,-0.72, -0.2],
  [-16.0,-0.72, -0.3], [-15.0,-0.72, -0.2],
];

function usePathFollow(path: [number,number,number][], speed: number, startProgress = 0) {
  const segRef     = useRef(0);
  const progressRef = useRef(startProgress);
  return (delta: number) => {
    progressRef.current += delta * speed;
    if (progressRef.current >= 1) {
      progressRef.current = 0;
      segRef.current = (segRef.current + 1) % path.length;
    }
    const from = path[segRef.current];
    const to   = path[(segRef.current + 1) % path.length];
    const p    = progressRef.current;
    return {
      x: from[0] + (to[0] - from[0]) * p,
      y: from[1] + (to[1] - from[1]) * p,
      z: from[2] + (to[2] - from[2]) * p,
      dx: to[0] - from[0],
      dz: to[2] - from[2],
    };
  };
}

export default function JourneyCharacters({ isDay = true }: { isDay?: boolean }) {
  // Character group refs
  const arthurRef = useRef<Group>(null);
  const wifeRef   = useRef<Group>(null);
  const laikaRef  = useRef<Group>(null);
  const kiraRef   = useRef<Group>(null);
  // Limb refs — Arthur
  const aLegL = useRef<Mesh>(null), aLegR = useRef<Mesh>(null);
  const aArmL = useRef<Mesh>(null), aArmR = useRef<Mesh>(null);
  // Limb refs — Maria
  const mLegL = useRef<Mesh>(null), mLegR = useRef<Mesh>(null);
  const mArmL = useRef<Mesh>(null), mArmR = useRef<Mesh>(null);
  // Dog tail refs
  const laikaTailRef = useRef<Group>(null);
  const kiraTailRef  = useRef<Group>(null);
  // Dog leg refs
  const laikaLegs = { fl: useRef<Mesh>(null), fr: useRef<Mesh>(null), bl: useRef<Mesh>(null), br: useRef<Mesh>(null) };
  const kiraLegs  = { fl: useRef<Mesh>(null), fr: useRef<Mesh>(null), bl: useRef<Mesh>(null), br: useRef<Mesh>(null) };

  // Path followers (speed = segments/sec)
  const arthurFollow = usePathFollow(ARTHUR_PATH, 0.55, 0.0);
  const mariaFollow  = usePathFollow(MARIA_PATH,  0.50, 0.3);
  const laikaFollow  = usePathFollow(LAIKA_PATH,  1.20, 0.0);
  const kiraFollow   = usePathFollow(KIRA_PATH,   1.50, 0.5);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // ── Arthur ──────────────────────────────────────────────────────────
    const a = arthurFollow(delta);
    if (arthurRef.current) {
      arthurRef.current.position.set(a.x, getTerrainHeightAt(a.x, a.z) + Math.abs(Math.sin(t * 8)) * 0.06, a.z);
      if (Math.abs(a.dx) + Math.abs(a.dz) > 0.001) arthurRef.current.rotation.y = Math.atan2(a.dx, a.dz);
      arthurRef.current.rotation.x = -0.10;
    }
    const aSwing = Math.sin(t * 8) * 0.5;
    if (aLegL.current) aLegL.current.rotation.x =  aSwing;
    if (aLegR.current) aLegR.current.rotation.x = -aSwing;
    if (aArmL.current) aArmL.current.rotation.x = -aSwing * 0.6;
    if (aArmR.current) aArmR.current.rotation.x =  aSwing * 0.6;

    // ── Maria ───────────────────────────────────────────────────────────
    const m = mariaFollow(delta);
    if (wifeRef.current) {
      wifeRef.current.position.set(m.x, getTerrainHeightAt(m.x, m.z) + Math.abs(Math.sin(t * 8 + 0.5)) * 0.06, m.z);
      if (Math.abs(m.dx) + Math.abs(m.dz) > 0.001) wifeRef.current.rotation.y = Math.atan2(m.dx, m.dz);
      wifeRef.current.rotation.x = -0.08;
    }
    const mSwing = Math.sin(t * 8 + 0.5) * 0.5;
    if (mLegL.current) mLegL.current.rotation.x =  mSwing;
    if (mLegR.current) mLegR.current.rotation.x = -mSwing;
    if (mArmL.current) mArmL.current.rotation.x = -mSwing * 0.6;
    if (mArmR.current) mArmR.current.rotation.x =  mSwing * 0.6;

    // ── Laika — dog gallop (diagonal pairs) ─────────────────────────────
    const l = laikaFollow(delta);
    if (laikaRef.current) {
      laikaRef.current.position.set(l.x, getTerrainHeightAt(l.x, l.z) + 0.04 + Math.abs(Math.sin(t * 14)) * 0.10, l.z);
      if (Math.abs(l.dx) + Math.abs(l.dz) > 0.001) laikaRef.current.rotation.y = Math.atan2(l.dx, l.dz) - Math.PI / 2;
    }
    const lGallop = Math.sin(t * 14) * 0.55;
    if (laikaLegs.fl.current) laikaLegs.fl.current.rotation.x =  lGallop;
    if (laikaLegs.br.current) laikaLegs.br.current.rotation.x =  lGallop;
    if (laikaLegs.fr.current) laikaLegs.fr.current.rotation.x = -lGallop;
    if (laikaLegs.bl.current) laikaLegs.bl.current.rotation.x = -lGallop;
    if (laikaTailRef.current) laikaTailRef.current.rotation.z = 0.5 + Math.sin(t * 14) * 0.7;

    // ── Kira — excited smaller gallop ───────────────────────────────────
    const k = kiraFollow(delta);
    if (kiraRef.current) {
      kiraRef.current.position.set(k.x, getTerrainHeightAt(k.x, k.z) + 0.04 + Math.abs(Math.sin(t * 16 + 1)) * 0.12, k.z);
      if (Math.abs(k.dx) + Math.abs(k.dz) > 0.001) kiraRef.current.rotation.y = Math.atan2(k.dx, k.dz) - Math.PI / 2;
    }
    const kGallop = Math.sin(t * 16 + 1) * 0.55;
    if (kiraLegs.fl.current) kiraLegs.fl.current.rotation.x =  kGallop;
    if (kiraLegs.br.current) kiraLegs.br.current.rotation.x =  kGallop;
    if (kiraLegs.fr.current) kiraLegs.fr.current.rotation.x = -kGallop;
    if (kiraLegs.bl.current) kiraLegs.bl.current.rotation.x = -kGallop;
    if (kiraTailRef.current) kiraTailRef.current.rotation.z = 0.45 + Math.sin(t * 18) * 0.75;
  });

  if (!isDay) return null;

  return (
    <group>
      <Character
        position={[-12.5, -0.72, 0.5]}
        bodyColor="#38342e" shirtColor="#f0ece6" skinColor="#bf8a5e" hairColor="#1a1008"
        scale={0.72} groupRef={arthurRef}
        limbs={{ legL: aLegL, legR: aLegR, armL: aArmL, armR: aArmR }}
      />
      <Character
        position={[-13.0, -0.72, 0.8]}
        bodyColor="#c0a07a" shirtColor="#1c1c1c" skinColor="#c49070" hairColor="#0c0906"
        longHair necklace scale={0.70} groupRef={wifeRef}
        limbs={{ legL: mLegL, legR: mLegR, armL: mArmL, armR: mArmR }}
      />
      <LaikaModel groupRef={laikaRef} tailRef={laikaTailRef} legs={laikaLegs} scale={0.85} />
      <KiraModel  groupRef={kiraRef}  tailRef={kiraTailRef}  legs={kiraLegs}  scale={0.72} />
    </group>
  );
}
