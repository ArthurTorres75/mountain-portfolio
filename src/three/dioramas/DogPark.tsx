'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getToonGradientMap } from '@/lib/toonGradient'
import { PAL } from './palette'
import { LaikaModel, KiraModel } from '@/three/characters/CharacterModels'

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

function Pine({ position }: { position: [number, number, number] }) {
  const gm = getToonGradientMap()
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 6]} />
        <meshToonMaterial color={PAL.woodDark} gradientMap={gm} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.24, 0.6, 7]} />
        <meshToonMaterial color={PAL.pine} gradientMap={gm} />
      </mesh>
    </group>
  )
}


export default function DogParkDiorama() {
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

  const postCount = 16
  const fenceRadius = 1.9

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[3.0, 32]} />
        <meshToonMaterial color={PAL.grass} gradientMap={gm} />
      </mesh>

      {/* Inner park ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[fenceRadius + 0.1, 32]} />
        <meshToonMaterial color={PAL.dirt} gradientMap={gm} />
      </mesh>

      {/* Fence posts */}
      {Array.from({ length: postCount }, (_, i) => {
        const angle = (i / postCount) * Math.PI * 2
        const x = Math.cos(angle) * fenceRadius
        const z = Math.sin(angle) * fenceRadius
        return (
          <mesh key={i} position={[x, 0.2, z]}>
            <boxGeometry args={[0.06, 0.4, 0.06]} />
            <meshToonMaterial color={PAL.wood} gradientMap={gm} />
          </mesh>
        )
      })}

      {/* Fence rail */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.3, 0]}>
        <torusGeometry args={[fenceRadius, 0.03, 4, postCount]} />
        <meshToonMaterial color={PAL.wood} gradientMap={gm} />
      </mesh>

      {/* Laika — facing roughly toward camera, slight angle */}
      <group position={[-0.5, 0, 0.2]} rotation={[0, -Math.PI / 2 + 0.3, 0]}>
        <LaikaModel scale={0.9} />
      </group>

      {/* Kira — facing the other way, looking at Laika */}
      <group position={[0.6, 0, -0.3]} rotation={[0, -Math.PI / 2 - 0.4, 0]}>
        <KiraModel scale={0.9} />
      </group>

      {/* Golden ball */}
      <mesh position={[0.1, 0.1, 0.8]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshToonMaterial color={PAL.gold} gradientMap={gm} />
      </mesh>

      {/* Round trees outside fence */}
      <RoundTree position={[-2.4, 0, 0.6]} />
      <RoundTree position={[2.2, 0, -0.8]} />

      {/* Pine */}
      <Pine position={[0.6, 0, 2.5]} />
    </group>
  )
}
