import type { ScriptureVerse } from '@/types/stations'

interface ScriptureProps {
  verses: ScriptureVerse[]
}

export default function Scripture({ verses }: ScriptureProps) {
  return (
    <div className="flex flex-col gap-8">
      {verses.map((verse, idx) => (
        <figure key={verse.ref} className="m-0 text-center">
          {idx > 0 && (
            <hr className="mb-8 border-[var(--st-border)]" aria-hidden="true" />
          )}
          <blockquote
            className="mx-auto max-w-[22ch] font-[family-name:var(--font-serif)] font-semibold text-[var(--st-text)]"
            style={{ fontSize: 'clamp(1.6rem, 3.6vw, 2.6rem)', lineHeight: 1.3 }}
          >
            {verse.who && (
              <span className="italic text-[var(--st-muted)]">{verse.who} </span>
            )}
            &ldquo;{verse.text}&rdquo;
          </blockquote>
          <figcaption className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--st-accent)]">
            {verse.ref}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
