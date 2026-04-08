'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255, 45, 123, 0.06)', background: '#08050A', marginTop: '5rem', position: 'relative' }}>
      {/* Gradient top border */}
      <div style={{
        position: 'absolute', top: -1, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,45,123,0.2) 20%, rgba(255,107,26,0.25) 50%, rgba(0,245,255,0.2) 80%, transparent)',
      }} />

      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Glowing release date centerpiece */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            letterSpacing: '0.12em',
            background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8C42 40%, #FFD166 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(255, 140, 66, 0.25))',
            display: 'block',
          }}>
            19 NOVEMBER 2026
          </span>
          <span style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 700,
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#3A2E40',
            display: 'block',
            marginTop: '0.5rem',
          }}>
            VICE CITY &middot; PS5 &middot; XBOX SERIES X
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
          {/* Brand */}
          <div>
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '1.75rem',
              display: 'block',
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #FF6B9D, #FF8C42, #FFD166)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 8px rgba(255, 107, 157, 0.2))',
            }}>
              GTA6.SE
            </span>
            <p style={{ fontSize: '0.8rem', color: '#4A3E50', lineHeight: 1.6 }}>
              Sveriges ledande källa för nyheter, guider och information om Grand Theft Auto 6.
            </p>
          </div>

          {/* Category links in neon colors */}
          <div>
            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A4E60', marginBottom: '1rem' }}>
              Innehåll
            </h3>
            {[
              { href: '/nyheter', label: 'Nyheter', color: '#FF2D7B' },
              { href: '/guider', label: 'Guider', color: '#00F5FF' },
              { href: '/karaktarer', label: 'Karaktärer', color: '#9B2FFF' },
              { href: '/release', label: 'Release', color: '#FF6B1A' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                style={{
                  display: 'block', fontSize: '0.85rem', color: link.color, marginBottom: '0.6rem',
                  textDecoration: 'none', transition: 'text-shadow 0.2s', opacity: 0.7,
                  textShadow: `0 0 8px ${link.color}00`,
                }}
                className="hover:opacity-100"
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.textShadow = `0 0 12px ${link.color}60`
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.textShadow = `0 0 8px ${link.color}00`
                  e.currentTarget.style.opacity = '0.7'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social / Twitter */}
          <div>
            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A4E60', marginBottom: '1rem' }}>
              Följ oss
            </h3>
            <a
              href="https://twitter.com/GTA6_SE"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', borderRadius: '5px',
                background: 'rgba(255, 45, 123, 0.06)',
                border: '1px solid rgba(255, 45, 123, 0.12)',
                color: '#FF2D7B', fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em',
                textDecoration: 'none', textTransform: 'uppercase', transition: 'all 0.25s',
                marginBottom: '0.75rem',
              }}
              className="hover:shadow-[0_0_20px_rgba(255,45,123,0.15)]"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @GTA6_SE på X
            </a>
            <p style={{ fontSize: '0.72rem', color: '#3A2E40', lineHeight: 1.7 }}>
              Följ oss för senaste GTA 6-nyheterna
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A4E60', marginBottom: '1rem' }}>
              Om sajten
            </h3>
            <p style={{ fontSize: '0.72rem', color: '#2E2434', lineHeight: 1.7 }}>
              GTA6.se är en oberoende fansite. Vi är inte affilierade med Rockstar Games eller Take-Two Interactive.
              Grand Theft Auto är ett varumärke tillhörande Take-Two Interactive Software, Inc.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.025)', marginTop: '3rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.65rem', color: '#1E1624', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.08em' }}>
            © {new Date().getFullYear()} GTA6.SE — ALLA RÄTTIGHETER FÖRBEHÅLLNA
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[{ href: '/integritetspolicy', label: 'Integritetspolicy' }, { href: '/om-oss', label: 'Om oss' }].map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: '0.65rem', color: '#1E1624', textDecoration: 'none' }} className="hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
