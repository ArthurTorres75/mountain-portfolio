import type { LinkItem } from '@/types/stations'

interface LinksProps {
  heading: string
  items: LinkItem[]
}

export default function Links({ heading, items }: LinksProps) {
  return (
    <div>
      {heading && (
        <h2
          className="mb-[22px] font-[family-name:var(--font-serif)] font-bold text-[var(--st-text)]"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
        >
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.label}: ${item.handle}`}
            className="group grid items-center gap-1.5 rounded-2xl border border-[var(--st-border)] bg-[var(--st-card)] px-6 py-5 no-underline shadow-[var(--st-card-shadow)] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[var(--st-accent)]"
            style={{ gridTemplateColumns: '1fr auto' }}
          >
            <span className="font-[family-name:var(--font-serif)] text-xl font-bold text-[var(--st-text)]">
              {item.label}
            </span>
            <span
              className="text-2xl text-[var(--st-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ gridRow: '1 / span 2' }}
              aria-hidden="true"
            >
              →
            </span>
            <span className="text-sm text-[var(--st-muted)]">{item.handle}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
