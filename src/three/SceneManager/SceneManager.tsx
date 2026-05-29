"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useProgress } from "@react-three/drei";

import CameraController from "@/three/CameraController";
import JourneyCharacters from "@/three/characters/JourneyCharacters";
import StreetNPCs from "@/three/characters/StreetNPCs";
import StreetCars from "@/three/characters/StreetCars";
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
import DayNightController from "./DayNightController";

function ProgressTracker({ onReady }: { onReady?: () => void }) {
  const { active } = useProgress();
  const firedRef  = useRef(false);
  const timerDone = useRef(false);
  const sceneDone = useRef(false);

  const tryFire = () => {
    if (!firedRef.current && timerDone.current && sceneDone.current) {
      firedRef.current = true;
      onReady?.();
    }
  };

  useEffect(() => {
    const t = setTimeout(() => { timerDone.current = true; tryFire(); }, 2000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const [isDay, setIsDay] = useState(true);

  const handleDayChange = useCallback((day: boolean) => {
    setIsDay(day);
  }, []);

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
        {/* Fog — color/range animated by DayNightController */}
        <fog attach="fog" args={["#c8a06a", 28, 55]} />

        {/* Day/night cycle — manages Sky, sun/moon lights, fog color */}
        <DayNightController onDayChange={handleDayChange} />

        <SanctuaryLight intensity={0.9} />
        <Environment preset="sunset" />
        <CloudLayer />
        <BirdFlock />
        <GuidanceEffects sanctuaryActivated={sanctuaryActivated} />
        <MountainTerrain isDay={isDay} />
        <AnimatedWater />

        {/* Characters hidden at night; street NPCs always walk */}
        <JourneyCharacters isDay={isDay} />
        <StreetNPCs isDay={isDay} />
        <StreetCars isDay={isDay} />

        <LocationMarkers locations={locations} onEnterLocation={onEnterLocation} />
        <CameraController
          locations={locations}
          onEnterLocation={onEnterLocation}
          onNearestLocationChange={onNearestLocationChange}
          focusLocationId={selectedLocationId}
        />
        <AudioSystem isDay={isDay} />
        <PostProcessing />
        <ProgressTracker onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
