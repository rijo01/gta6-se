import { getAllArticles } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const categoryNav = [
  { href: '/nyheter', label: 'Nyheter', desc: 'Senaste nytt från Rockstar', color: '#FF2D7B' },
  { href: '/guider', label: 'Guider', desc: 'Tips, tricks & hemligheter', color: '#00F5FF' },
  { href: '/karaktarer', label: 'Karaktärer', desc: 'Jason, Lucia & mer', color: '#9B2FFF' },
  { href: '/release', label: 'Release', desc: 'Datum, plattformar & rykten', color: '#FF6B1A' },
]

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles[0]
  const recent = articles.slice(1, 7)

  return (
    <>
      <Header />
      <main style={{ paddingTop: '56px' }}>
        {/* Hero — Vice City Sunset */}
        <section className="hero-gradient" style={{ padding: '6rem 1rem 5rem', position: 'relative', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          {/* Scanline overlay */}
          <div className="scanlines" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

          {/* Horizon glow line */}
          <div className="horizon-line glow-pulse" />

          {/* Top ambient glow — pink/purple */}
          <div style={{
            position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)',
            width: '900px', height: '500px',
            background: 'radial-gradient(ellipse, rgba(155,47,255,0.12) 0%, rgba(255,45,123,0.08) 30%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Warm sunset glow at center */}
          <div style={{
            position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '1200px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(255,107,26,0.08) 0%, rgba(255,45,123,0.04) 40%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <p className="cat-badge fade-up neon-text-pink" style={{ color: '#FF2D7B', marginBottom: '1rem', display: 'block', fontSize: '0.7rem' }}>
              Sveriges #1 GTA 6-sajt
            </p>
            <h1 className="fade-up-delay" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              letterSpacing: '0.05em',
              lineHeight: 0.95,
              background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8C42 40%, #FFD166 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 30px rgba(255, 107, 157, 0.3)) drop-shadow(0 0 60px rgba(255, 140, 66, 0.15))',
            }}>
              GRAND THEFT<br />AUTO VI
            </h1>
            <p className="fade-up-delay-2" style={{ color: '#8A7A90', fontSize: '1.05rem', maxWidth: '520px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Nyheter, guider, karaktärsanalyser och release-information — allt om GTA 6 på svenska.
            </p>

            {/* Category pills with neon glow */}
            <div className="fade-up-delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {categoryNav.map(cat => (
                <Link key={cat.href} href={cat.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.5rem 1.25rem',
                  border: `1px solid ${cat.color}40`,
                  borderRadius: '2px',
                  color: cat.color,
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  background: `${cat.color}08`,
                  boxShadow: `0 0 12px ${cat.color}10`,
                }}>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category cards strip */}
        <section style={{ background: '#0D080A', borderTop: '1px solid rgba(255,45,123,0.1)', borderBottom: '1px solid rgba(255,45,123,0.1)' }}>
          <div className="max-w-6xl mx-auto px-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {categoryNav.map((cat, i) => (
              <Link key={cat.href} href={cat.href}
                style={{
                  padding: '1.5rem 1rem',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'block',
                }}
                className="hover:bg-white/[0.02]">
                <span className="cat-badge" style={{ color: cat.color, display: 'block', marginBottom: '0.35rem', textShadow: `0 0 10px ${cat.color}40` }}>{cat.label}</span>
                <span style={{ fontSize: '0.75rem', color: '#554A58' }}>{cat.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          {/* Featured article */}
          {featured && (
            <section style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span className="accent-line" />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A4E60' }}>
                  Senaste
                </span>
              </div>
              <ArticleCard article={featured} featured />
            </section>
          )}

          {/* Recent articles grid */}
          {recent.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span className="accent-line" />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A4E60' }}>
                  Fler artiklar
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
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
