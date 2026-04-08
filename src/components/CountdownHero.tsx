'use client'
import { useState, useEffect } from 'react'

const TARGET = new Date('2026-11-19T00:00:00+01:00').getTime()

function calc() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

const labels = ['DAGAR', 'TIMMAR', 'MIN', 'SEK'] as const

function Sep() {
  return (
    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#FF6B1A', alignSelf: 'center', opacity: 0.6 }}>:</span>
  )
}

export default function CountdownHero() {
  const [time, setTime] = useState<ReturnType<typeof calc> | null>(null)

  useEffect(() => {
    setTime(calc())
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return <div style={{ height: '80px' }} />

  const values = [time.days, time.hours, time.minutes, time.seconds]

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(0.3rem, 1vw, 0.6rem)' }}>
      {values.map((val, i) => (
        <div key={labels[i]} style={{ display: 'contents' }}>
          <div style={{
            background: '#100C15',
            border: '1px solid rgba(255,107,26,0.35)',
            borderRadius: '2px',
            padding: 'clamp(0.5rem, 1.2vw, 0.75rem) clamp(0.6rem, 1.5vw, 1rem)',
            textAlign: 'center',
            minWidth: 'clamp(52px, 10vw, 76px)',
          }}>
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              lineHeight: 1, display: 'block',
              color: '#FFD166',
            }}>
              {String(val).padStart(i === 0 ? 1 : 2, '0')}
            </span>
            <span style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
              fontSize: '0.5rem', letterSpacing: '0.2em',
              color: '#5A4E60', display: 'block', marginTop: '0.2rem',
            }}>
              {labels[i]}
            </span>
          </div>
          {i < 3 && <Sep />}
        </div>
      ))}
    </div>
  )
}
