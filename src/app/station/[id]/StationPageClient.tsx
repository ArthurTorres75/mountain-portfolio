'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import type { Station } from '@/types/stations'
import { STATIONS } from '@/data/stations'
import { useStationStore } from '@/store/useStationStore'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import StationHeader from '@/components/station/StationHeader'
import StationHero from '@/components/station/StationHero'

interface StationPageClientProps {
  station: Station
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 220, damping: 24 },
  },
}

export default function StationPageClient({ station }: StationPageClientProps) {
  const router = useRouter()
  const { theme, setActiveStation, setScrollProgress } = useStationStore()

  const i = STATIONS.findIndex((s) => s.id === station.id)
  const prev = STATIONS[(i - 1 + STATIONS.length) % STATIONS.length]
  const next = STATIONS[(i + 1) % STATIONS.length]

  useEffect(() => {
    setActiveStation(station.id)
    return () => setActiveStation(null)
  }, [station.id, setActiveStation])

  // Sync body background with theme
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    return () => document.body.removeAttribute('data-theme')
  }, [theme])

  // Scroll progress mapped to hero height (78 % of viewport) like the reference
  useEffect(() => {
    function handleScroll() {
      const heroH = window.innerHeight * 0.78
      setScrollProgress(Math.min(1, window.scrollY / heroH))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress])

  return (
    <div data-theme={theme} className="relative min-h-screen" style={{ color: 'var(--st-text)' }}>
      <StationHeader name={station.name} index={station.index} />

      {/* Hero — transparent; diorama canvas shows through */}
      <StationHero
        kicker={station.kicker}
        title={station.title}
        role={station.role}
        tagline={station.tagline}
      />

      {/* Content sheet — rises over the canvas with rounded top + shadow */}
      <div
        className="relative z-[4]"
        style={{
          background: 'var(--st-bg)',
          borderTopLeftRadius: '36px',
          borderTopRightRadius: '36px',
          boxShadow: 'var(--st-sheet-shadow)',
        }}
      >
        {/* Drag handle visual */}
        <div
          className="mx-auto mt-4 h-1 w-12 rounded-full"
          style={{ background: 'var(--st-line-soft)' }}
          aria-hidden="true"
        />

        <section
          className="mx-auto max-w-[860px] px-6 pb-24 pt-12 sm:px-10"
          aria-label={`Content for ${station.name}`}
        >
          <div className="flex flex-col gap-[clamp(28px,5vw,60px)]">
            {station.blocks.map((block, idx) => (
              <motion.div
                key={idx}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
              >
                <BlockRenderer block={block} index={idx} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Station nav */}
        <nav
          className="mx-auto mt-[clamp(50px,8vw,90px)] grid max-w-[860px] grid-cols-2 gap-4 px-6 sm:px-10"
          aria-label="Navigate between stations"
        >
          <button
            type="button"
            onClick={() => router.push(`/station/${prev.id}`)}
            className="rounded-[18px] border border-[var(--st-border)] bg-[var(--st-card)] px-6 py-5 text-left shadow-[var(--st-card-shadow)] transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--st-accent)]"
          >
            <span className="block font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--st-accent)]">
              ← Previous
            </span>
            <span className="mt-1 block font-[family-name:var(--font-serif)] text-xl font-bold text-[var(--st-text)]">
              {prev.name}
            </span>
          </button>

          <button
            type="button"
            onClick={() => router.push(`/station/${next.id}`)}
            className="rounded-[18px] border border-[var(--st-border)] bg-[var(--st-card)] px-6 py-5 text-right shadow-[var(--st-card-shadow)] transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--st-accent)]"
          >
            <span className="block font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--st-accent)]">
              Next →
            </span>
            <span className="mt-1 block font-[family-name:var(--font-serif)] text-xl font-bold text-[var(--st-text)]">
              {next.name}
            </span>
          </button>
        </nav>

        {/* Footer */}
        <footer
          className="mx-auto mt-12 flex max-w-[860px] justify-between border-t px-6 pb-12 pt-7 text-sm sm:px-10"
          style={{ borderColor: 'var(--st-line-soft)', color: 'var(--st-muted)' }}
        >
          <span>Mountain Portfolio — Arthur</span>
          <span>Built with discipline, gratitude &amp; purpose.</span>
        </footer>
      </div>
    </div>
  )
}
