"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Sky, useProgress } from "@react-three/drei";

import CameraController from "@/three/CameraController";
import JourneyCharacters from "@/three/characters/JourneyCharacters";
import GuidanceEffects from "@/three/lighting/GuidanceEffects";
import { SanctuaryLight } from "@/three/lighting";
import MountainTerrain from "@/three/terrain/MountainTerrain";
import CloudLayer from "@/three/terrain/CloudLayer";
import AnimatedWater from "@/three/terrain/AnimatedWater";
import BirdFlock from "@/three/atmosphere/BirdFlock";
import type { WorldLocation } from "@/types";

import AudioSystem from "@/three/audio/AudioSystem";
import LocationMarkers from "./LocationMarkers";
import PostProcessing from "./PostProcessing";

// Tracks Three.js asset loading (mainly Environment HDR) and enforces a
// minimum display time so the loader always feels intentional.
function ProgressTracker({ onReady }: { onReady?: () => void }) {
  const { active } = useProgress();
  const firedRef   = useRef(false);
  const timerDone  = useRef(false);
  const sceneDone  = useRef(false);

  const tryFire = () => {
    if (!firedRef.current && timerDone.current && sceneDone.current) {
      firedRef.current = true;
      onReady?.();
    }
  };

  // Minimum 2 s so the loader looks intentional
  useEffect(() => {
    const t = setTimeout(() => { timerDone.current = true; tryFire(); }, 2000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fire when assets finish loading (active → false)
  useEffect(() => {
    if (!active) { sceneDone.current = true; tryFire(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return null;
}

interface SceneManagerProps {
  locations: WorldLocation[];
  onEnterLocation: (locationId: string) => void;
  onNearestLocationChange: (locationId: string | null) => void;
  selectedLocationId: string;
  sanctuaryActivated?: boolean;
  onReady?: () => void;
}

export default function SceneManager({
  locations,
  onEnterLocation,
  onNearestLocationChange,
  selectedLocationId,
  sanctuaryActivated = false,
  onReady,
}: SceneManagerProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const [first] = args;
      if (typeof first === "string" && first.includes("THREE.Clock: This module has been deprecated.")) return;
      originalWarn(...args);
    };
    return () => { console.warn = originalWarn; };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 12, 10], fov: 60 }}
      dpr={1}
      shadows={false}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        {/* Dynamic sky — dawn golden hour, sun near eastern horizon */}
        <Sky distance={450000} sunPosition={[1, 0.12, 0]} />
        {/* Fog matches the warm dawn horizon of the Sky shader */}
        <fog attach="fog" args={["#c8a06a", 28, 55]} />

        {/* Toon-friendly lighting */}
        <ambientLight intensity={0.75} color="#ffecd4" />
        <hemisphereLight intensity={0.55} color="#ffe4a0" groundColor="#4a7c59" />
        <directionalLight position={[8, 12, 5]} intensity={1.4} color="#fff4d4" castShadow={false} />
        <SanctuaryLight intensity={0.9} />

        <Environment preset="sunset" />
        <CloudLayer />
        <BirdFlock />
        <GuidanceEffects sanctuaryActivated={sanctuaryActivated} />
        <MountainTerrain />
        <AnimatedWater />
        <JourneyCharacters />
        <LocationMarkers locations={locations} onEnterLocation={onEnterLocation} />
        <CameraController
          locations={locations}
          onEnterLocation={onEnterLocation}
          onNearestLocationChange={onNearestLocationChange}
          focusLocationId={selectedLocationId}
        />
        <AudioSystem />
        <PostProcessing />
        <ProgressTracker onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
