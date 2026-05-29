"use client";

import { getToonGradientMap } from "@/lib/toonGradient";

const WOOD = "#a87848";
const DARK_WOOD = "#7a5530";

type GradientMap = ReturnType<typeof getToonGradientMap>;

// Railing built from vertical posts + horizontal top rails.
// posts: [x, z]   rails: [centerX, centerZ, length, axis]
function Railing({
  posts,
  rails,
  gradientMap,
}: {
  posts: [number, number][];
  rails: [number, number, number, "x" | "z"][];
  gradientMap: GradientMap;
}) {
  return (
    <group>
      {posts.map(([x, z], i) => (
        <mesh key={`post-${i}`} position={[x, 0.42, z]}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
      {rails.map(([x, z, len, axis], i) => (
        <mesh key={`rail-${i}`} position={[x, 0.6, z]}>
          <boxGeometry args={axis === "x" ? [len, 0.06, 0.06] : [0.06, 0.06, len]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}
    </group>
  );
}

// Tourist viewpoint over the town lake [-5.5, 0.5].
// Boardwalk runs from the main road (+X) west onto a deck above the water (−X).
export default function LakeViewpoint() {
  const gradientMap = getToonGradientMap();

  return (
    <group position={[-4.0, -0.72, 0.5]}>
      {/* Boardwalk floor — street → deck */}
      <mesh position={[1.0, 0.12, 0]}>
        <boxGeometry args={[2.6, 0.1, 1.2]} />
        <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
      </mesh>
      {/* Viewpoint deck — extends over the water */}
      <mesh position={[-1.4, 0.12, 0]}>
        <boxGeometry args={[2.4, 0.1, 2.6]} />
        <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
      </mesh>

      {/* Support posts sunk into the lake */}
      {([
        [-0.4, -1.1], [-0.4, 1.1], [-2.4, -1.1], [-2.4, 1.1], [-1.4, 0],
      ] as [number, number][]).map(([x, z], i) => (
        <mesh key={`sp-${i}`} position={[x, -0.25, z]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 6]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* Boardwalk railings — both sides */}
      <Railing
        gradientMap={gradientMap}
        posts={[
          [0.0, 0.55], [0.7, 0.55], [1.4, 0.55], [2.1, 0.55],
          [0.0, -0.55], [0.7, -0.55], [1.4, -0.55], [2.1, -0.55],
        ]}
        rails={[
          [1.05, 0.55, 2.3, "x"],
          [1.05, -0.55, 2.3, "x"],
        ]}
      />

      {/* Deck perimeter railings — far edge + two sides, open toward the boardwalk */}
      <Railing
        gradientMap={gradientMap}
        posts={[
          [-2.55, -1.2], [-2.55, -0.6], [-2.55, 0], [-2.55, 0.6], [-2.55, 1.2],
          [-1.9, 1.25], [-1.2, 1.25], [-0.5, 1.25],
          [-1.9, -1.25], [-1.2, -1.25], [-0.5, -1.25],
        ]}
        rails={[
          [-2.55, 0, 2.5, "z"],
          [-1.4, 1.25, 2.2, "x"],
          [-1.4, -1.25, 2.2, "x"],
        ]}
      />

      {/* Bench facing the water */}
      <group position={[-0.7, 0, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.32, 0.06, 1.0]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0.13, 0.46, 0]}>
          <boxGeometry args={[0.05, 0.3, 1.0]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      </group>

      {/* Tourist signpost at the entrance */}
      <group position={[2.3, 0, 0.75]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.9, 6]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0, 0.78, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.55, 0.32, 0.04]} />
          <meshToonMaterial color="#c89a5a" gradientMap={gradientMap} />
        </mesh>
      </group>
    </group>
  );
}
