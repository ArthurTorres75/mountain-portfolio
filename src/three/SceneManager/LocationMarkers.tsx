"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type * as THREE from "three";

interface LocationMarker {
  id: string;
  label: string;
  worldPosition: [number, number, number];
}

interface LocationMarkersProps {
  locations: LocationMarker[];
  onEnterLocation: (locationId: string) => void;
}

interface MarkerGroupProps {
  location: LocationMarker;
  onEnterLocation: (locationId: string) => void;
}

function MarkerGroup({ location, onEnterLocation }: MarkerGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
    groupRef.current.scale.setScalar(pulse);
  });

  function handleClick(event: { stopPropagation: () => void }) {
    event.stopPropagation();
    onEnterLocation(location.id);
  }

  return (
    <group position={location.worldPosition}>
      <group ref={groupRef}>
        <mesh onClick={handleClick}>
          <sphereGeometry args={[0.24, 18, 18]} />
          <meshStandardMaterial
            color="#F5C842"
            emissive="#F5C842"
            emissiveIntensity={0.45}
          />
        </mesh>

        <mesh position={[0, -0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.48, 24]} />
          <meshBasicMaterial color="#FFE9A0" transparent opacity={0.85} />
        </mesh>
      </group>

      <Html position={[0, 0.72, 0]} center distanceFactor={10}>
        <span
          style={{
            color: "#fff4d2",
            fontSize: "1rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            textShadow:
              "-1px -1px 0 #251f13, 1px -1px 0 #251f13, -1px 1px 0 #251f13, 1px 1px 0 #251f13",
          }}
        >
          {location.label}
        </span>
      </Html>
    </group>
  );
}

export default function LocationMarkers({
  locations,
  onEnterLocation,
}: LocationMarkersProps) {
  return (
    <group>
      {locations.map((location) => (
        <MarkerGroup
          key={location.id}
          location={location}
          onEnterLocation={onEnterLocation}
        />
      ))}
    </group>
  );
}
