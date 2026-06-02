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

export default function WorkshopCabinDiorama() {
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
        <circleGeometry args={[3.2, 32]} />
        <meshToonMaterial color={PAL.grass} gradientMap={gm} />
      </mesh>

      {/* Main cabin */}
      <DioramaCabin position={[-0.2, 0, -0.3]} scale={1.4} />

      {/* Workbench */}
      <group position={[0.9, 0, 1.4]}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.4]} />
          <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
        </mesh>
        <mesh position={[-0.35, 0.1, 0]}>
          <boxGeometry args={[0.06, 0.22, 0.06]} />
          <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
        </mesh>
        <mesh position={[0.35, 0.1, 0]}>
          <boxGeometry args={[0.06, 0.22, 0.06]} />
          <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
        </mesh>
      </group>

      {/* Log */}
      <mesh position={[-1.5, 0.12, 1.2]} rotation={[0, 0.4, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 0.7, 8]} />
        <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
      </mesh>


      {/* Pines */}
      <Pine position={[-2.4, 0, -0.8]} />
      <Pine position={[2.2, 0, -1.4]} />

      {/* Round tree */}
      <RoundTree position={[1.8, 0, 1.6]} />

      {/* Rocks */}
      <mesh position={[-0.8, 0, 2.2]} scale={[1, 0.65, 0.85]}>
        <sphereGeometry args={[0.18, 6, 5]} />
        <meshToonMaterial color={PAL.rock} gradientMap={gm} />
      </mesh>
      <mesh position={[0.4, 0, -2.4]} scale={[1, 0.65, 0.85]}>
        <sphereGeometry args={[0.15, 6, 5]} />
        <meshToonMaterial color={PAL.rockDark} gradientMap={gm} />
      </mesh>

      {/* Ring marker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.28, 0.38, 24]} />
        <meshToonMaterial color={PAL.gold} gradientMap={gm} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
