import { getAllArticles } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const categoryNav = [
  { href: '/nyheter', label: 'Nyheter', desc: 'Senaste nytt från Rockstar', color: '#E8531A' },
  { href: '/guider', label: 'Guider', desc: 'Tips, tricks & hemligheter', color: '#3B82F6' },
  { href: '/karaktarer', label: 'Karaktärer', desc: 'Jason, Lucia & mer', color: '#8B5CF6' },
  { href: '/release', label: 'Release', desc: 'Datum, plattformar & rykten', color: '#C8A84B' },
]

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles[0]
  const recent = articles.slice(1, 7)

  return (
    <>
      <Header />
      <main style={{ paddingTop: '56px' }}>
        {/* Hero */}
        <section className="hero-gradient" style={{ padding: '5rem 1rem 4rem', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative grid */}
          <div className="scanlines" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />

          {/* Glow */}
          <div style={{
            position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(200,168,75,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <p className="cat-badge fade-up" style={{ color: '#C8A84B', marginBottom: '0.75rem', display: 'block' }}>
              Sveriges #1 GTA 6-sajt
            </p>
            <h1 className="fade-up-delay" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              letterSpacing: '0.04em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #F0F0F0 0%, #C8A84B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}>
              GRAND THEFT<br />AUTO 6
            </h1>
            <p className="fade-up-delay-2" style={{ color: '#777', fontSize: '1rem', maxWidth: '500px', marginBottom: '2.5rem' }}>
              Nyheter, guider, karaktärsanalyser och release-information — allt om GTA 6 på svenska.
            </p>

            {/* Category pills */}
            <div className="fade-up-delay-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categoryNav.map(cat => (
                <Link key={cat.href} href={cat.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 1rem',
                  border: `1px solid ${cat.color}33`,
                  borderRadius: '2px',
                  color: cat.color,
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  background: `${cat.color}11`,
                }}>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category cards */}
        <section style={{ background: '#0D0D0D', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A' }}>
          <div className="max-w-6xl mx-auto px-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {categoryNav.map((cat, i) => (
              <Link key={cat.href} href={cat.href}
                style={{
                  padding: '1.25rem 1rem',
                  borderRight: i < 3 ? '1px solid #1A1A1A' : 'none',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  display: 'block',
                }}
                className="hover:bg-white/[0.02]">
                <span className="cat-badge" style={{ color: cat.color, display: 'block', marginBottom: '0.3rem' }}>{cat.label}</span>
                <span style={{ fontSize: '0.75rem', color: '#555' }}>{cat.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          {/* Featured article */}
          {featured && (
            <section style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <span className="accent-line" />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666' }}>
                  Senaste
                </span>
              </div>
              <ArticleCard article={featured} featured />
            </section>
          )}

          {/* Recent articles grid */}
          {recent.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <span className="accent-line" />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666' }}>
                  Fler artiklar
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {recent.map(article => (
                  <ArticleCard key={`${article.category}-${article.slug}`} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {articles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#444' }}>
              <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: '#2A2A2A' }}>
                Innehåll laddas snart
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>MaxiAI startar publicering kl 08:00</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
