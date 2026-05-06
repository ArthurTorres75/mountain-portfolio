"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AtmosphereParallax from "@/components/AtmosphereParallax";
import type { WorldLocation } from "@/types";

const SceneManager = dynamic(() => import("@/three/SceneManager"), {
  ssr: false,
});

interface SceneViewportProps {
  locations: WorldLocation[];
  onEnterLocation: (locationId: string) => void;
  onNearestLocationChange: (locationId: string | null) => void;
  selectedLocationId: string;
}

export default function SceneViewport({
  locations,
  onEnterLocation,
  onNearestLocationChange,
  selectedLocationId,
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

  return (
    <div className="fixed inset-0 z-0">
      <AtmosphereParallax />
      {isMobile ? (
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_25%,rgba(245,200,66,0.25),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(255,196,80,0.18),transparent_40%),linear-gradient(180deg,#1a2e4a_0%,#1e3a5a_45%,#2a4a6a_100%)]" />
      ) : (
        <SceneManager
          locations={locations}
          onEnterLocation={onEnterLocation}
          onNearestLocationChange={onNearestLocationChange}
          selectedLocationId={selectedLocationId}
        />
      )}
    </div>
  );
}
