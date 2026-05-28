"use client";

import { getToonGradientMap } from "@/lib/toonGradient";

// Dog park enclosure — where Wife, Laika and Kira roam.
// Center: X=-3.0, Z=-5.5. Fenced 6×5 area, entry gap on east side.

const CX = -3.0;
const CZ = -5.5;
const BASE_Y = -0.72;

const WOOD = "#a87040";
const DARK_WOOD = "#7a5028";

// Flower positions [relX, relZ, color]
const FLOWERS: [number, number, string][] = [
  [-1.8, -1.6, "#f0a0c0"],
  [ 1.2, -1.8, "#f5c842"],
  [-0.6,  1.4, "#e8806a"],
  [ 2.0,  0.8, "#c0e060"],
  [-2.2,  0.4, "#f0a0c0"],
  [ 0.4, -2.0, "#f5c842"],
];

export default function DogPark() {
  const gradientMap = getToonGradientMap();

  return (
    <group position={[CX, BASE_Y, CZ]}>

      {/* ── Grass patch — slightly brighter than terrain ───────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[6.2, 5.2]} />
        <meshToonMaterial color="#5a9060" gradientMap={gradientMap} />
      </mesh>

      {/* ── Fence — north side (full, Z=-2.5) ─────────────────────── */}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fn-rail-${i}`} position={[0, y, -2.5]}>
          <boxGeometry args={[6.0, 0.05, 0.06]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      {[-2.6, -1.3, 0, 1.3, 2.6].map((x, i) => (
        <mesh key={`fn-post-${i}`} position={[x, 0.33, -2.5]}>
          <boxGeometry args={[0.07, 0.68, 0.07]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* ── Fence — south side (full, Z=+2.5) ─────────────────────── */}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fs-rail-${i}`} position={[0, y, 2.5]}>
          <boxGeometry args={[6.0, 0.05, 0.06]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      {[-2.6, -1.3, 0, 1.3, 2.6].map((x, i) => (
        <mesh key={`fs-post-${i}`} position={[x, 0.33, 2.5]}>
          <boxGeometry args={[0.07, 0.68, 0.07]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* ── Fence — west side (full, X=-3.0) ──────────────────────── */}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fw-rail-${i}`} position={[-3.0, y, 0]}>
          <boxGeometry args={[0.06, 0.05, 5.0]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      {[-2.0, -0.8, 0.5, 1.8].map((z, i) => (
        <mesh key={`fw-post-${i}`} position={[-3.0, 0.33, z]}>
          <boxGeometry args={[0.07, 0.68, 0.07]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* ── Fence — east side with entry gap (X=+3.0) ─────────────── */}
      {/* North half */}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fe-n-rail-${i}`} position={[3.0, y, -1.6]}>
          <boxGeometry args={[0.06, 0.05, 1.8]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      <mesh position={[3.0, 0.33, -2.0]}>
        <boxGeometry args={[0.07, 0.68, 0.07]} />
        <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
      </mesh>
      {/* South half */}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fe-s-rail-${i}`} position={[3.0, y, 1.6]}>
          <boxGeometry args={[0.06, 0.05, 1.8]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      <mesh position={[3.0, 0.33, 2.0]}>
        <boxGeometry args={[0.07, 0.68, 0.07]} />
        <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
      </mesh>

      {/* ── Bench — facing center ──────────────────────────────────── */}
      {([[-2.2, -1.8, 0], [-2.2, 1.8, Math.PI]] as [number, number, number][]).map(([x, z, ry], i) => (
        <group key={`bench-${i}`} position={[x, 0, z]} rotation={[0, ry, 0]}>
          <mesh position={[0, 0.28, 0]}>
            <boxGeometry args={[0.9, 0.06, 0.3]} />
            <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
          </mesh>
          <mesh position={[0, 0.42, -0.12]}>
            <boxGeometry args={[0.9, 0.28, 0.05]} />
            <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
          </mesh>
          {[-0.36, 0.36].map((lx, j) => (
            <mesh key={j} position={[lx, 0.14, 0]}>
              <boxGeometry args={[0.05, 0.28, 0.26]} />
              <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── Flowers ───────────────────────────────────────────────── */}
      {FLOWERS.map(([rx, rz, color], i) => (
        <group key={`flower-${i}`} position={[rx, 0, rz]}>
          <mesh position={[0, 0.10, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.20, 4]} />
            <meshToonMaterial color="#5a8040" gradientMap={gradientMap} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <sphereGeometry args={[0.07, 5, 4]} />
            <meshToonMaterial color={color} gradientMap={gradientMap} />
          </mesh>
        </group>
      ))}

    </group>
  );
}
