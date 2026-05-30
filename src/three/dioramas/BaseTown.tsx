'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getToonGradientMap } from '@/lib/toonGradient'
import { PAL } from './palette'

function Cabin({ position }: { position: [number, number, number] }) {
  const gm = getToonGradientMap()
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.7, 0.6, 0.6]} />
        <meshToonMaterial color={PAL.wood} gradientMap={gm} />
      </mesh>
      <mesh position={[0, 0.44, 0]}>
        <coneGeometry args={[0.52, 0.4, 4]} />
        <meshToonMaterial color={PAL.roof} gradientMap={gm} />
      </mesh>
    </group>
  )
}

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

  const cabinSpots: [number, number, number][] = [
    [-1.8, -0.6, 0.5],
    [1.7, -1.2, -0.4],
    [-0.4, 1.9, 0.9],
    [2.0, 1.4, -0.2],
  ]

  const gm = getToonGradientMap()

  return (
    <group ref={groupRef}>
      {/* Ground disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[3.2, 32]} />
        <meshToonMaterial color={PAL.grass} gradientMap={gm} />
      </mesh>

      {/* Cabins */}
      {cabinSpots.map((pos, i) => (
        <Cabin key={i} position={pos} />
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
