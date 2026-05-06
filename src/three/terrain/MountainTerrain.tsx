"use client";

// Low-poly toon terrain — Monument Valley / Journey style
// All meshToonMaterial for flat-shading cel look
export default function MountainTerrain() {
  return (
    <group>
      {/* Main ground — soft sage green */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[80, 80, 1, 1]} />
        <meshToonMaterial color="#4a7c59" />
      </mesh>

      {/* Path — warm sandy trail through the world */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.78, -1]}>
        <planeGeometry args={[3.2, 44, 1, 1]} />
        <meshToonMaterial color="#c8a96e" />
      </mesh>

      {/* Background mountain range — deep teal/indigo */}
      <mesh position={[-8, 4, -22]}>
        <coneGeometry args={[7, 11, 5]} />
        <meshToonMaterial color="#2d4a6b" />
      </mesh>
      <mesh position={[0, 5.5, -26]}>
        <coneGeometry args={[9, 14, 6]} />
        <meshToonMaterial color="#1e3a5a" />
      </mesh>
      <mesh position={[10, 3.5, -20]}>
        <coneGeometry args={[6, 9, 5]} />
        <meshToonMaterial color="#2a4560" />
      </mesh>

      {/* Mid mountain — the main peak the player climbs toward */}
      <mesh position={[0, 3.2, -16]}>
        <coneGeometry args={[5.5, 9, 7]} />
        <meshToonMaterial color="#3d6b85" />
      </mesh>
      <mesh position={[-5.5, 2, -10]}>
        <coneGeometry args={[4, 6.5, 6]} />
        <meshToonMaterial color="#4a7a6a" />
      </mesh>
      <mesh position={[6.5, 1.8, -9]}>
        <coneGeometry args={[3.8, 5.8, 6]} />
        <meshToonMaterial color="#3e6e5e" />
      </mesh>

      {/* Snow caps */}
      <mesh position={[0, 8.6, -16]}>
        <coneGeometry args={[1.8, 2.8, 7]} />
        <meshToonMaterial color="#e8eef5" />
      </mesh>
      <mesh position={[0, 12, -26]}>
        <coneGeometry args={[2.5, 4, 6]} />
        <meshToonMaterial color="#f0f4fa" />
      </mesh>

      {/* Foreground hills — rolling green */}
      <mesh position={[-3.5, 0, -3.5]}>
        <sphereGeometry args={[2.2, 6, 5]} />
        <meshToonMaterial color="#5e9166" />
      </mesh>
      <mesh position={[4.2, -0.2, -4]}>
        <sphereGeometry args={[2.0, 6, 5]} />
        <meshToonMaterial color="#527d5a" />
      </mesh>
      <mesh position={[-4.5, -0.3, 1.5]}>
        <sphereGeometry args={[1.6, 6, 4]} />
        <meshToonMaterial color="#5e9166" />
      </mesh>

      {/* Simple low-poly trees — trunk + canopy */}
      {([
        [1.8, -0.4, -0.8],
        [-1.6, -0.4, -1.4],
        [4.5, -0.3, -2.2],
        [-4.0, -0.3, -2.8],
        [2.6, -0.3, -5.5],
        [-3.2, -0.4, -6.2],
        [5.8, -0.3, -7.0],
      ] as [number, number, number][]).map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.08, 0.14, 0.9, 5]} />
            <meshToonMaterial color="#7a5c3a" />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[0.65, 1.5, 5]} />
            <meshToonMaterial color="#3a7d44" />
          </mesh>
          <mesh position={[0, 2.3, 0]}>
            <coneGeometry args={[0.44, 1.1, 5]} />
            <meshToonMaterial color="#4a9454" />
          </mesh>
        </group>
      ))}

      {/* Rocks scattered along the path */}
      {([
        [-1.4, -0.6, -3.5, 0.4],
        [1.7, -0.65, -7.2, 0.3],
        [-1.8, -0.6, -10.0, 0.5],
        [2.2, -0.65, -12.4, 0.35],
      ] as [number, number, number, number][]).map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]}>
          <dodecahedronGeometry args={[s, 0]} />
          <meshToonMaterial color="#8a8070" />
        </mesh>
      ))}

      {/* Water plane — calm lake near the start */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5.5, -0.76, 0.5]}>
        <planeGeometry args={[5, 4, 1, 1]} />
        <meshToonMaterial color="#4a90b8" transparent opacity={0.75} />
      </mesh>
    </group>
  );
}
