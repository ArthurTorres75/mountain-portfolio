'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getToonGradientMap } from '@/lib/toonGradient'
import { PAL } from './palette'

function Pine({ position }: { position: [number, number, number] }) {
  const gm = getToonGradientMap()
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 6]} />
        <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <coneGeometry args={[0.24, 0.6, 7]} />
        <meshToonMaterial color={PAL.pine} gradientMap={gm} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.15, 0.42, 7]} />
        <meshToonMaterial color={PAL.pine} gradientMap={gm} />
      </mesh>
    </group>
  )
}

const CRYSTAL_COLORS = ['#a8d8ea', '#c3a8ea', '#a8eac3'] as const

export default function CaveOfChallengesDiorama() {
  const groupRef = useRef<THREE.Group>(null)
  const gm = getToonGradientMap()

  useEffect(() => {
    const group = groupRef.current
    return () => {
      if (!group) return
      group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })
    }
  }, [])

  const crystalPositions: [number, number, number][] = [
    [-0.3, 0.5, 0.1],
    [0.2, 0.6, -0.2],
    [0.5, 0.4, 0.3],
  ]

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[3.0, 32]} />
        <meshToonMaterial color={PAL.grassDark} gradientMap={gm} />
      </mesh>

      {/* Cave mound — flattened hemisphere */}
      <mesh position={[0, 0.4, 0]} scale={[1.8, 0.9, 1.6]}>
        <sphereGeometry args={[1.0, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color={PAL.rockDark} gradientMap={gm} side={THREE.DoubleSide} />
      </mesh>

      {/* Cave mouth — dark opening */}
      <mesh position={[0, 0.45, 0.95]}>
        <sphereGeometry args={[0.55, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color="#1a1a1a" gradientMap={gm} side={THREE.DoubleSide} />
      </mesh>

      {/* Cave arch */}
      <mesh position={[0, 0.72, 1.0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.08, 6, 16, Math.PI]} />
        <meshToonMaterial color={PAL.rock} gradientMap={gm} />
      </mesh>

      {/* Crystals inside cave */}
      {crystalPositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh scale={[0.12, 0.38, 0.12]}>
            <coneGeometry args={[1, 2, 5]} />
            <meshToonMaterial
              color={CRYSTAL_COLORS[i]}
              gradientMap={gm}
              emissive={CRYSTAL_COLORS[i]}
              emissiveIntensity={0.8}
            />
          </mesh>
          <pointLight color={CRYSTAL_COLORS[i]} intensity={0.4} distance={1.2} />
        </group>
      ))}

      {/* Rocks flanking cave */}
      <mesh position={[-1.6, 0.1, 0.8]} scale={[1, 0.65, 0.85]}>
        <sphereGeometry args={[0.22, 6, 5]} />
        <meshToonMaterial color={PAL.rock} gradientMap={gm} />
      </mesh>
      <mesh position={[1.6, 0.1, 0.6]} scale={[1, 0.65, 0.85]}>
        <sphereGeometry args={[0.18, 6, 5]} />
        <meshToonMaterial color={PAL.rockDark} gradientMap={gm} />
      </mesh>

      {/* Pine */}
      <Pine position={[-2.3, 0, -0.6]} />
    </group>
  )
}
