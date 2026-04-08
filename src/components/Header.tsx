'use client'
import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/nyheter', label: 'Nyheter', color: '#FF2D7B' },
  { href: '/guider', label: 'Guider', color: '#00F5FF' },
  { href: '/karaktarer', label: 'Karaktärer', color: '#9B2FFF' },
  { href: '/release', label: 'Release', color: '#FF6B1A' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <header style={{
      background: 'rgba(7,4,10,0.92)',
      backdropFilter: 'blur(16px)',
      top: '32px',
    }} className="fixed left-0 right-0 z-50">
      <div className="header-border" />

      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between" style={{ height: '56px' }}>
        {/* Logo — clean, no flicker */}
        <Link href="/" className="flex items-center gap-0.5" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.9rem', letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #FF6B9D, #FF8C42, #FFD166)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 10px rgba(255,107,157,0.25))',
          }}>
            GTA6
          </span>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.9rem', letterSpacing: '0.05em',
            color: '#00F5FF',
            textShadow: '0 0 8px rgba(0,245,255,0.3)',
          }}>
            .SE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: hovered === link.href ? link.color : '#7A6880',
                textShadow: hovered === link.href ? `0 0 10px ${link.color}50` : 'none',
                textDecoration: 'none', transition: 'all 0.25s', padding: '0.25rem 0',
                borderBottom: hovered === link.href ? `1px solid ${link.color}60` : '1px solid transparent',
              }}
              onMouseEnter={() => setHovered(link.href)}
              onMouseLeave={() => setHovered(null)}
            >
              {link.label}
            </Link>
          ))}
          <a href="https://twitter.com/GTA6_SE" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
              fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#FF2D7B', textDecoration: 'none',
              padding: '0.25rem 0.65rem',
              border: '1px solid rgba(255,45,123,0.25)',
              borderRadius: '2px', transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FF2D7B'; e.currentTarget.style.color = '#07040A' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF2D7B' }}
          >
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            @GTA6_SE
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          <div style={{ width: 22, height: 14, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: open ? '#FF2D7B' : '#7A6880', transition: 'all 0.25s', top: open ? '6px' : 0, transform: open ? 'rotate(45deg)' : 'none' }} />
            <span style={{ position: 'absolute', left: 0, top: '6px', width: '100%', height: '2px', background: '#7A6880', opacity: open ? 0 : 1, transition: 'opacity 0.15s' }} />
            <span style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: open ? '#FF2D7B' : '#7A6880', transition: 'all 0.25s', top: open ? '6px' : '12px', transform: open ? 'rotate(-45deg)' : 'none' }} />
          </div>
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid #1A1325', background: 'rgba(7,4,10,0.98)', backdropFilter: 'blur(20px)' }} className="md:hidden px-5 py-5 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '1.1rem',
              letterSpacing: '0.15em', textTransform: 'uppercase', color: link.color, textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid #1A1325', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
            <a href="https://twitter.com/GTA6_SE" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FF2D7B', textDecoration: 'none',
            }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              Följ @GTA6_SE
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
