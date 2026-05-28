"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3, Group } from "three";
import { getToonGradientMap } from "@/lib/toonGradient";

const BIRD_COUNT = 10;

// Large elliptical path circling the world at cruising altitude Y ≈ 8.5
const flightPath = new CatmullRomCurve3(
  [
    new Vector3(-22, 8.5, -4),
    new Vector3(-14, 9.2, -18),
    new Vector3(-2,  8.8, -32),
    new Vector3(10,  9.0, -22),
    new Vector3(22,  8.5, -6),
    new Vector3(14,  8.2,  8),
    new Vector3(0,   8.5,  14),
    new Vector3(-12, 8.8,  8),
  ],
  true  // closed loop
);

export default function BirdFlock() {
  const gradientMap = getToonGradientMap();
  const groupRefs    = useRef<(Group | null)[]>(Array.from({ length: BIRD_COUNT }, () => null));
  const leftRefs     = useRef<(Group | null)[]>(Array.from({ length: BIRD_COUNT }, () => null));
  const rightRefs    = useRef<(Group | null)[]>(Array.from({ length: BIRD_COUNT }, () => null));

  const tempPos  = useMemo(() => new Vector3(), []);
  const tempLook = useMemo(() => new Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    for (let i = 0; i < BIRD_COUNT; i++) {
      // Each bird: slightly different speed + position along the curve
      const offset = (i / BIRD_COUNT) * 0.28 + 0.01;
      const speed  = 0.038 + i * 0.0015;
      const curT   = ((t * speed + offset) % 1 + 1) % 1;
      const nextT  = (curT + 0.006) % 1;

      flightPath.getPoint(curT, tempPos);
      flightPath.getPoint(nextT, tempLook);

      const group = groupRefs.current[i];
      if (group) {
        group.position.copy(tempPos);
        group.lookAt(tempLook);
      }

      // Wing flap — each bird has a unique phase so they don't all flap in sync
      const flapAngle = Math.sin(t * 5.2 + i * 0.9) * 0.48;
      const lw = leftRefs.current[i];
      const rw = rightRefs.current[i];
      if (lw) lw.rotation.z =  flapAngle;
      if (rw) rw.rotation.z = -flapAngle;
    }
  });

  return (
    <group>
      {Array.from({ length: BIRD_COUNT }, (_, i) => (
        <group key={i} ref={(el) => { groupRefs.current[i] = el; }}>
          {/* Slim body */}
          <mesh>
            <boxGeometry args={[0.06, 0.06, 0.42]} />
            <meshToonMaterial color="#243040" gradientMap={gradientMap} />
          </mesh>

          {/* Left wing — pivots at shoulder */}
          <group position={[-0.12, 0, 0]} ref={(el) => { leftRefs.current[i] = el; }}>
            <mesh position={[-0.20, 0, 0]}>
              <boxGeometry args={[0.38, 0.025, 0.18]} />
              <meshToonMaterial color="#243040" gradientMap={gradientMap} />
            </mesh>
          </group>

          {/* Right wing — pivots at shoulder */}
          <group position={[0.12, 0, 0]} ref={(el) => { rightRefs.current[i] = el; }}>
            <mesh position={[0.20, 0, 0]}>
              <boxGeometry args={[0.38, 0.025, 0.18]} />
              <meshToonMaterial color="#243040" gradientMap={gradientMap} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}
