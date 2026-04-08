'use client'

const items = [
  'GTA 6 LANSERAS 19 NOVEMBER 2026',
  'TRAILER 3 VÄNTAS MAJ/JUNI 2026',
  'FÖRBESTÄLLNINGAR ÖPPNAR SNART',
  'VICE CITY · PS5 · XBOX SERIES X',
]

const scrollText = items.join(' \u00B7 ') + ' \u00B7 '

export default function NewsTicker() {
  return (
    <div style={{
      height: '32px',
      background: '#0D0A12',
      borderBottom: '1px solid #1A1325',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    }}>
      {/* LIVE badge — left */}
      <div style={{
        position: 'relative', zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        padding: '0 1rem 0 0.75rem',
        flexShrink: 0,
        background: '#0D0A12',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF2D7B', boxShadow: '0 0 6px #FF2D7B', flexShrink: 0 }} />
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.12em', color: '#FF2D7B' }}>LIVE</span>
      </div>

      {/* Scrolling text */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30px', background: 'linear-gradient(90deg, #0D0A12, transparent)', zIndex: 2 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '30px', background: 'linear-gradient(270deg, #0D0A12, transparent)', zIndex: 2 }} />
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'marquee 40s linear infinite',
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600,
          fontSize: '0.72rem', letterSpacing: '0.08em',
          color: '#E8DFF0',
        }}>
          <span>{scrollText}{scrollText}{scrollText}</span>
          <span>{scrollText}{scrollText}{scrollText}</span>
        </div>
      </div>

      {/* GTA6.SE — right */}
      <div style={{
        position: 'relative', zIndex: 3,
        padding: '0 0.75rem 0 1rem',
        flexShrink: 0,
        background: '#0D0A12',
      }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.85rem', color: '#00F5FF', letterSpacing: '0.05em' }}>GTA6.SE</span>
      </div>
    </div>
  )
}
