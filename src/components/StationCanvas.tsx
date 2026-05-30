'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStationStore } from '@/store/useStationStore'
import { DIORAMA_MAP } from '@/three/dioramas'

const IDLE_SPEED = 0.12

interface DioramaSceneProps {
  id: string
  scrollProgress: number
  theme: 'journal' | 'cinematic'
}

function DioramaScene({ id, scrollProgress, theme }: DioramaSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const introRef = useRef(0)
  const mouseTargetRef = useRef({ x: 0, y: 0 })
  const mouseSmoothRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handler(e: PointerEvent) {
      mouseTargetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const lerpF = 0.06
    mouseSmoothRef.current.x +=
      (mouseTargetRef.current.x - mouseSmoothRef.current.x) * lerpF
    mouseSmoothRef.current.y +=
      (mouseTargetRef.current.y - mouseSmoothRef.current.y) * lerpF
    const mx = mouseSmoothRef.current.x
    const my = mouseSmoothRef.current.y

    // Entrance scale
    introRef.current = Math.min(1, introRef.current + delta * 1.8)
    const ease = 1 - Math.pow(1 - introRef.current, 3)

    const t = state.clock.elapsedTime
    const dir = theme === 'cinematic' ? -1 : 1

    // Idle oscillation + bob
    groupRef.current.rotation.y = Math.sin(t * IDLE_SPEED) * 0.28 + mx * 0.25
    const bobY = Math.sin(t * 0.6) * 0.06

    // Scroll dock: hero position → dock position
    const st = Math.min(1, scrollProgress)
    const heroX = dir * 2.7
    const dockX = dir * 3.9
    const targetX = heroX + (dockX - heroX) * st + mx * 0.3
    const dockY = st * 2.2
    const dockScale = (1 - st * 0.4) * ease

    groupRef.current.scale.setScalar(dockScale)
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.08
    groupRef.current.position.y += (bobY - dockY * 0.3 - groupRef.current.position.y) * 0.08

    // Camera parallax
    const camTargetX = dir * 1.4 + mx * 0.8
    const camTargetY = 4.8 - my * 0.5 + dockY * 0.2
    state.camera.position.x += (camTargetX - state.camera.position.x) * 0.05
    state.camera.position.y += (camTargetY - state.camera.position.y) * 0.05
    state.camera.lookAt(
      groupRef.current.position.x * 0.55,
      0.6 + dockY * 0.5,
      0,
    )
  })

  const Diorama = DIORAMA_MAP[id]
  if (!Diorama) return null

  return (
    <group ref={groupRef}>
      <Diorama />
    </group>
  )
}

function Lights({ theme }: { theme: 'journal' | 'cinematic' }) {
  const isB = theme === 'cinematic'
  return (
    <>
      <directionalLight
        position={[5, 8, 6]}
        intensity={isB ? 2.0 : 2.4}
        color={isB ? '#ffe2b0' : '#fff1d6'}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0006}
      />
      <directionalLight
        position={[-6, 4, -5]}
        intensity={isB ? 1.9 : 1.0}
        color={isB ? '#ff9d4a' : '#ffc888'}
      />
      <ambientLight intensity={isB ? 0.28 : 0.62} color={isB ? '#3a4a6a' : '#bcd2ff'} />
      <hemisphereLight args={['#ddeaff', '#6b5a3e', isB ? 0.35 : 0.55]} />
    </>
  )
}

export default function StationCanvas() {
  const pathname = usePathname()
  const { activeStation, scrollProgress, theme } = useStationStore()

  const match = pathname?.match(/^\/station\/(.+)$/)
  const stationId = match ? match[1] : null

  if (!stationId) return null

  const displayId = activeStation ?? stationId

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 4.8, 10.0], fov: 34 }}
        gl={{ alpha: true, antialias: true }}
        shadows
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        aria-label={`3D diorama of ${displayId}`}
        role="img"
      >
        <Lights theme={theme} />
        <DioramaScene id={displayId} scrollProgress={scrollProgress} theme={theme} />
      </Canvas>
    </div>
  )
}
