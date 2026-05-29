"use client";

import { getToonGradientMap } from "@/lib/toonGradient";
import { Character } from "@/three/characters/CharacterModels";

// Dog park — enlarged, centered at world [-12, -0.72, 1]
const CX = -16.0;
const CZ =  1.0;
const BASE_Y = -0.72;
const HW = 7;   // half-width  (X): park x = -19 to -5
const HL = 6;   // half-length (Z): park z = -5  to  7

const WOOD      = "#a87040";
const DARK_WOOD = "#7a5028";
const METAL     = "#6a7a8a";
const METAL_DK  = "#445058";

// Fence post positions along each side (relative to center)
const NS_POSTS = [-6, -4, -2, 0, 2, 4, 6]; // along X for north/south fences (7 posts each side)
const EW_POSTS = [-5, -3.5, -2, 0, 2, 3.5, 5]; // along Z for east/west fences

// Benches [relX, relZ, rotY]
// West benches removed — that fence side now holds the perimeter trees
const BENCHES: [number, number, number][] = [
  [-5.5,  5.2, Math.PI],       // north side
  [ 0.0,  5.2, Math.PI],
  [ 5.5,  5.2, Math.PI],
  [-5.5, -5.2, 0],             // south side
  [ 0.0, -5.2, 0],
  [ 5.5, -5.2, 0],
];

// Flowers [relX, relZ, color]
const FLOWERS: [number, number, string][] = [
  [-5.0, 4.5, "#f0a0c0"], [0.0, 4.8, "#f5c842"], [5.0, 4.5, "#e8806a"],
  [-5.5, -4.5, "#c0e060"], [0.5, -4.8, "#f0a0c0"], [5.5, -4.5, "#f5c842"],
  [-6.2, 2.0, "#e8806a"], [-6.2, -2.0, "#c0e060"],
];

function Bench({ x, z, ry }: { x: number; z: number; ry: number }) {
  const gradientMap = getToonGradientMap();
  return (
    <group position={[x, 0, z]} rotation={[0, ry, 0]}>
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[1.2, 0.06, 0.35]} />
        <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.44, -0.14]}>
        <boxGeometry args={[1.2, 0.32, 0.06]} />
        <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
      </mesh>
      {[-0.48, 0.48].map((lx, i) => (
        <mesh key={i} position={[lx, 0.14, 0]}>
          <boxGeometry args={[0.06, 0.28, 0.30]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
    </group>
  );
}

function PullUpStation({ x, z }: { x: number; z: number }) {
  const gradientMap = getToonGradientMap();
  return (
    <group position={[x, 0, z]}>
      {[-0.7, 0.7].map((dx, i) => (
        <mesh key={i} position={[dx, 0.75, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 6]} />
          <meshToonMaterial color={METAL_DK} gradientMap={gradientMap} />
        </mesh>
      ))}
      <mesh position={[0, 1.52, 0]}>
        <boxGeometry args={[1.5, 0.07, 0.07]} />
        <meshToonMaterial color={METAL} gradientMap={gradientMap} />
      </mesh>
    </group>
  );
}

function MonkeyBars({ x, z }: { x: number; z: number }) {
  const gradientMap = getToonGradientMap();
  return (
    <group position={[x, 0, z]}>
      {[-1.2, 1.2].map((dz, i) => (
        <mesh key={i} position={[0, 0.9, dz]}>
          <boxGeometry args={[0.08, 1.8, 0.08]} />
          <meshToonMaterial color={METAL_DK} gradientMap={gradientMap} />
        </mesh>
      ))}
      {/* Side rails */}
      {[-0.35, 0.35].map((dx, i) => (
        <mesh key={i} position={[dx, 1.82, 0]}>
          <boxGeometry args={[0.06, 0.06, 2.5]} />
          <meshToonMaterial color={METAL} gradientMap={gradientMap} />
        </mesh>
      ))}
      {/* Rungs */}
      {[-0.9, -0.45, 0, 0.45, 0.9].map((dz, i) => (
        <mesh key={i} position={[0, 1.82, dz]}>
          <boxGeometry args={[0.76, 0.06, 0.06]} />
          <meshToonMaterial color={METAL} gradientMap={gradientMap} />
        </mesh>
      ))}
    </group>
  );
}

function DipStation({ x, z }: { x: number; z: number }) {
  const gradientMap = getToonGradientMap();
  return (
    <group position={[x, 0, z]}>
      {[-0.35, 0.35].map((dx, i) => (
        <mesh key={i} position={[dx, 0.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.0, 6]} />
          <meshToonMaterial color={METAL_DK} gradientMap={gradientMap} />
        </mesh>
      ))}
      {[-0.35, 0.35].map((dx, i) => (
        <mesh key={i} position={[dx, 1.0, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.7]} />
          <meshToonMaterial color={METAL} gradientMap={gradientMap} />
        </mesh>
      ))}
    </group>
  );
}

function BalanceBeam({ x, z }: { x: number; z: number }) {
  const gradientMap = getToonGradientMap();
  return (
    <group position={[x, 0, z]}>
      {[-1.0, 1.0].map((dz, i) => (
        <mesh key={i} position={[0, 0.22, dz]}>
          <boxGeometry args={[0.1, 0.44, 0.1]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      <mesh position={[0, 0.47, 0]}>
        <boxGeometry args={[0.12, 0.07, 2.2]} />
        <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
      </mesh>
    </group>
  );
}

export default function DogPark({ isDay = true }: { isDay?: boolean }) {
  const gradientMap = getToonGradientMap();

  return (
    <group position={[CX, BASE_Y, CZ]}>
      {/* Grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[HW * 2, HL * 2]} />
        <meshToonMaterial color="#5a9060" gradientMap={gradientMap} />
      </mesh>

      {/* ── North fence (full, Z=+HL) ── */}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fn-r${i}`} position={[0, y, HL]}>
          <boxGeometry args={[HW * 2, 0.05, 0.06]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      {NS_POSTS.map((x, i) => (
        <mesh key={`fn-p${i}`} position={[x, 0.33, HL]}>
          <boxGeometry args={[0.07, 0.68, 0.07]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* ── South fence (full, Z=-HL) ── */}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fs-r${i}`} position={[0, y, -HL]}>
          <boxGeometry args={[HW * 2, 0.05, 0.06]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      {NS_POSTS.map((x, i) => (
        <mesh key={`fs-p${i}`} position={[x, 0.33, -HL]}>
          <boxGeometry args={[0.07, 0.68, 0.07]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* ── West fence (full, X=-HW) ── */}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fw-r${i}`} position={[-HW, y, 0]}>
          <boxGeometry args={[0.06, 0.05, HL * 2]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      {EW_POSTS.map((z, i) => (
        <mesh key={`fw-p${i}`} position={[-HW, 0.33, z]}>
          <boxGeometry args={[0.07, 0.68, 0.07]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* ── East fence with entry gap (X=+HW), gap at Z=0±0.9 ── */}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fen-r${i}`} position={[HW, y, -3.3]}>
          <boxGeometry args={[0.06, 0.05, HL * 2 - 7.4]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      {[0.28, 0.54].map((y, i) => (
        <mesh key={`fes-r${i}`} position={[HW, y, 3.3]}>
          <boxGeometry args={[0.06, 0.05, HL * 2 - 7.4]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      {[-5, -3, -1.2, 1.2, 3, 5].map((z, i) => (
        <mesh key={`fe-p${i}`} position={[HW, 0.33, z > 0 ? z + 1.2 : z - 1.2]}>
          <boxGeometry args={[0.07, 0.68, 0.07]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* Benches */}
      {BENCHES.map(([x, z, ry], i) => <Bench key={`b${i}`} x={x} z={z} ry={ry} />)}

      {/* Exercise equipment */}
      <PullUpStation x={-4.5} z={3.5} />
      <PullUpStation x={-4.5} z={-3.0} />
      <MonkeyBars    x={1.5}  z={3.5} />
      <DipStation    x={4.5}  z={3.5} />
      <DipStation    x={4.5}  z={-3.0} />
      <BalanceBeam   x={1.5}  z={-3.0} />
      {/* Extra monkey bars on other side */}
      <MonkeyBars    x={-1.5} z={-3.5} />

      {/* ── Park visitors — hidden at night ── */}
      {isDay && <>
      {/* ── Standing visitors — near equipment (LOCAL coords, group at world [-16,1]) ── */}
      {/* By monkey bars (local 1.5,3.5) */}
      <Character position={[3.0, 0, 4.0]} bodyColor="#2a3a6a" shirtColor="#d4c8a8"
        skinColor="#c49070" hairColor="#1a0a08" scale={0.65} rotation={[0, Math.PI, 0]} />
      {/* By pull-up bar (local -4.5,3.5) */}
      <Character position={[-3.0, 0, 4.0]} bodyColor="#3a5a3a" shirtColor="#e8e0cc"
        skinColor="#bf8a5e" hairColor="#0a0808" scale={0.65} rotation={[0, -Math.PI / 2, 0]} />
      {/* By dip station (local 4.5,3.5) */}
      <Character position={[5.4, 0, 4.0]} bodyColor="#5a3a2a" shirtColor="#f0e8d4"
        skinColor="#d4a07a" hairColor="#2a1a0a" scale={0.65} rotation={[0, Math.PI / 2, 0]} />

      {/* ── Seated visitors — on benches ── */}
      {/* North bench center — seated, facing south */}
      <group position={[0, 0.28, 5.2]} rotation={[0, Math.PI, 0]}>
        {/* Torso */}
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.28, 0.32, 0.18]} />
          <meshToonMaterial color="#8a3a2a" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.73, 0]}>
          <boxGeometry args={[0.22, 0.22, 0.20]} />
          <meshToonMaterial color="#c49070" />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.86, -0.01]}>
          <boxGeometry args={[0.24, 0.09, 0.21]} />
          <meshToonMaterial color="#1a0808" />
        </mesh>
        {/* Legs — horizontal (sitting) */}
        <mesh position={[-0.07, 0.22, 0.24]} rotation={[-Math.PI / 2.2, 0, 0]}>
          <boxGeometry args={[0.11, 0.28, 0.11]} />
          <meshToonMaterial color="#2a3a5a" />
        </mesh>
        <mesh position={[0.07, 0.22, 0.24]} rotation={[-Math.PI / 2.2, 0, 0]}>
          <boxGeometry args={[0.11, 0.28, 0.11]} />
          <meshToonMaterial color="#2a3a5a" />
        </mesh>
      </group>
      {/* North bench left — seated */}
      <group position={[-5.5, 0.28, 5.2]} rotation={[0, Math.PI * 0.9, 0]}>
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.28, 0.32, 0.18]} />
          <meshToonMaterial color="#1c1c1c" />
        </mesh>
        <mesh position={[0, 0.73, 0]}>
          <boxGeometry args={[0.22, 0.22, 0.20]} />
          <meshToonMaterial color="#d4a07a" />
        </mesh>
        <mesh position={[0, 0.86, -0.01]}>
          <boxGeometry args={[0.24, 0.09, 0.21]} />
          <meshToonMaterial color="#0c0906" />
        </mesh>
        <mesh position={[-0.07, 0.22, 0.24]} rotation={[-Math.PI / 2.2, 0, 0]}>
          <boxGeometry args={[0.11, 0.28, 0.11]} />
          <meshToonMaterial color="#4a3a2a" />
        </mesh>
        <mesh position={[0.07, 0.22, 0.24]} rotation={[-Math.PI / 2.2, 0, 0]}>
          <boxGeometry args={[0.11, 0.28, 0.11]} />
          <meshToonMaterial color="#4a3a2a" />
        </mesh>
      </group>
      {/* South bench center — seated, facing north */}
      <group position={[0, 0.28, -5.2]} rotation={[0, 0, 0]}>
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.28, 0.32, 0.18]} />
          <meshToonMaterial color="#3a5a3a" />
        </mesh>
        <mesh position={[0, 0.73, 0]}>
          <boxGeometry args={[0.22, 0.22, 0.20]} />
          <meshToonMaterial color="#bf8a5e" />
        </mesh>
        <mesh position={[0, 0.86, -0.01]}>
          <boxGeometry args={[0.24, 0.09, 0.21]} />
          <meshToonMaterial color="#2a1a0a" />
        </mesh>
        <mesh position={[-0.07, 0.22, 0.24]} rotation={[-Math.PI / 2.2, 0, 0]}>
          <boxGeometry args={[0.11, 0.28, 0.11]} />
          <meshToonMaterial color="#3a3a6a" />
        </mesh>
        <mesh position={[0.07, 0.22, 0.24]} rotation={[-Math.PI / 2.2, 0, 0]}>
          <boxGeometry args={[0.11, 0.28, 0.11]} />
          <meshToonMaterial color="#3a3a6a" />
        </mesh>
      </group>

      </>}

      {/* Flowers */}
      {FLOWERS.map(([rx, rz, color], i) => (
        <group key={`fl${i}`} position={[rx, 0, rz]}>
          <mesh position={[0, 0.10, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.20, 4]} />
            <meshToonMaterial color="#5a8040" gradientMap={gradientMap} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <sphereGeometry args={[0.09, 5, 4]} />
            <meshToonMaterial color={color} gradientMap={gradientMap} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
