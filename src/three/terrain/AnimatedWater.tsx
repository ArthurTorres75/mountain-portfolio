"use client";

import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, Color, DoubleSide } from "three";

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

// Module-level singleton — created once, shared across all river mesh instances.
// Lives outside any hook so mutation in useFrame has no lint restrictions.
let waterMaterial: ShaderMaterial | null = null;
function getWaterMaterial(): ShaderMaterial {
  if (!waterMaterial) {
    waterMaterial = new ShaderMaterial({
      uniforms: {
        time:  { value: 0 },
        color: { value: new Color("#4fa8cc") },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: DoubleSide,
      depthWrite: false,
    });
  }
  return waterMaterial;
}

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
    float wave1 = sin(vUv.x * 10.0 + time * 1.8) * 0.5 + 0.5;
    float wave2 = sin(vUv.y * 8.0 - time * 1.4 + vUv.x * 3.0) * 0.5 + 0.5;
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
  useFrame((_, delta) => {
    getWaterMaterial().uniforms.time.value += delta;
  });

  return (
    <group>
      {RIVER_SEGMENTS.map(([x, z, width, length, rotY], i) => (
        <mesh
          key={`river-${i}`}
          rotation={[-Math.PI / 2, rotY, 0]}
          position={[x, WATER_Y, z]}
        >
          <planeGeometry args={[width, length, 1, 1]} />
          {/* primitive reuses one ShaderMaterial instance across all river segments */}
          <primitive object={getWaterMaterial()} attach="material" />
        </mesh>
      ))}
    </group>
  );
}
