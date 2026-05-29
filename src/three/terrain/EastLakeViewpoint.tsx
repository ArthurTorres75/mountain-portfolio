"use client";

import { getToonGradientMap } from "@/lib/toonGradient";
import { Character } from "@/three/characters/CharacterModels";

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

// Tourist boardwalk for the east dodecahedron lake [14.0, -1.2].
// Runs straight east from the upper-right branch road (east edge ≈ x=7.95)
// onto a deck above the water. Group base sits at the boardwalk deck height.
export default function EastLakeViewpoint({ isDay = true }: { isDay?: boolean }) {
  const gradientMap = getToonGradientMap();

  // Anchored just east of the branch road; boardwalk runs +X toward the water.
  return (
    <group position={[8.0, -0.72, -1.2]}>
      {/* Access boardwalk — road → lake edge */}
      <mesh position={[1.65, 0.12, 0]}>
        <boxGeometry args={[3.7, 0.1, 1.4]} />
        <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
      </mesh>
      {/* Viewpoint deck — over the water */}
      <mesh position={[5.0, 0.12, 0]}>
        <boxGeometry args={[3.0, 0.1, 2.8]} />
        <meshToonMaterial color={WOOD} gradientMap={gradientMap} />
      </mesh>

      {/* Support posts sunk into the lake */}
      {([
        [4.2, -1.2], [4.2, 1.2], [5.8, -1.2], [5.8, 1.2], [5.0, 0],
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
          [0.0, 0.7], [0.9, 0.7], [1.8, 0.7], [2.7, 0.7], [3.5, 0.7],
          [0.0, -0.7], [0.9, -0.7], [1.8, -0.7], [2.7, -0.7], [3.5, -0.7],
        ]}
        rails={[
          [1.75, 0.7, 3.7, "x"],
          [1.75, -0.7, 3.7, "x"],
        ]}
      />

      {/* Deck perimeter railings — far edge + two sides, open toward the access */}
      <Railing
        gradientMap={gradientMap}
        posts={[
          [6.4, -1.3], [6.4, -0.65], [6.4, 0], [6.4, 0.65], [6.4, 1.3],
          [4.0, 1.4], [4.7, 1.4], [5.4, 1.4], [6.1, 1.4],
          [4.0, -1.4], [4.7, -1.4], [5.4, -1.4], [6.1, -1.4],
        ]}
        rails={[
          [6.4, 0, 2.7, "z"],
          [5.1, 1.4, 2.7, "x"],
          [5.1, -1.4, 2.7, "x"],
        ]}
      />

      {/* Bench facing the water */}
      <group position={[6.0, 0, 0]}>
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
      <group position={[-0.2, 0, 0.85]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.9, 6]} />
          <meshToonMaterial color={DARK_WOOD} gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0, 0.78, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.55, 0.32, 0.04]} />
          <meshToonMaterial color="#c89a5a" gradientMap={gradientMap} />
        </mesh>
      </group>

      {/* Visitors standing at the rail, looking out over the water (hidden at night) */}
      {isDay && (
        <>
          <Character
            position={[5.6, 0.17, -0.7]} rotation={[0, Math.PI / 2, 0]} scale={0.66}
            bodyColor="#2a3a5a" shirtColor="#e8dcc0" skinColor="#c49070" hairColor="#1a0a08"
          />
          <Character
            position={[5.6, 0.17, 0.6]} rotation={[0, Math.PI / 2, 0]} scale={0.64}
            bodyColor="#5a3a2a" shirtColor="#a0c0b0" skinColor="#d4a07a" hairColor="#0c0906"
          />
        </>
      )}
    </group>
  );
}
