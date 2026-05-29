"use client";

import { getToonGradientMap } from "@/lib/toonGradient";

const WOOD = "#a87848";
const DARK_WOOD = "#7a5530";

type GradientMap = ReturnType<typeof getToonGradientMap>;

// Railing from vertical posts + horizontal top rails.
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

// Tourist boardwalk for the far lake [14.6, -15.4].
// Runs straight east from the summit branch road (east edge ≈ x=10.5)
// onto a deck above the water. Group base sits at the boardwalk deck height.
export default function FarLakeViewpoint() {
  const gradientMap = getToonGradientMap();

  // Anchored just east of the road on the lake's south side (clear of the
  // summit cabin at z=-13.8); boardwalk runs +X toward the water.
  return (
    <group position={[11.0, -0.72, -16.2]}>
      {/* Access boardwalk — road → lake edge */}
      <mesh position={[0.4, 0.12, 0]}>
        <boxGeometry args={[1.8, 0.1, 1.3]} />
        <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
      </mesh>
      {/* Viewpoint deck — over the water */}
      <mesh position={[2.7, 0.12, 0]}>
        <boxGeometry args={[2.6, 0.1, 2.8]} />
        <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
      </mesh>

      {/* Support posts sunk into the lake */}
      {([
        [2.0, -1.2], [2.0, 1.2], [3.4, -1.2], [3.4, 1.2], [2.7, 0],
      ] as [number, number][]).map(([x, z], i) => (
        <mesh key={`sp-${i}`} position={[x, -0.25, z]}>
          <cylinderGeometry args={[0.08, 0.08, 0.82, 6]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
      ))}

      {/* Access railings — both sides */}
      <Railing
        gradientMap={gradientMap}
        posts={[
          [-0.4, 0.65], [0.4, 0.65], [1.2, 0.65],
          [-0.4, -0.65], [0.4, -0.65], [1.2, -0.65],
        ]}
        rails={[
          [0.4, 0.65, 1.8, "x"],
          [0.4, -0.65, 1.8, "x"],
        ]}
      />

      {/* Deck perimeter railings — far edge + two sides, open toward the access */}
      <Railing
        gradientMap={gradientMap}
        posts={[
          [4.0, -1.3], [4.0, -0.65], [4.0, 0], [4.0, 0.65], [4.0, 1.3],
          [1.6, 1.4], [2.3, 1.4], [3.0, 1.4], [3.7, 1.4],
          [1.6, -1.4], [2.3, -1.4], [3.0, -1.4], [3.7, -1.4],
        ]}
        rails={[
          [4.0, 0, 2.7, "z"],
          [2.7, 1.4, 2.5, "x"],
          [2.7, -1.4, 2.5, "x"],
        ]}
      />

      {/* Bench facing the water */}
      <group position={[3.7, 0, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.32, 0.06, 1.0]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
        <mesh position={[-0.13, 0.46, 0]}>
          <boxGeometry args={[0.05, 0.3, 1.0]} />
          <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
        </mesh>
      </group>

      {/* Tourist signpost at the entrance */}
      <group position={[-0.5, 0, 0.85]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.9, 6]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0, 0.78, 0]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.55, 0.32, 0.04]} />
          <meshToonMaterial color="#c89a5a" gradientMap={gradientMap} />
        </mesh>
      </group>
    </group>
  );
}
