"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AtmosphereParallax from "@/components/AtmosphereParallax";
import MobileScene from "@/components/MobileScene";
import type { WorldLocation } from "@/types";

const SceneManager = dynamic(() => import("@/three/SceneManager"), {
  ssr: false,
});

interface SceneViewportProps {
  locations: WorldLocation[];
  onEnterLocation: (locationId: string) => void;
  onNearestLocationChange: (locationId: string | null) => void;
  selectedLocationId: string;
  sanctuaryActivated?: boolean;
  onReady?: () => void;
}

export default function SceneViewport({
  locations,
  onEnterLocation,
  onNearestLocationChange,
  selectedLocationId,
  sanctuaryActivated = false,
  onReady,
}: SceneViewportProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setIsMobile(media.matches);
    };

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  // On mobile we skip the 3D scene → fire onReady ourselves after a brief delay
  // so the loader can finish instead of getting stuck at 92%.
  useEffect(() => {
    if (!isMobile || !onReady) return;
    const t = setTimeout(() => onReady(), 1200);
    return () => clearTimeout(t);
  }, [isMobile, onReady]);

  return (
    <div className="fixed inset-0 z-0">
      {isMobile ? (
        // Pure-CSS animated scene — no Three.js, no GSAP, no Canvas
        <MobileScene />
      ) : (
        <>
          <AtmosphereParallax />
          <SceneManager
            locations={locations}
            onEnterLocation={onEnterLocation}
            onNearestLocationChange={onNearestLocationChange}
            selectedLocationId={selectedLocationId}
            sanctuaryActivated={sanctuaryActivated}
            onReady={onReady}
          />
        </>
      )}
    </div>
  );
}
