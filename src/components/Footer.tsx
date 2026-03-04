import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1E1E1E', background: '#0A0A0A', marginTop: '5rem' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
          {/* Brand */}
          <div>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.75rem', color: '#C8A84B', display: 'block', marginBottom: '0.5rem' }}>
              GTA6.SE
            </span>
            <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.6 }}>
              Sveriges ledande källa för nyheter, guider och information om Grand Theft Auto 6.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: '1rem' }}>
              Innehåll
            </h3>
            {[
              { href: '/nyheter', label: 'Nyheter' },
              { href: '/guider', label: 'Guider' },
              { href: '/karaktarer', label: 'Karaktärer' },
              { href: '/release', label: 'Release' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.4rem', textDecoration: 'none' }}
                className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Disclaimer */}
          <div>
            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: '1rem' }}>
              Om sajten
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#444', lineHeight: 1.7 }}>
              GTA6.se är en oberoende fansite. Vi är inte affilierade med Rockstar Games eller Take-Two Interactive.
              Grand Theft Auto är ett varumärke tillhörande Take-Two Interactive Software, Inc.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1A1A1A', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.7rem', color: '#333', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} GTA6.SE — ALLA RÄTTIGHETER FÖRBEHÅLLNA
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[{ href: '/integritetspolicy', label: 'Integritetspolicy' }, { href: '/om-oss', label: 'Om oss' }].map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: '0.7rem', color: '#333', textDecoration: 'none' }} className="hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
