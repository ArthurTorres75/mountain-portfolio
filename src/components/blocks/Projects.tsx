import Image from 'next/image'
import type { ProjectItem } from '@/types/stations'

interface ProjectsProps {
  items: ProjectItem[]
}

export default function Projects({ items }: ProjectsProps) {
  return (
    <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2">
      {items.map((project) => {
        const Card = (
          <article
            key={project.title}
            className="overflow-hidden rounded-[20px] border border-[var(--st-border)] bg-[var(--st-card)] shadow-[var(--st-card-shadow)] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-[var(--st-accent)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--st-border)]">
              {project.src ? (
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    background: 'var(--st-chip-bg)',
                    backgroundImage:
                      'repeating-linear-gradient(45deg, var(--st-chip-bg) 0 12px, transparent 12px 24px)',
                  }}
                >
                  <span className="font-mono text-xs text-[var(--st-muted)]">project shot</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[var(--st-text)]">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--st-muted)]">{project.text}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[6px] bg-[var(--st-chip-bg)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--st-accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        )

        return project.href ? (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--st-accent)] rounded-[20px]"
            aria-label={`View project: ${project.title}`}
          >
            {Card}
          </a>
        ) : (
          <div key={project.title}>{Card}</div>
        )
      })}
    </div>
  )
}
