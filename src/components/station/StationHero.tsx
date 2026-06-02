'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useStationStore } from '@/store/useStationStore'

gsap.registerPlugin()

interface StationHeroProps {
  kicker: string
  title: string
  role?: string
  tagline: string
}

export default function StationHero({ kicker, title, role, tagline }: StationHeroProps) {
  const { theme } = useStationStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const isB = theme === 'cinematic'

  useGSAP(
    () => {
      gsap.from('.hero-item', {
        opacity: 0,
        y: 32,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.15,
      })

      function onMove(e: MouseEvent) {
        const nx = (e.clientX / window.innerWidth) * 2 - 1
        const ny = (e.clientY / window.innerHeight) * 2 - 1
        gsap.to(containerRef.current, {
          x: nx * -9,
          y: ny * -6,
          duration: 1.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    },
    { scope: containerRef, dependencies: [] },
  )

  return (
    <section
      className="relative flex w-full"
      style={{
        minHeight: '92vh',
        alignItems: 'flex-end',
        justifyContent: isB ? 'flex-end' : 'flex-start',
        padding: '0 clamp(20px, 6vw, 90px) clamp(40px, 8vh, 90px)',
      }}
    >
      <div
        ref={containerRef}
        className="flex max-w-[640px] flex-col"
        style={{ alignItems: isB ? 'flex-end' : 'flex-start' }}
      >
        {/* Kicker */}
        <span
          className="hero-item mb-[18px] inline-block pb-1.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--st-accent)]"
          style={{ borderBottom: '1px solid var(--st-accent)' }}
        >
          {kicker}
        </span>

        {/* Title */}
        <h1
          className="hero-item m-0 font-[family-name:var(--font-serif)] font-bold leading-[1.08] text-[var(--st-text)]"
          style={{
            fontSize: 'clamp(2.8rem, 6.4vw, 5.2rem)',
            letterSpacing: '-0.01em',
            textAlign: isB ? 'right' : 'left',
          }}
        >
          {title}
        </h1>

        {/* Role */}
        {role && (
          <span
            className="hero-item mt-2 text-[var(--st-accent)]"
            style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.6rem)', fontWeight: 600 }}
          >
            {role}
          </span>
        )}

        {/* Tagline */}
        <p
          className="hero-item m-0 leading-relaxed text-[var(--st-muted)]"
          style={{
            marginTop: 'clamp(20px, 3.5vh, 34px)',
            fontSize: 'clamp(1.05rem, 1.9vw, 1.35rem)',
            maxWidth: '42ch',
            textAlign: isB ? 'right' : 'left',
            marginLeft: isB ? 'auto' : undefined,
          }}
        >
          {tagline}
        </p>

        {/* Scroll hint with animated line */}
        <span className="hero-item scroll-hint mt-8">Scroll to explore</span>
      </div>

    </section>
  )
}
