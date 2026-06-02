import type { PillarItem } from '@/types/stations'

interface PillarsProps {
  items: PillarItem[]
}

export default function Pillars({ items }: PillarsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-[18px] border border-[var(--st-border)] bg-[var(--st-card)] p-6 shadow-[var(--st-card-shadow)]"
        >
          <span className="block font-[family-name:var(--font-serif)] text-2xl font-bold text-[var(--st-text)]">
            {item.label}
          </span>
          <span className="mt-1.5 block text-sm text-[var(--st-muted)]">{item.note}</span>
        </div>
      ))}
    </div>
  )
}
