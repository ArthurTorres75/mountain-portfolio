"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Sky } from "@react-three/drei";

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

interface SceneManagerProps {
  locations: WorldLocation[];
  onEnterLocation: (locationId: string) => void;
  onNearestLocationChange: (locationId: string | null) => void;
  selectedLocationId: string;
  sanctuaryActivated?: boolean;
}

export default function SceneManager({
  locations,
  onEnterLocation,
  onNearestLocationChange,
  selectedLocationId,
  sanctuaryActivated = false,
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
      dpr={[1, 1.5]}
      shadows={false}
      gl={{ antialias: true, alpha: false }}
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
      </Suspense>
    </Canvas>
  );
}
