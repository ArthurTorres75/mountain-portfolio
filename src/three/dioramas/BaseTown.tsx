'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getToonGradientMap } from '@/lib/toonGradient'
import { PAL } from './palette'
import DioramaCabin from './DioramaCabin'

function Pine({ position }: { position: [number, number, number] }) {
  const gm = getToonGradientMap()
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 6]} />
        <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <coneGeometry args={[0.28, 0.7, 7]} />
        <meshToonMaterial color={PAL.pine} gradientMap={gm} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <coneGeometry args={[0.18, 0.5, 7]} />
        <meshToonMaterial color={PAL.pine} gradientMap={gm} />
      </mesh>
    </group>
  )
}

function RoundTree({ position }: { position: [number, number, number] }) {
  const gm = getToonGradientMap()
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 6]} />
        <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.32, 8, 8]} />
        <meshToonMaterial color={PAL.grassDark} gradientMap={gm} />
      </mesh>
    </group>
  )
}

function Rock({ position }: { position: [number, number, number] }) {
  const gm = getToonGradientMap()
  return (
    <mesh position={position} scale={[1, 0.65, 0.85]}>
      <sphereGeometry args={[0.18, 6, 5]} />
      <meshToonMaterial color={PAL.rock} gradientMap={gm} />
    </mesh>
  )
}

function RingMarker() {
  const gm = getToonGradientMap()
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <ringGeometry args={[0.28, 0.38, 24]} />
      <meshToonMaterial color={PAL.gold} gradientMap={gm} side={THREE.DoubleSide} />
    </mesh>
  )
}

const CABIN_RADIUS = 1.8
const cabinData: Array<{ pos: [number, number, number]; rot: number }> = Array.from(
  { length: 4 },
  (_, i) => {
    const angle = (i * Math.PI) / 2
    return {
      pos: [CABIN_RADIUS * Math.sin(angle), 0, CABIN_RADIUS * Math.cos(angle)],
      rot: angle + Math.PI, // door (+Z face) points inward toward center
    }
  }
)

export default function BaseTownDiorama() {
  const groupRef = useRef<THREE.Group>(null)

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

  const gm = getToonGradientMap()

  return (
    <group ref={groupRef}>
      {/* Ground disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[3.2, 32]} />
        <meshToonMaterial color={PAL.grass} gradientMap={gm} />
      </mesh>

      {/* Cabins — Y=0 so foundation sits flush on ground */}
      {cabinData.map(({ pos, rot }, i) => (
        <DioramaCabin key={i} position={pos} rotationY={rot} />
      ))}

      {/* Pines */}
      <Pine position={[-2.2, 0, -1.0]} />
      <Pine position={[2.5, 0, 1.2]} />

      {/* Round tree */}
      <RoundTree position={[0.5, 0, 2.2]} />

      {/* Rocks */}
      <Rock position={[-1.0, 0, 1.8]} />
      <Rock position={[1.2, 0, -1.6]} />

      {/* Central ring marker */}
      <RingMarker />
    </group>
  )
}
