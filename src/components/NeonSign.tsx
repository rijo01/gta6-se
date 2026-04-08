const colorMap = {
  pink: { color: '#FF2D7B', shadow: '0 0 5px #FF2D7B, 0 0 15px #FF2D7B, 0 0 30px #FF2D7B, 0 0 60px rgba(255,45,123,0.25)', border: 'rgba(255,45,123,0.4)' },
  cyan: { color: '#00F5FF', shadow: '0 0 5px #00F5FF, 0 0 15px #00F5FF, 0 0 30px #00F5FF, 0 0 60px rgba(0,245,255,0.25)', border: 'rgba(0,245,255,0.4)' },
  orange: { color: '#FF6B1A', shadow: '0 0 5px #FF6B1A, 0 0 15px #FF6B1A, 0 0 30px #FF6B1A, 0 0 60px rgba(255,107,26,0.25)', border: 'rgba(255,107,26,0.4)' },
  purple: { color: '#9B2FFF', shadow: '0 0 5px #9B2FFF, 0 0 15px #9B2FFF, 0 0 30px #9B2FFF, 0 0 60px rgba(155,47,255,0.25)', border: 'rgba(155,47,255,0.4)' },
} as const

interface Props {
  text: string
  color: keyof typeof colorMap
  size?: string
}

export default function NeonSign({ text, color, size = '1.4rem' }: Props) {
  const c = colorMap[color]
  return (
    <span className="neon-flicker" style={{
      fontFamily: 'Bebas Neue, sans-serif',
      fontSize: size,
      letterSpacing: '0.15em',
      color: c.color,
      textShadow: c.shadow,
      display: 'inline-block',
      padding: '0.3rem 0.8rem',
      border: `1px solid ${c.border}`,
      borderRadius: '2px',
      background: `${c.color}08`,
    }}>
      {text}
    </span>
  )
}
