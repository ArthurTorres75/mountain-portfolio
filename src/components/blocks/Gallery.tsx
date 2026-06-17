import Image from 'next/image'
import type { GalleryItem } from '@/types/stations'

interface GalleryProps {
  items: GalleryItem[]
}

export default function Gallery({ items }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <figure key={item.label} className="m-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--st-border)]">
            {item.src ? (
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            ) : (
              <div
                role="img"
                aria-label={item.label}
                className="flex h-full w-full items-center justify-center bg-[var(--st-card)]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, var(--st-chip-bg) 0 12px, transparent 12px 24px)',
                }}
              >
                <span className="font-mono text-xs text-[var(--st-muted)]">{item.label}</span>
              </div>
            )}
          </div>
          <figcaption className="mt-2 text-center text-sm text-[var(--st-muted)]">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
