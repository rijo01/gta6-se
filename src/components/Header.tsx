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
      borderBottom: '1px solid rgba(255, 45, 123, 0.06)',
      background: 'rgba(10, 6, 9, 0.88)',
      backdropFilter: 'blur(20px) saturate(1.4)',
    }} className="fixed top-0 left-0 right-0 z-50">
      {/* Animated shimmer border */}
      <div className="header-shimmer" style={{
        position: 'absolute', bottom: -1, left: 0, right: 0, height: '1px',
      }} />

      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo — GTA6 gradient + .SE neon flicker */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.75rem',
            letterSpacing: '0.06em',
            background: 'linear-gradient(135deg, #FF6B9D, #FF8C42, #FFD166)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.35)) drop-shadow(0 0 20px rgba(255, 140, 66, 0.15))',
          }}>
            GTA6
          </span>
          <span className="neon-flicker" style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 700,
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: '#00F5FF',
            textTransform: 'uppercase',
            marginTop: '3px',
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
                transition: 'color 0.25s, text-shadow 0.25s',
                textDecoration: 'none',
                position: 'relative',
                padding: '0.25rem 0',
              }}
              className="hover:text-white"
              onMouseEnter={e => {
                e.currentTarget.style.color = link.color
                e.currentTarget.style.textShadow = `0 0 12px ${link.color}60, 0 0 30px ${link.color}20`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#6A5E70'
                e.currentTarget.style.textShadow = 'none'
              }}
            >
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
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FF2D7B',
              textDecoration: 'none',
              padding: '0.3rem 0.7rem',
              border: '1px solid rgba(255, 45, 123, 0.2)',
              borderRadius: '4px',
              transition: 'all 0.25s',
            }}
            className="hover:shadow-[0_0_16px_rgba(255,45,123,0.25)]"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
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
        <div style={{ borderTop: '1px solid rgba(255,45,123,0.08)', background: 'rgba(10, 6, 9, 0.97)', backdropFilter: 'blur(20px)' }} className="md:hidden px-4 py-4 flex flex-col gap-4">
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
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600,
              fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#FF2D7B', textShadow: '0 0 10px rgba(255,45,123,0.3)',
              textDecoration: 'none', marginTop: '0.5rem', paddingTop: '0.75rem',
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
