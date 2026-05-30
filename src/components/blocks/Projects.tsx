import type { ProjectItem } from '@/types/stations'

interface ProjectsProps {
  items: ProjectItem[]
}

export default function Projects({ items }: ProjectsProps) {
  return (
    <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2">
      {items.map((project) => (
        <article
          key={project.title}
          className="overflow-hidden rounded-[20px] border border-[var(--st-border)] bg-[var(--st-card)] shadow-[var(--st-card-shadow)] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-[var(--st-accent)]"
        >
          {/* Placeholder thumbnail */}
          <div
            className="flex aspect-[16/10] items-center justify-center border-b border-[var(--st-border)]"
            style={{
              background: 'var(--st-chip-bg)',
              backgroundImage:
                'repeating-linear-gradient(45deg, var(--st-chip-bg) 0 12px, transparent 12px 24px)',
            }}
          >
            <span className="font-mono text-xs text-[var(--st-muted)]">project shot</span>
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
      ))}
    </div>
  )
}
