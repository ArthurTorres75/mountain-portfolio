'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { STATIONS } from '@/data/stations'
import { useStationStore } from '@/store/useStationStore'

interface StationMobileMenuProps {
  open: boolean
  onClose: () => void
  currentId: string
}

export default function StationMobileMenu({ open, onClose, currentId }: StationMobileMenuProps) {
  const router = useRouter()
  const { theme, setTheme } = useStationStore()

  function navigate(path: string) {
    onClose()
    router.push(path)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Station navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col"
            style={{
              background: 'var(--st-bg)',
              borderLeft: '1px solid var(--st-border)',
              boxShadow: 'var(--st-sheet-shadow)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-5 py-5"
              style={{ borderBottom: '1px solid var(--st-line-soft)' }}
            >
              <span
                className="font-mono text-xs font-semibold uppercase tracking-[0.12em]"
                style={{ color: 'var(--st-accent)' }}
              >
                Stations
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-150"
                style={{ color: 'var(--st-muted)' }}
              >
                ✕
              </button>
            </div>

            {/* Station list */}
            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="All stations">
              <ul className="flex flex-col gap-1">
                {STATIONS.map((s) => {
                  const isCurrent = s.id === currentId
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => navigate(`/station/${s.id}`)}
                        aria-current={isCurrent ? 'page' : undefined}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors duration-150"
                        style={{
                          background: isCurrent ? 'var(--st-accent)' : 'transparent',
                          color: isCurrent ? '#1c150a' : 'var(--st-text)',
                        }}
                      >
                        <span
                          className="font-mono text-[10px] font-semibold tabular-nums"
                          style={{ color: isCurrent ? '#1c150a' : 'var(--st-accent)', opacity: isCurrent ? 0.7 : 1 }}
                        >
                          {String(s.index).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-semibold">{s.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer — theme toggle + world link */}
            <div
              className="flex flex-col gap-3 px-5 py-5"
              style={{ borderTop: '1px solid var(--st-line-soft)' }}
            >
              {/* Theme toggle */}
              <div
                className="inline-flex self-stretch rounded-full border p-1"
                style={{ borderColor: 'var(--st-border)', background: 'var(--st-card)' }}
                role="group"
                aria-label="Choose direction"
              >
                {(['journal', 'cinematic'] as const).map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    aria-pressed={theme === t}
                    className="flex-1 rounded-full py-1.5 text-xs font-semibold transition-[background,color] duration-200"
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

              {/* Back to world */}
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-[border-color,color] duration-200"
                style={{ borderColor: 'var(--st-border)', color: 'var(--st-text)' }}
              >
                <span aria-hidden="true">←</span>
                <span>Back to World</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
