'use client'
import Link from 'next/link'

const links = [
  { href: '/nyheter', label: 'Nyheter', color: '#FF2D7B' },
  { href: '/guider', label: 'Guider', color: '#00F5FF' },
  { href: '/karaktarer', label: 'Karaktärer', color: '#9B2FFF' },
  { href: '/release', label: 'Release', color: '#FF6B1A' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#05030A', position: 'relative', marginTop: '4rem' }}>
      {/* Top gradient line */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #FF2D7B44 20%, #FF6B1A55 40%, #FFD16644 55%, #00F5FF44 75%, transparent)' }} />

      {/* Background watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(5rem, 20vw, 14rem)',
        letterSpacing: '0.08em', color: 'rgba(255,255,255,0.015)',
        whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
      }}>
        19 NOVEMBER 2026
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14" style={{ position: 'relative', zIndex: 1 }}>
        {/* Logo centered */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', letterSpacing: '0.06em',
            background: 'linear-gradient(135deg, #FF6B9D, #FF8C42, #FFD166)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 15px rgba(255,107,157,0.2))',
          }}>
            GTA6.SE
          </span>
        </div>

        {/* Tagline */}
        <p style={{ textAlign: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A2E45', marginBottom: '2.5rem' }}>
          Sveriges #1 källa för GTA 6 på svenska
        </p>

        {/* Nav links — 2 rows centered */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.8rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: l.color, opacity: 0.6, textDecoration: 'none', transition: 'opacity 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.6' }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Twitter */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <a href="https://twitter.com/GTA6_SE" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.45rem 0.9rem', border: '1px solid rgba(255,45,123,0.2)',
            borderRadius: '2px', color: '#FF2D7B',
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
            fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'all 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#FF2D7B'
            e.currentTarget.style.color = '#07040A'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#FF2D7B'
          }}
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            @GTA6_SE
          </a>
        </div>

        {/* Bottom line */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.025)', paddingTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.62rem', color: '#1E1628', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.08em', lineHeight: 1.8 }}>
            © {new Date().getFullYear()} GTA6.SE &middot; Ej affilierad med Rockstar Games eller Take-Two Interactive
            <br />Grand Theft Auto är ett varumärke tillhörande Take-Two Interactive Software, Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
