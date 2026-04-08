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
          <a
            href="https://twitter.com/GTA6_SE"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FF2D7B',
              textDecoration: 'none',
              padding: '0.3rem 0.7rem',
              border: '1px solid rgba(255, 45, 123, 0.2)',
              borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            className="hover:shadow-[0_0_12px_rgba(255,45,123,0.2)]"
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @GTA6_SE
          </a>
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
          <a
            href="https://twitter.com/GTA6_SE"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#FF2D7B',
              textShadow: '0 0 10px rgba(255,45,123,0.3)',
              textDecoration: 'none',
              marginTop: '0.5rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(255,45,123,0.1)',
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Följ @GTA6_SE
          </a>
        </div>
      )}
    </header>
  )
}
