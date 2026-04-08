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
    <div className="grid grid-cols-4 gap-2 sm:gap-3" style={{ maxWidth: '380px' }}>
      {values.map((val, i) => (
        <div key={labels[i]} style={{
          background: 'rgba(10, 6, 15, 0.8)',
          border: '1px solid rgba(255, 45, 123, 0.25)',
          borderRadius: '2px',
          padding: 'clamp(0.5rem, 1.2vw, 0.8rem) clamp(0.4rem, 1vw, 0.6rem)',
          textAlign: 'center',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 15px rgba(255, 45, 123, 0.06)',
        }}>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            lineHeight: 1, display: 'block',
            background: 'linear-gradient(135deg, #FF6B9D, #FF8C42, #FFD166)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {String(val).padStart(i === 0 ? 1 : 2, '0')}
          </span>
          <span style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
            fontSize: '0.5rem', letterSpacing: '0.18em',
            color: '#5A4E60', display: 'block', marginTop: '0.25rem',
          }}>
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  )
}
