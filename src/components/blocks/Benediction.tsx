interface BenedictionProps {
  text: string
}

export default function Benediction({ text }: BenedictionProps) {
  return (
    <p
      className="text-center font-[family-name:var(--font-serif)] font-bold text-[var(--st-accent)]"
      style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', margin: '10px 0 0' }}
    >
      {text}
    </p>
  )
}
