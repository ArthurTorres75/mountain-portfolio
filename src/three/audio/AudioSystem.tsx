"use client";

// Spatial audio system:
//  • River  → real 3D distance (XZ + Y). Audible only when close to the water.
//  • Fire   → Z zone only (cabin/town area).
// M key toggles mute. Starts only after first canvas click (browser policy).

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { createRiverSound, createFireSound, createBarkSound, createBirdChirpSound, rampGain } from "./proceduralSounds";
import { RIVER_CORRIDOR } from "../terrain/terrainData";

const WATER_Y = -0.77;

// Dog park center — bark fades from full volume at ≤3 units to silent at ≥9 units
const DOG_PARK_X = -16.0;
const DOG_PARK_Z =  1.0;
function barkGainAt(camX: number, camZ: number): number {
  const dist = Math.hypot(camX - DOG_PARK_X, camZ - DOG_PARK_Z);
  return Math.max(0, Math.min(1, (9 - dist) / 6)) * 0.28;
}

// 3D distance to nearest river point. Full volume ≤1.5 units, silent ≥5 units.
function riverGainAt(camX: number, camY: number, camZ: number): number {
  const distXZ = Math.min(
    ...RIVER_CORRIDOR.map(([cx, cz]) => Math.hypot(camX - cx, camZ - cz)),
  );
  const dist3D = Math.hypot(distXZ, camY - WATER_Y);
  return Math.max(0, Math.min(1, (5 - dist3D) / 3.5)) * 0.32;
}

// Fire audible only near cabins and town (Z = -9 to +6)
// Fire only near cabins (Z -9 to -3). Town and lake area stay silent.
const FIRE_ZONES = [
  { maxZ:  -9, fire: 0.00 },
  { maxZ:  -3, fire: 0.10 },
  { maxZ: Infinity, fire: 0.00 },
] as const;

function detectFireZone(camZ: number) {
  return FIRE_ZONES.find((z) => camZ <= z.maxZ) ?? FIRE_ZONES[FIRE_ZONES.length - 1];
}

export default function AudioSystem({ isDay = true }: { isDay?: boolean }) {
  const { gl, camera } = useThree();
  const ctxRef      = useRef<AudioContext | null>(null);
  const riverRef    = useRef<ReturnType<typeof createRiverSound>      | null>(null);
  const fireRef     = useRef<ReturnType<typeof createFireSound>       | null>(null);
  const barkRef     = useRef<ReturnType<typeof createBarkSound>       | null>(null);
  const birdRef     = useRef<ReturnType<typeof createBirdChirpSound>  | null>(null);
  const mutedRef    = useRef(false);
  const fireZoneKey = useRef("");

  useEffect(() => {
    const start = () => {
      if (ctxRef.current) return;
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      riverRef.current = createRiverSound(ctx, 0.0);
      fireRef.current  = createFireSound(ctx, 0.0);
      barkRef.current  = createBarkSound(ctx, 0.0);
      birdRef.current  = createBirdChirpSound(ctx, 0.0);
    };
    gl.domElement.addEventListener("click", start, { once: true });
    return () => gl.domElement.removeEventListener("click", start);
  }, [gl]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "KeyM" || !ctxRef.current) return;
      mutedRef.current = !mutedRef.current;
      fireZoneKey.current = "";
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      riverRef.current?.stop();
      fireRef.current?.stop();
      barkRef.current?.stop();
      birdRef.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  useFrame(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const mute = mutedRef.current;
    const { x, y, z } = camera.position;

    // River: 3D proximity, smooth ramp every frame
    if (riverRef.current) {
      const target = mute ? 0 : riverGainAt(x, y, z);
      riverRef.current.gainNode.gain.setTargetAtTime(target, ctx.currentTime, 0.15);
    }

    // Bark: proximity to dog park — silent at night (no people/dogs outside)
    if (barkRef.current) {
      const target = (mute || !isDay) ? 0 : barkGainAt(x, z);
      barkRef.current.gainNode.gain.setTargetAtTime(target, ctx.currentTime, 2.0);
    }

    // Birds: day-only ambient chirps — fade out slowly at night
    if (birdRef.current) {
      const target = (mute || !isDay) ? 0 : 0.15;
      birdRef.current.gainNode.gain.setTargetAtTime(target, ctx.currentTime, 3.0);
    }

    // Fire: zone boundary only
    const fireZone = detectFireZone(z);
    const key = mute ? "__muted__" : String(fireZone.maxZ);
    if (key !== fireZoneKey.current) {
      fireZoneKey.current = key;
      if (fireRef.current) rampGain(fireRef.current.gainNode, mute ? 0 : fireZone.fire);
    }
  });

  return null;
}
