"use client";

import { getToonGradientMap } from "@/lib/toonGradient";

// Cave of Projects — carved into the western mountain face.
// Entrance at world Z≈-24, back wall at Z≈-29. Group centered at [-7, -0.7, -26].
// Interior: 4.6 wide (X), 5.6 deep (Z), 3.2 tall (Y). Entrance faces north (+Z).

const DARK_ROCK  = "#2e2a26";
const STONE      = "#3e3830";
const FLOOR_ROCK = "#312c28";

// [relX, relZ, height, radius]
const STALACTITES: [number, number, number, number][] = [
  [-0.8, -1.1, 0.9, 0.12],
  [ 0.7, -1.9, 0.8, 0.10],
  [-0.3, -0.6, 0.6, 0.08],
  [ 1.1, -2.4, 1.1, 0.14],
  [ 0.0, -2.9, 0.8, 0.11],
];

// [relX, relZ, height, radius]
const STALAGMITES: [number, number, number, number][] = [
  [-1.1, -0.4, 0.38, 0.08],
  [ 0.9, -2.1, 0.50, 0.10],
  [-0.6, -2.9, 0.28, 0.07],
];

// [relX, relY, relZ, rotY, scale]
const WALL_GEMS: [number, number, number, number, number][] = [
  [-2.2, 1.6, -0.8,  0.3, 0.14],
  [-2.2, 1.2, -2.2, -0.2, 0.11],
  [ 2.2, 1.8, -1.3,  0.4, 0.13],
  [ 2.2, 1.1, -2.7,  0.1, 0.12],
  [-0.5, 3.0, -1.2,  0.5, 0.10],
  [ 0.6, 3.0, -2.5, -0.3, 0.09],
];

// [relX, relZ, emissive color] — one crystal per project
const CRYSTALS: [number, number, string][] = [
  [-1.1, -0.9, "#00d4ff"],
  [ 1.1, -0.9, "#4488ff"],
  [-1.1, -2.3, "#00ccaa"],
  [ 1.1, -2.3, "#9955ff"],
];

// [relX, relZ]
const TORCHES: [number, number][] = [
  [-1.8,  1.8],
  [ 1.8,  1.8],
  [-1.8, -2.8],
  [ 1.8, -2.8],
];

export default function CaveOfProjects() {
  const gradientMap = getToonGradientMap();

  return (
    <group position={[-7, -0.7, -26]}>

      {/* ── Interior surfaces ─────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.5]}>
        <planeGeometry args={[4.6, 5.6]} />
        <meshToonMaterial color={FLOOR_ROCK} gradientMap={gradientMap} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -0.5]}>
        <planeGeometry args={[4.6, 5.6]} />
        <meshToonMaterial color={DARK_ROCK} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-2.3, 1.6, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5.6, 3.2]} />
        <meshToonMaterial color={STONE} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[2.3, 1.6, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5.6, 3.2]} />
        <meshToonMaterial color={STONE} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 1.6, -3.3]}>
        <planeGeometry args={[4.6, 3.2]} />
        <meshToonMaterial color={STONE} gradientMap={gradientMap} />
      </mesh>

      {/* ── Entrance arch ─────────────────────────────────────────── */}
      <mesh position={[-2.2, 1.5, 2.0]}>
        <boxGeometry args={[0.8, 3.2, 0.8]} />
        <meshToonMaterial color={DARK_ROCK} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[2.2, 1.5, 2.0]}>
        <boxGeometry args={[0.8, 3.2, 0.8]} />
        <meshToonMaterial color={DARK_ROCK} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 3.3, 2.0]}>
        <boxGeometry args={[5.0, 0.9, 0.8]} />
        <meshToonMaterial color={DARK_ROCK} gradientMap={gradientMap} />
      </mesh>
      {/* Flanking rock masses frame the entrance from the outside */}
      <mesh position={[-3.5, 2.5, 1.4]}>
        <boxGeometry args={[2.0, 6.0, 2.4]} />
        <meshToonMaterial color="#252220" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[3.5, 2.5, 1.4]}>
        <boxGeometry args={[2.0, 6.0, 2.4]} />
        <meshToonMaterial color="#252220" gradientMap={gradientMap} />
      </mesh>
      {/* Irregular keystone accent */}
      <mesh position={[0.3, 3.0, 1.8]} rotation={[0, 0.3, 0.12]}>
        <boxGeometry args={[0.6, 0.5, 0.5]} />
        <meshToonMaterial color={STONE} gradientMap={gradientMap} />
      </mesh>

      {/* ── Stalactites (tip down = flipped cone) ─────────────────── */}
      {STALACTITES.map(([rx, rz, h, r], i) => (
        <mesh key={`stl-${i}`} position={[rx, 3.2 - h / 2, rz]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[r, h, 4]} />
          <meshToonMaterial color={DARK_ROCK} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* ── Stalagmites (tip up = normal cone) ────────────────────── */}
      {STALAGMITES.map(([rx, rz, h, r], i) => (
        <mesh key={`stlg-${i}`} position={[rx, h / 2, rz]}>
          <coneGeometry args={[r, h, 4]} />
          <meshToonMaterial color={STONE} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* ── Emissive wall and ceiling gems ────────────────────────── */}
      {WALL_GEMS.map(([rx, ry, rz, rotY, s], i) => (
        <mesh key={`gem-${i}`} position={[rx, ry, rz]} rotation={[0.4, rotY, 0.3]} scale={s}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#00ccaa" emissive="#00ccaa" emissiveIntensity={2.0} />
        </mesh>
      ))}

      {/* ── Project crystals on stone pedestals ───────────────────── */}
      {CRYSTALS.map(([rx, rz, color], i) => (
        <group key={`crystal-${i}`} position={[rx, 0, rz]}>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.28, 0.34, 0.44, 6]} />
            <meshToonMaterial color="#5a5048" gradientMap={gradientMap} />
          </mesh>
          <mesh position={[0, 0.72, 0]} rotation={[0.3, 0.4 * i, 0.2]}>
            <octahedronGeometry args={[0.32, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.4} />
          </mesh>
        </group>
      ))}

      {/* ── Torches (flame emissive triggers Bloom) ───────────────── */}
      {TORCHES.map(([rx, rz], i) => (
        <group key={`torch-${i}`} position={[rx, 0, rz]}>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.9, 4]} />
            <meshToonMaterial color="#5a3a22" gradientMap={gradientMap} />
          </mesh>
          <mesh position={[0, 0.98, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.14, 6]} />
            <meshToonMaterial color="#3a2010" gradientMap={gradientMap} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <sphereGeometry args={[0.11, 6, 6]} />
            <meshStandardMaterial color="#ff8c20" emissive="#ff6010" emissiveIntensity={3.5} />
          </mesh>
        </group>
      ))}

      {/* ── Reflective water puddle on the cave floor ──────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.01, -2.2]}>
        <planeGeometry args={[1.4, 1.0]} />
        <meshToonMaterial color="#2a5a7a" gradientMap={gradientMap} transparent opacity={0.72} />
      </mesh>

    </group>
  );
}
