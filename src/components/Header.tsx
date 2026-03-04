'use client'
import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/nyheter', label: 'Nyheter' },
  { href: '/guider', label: 'Guider' },
  { href: '/karaktarer', label: 'Karaktärer' },
  { href: '/release', label: 'Release' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ borderBottom: '1px solid #1E1E1E', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', letterSpacing: '0.06em', color: '#C8A84B' }}>
            GTA6
          </span>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase', marginTop: '2px' }}>
            .SE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', transition: 'color 0.2s' }}
              className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span style={{ display: 'block', width: '22px', height: '2px', background: open ? '#C8A84B' : '#888', transition: 'all 0.2s', transform: open ? 'rotate(45deg) translateY(5px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#888', opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: open ? '#C8A84B' : '#888', transition: 'all 0.2s', transform: open ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '1px solid #1E1E1E', background: '#0A0A0A' }} className="md:hidden px-4 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CCC' }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
