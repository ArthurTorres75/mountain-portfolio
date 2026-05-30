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
        <coneGeometry args={[0.26, 0.65, 7]} />
        <meshToonMaterial color={PAL.pine} gradientMap={gm} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <coneGeometry args={[0.16, 0.45, 7]} />
        <meshToonMaterial color={PAL.pine} gradientMap={gm} />
      </mesh>
    </group>
  )
}

export default function HiddenSanctuaryDiorama() {
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

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[3.0, 32]} />
        <meshToonMaterial color={PAL.grassDark} gradientMap={gm} />
      </mesh>

      {/* Dais base */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.12, 10]} />
        <meshToonMaterial color={PAL.rock} gradientMap={gm} />
      </mesh>

      {/* Dais top */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.72, 0.82, 0.1, 10]} />
        <meshToonMaterial color={PAL.snow} gradientMap={gm} />
      </mesh>

      {/* Arch left pillar */}
      <mesh position={[-0.5, 0.8, 0]}>
        <boxGeometry args={[0.1, 1.4, 0.1]} />
        <meshToonMaterial color={PAL.rock} gradientMap={gm} />
      </mesh>

      {/* Arch right pillar */}
      <mesh position={[0.5, 0.8, 0]}>
        <boxGeometry args={[0.1, 1.4, 0.1]} />
        <meshToonMaterial color={PAL.rock} gradientMap={gm} />
      </mesh>

      {/* Arch top torus */}
      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.06, 6, 16, Math.PI]} />
        <meshToonMaterial color={PAL.rock} gradientMap={gm} />
      </mesh>

      {/* Orb */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshToonMaterial
          color={PAL.gold}
          gradientMap={gm}
          emissive={PAL.gold}
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Light beam */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.06, 0.14, 1.4, 8]} />
        <meshToonMaterial
          color="#fff9e0"
          gradientMap={gm}
          transparent
          opacity={0.22}
        />
      </mesh>

      <pointLight position={[0, 0.6, 0]} color={PAL.gold} intensity={1.2} distance={3.5} />

      {/* 4 pines */}
      <Pine position={[-2.2, 0, -1.0]} />
      <Pine position={[2.2, 0, -1.0]} />
      <Pine position={[-2.0, 0, 1.2]} />
      <Pine position={[2.0, 0, 1.2]} />
    </group>
  )
}
