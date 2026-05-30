interface ProseProps {
  text: string
  lead?: boolean
}

export default function Prose({ text, lead }: ProseProps) {
  return lead ? (
    <p
      className="font-medium text-[var(--st-text)]"
      style={{ fontSize: 'clamp(1.3rem, 2.6vw, 1.8rem)', lineHeight: 1.45 }}
    >
      {text}
    </p>
  ) : (
    <p className="max-w-[62ch] text-[var(--st-muted)]" style={{ fontSize: '1.18rem', lineHeight: 1.62 }}>
      {text}
    </p>
  )
}
