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

export default function ClimbingRoadDiorama() {
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

  // 7 spiral steps going up the mountain
  const steps = Array.from({ length: 7 }, (_, i) => {
    const t = i / 6
    const angle = t * Math.PI * 1.4
    const radius = 1.4 - t * 0.9
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = t * 1.6 - 0.05
    return { x, y, z }
  })

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[3.0, 32]} />
        <meshToonMaterial color={PAL.grassDark} gradientMap={gm} />
      </mesh>

      {/* Mountain cone */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[1.6, 2.8, 8]} />
        <meshToonMaterial color={PAL.rock} gradientMap={gm} />
      </mesh>

      {/* Snow cap */}
      <mesh position={[0, 2.0, 0]}>
        <coneGeometry args={[0.55, 0.9, 8]} />
        <meshToonMaterial color={PAL.snow} gradientMap={gm} />
      </mesh>

      {/* Spiral steps */}
      {steps.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]} rotation={[0, -Math.atan2(s.z, s.x), 0]}>
          <boxGeometry args={[0.36, 0.1, 0.2]} />
          <meshToonMaterial color={PAL.dirt} gradientMap={gm} />
        </mesh>
      ))}

      {/* Flag at the top */}
      <group position={[0, 2.5, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.5, 6]} />
          <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
        </mesh>
        <mesh position={[0.1, 0.42, 0]}>
          <boxGeometry args={[0.2, 0.12, 0.02]} />
          <meshToonMaterial color={PAL.gold} gradientMap={gm} />
        </mesh>
      </group>

      {/* Pines at base */}
      <Pine position={[-2.2, 0, 0.8]} />
      <Pine position={[2.0, 0, 0.6]} />

      {/* Rock */}
      <mesh position={[1.5, 0, -1.4]} scale={[1, 0.65, 0.85]}>
        <sphereGeometry args={[0.2, 6, 5]} />
        <meshToonMaterial color={PAL.rockDark} gradientMap={gm} />
      </mesh>
    </group>
  )
}
