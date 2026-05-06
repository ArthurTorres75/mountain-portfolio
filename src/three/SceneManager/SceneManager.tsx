"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import CameraController from "@/three/CameraController";
import JourneyCharacters from "@/three/characters/JourneyCharacters";
import GuidanceEffects from "@/three/lighting/GuidanceEffects";
import { SanctuaryLight } from "@/three/lighting";
import MountainTerrain from "@/three/terrain/MountainTerrain";
import type { WorldLocation } from "@/types";

import LocationMarkers from "./LocationMarkers";

interface SceneManagerProps {
  locations: WorldLocation[];
  onEnterLocation: (locationId: string) => void;
  onNearestLocationChange: (locationId: string | null) => void;
  selectedLocationId: string;
}

export default function SceneManager({
  locations,
  onEnterLocation,
  onNearestLocationChange,
  selectedLocationId,
}: SceneManagerProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const [firstArg] = args;
      if (
        typeof firstArg === "string" &&
        firstArg.includes("THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.")
      ) {
        return;
      }

      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 2.5, 8], fov: 52 }}
      dpr={[1, 1.5]}
      shadows={false}
      gl={{ antialias: true, alpha: false }}
    >
      <Suspense fallback={null}>
        {/* Warm dawn sky — deep teal-blue horizon */}
        <color attach="background" args={["#1a2e4a"]} />
        <fog attach="fog" args={["#2a4060", 18, 42]} />

        {/* Toon-friendly lighting: bright enough for flat colors to read clearly */}
        <ambientLight intensity={0.85} color="#d4e8f5" />
        <hemisphereLight intensity={0.6} color="#ffe4a0" groundColor="#4a7c59" />
        <directionalLight position={[8, 12, 5]} intensity={1.2} color="#fff4d4" />
        <SanctuaryLight intensity={0.9} />

        <Environment preset="sunset" />
        <GuidanceEffects />
        <MountainTerrain />
        <JourneyCharacters />
        <LocationMarkers locations={locations} onEnterLocation={onEnterLocation} />
        <CameraController
          locations={locations}
          onEnterLocation={onEnterLocation}
          onNearestLocationChange={onNearestLocationChange}
          focusLocationId={selectedLocationId}
        />
      </Suspense>
    </Canvas>
  );
}
