'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getToonGradientMap } from '@/lib/toonGradient'
import { PAL } from './palette'

function Cloud({ position }: { position: [number, number, number] }) {
  const gm = getToonGradientMap()
  const offsets: [number, number, number][] = [
    [0, 0, 0],
    [0.22, 0.05, 0.06],
    [-0.2, 0.04, 0.08],
  ]
  return (
    <group position={position}>
      {offsets.map((off, i) => (
        <mesh key={i} position={off}>
          <sphereGeometry args={[0.18 - i * 0.02, 6, 6]} />
          <meshToonMaterial color="#f8f8f8" gradientMap={gm} />
        </mesh>
      ))}
    </group>
  )
}

export default function SummitViewpointDiorama() {
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

  const cloudGroups: [number, number, number][] = [
    [-1.6, 1.8, -0.6],
    [1.4, 2.1, -0.4],
    [-1.0, 2.4, 0.8],
    [1.8, 1.6, 0.6],
  ]

  return (
    <group ref={groupRef}>
      {/* Peak */}
      <mesh position={[0, 0.9, 0]}>
        <coneGeometry args={[1.3, 2.2, 8]} />
        <meshToonMaterial color={PAL.rock} gradientMap={gm} />
      </mesh>

      {/* Snow cap */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.45, 0.7, 8]} />
        <meshToonMaterial color={PAL.snow} gradientMap={gm} />
      </mesh>

      {/* Deck */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.7, 0.75, 0.1, 10]} />
        <meshToonMaterial color={PAL.wood} gradientMap={gm} />
      </mesh>

      {/* Bench seat */}
      <mesh position={[0.3, 0.34, 0.35]}>
        <boxGeometry args={[0.5, 0.06, 0.18]} />
        <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
      </mesh>

      {/* Bench back */}
      <mesh position={[0.3, 0.46, 0.44]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.5, 0.22, 0.04]} />
        <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
      </mesh>

      {/* Flag */}
      <group position={[0, 0.28, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.6, 6]} />
          <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
        </mesh>
        <mesh position={[0.1, 0.52, 0]}>
          <boxGeometry args={[0.2, 0.12, 0.02]} />
          <meshToonMaterial color={PAL.gold} gradientMap={gm} />
        </mesh>
      </group>

      {/* Cloud groups */}
      {cloudGroups.map((pos, i) => (
        <Cloud key={i} position={pos} />
      ))}

      {/* Ring marker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.28, 0]}>
        <ringGeometry args={[0.28, 0.38, 24]} />
        <meshToonMaterial color={PAL.gold} gradientMap={gm} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
