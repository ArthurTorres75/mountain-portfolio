"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { pedestrians } from "./trafficRegistry";

// ── Car model (low-poly toon) ──────────────────────────────────────────────
// Forward direction = +Z (headlights at +Z, taillights at -Z)
function CarModel({ color, roofColor, lightsOn }: { color: string; roofColor: string; lightsOn: boolean }) {
  const headlight = lightsOn ? 2.4 : 0.0;
  const taillight = lightsOn ? 1.6 : 0.0;
  // Dim lens color when off so parked cars don't look lit
  const headColor = lightsOn ? "#fffde0" : "#9a988a";
  const tailColor = lightsOn ? "#ff2222" : "#5a1a1a";
  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.76, 0.38, 1.65]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Cabin/roof */}
      <mesh position={[0, 0.60, 0.08]}>
        <boxGeometry args={[0.63, 0.30, 0.88]} />
        <meshToonMaterial color={roofColor} />
      </mesh>
      {/* Front windshield */}
      <mesh position={[0, 0.58, 0.53]}>
        <boxGeometry args={[0.59, 0.26, 0.04]} />
        <meshToonMaterial color="#a8d8f0" />
      </mesh>
      {/* Rear windshield */}
      <mesh position={[0, 0.57, -0.38]}>
        <boxGeometry args={[0.59, 0.24, 0.04]} />
        <meshToonMaterial color="#a8d8f0" />
      </mesh>
      {/* Front bumper */}
      <mesh position={[0, 0.16, 0.84]}>
        <boxGeometry args={[0.72, 0.12, 0.06]} />
        <meshToonMaterial color="#888888" />
      </mesh>
      {/* Headlights */}
      {([-0.24, 0.24] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.28, 0.84]}>
          <boxGeometry args={[0.18, 0.10, 0.04]} />
          <meshStandardMaterial color={headColor} emissive="#fffde0" emissiveIntensity={headlight} />
        </mesh>
      ))}
      {/* Taillights */}
      {([-0.24, 0.24] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.28, -0.84]}>
          <boxGeometry args={[0.18, 0.10, 0.04]} />
          <meshStandardMaterial color={tailColor} emissive="#ff2222" emissiveIntensity={taillight} />
        </mesh>
      ))}
      {/* Wheels — 4 corners */}
      {([
        [-0.42, 0.13,  0.50],
        [ 0.42, 0.13,  0.50],
        [-0.42, 0.13, -0.50],
        [ 0.42, 0.13, -0.50],
      ] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.15, 8]} />
          <meshToonMaterial color="#252525" />
        </mesh>
      ))}
      {/* Wheel hubs */}
      {([
        [-0.50, 0.13,  0.50],
        [ 0.50, 0.13,  0.50],
        [-0.50, 0.13, -0.50],
        [ 0.50, 0.13, -0.50],
      ] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 6]} />
          <meshToonMaterial color="#888888" />
        </mesh>
      ))}
    </group>
  );
}

const CAR_Y = -0.60;

// ── Shared intersection lock — only one car in the central crossing at a time ──
const intersection = { owner: -1 };
// Central crossing: main N-S road (x≈±1) meets cross street z=5
function inApproach(x: number, z: number) {
  return Math.abs(x) < 3.0 && z > 2.8 && z < 7.4;
}

// True if an active pedestrian is on the car's lane ahead (in the car's local
// frame: must be IN FRONT within stopping distance and laterally inside the
// lane). This stops the car BEFORE the pedestrian's crossing line, yet ignores
// people walking parallel on the sidewalk beside the lane.
function pedestrianAhead(x: number, z: number, nx: number, nz: number): boolean {
  for (const p of pedestrians) {
    if (!p.active) continue;
    const rx = p.x - x;
    const rz = p.z - z;
    const forward = rx * nx + rz * nz;          // distance ahead along travel
    const lateral = Math.abs(rx * -nz + rz * nx); // sideways offset from lane
    if (forward > -0.6 && forward < 4.0 && lateral < 0.9) return true;
  }
  return false;
}

// Moving car routes — dedicated lanes, no pedestrian overlap (peds on sidewalks)
// Routes stop at z=-13.5 — the center mountain [0,-20] base reaches z≈-14.6 at x=±1
const NORTH_ROUTE: [number, number, number][] = [
  [1.0, CAR_Y, -13.5], [1.0, CAR_Y, -8], [1.0, CAR_Y, 0],
  [1.0, CAR_Y,  8],  [1.0, CAR_Y, 14],
];
const SOUTH_ROUTE: [number, number, number][] = [
  [-1.0, CAR_Y, 14], [-1.0, CAR_Y,  8], [-1.0, CAR_Y, 0],
  [-1.0, CAR_Y, -8], [-1.0, CAR_Y, -13.5],
];
const EAST_ROUTE: [number, number, number][] = [
  [-5.5, CAR_Y, 5.5], [-2.0, CAR_Y, 5.5], [2.0, CAR_Y, 5.5], [5.5, CAR_Y, 5.5],
];
const WEST_ROUTE: [number, number, number][] = [
  [5.5, CAR_Y, 4.5], [2.0, CAR_Y, 4.5], [-2.0, CAR_Y, 4.5], [-5.5, CAR_Y, 4.5],
];

interface MovingCarDef {
  id: number;
  path: [number, number, number][];
  speed: number;
  start: number;
  color: string;
  roofColor: string;
}

const MOVING_CARS: MovingCarDef[] = [
  { id: 0, path: NORTH_ROUTE, speed: 1.1, start: 0.0, color: "#3a6ab0", roofColor: "#2a4a80" },
  { id: 1, path: SOUTH_ROUTE, speed: 1.3, start: 0.5, color: "#b03a3a", roofColor: "#802a2a" },
  { id: 2, path: EAST_ROUTE,  speed: 0.9, start: 0.2, color: "#3a9050", roofColor: "#2a6838" },
  { id: 3, path: WEST_ROUTE,  speed: 1.0, start: 0.7, color: "#d4a020", roofColor: "#a07010" },
];

function MovingCar({ def, isDay }: { def: MovingCarDef; isDay: boolean }) {
  const groupRef = useRef<Group>(null);
  const seg  = useRef(0);
  const prog = useRef(def.start);

  useFrame((_, delta) => {
    const from = def.path[seg.current];
    const to   = def.path[(seg.current + 1) % def.path.length];
    const p    = prog.current;
    const x = from[0] + (to[0] - from[0]) * p;
    const z = from[2] + (to[2] - from[2]) * p;

    const dx = to[0] - from[0], dz = to[2] - from[2];
    const len = Math.hypot(dx, dz) || 1;
    const nx = dx / len, nz = dz / len;

    // Intersection arbitration — claim/yield/release
    let blocked = false;
    if (inApproach(x, z)) {
      if (intersection.owner === -1) intersection.owner = def.id;
      else if (intersection.owner !== def.id) blocked = true;
    } else if (intersection.owner === def.id) {
      intersection.owner = -1;
    }

    // Yield to pedestrians on the path ahead
    if (pedestrianAhead(x, z, nx, nz)) blocked = true;

    if (!blocked) {
      prog.current += delta * def.speed * 0.14;
      if (prog.current >= 1) { prog.current -= 1; seg.current = (seg.current + 1) % def.path.length; }
    }

    if (groupRef.current) {
      groupRef.current.position.set(x, CAR_Y, z);
      if (Math.abs(dx) + Math.abs(dz) > 0.001) groupRef.current.rotation.y = Math.atan2(dx, dz);
    }
  });

  return (
    <group ref={groupRef}>
      <CarModel color={def.color} roofColor={def.roofColor} lightsOn={!isDay} />
    </group>
  );
}

// Parked cars — on green areas, parallel/perpendicular to streets, clear of roads.
// Parked car lights are ALWAYS off.
const PARKED: { pos: [number, number, number]; rotY: number; color: string; roofColor: string }[] = [
  // Brown — moved far to upper-town green beside cabin [-8.5,-7.5], off all roads
  { pos: [-12.0, CAR_Y, -9.5], rotY: 0,          color: "#8a4a2a", roofColor: "#5a3018" },
  { pos: [2.6, CAR_Y, -3.5], rotY: 0,            color: "#e8e8e0", roofColor: "#b0b0a8" },
  // Purple — green band between z=5 and z=10 streets, parallel to cross street
  { pos: [3.8, CAR_Y, 8.0], rotY: Math.PI / 2,   color: "#4a2a8a", roofColor: "#321c60" },
  { pos: [-3.5, CAR_Y, -8.0], rotY: Math.PI,     color: "#2a6a3a", roofColor: "#1a4828" },
  // Orange — green band, mirrored, parallel to cross street
  { pos: [-3.8, CAR_Y, 8.0], rotY: Math.PI / 2,  color: "#c06030", roofColor: "#904020" },
  // Gray — east green strip, pushed out to x=3.2 so it clears the sidewalk line
  { pos: [3.2, CAR_Y, 0.0], rotY: 0,             color: "#607080", roofColor: "#405060" },
  // Green — moved far to upper-town green beside cabin [8.8,-9.5], off all roads
  { pos: [11.5, CAR_Y, -9.5], rotY: 0,           color: "#80a040", roofColor: "#508020" },
];

export default function StreetCars({ isDay = true }: { isDay?: boolean }) {
  return (
    <group>
      {MOVING_CARS.map((def) => <MovingCar key={`mcar-${def.id}`} def={def} isDay={isDay} />)}
      {PARKED.map(({ pos, rotY, color, roofColor }, i) => (
        <group key={`pcar-${i}`} position={pos} rotation={[0, rotY, 0]}>
          <CarModel color={color} roofColor={roofColor} lightsOn={false} />
        </group>
      ))}
    </group>
  );
}
