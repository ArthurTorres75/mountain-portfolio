'use client'

import { useRouter } from 'next/navigation'
import { useStationStore } from '@/store/useStationStore'

interface StationHeaderProps {
  name: string
  index: number
  total?: number
}

export default function StationHeader({ name, index, total = 7 }: StationHeaderProps) {
  const router = useRouter()
  const { theme, setTheme } = useStationStore()

  return (
    <header
      className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-[18px] sm:px-10"
      style={{ pointerEvents: 'none' }}
    >
      {/* Back to world */}
      <button
        type="button"
        onClick={() => router.push('/')}
        aria-label="Back to world map"
        style={{ pointerEvents: 'auto' }}
        className="flex items-center gap-1.5 rounded-full border border-[var(--st-border)] bg-[var(--st-card)] px-4 py-2 text-sm font-semibold text-[var(--st-text)] shadow-[var(--st-card-shadow)] transition-[transform,border-color,color] duration-200 hover:-translate-x-0.5 hover:border-[var(--st-accent)] hover:text-[var(--st-accent)]"
      >
        <span aria-hidden="true">←</span>
        <span>World</span>
      </button>

      {/* Station name + index pill */}
      <div
        className="flex items-baseline gap-3 rounded-full border border-[var(--st-border)] bg-[var(--st-card)] px-4 py-2 shadow-[var(--st-card-shadow)]"
        style={{ pointerEvents: 'auto' }}
      >
        <span className="text-sm font-bold text-[var(--st-text)]">{name}</span>
        <span className="font-mono text-xs font-semibold tracking-[0.08em] text-[var(--st-accent)]">
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* A · Journal / B · Cinematic segmented toggle */}
      <div
        className="inline-flex rounded-full border border-[var(--st-border)] bg-[var(--st-card)] p-1 shadow-[var(--st-card-shadow)]"
        style={{ pointerEvents: 'auto' }}
        role="group"
        aria-label="Choose direction"
      >
        {(['journal', 'cinematic'] as const).map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            aria-pressed={theme === t}
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-[background,color] duration-200"
            style={
              theme === t
                ? { background: 'var(--st-accent)', color: '#1c150a' }
                : { background: 'none', color: 'var(--st-muted)' }
            }
          >
            {i === 0 ? 'A · Journal' : 'B · Cinematic'}
          </button>
        ))}
      </div>
    </header>
  )
}
