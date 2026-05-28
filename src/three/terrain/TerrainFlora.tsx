"use client";

import { useEffect, useRef } from "react";
import {
  InstancedMesh,
  Matrix4,
  Quaternion,
  Vector3,
  Euler,
} from "three";
import { getToonGradientMap } from "@/lib/toonGradient";
import { TREE_GROUND_OFFSET, safeTreePositions, shrubPositions } from "./terrainData";

// Deterministic pseudo-random variation per index — stable across renders
const treeScale = (i: number) => 0.85 + ((Math.sin(i * 7.13 + 1.23) + 1) / 2) * 0.45;
const treeRotY  = (i: number) => (Math.sin(i * 13.71) + 1) * Math.PI;

const COUNT = safeTreePositions.length;

// Local Y offsets of each tier within the tree group (before scale)
const TIERS = [0.55, 1.5, 2.3, 2.9] as const;

export default function TerrainFlora() {
  const gradientMap = getToonGradientMap();

  const trunkRef = useRef<InstancedMesh>(null);
  const lowerRef = useRef<InstancedMesh>(null);
  const midRef   = useRef<InstancedMesh>(null);
  const topRef   = useRef<InstancedMesh>(null);

  const tierRefs = [trunkRef, lowerRef, midRef, topRef];

  useEffect(() => {
    const matrix   = new Matrix4();
    const position = new Vector3();
    const quat     = new Quaternion();
    const scaleVec = new Vector3();

    safeTreePositions.forEach((pos, i) => {
      const s  = treeScale(i);
      const ry = treeRotY(i);
      const baseY = pos[1] + TREE_GROUND_OFFSET;

      quat.setFromEuler(new Euler(0, ry, 0));
      scaleVec.setScalar(s);

      TIERS.forEach((localY, t) => {
        const mesh = tierRefs[t].current;
        if (!mesh) return;
        // worldY = treeBase.y + scale * localY  (rotation around Y doesn't affect Y offset)
        position.set(pos[0], baseY + s * localY, pos[2]);
        matrix.compose(position, quat, scaleVec);
        mesh.setMatrixAt(i, matrix);
      });
    });

    tierRefs.forEach((r) => {
      if (r.current) r.current.instanceMatrix.needsUpdate = true;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group>
      {/* Trunk — 1 draw call for all trees */}
      <instancedMesh ref={trunkRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <cylinderGeometry args={[0.08, 0.14, 0.9, 5]} />
        <meshToonMaterial color="#7a5c3a" gradientMap={gradientMap} />
      </instancedMesh>

      {/* Lower canopy */}
      <instancedMesh ref={lowerRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <coneGeometry args={[0.65, 1.5, 5]} />
        <meshToonMaterial color="#2e6e38" gradientMap={gradientMap} />
      </instancedMesh>

      {/* Mid canopy */}
      <instancedMesh ref={midRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <coneGeometry args={[0.44, 1.1, 5]} />
        <meshToonMaterial color="#3a8a48" gradientMap={gradientMap} />
      </instancedMesh>

      {/* Top canopy */}
      <instancedMesh ref={topRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <coneGeometry args={[0.26, 0.75, 5]} />
        <meshToonMaterial color="#4aa05a" gradientMap={gradientMap} />
      </instancedMesh>

      {/* Shrubs — only 6 instances, regular meshes are fine */}
      {shrubPositions.map(([x, y, z, scale], i) => (
        <group key={`shrub-${i}`} position={[x, y, z]} scale={scale} rotation={[0, treeRotY(i + 100), 0]}>
          <mesh>
            <dodecahedronGeometry args={[0.7, 0]} />
            <meshToonMaterial color="#4f8255" gradientMap={gradientMap} />
          </mesh>
          <mesh position={[0.5, 0.05, -0.3]}>
            <dodecahedronGeometry args={[0.42, 0]} />
            <meshToonMaterial color="#5a9060" gradientMap={gradientMap} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
