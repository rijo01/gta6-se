'use client'
import { useState, useEffect } from 'react'

const RELEASE = new Date('2026-11-19T00:00:00').getTime()

export default function Countdown() {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    const calc = () => {
      const diff = RELEASE - Date.now()
      setDays(diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0)
    }
    calc()
    const id = setInterval(calc, 60000)
    return () => clearInterval(id)
  }, [])

  if (days === null) return null

  const digitStyle: React.CSSProperties = {
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    letterSpacing: '0.06em',
    lineHeight: 1,
    color: '#FFD166',
    textShadow: '0 0 20px rgba(255, 209, 102, 0.4), 0 0 50px rgba(255, 140, 66, 0.2), 0 0 80px rgba(255, 107, 26, 0.1)',
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: '0.75rem',
      padding: '0.75rem 1.5rem',
      background: 'rgba(255, 209, 102, 0.04)',
      border: '1px solid rgba(255, 209, 102, 0.12)',
      borderRadius: '6px',
      backdropFilter: 'blur(8px)',
    }}>
      <span style={digitStyle}>{days}</span>
      <span style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 700,
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(255, 209, 102, 0.6)',
      }}>
        DAGAR KVAR
      </span>
    </div>
  )
}
