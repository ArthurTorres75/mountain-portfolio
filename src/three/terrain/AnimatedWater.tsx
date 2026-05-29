"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, Color, DoubleSide } from "three";
import { safeLakePositions } from "./terrainData";
import { getToonGradientMap } from "@/lib/toonGradient";

// Western river corridor — from mountain spring to the town lake at (-5.5, 0.5).
// Positions mirror RIVER_CORRIDOR in terrainData.ts so flora filters match exactly.
// Stays west of the main path (X=0) and clear of all cabin positions.
const RIVER_SEGMENTS: [number, number, number, number, number][] = [
  // [x, z, width, length, rotY]
  // — Mountain spring (south) to town lake (north) —
  [-4.8, -37.0, 1.0, 7.0,  0.02],  // Spring — narrow trickle at terrain edge
  [-4.6, -32.5, 1.2, 8.0,  0.04],  // Gathering momentum from the peaks
  [-4.8, -28.0, 1.4, 7.0, -0.05],  // Winding between mountain bases
  [-5.0, -24.0, 1.5, 6.0,  0.08],  // Descending the foothills
  [-5.2, -20.5, 1.6, 5.5, -0.06],  // Emerging into open terrain
  [-5.5, -17.5, 1.8, 4.5,  0.10],
  [-6.0, -14.0, 2.0, 5.5,  0.08],
  [-6.5, -10.5, 2.2, 5.5,  0.06],
  [-6.5,  -7.5, 2.2, 5.0,  0.04],
  [-6.0,  -4.5, 2.4, 5.5,  0.05],
  [-5.5,  -1.5, 2.6, 5.0,  0.03],
  [-5.5,   0.5, 4.0, 3.5,  0.01],  // Widens into existing town lake
];

const WATER_Y = -0.77;
const TOWN_LAKE_CENTER: [number, number] = [-5.5, 0.5];

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float time;
  uniform vec3 color;
  varying vec2 vUv;

  void main() {
    // Two interfering wave directions — creates a natural ripple pattern
    float wave1 = sin(vUv.x * 10.0 - time * 1.8) * 0.5 + 0.5;
    float wave2 = sin(vUv.y * 8.0 + time * 1.4 + vUv.x * 3.0) * 0.5 + 0.5;
    float waves  = (wave1 + wave2) * 0.5;

    // 3-step toon shading to match the world gradientMap aesthetic
    float toon = floor(waves * 3.0) / 3.0;
    float brightness = 0.60 + toon * 0.40;

    // Foam highlight on wave crests
    float foam = step(0.88, waves) * 0.35;

    vec3 finalColor = color * brightness + foam;
    gl_FragColor = vec4(finalColor, 0.84);
  }
`;

export default function AnimatedWater() {
  const gradientMap = getToonGradientMap();

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          time:  { value: 0 },
          color: { value: new Color("#4fa8cc") },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        side: DoubleSide,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    material.uniforms.time.value += delta;
  });

  const largestRemoteLake = useMemo(() => {
    const townLakeDistSq = (x: number, z: number) => {
      const dx = x - TOWN_LAKE_CENTER[0];
      const dz = z - TOWN_LAKE_CENTER[1];
      return dx * dx + dz * dz;
    };

    return safeLakePositions
      .filter(([x, , z]) => townLakeDistSq(x, z) > 64)
      .reduce<([number, number, number, number, number, number] | null)>((largest, lake) => {
        const currentRadius = Math.max(lake[3], lake[4]);
        if (!largest) return lake;
        const largestRadius = Math.max(largest[3], largest[4]);
        return currentRadius > largestRadius ? lake : largest;
      }, null);
  }, []);

  const remoteLakeDiameter = largestRemoteLake ? Math.max(largestRemoteLake[3], largestRemoteLake[4]) * 0.72 : 0;

  return (
    <group>
      {RIVER_SEGMENTS.map(([x, z, width, length, rotY], i) => (
        i === RIVER_SEGMENTS.length - 1 ? (
          // Final segment is the town lake: render as a flattened dodecahedron.
          <mesh
            key={`river-${i}`}
            position={[x, WATER_Y - 0.02, z]}
            rotation={[0, rotY, 0]}
            scale={[width * 0.5, 0.2, length * 0.5]}
          >
            <dodecahedronGeometry args={[1, 0]} />
            <primitive object={material} attach="material" />
          </mesh>
        ) : (
          <mesh
            key={`river-${i}`}
            rotation={[-Math.PI / 2, rotY, 0]}
            position={[x, WATER_Y, z]}
          >
            <planeGeometry args={[width, length, 1, 1]} />
            {/* primitive allows reusing one ShaderMaterial instance across all river segments */}
            <primitive object={material} attach="material" />
          </mesh>
        )
      ))}

      {largestRemoteLake && (
        <mesh
          key="remote-lake"
          position={[largestRemoteLake[0], largestRemoteLake[1] - 0.002, largestRemoteLake[2]]}
          rotation={[0, largestRemoteLake[5], 0]}
          scale={[remoteLakeDiameter, 0.02, remoteLakeDiameter]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshToonMaterial color="#5aaed4" gradientMap={gradientMap} transparent opacity={0.88} />
        </mesh>
      )}
    </group>
  );
}
