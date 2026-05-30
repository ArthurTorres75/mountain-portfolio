interface ManifestoProps {
  text: string
}

export default function Manifesto({ text }: ManifestoProps) {
  return (
    <p
      className="text-center italic font-[family-name:var(--font-serif)] font-bold text-[var(--st-text)]"
      style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', margin: '10px 0 0' }}
    >
      {text}
    </p>
  )
}
