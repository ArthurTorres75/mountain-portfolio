import type { TimelineItem } from '@/types/stations'

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="relative grid gap-[22px] pb-9 last:pb-0"
          style={{ gridTemplateColumns: '28px 1fr' }}
        >
          {/* Vertical connector line */}
          {i < items.length - 1 && (
            <div
              className="absolute bottom-0 top-[22px] w-px"
              style={{ left: '13px', background: 'var(--st-border)' }}
              aria-hidden="true"
            />
          )}

          {/* Gold dot */}
          <span
            className="mt-1.5 h-3.5 w-3.5 justify-self-center rounded-full bg-[var(--st-accent)]"
            style={{ boxShadow: '0 0 0 4px var(--st-chip-bg)' }}
            aria-hidden="true"
          />

          {/* Content */}
          <div>
            <span className="font-mono text-xs font-semibold tracking-[0.1em] text-[var(--st-accent)]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-1 font-[family-name:var(--font-serif)] text-2xl font-bold text-[var(--st-text)]">
              {item.title}
            </h3>
            <p className="mt-2 leading-[1.55] text-[var(--st-muted)]">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
