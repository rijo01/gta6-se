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

  return (
    <header style={{
      borderBottom: '1px solid rgba(255, 45, 123, 0.1)',
      background: 'rgba(10, 6, 9, 0.92)',
      backdropFilter: 'blur(16px)',
    }} className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient border glow */}
      <div style={{
        position: 'absolute', bottom: -1, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,45,123,0.3) 20%, rgba(255,107,26,0.3) 50%, rgba(0,245,255,0.3) 80%, transparent)',
      }} />

      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.6rem',
            letterSpacing: '0.06em',
            background: 'linear-gradient(135deg, #FF6B9D, #FF8C42, #FFD166)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 8px rgba(255, 107, 157, 0.3))',
          }}>
            GTA6
          </span>
          <span style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 700,
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: '#00F5FF',
            textTransform: 'uppercase',
            marginTop: '2px',
            textShadow: '0 0 8px rgba(0, 245, 255, 0.3)',
          }}>
            .SE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#6A5E70',
                transition: 'color 0.2s, text-shadow 0.2s',
                textDecoration: 'none',
              }}
              className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span style={{ display: 'block', width: '22px', height: '2px', background: open ? '#FF2D7B' : '#6A5E70', transition: 'all 0.2s', transform: open ? 'rotate(45deg) translateY(5px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#6A5E70', opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: open ? '#FF2D7B' : '#6A5E70', transition: 'all 0.2s', transform: open ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '1px solid rgba(255,45,123,0.1)', background: '#0A0609' }} className="md:hidden px-4 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: link.color,
                textShadow: `0 0 10px ${link.color}30`,
                textDecoration: 'none',
              }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
