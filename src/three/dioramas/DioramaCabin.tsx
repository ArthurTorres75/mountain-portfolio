'use client'

import { getToonGradientMap } from '@/lib/toonGradient'
import { PAL } from './palette'

interface CabinProps {
  position: [number, number, number]
  rotationY?: number
  /** Uniform scale — default 0.45 (diorama size). Use 0.65 for a hero cabin. */
  scale?: number
}

/**
 * Shared diorama cabin — mirrors the world cabin (TerrainStructures) at
 * a configurable scale. Roof has the mandatory PI/4 Y rotation so the
 * cone vertices align with the box corners. Foundation sits at Y=0.
 */
export default function DioramaCabin({ position, rotationY = 0, scale = 0.45 }: CabinProps) {
  const gm = getToonGradientMap()
  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Stone foundation */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.72, 0.12, 1.42]} />
        <meshToonMaterial color="#5c4a38" gradientMap={gm} />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 0.53, 0]}>
        <boxGeometry args={[1.6, 0.95, 1.3]} />
        <meshToonMaterial color={PAL.wood} gradientMap={gm} />
      </mesh>
      {/* Roof — PI/4 Y rotation aligns cone vertices with box corners */}
      <mesh position={[0, 1.50, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.25, 0.85, 4]} />
        <meshToonMaterial color={PAL.roof} gradientMap={gm} />
      </mesh>
      {/* Chimney */}
      <mesh position={[0.3, 1.78, 0.1]}>
        <boxGeometry args={[0.18, 0.72, 0.18]} />
        <meshToonMaterial color="#6b5040" gradientMap={gm} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.37, 0.67]}>
        <boxGeometry args={[0.35, 0.58, 0.05]} />
        <meshToonMaterial color="#3e2a18" gradientMap={gm} />
      </mesh>
      {/* Porch step */}
      <mesh position={[0, 0.07, 0.82]}>
        <boxGeometry args={[0.5, 0.07, 0.22]} />
        <meshToonMaterial color="#7a6252" gradientMap={gm} />
      </mesh>
      {/* Front window — warm glow */}
      <mesh position={[0.52, 0.58, 0.66]}>
        <boxGeometry args={[0.32, 0.28, 0.04]} />
        <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={0.8} />
      </mesh>
      {/* Side window */}
      <mesh position={[0.81, 0.58, 0.1]}>
        <boxGeometry args={[0.04, 0.28, 0.28]} />
        <meshStandardMaterial color="#ffe09a" emissive="#ffc040" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}
