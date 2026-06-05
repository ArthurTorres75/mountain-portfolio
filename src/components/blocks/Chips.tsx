import type { ChipGroup } from '@/types/stations'

interface ChipsProps {
  groups: ChipGroup[]
}

export default function Chips({ groups }: ChipsProps) {
  return (
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        <div
          key={group.label}
          className="grid gap-4 border-b border-[var(--st-line-soft)] pb-5 last:border-0 sm:grid-cols-[130px_1fr]"
        >
          <span className="pt-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--st-accent)]">
            {group.label}
          </span>
          <div className="flex flex-wrap gap-2.5">
            {group.items.map((item) => (
              <span
                key={item}
                className="cursor-default rounded-full border border-[var(--st-border)] bg-[var(--st-chip-bg)] px-4 py-2 text-sm font-semibold text-[var(--st-text)] transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--st-accent)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
