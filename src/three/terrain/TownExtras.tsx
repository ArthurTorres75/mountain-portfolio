"use client";

import { getToonGradientMap } from "@/lib/toonGradient";
import {
  cabinPositions,
  twoStoryCabinPositions,
  SUMMIT_CABIN,
  isNearRiver,
  isNearLake,
  isNearBridge,
  isOnPath,
  isNearParkedCar,
} from "./terrainData";

const ALL_CABINS = [...cabinPositions, ...twoStoryCabinPositions];

// A decoration spot is valid only when clear of water, paths, bridges, cars,
// and NOT overlapping any house (must sit fully outside every cabin footprint).
function isClearSpot(x: number, z: number): boolean {
  if (isNearRiver(x, z, 0.3)) return false;
  if (isNearLake(x, z, 0.4)) return false;
  if (isNearBridge(x, z, 0.3)) return false;
  if (isOnPath(x, z, 0.3)) return false;
  if (isNearParkedCar(x, z, 0.5)) return false;
  if (Math.hypot(x - SUMMIT_CABIN[0], z - SUMMIT_CABIN[1]) < 1.6) return false;
  if (ALL_CABINS.some(([cx, , cz]) => Math.hypot(x - cx, z - cz) < 1.5)) return false;
  return true;
}

type GradientMap = ReturnType<typeof getToonGradientMap>;
type Placement = [number, number, number, number, number]; // x,y,z,scale,rotationY

// ── Two-story house — door faces +Z locally (rotated by rotationY to face the road) ──
function TwoStoryCabin({
  x,
  z,
  scale,
  rotationY,
  windowGlow,
  gradientMap,
}: {
  x: number;
  z: number;
  scale: number;
  rotationY: number;
  windowGlow: number;
  gradientMap: GradientMap;
}) {
  return (
    <group position={[x, -0.72, z]} scale={scale} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[1.7, 0.14, 1.5]} />
        <meshToonMaterial color="#5c4a38" gradientMap={gradientMap} />
      </mesh>
      {/* First floor */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.55, 0.9, 1.35]} />
        <meshToonMaterial color="#8c6a44" gradientMap={gradientMap} />
      </mesh>
      {/* Divider band */}
      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[1.62, 0.08, 1.42]} />
        <meshToonMaterial color="#6b5040" gradientMap={gradientMap} />
      </mesh>
      {/* Second floor */}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[1.45, 0.88, 1.25]} />
        <meshToonMaterial color="#97744c" gradientMap={gradientMap} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 2.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.3, 0.8, 4]} />
        <meshToonMaterial color="#5a3c22" gradientMap={gradientMap} />
      </mesh>
      {/* Chimney */}
      <mesh position={[-0.45, 2.5, 0.3]}>
        <boxGeometry args={[0.16, 0.7, 0.16]} />
        <meshToonMaterial color="#6b5040" gradientMap={gradientMap} />
      </mesh>
      {/* Door — faces +Z (toward the road) */}
      <mesh position={[0, 0.36, 0.68]}>
        <boxGeometry args={[0.36, 0.56, 0.05]} />
        <meshToonMaterial color="#3e2a18" gradientMap={gradientMap} />
      </mesh>
      {/* First-floor window */}
      <mesh position={[0.5, 0.62, 0.68]}>
        <boxGeometry args={[0.32, 0.3, 0.04]} />
        <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={windowGlow} />
      </mesh>
      {/* Second-floor windows */}
      <mesh position={[-0.4, 1.55, 0.63]}>
        <boxGeometry args={[0.3, 0.32, 0.04]} />
        <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={windowGlow} />
      </mesh>
      <mesh position={[0.4, 1.55, 0.63]}>
        <boxGeometry args={[0.3, 0.32, 0.04]} />
        <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={windowGlow} />
      </mesh>
    </group>
  );
}

function SmallTree({ pos, gradientMap }: { pos: [number, number]; gradientMap: GradientMap }) {
  return (
    <group position={[pos[0], -0.72, pos[1]]}>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.5, 6]} />
        <meshToonMaterial color="#7a5c3a" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <coneGeometry args={[0.42, 0.7, 6]} />
        <meshToonMaterial color="#3a8a48" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <coneGeometry args={[0.3, 0.55, 6]} />
        <meshToonMaterial color="#4aa05a" gradientMap={gradientMap} />
      </mesh>
    </group>
  );
}

function Shrub({ pos, gradientMap }: { pos: [number, number]; gradientMap: GradientMap }) {
  return (
    <group position={[pos[0], -0.72, pos[1]]}>
      <mesh position={[0, 0.28, 0]}>
        <dodecahedronGeometry args={[0.34, 0]} />
        <meshToonMaterial color="#4f8255" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0.28, 0.18, -0.18]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshToonMaterial color="#5a9060" gradientMap={gradientMap} />
      </mesh>
    </group>
  );
}

// Small decorative tree + shrub placed at the first clear spots around a house
// (prefers behind/sides). Skips any spot that hits water, a path or a bridge.
function CabinDecor({
  placement,
  gradientMap,
}: {
  placement: Placement;
  gradientMap: GradientMap;
}) {
  const [x, , z, scale, rotationY] = placement;
  const bx = -Math.sin(rotationY); // "behind" the house (away from door/road)
  const bz = -Math.cos(rotationY);
  const px = Math.cos(rotationY); // sideways
  const pz = -Math.sin(rotationY);
  const s = scale;

  const candidates: [number, number][] = [
    [x + bx * 1.8 * s + px * 0.6 * s, z + bz * 1.8 * s + pz * 0.6 * s], // behind-left
    [x + bx * 1.8 * s - px * 0.6 * s, z + bz * 1.8 * s - pz * 0.6 * s], // behind-right
    [x + px * 1.9 * s, z + pz * 1.9 * s], // side A
    [x - px * 1.9 * s, z - pz * 1.9 * s], // side B
    [x + bx * 2.1 * s, z + bz * 2.1 * s], // far behind
  ];
  const clear = candidates.filter(([cx, cz]) => isClearSpot(cx, cz));

  return (
    <group>
      {clear[0] && <SmallTree pos={clear[0]} gradientMap={gradientMap} />}
      {clear[1] && <Shrub pos={clear[1]} gradientMap={gradientMap} />}
    </group>
  );
}

export default function TownExtras({ isDay = true }: { isDay?: boolean }) {
  const gradientMap = getToonGradientMap();
  const windowGlow = isDay ? 0.12 : 1.8;

  return (
    <group>
      {/* Two-story houses */}
      {twoStoryCabinPositions.map(([x, , z, scale, rotationY], i) => (
        <TwoStoryCabin
          key={`two-story-${i}`}
          x={x}
          z={z}
          scale={scale}
          rotationY={rotationY}
          windowGlow={windowGlow}
          gradientMap={gradientMap}
        />
      ))}

      {/* Decorative tree + shrub beside every house (one- and two-story) */}
      {[...cabinPositions, ...twoStoryCabinPositions].map((placement, i) => (
        <CabinDecor key={`decor-${i}`} placement={placement} gradientMap={gradientMap} />
      ))}
    </group>
  );
}
