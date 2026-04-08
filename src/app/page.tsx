import { getAllArticles } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Countdown from '@/components/Countdown'
import Link from 'next/link'

const categoryNav = [
  { href: '/nyheter', label: 'Nyheter', desc: 'Senaste nytt från Rockstar', color: '#FF2D7B' },
  { href: '/guider', label: 'Guider', desc: 'Tips, tricks & hemligheter', color: '#00F5FF' },
  { href: '/karaktarer', label: 'Karaktärer', desc: 'Jason, Lucia & mer', color: '#9B2FFF' },
  { href: '/release', label: 'Release', desc: 'Datum, plattformar & rykten', color: '#FF6B1A' },
]

/* Simple palm tree silhouette SVG */
function PalmSilhouette({ side }: { side: 'left' | 'right' }) {
  const flip = side === 'right' ? 'scaleX(-1)' : 'none'
  return (
    <svg
      viewBox="0 0 200 600"
      fill="none"
      style={{
        position: 'absolute',
        [side]: 0,
        bottom: '10%',
        height: '70%',
        maxHeight: '500px',
        transform: flip,
        opacity: 0.06,
        pointerEvents: 'none',
      }}
    >
      {/* Trunk */}
      <path d="M100 600 C95 500, 85 400, 90 300 C92 250, 98 220, 100 200" stroke="#9B2FFF" strokeWidth="8" fill="none" />
      {/* Fronds */}
      <path d="M100 200 C80 180, 30 170, 5 190" stroke="#3A8040" strokeWidth="4" fill="none" />
      <path d="M100 200 C85 170, 40 140, 10 145" stroke="#3A8040" strokeWidth="4" fill="none" />
      <path d="M100 200 C110 165, 130 130, 170 125" stroke="#3A8040" strokeWidth="4" fill="none" />
      <path d="M100 200 C115 175, 150 160, 190 170" stroke="#3A8040" strokeWidth="4" fill="none" />
      <path d="M100 200 C95 160, 80 120, 50 100" stroke="#3A8040" strokeWidth="3" fill="none" />
      <path d="M100 200 C108 155, 140 110, 180 100" stroke="#3A8040" strokeWidth="3" fill="none" />
    </svg>
  )
}

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles[0]
  const recent = articles.slice(1, 7)

  return (
    <>
      <Header />
      <main style={{ paddingTop: '56px' }}>
        {/* ═══ Hero — Vice City Sunset ═══ */}
        <section className="hero-gradient" style={{ padding: '6rem 1rem 5rem', position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
          {/* Scanline overlay */}
          <div className="scanlines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

          {/* Horizon glow line */}
          <div className="horizon-line glow-pulse" />

          {/* Palm silhouettes */}
          <PalmSilhouette side="left" />
          <PalmSilhouette side="right" />

          {/* Top ambient glow — purple/pink nebula */}
          <div style={{
            position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
            width: '1100px', height: '600px',
            background: 'radial-gradient(ellipse, rgba(155,47,255,0.1) 0%, rgba(255,45,123,0.06) 35%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Warm sunset glow at horizon */}
          <div style={{
            position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '1400px', height: '500px',
            background: 'radial-gradient(ellipse, rgba(255,107,26,0.1) 0%, rgba(255,45,123,0.05) 40%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <p className="cat-badge fade-up neon-text-pink" style={{ color: '#FF2D7B', marginBottom: '1.25rem', display: 'block', fontSize: '0.7rem' }}>
              Sveriges #1 GTA 6-sajt
            </p>

            {/* Main title — cinematic scale */}
            <h1 className="fade-up-delay" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(4.5rem, 14vw, 11rem)',
              letterSpacing: '0.08em',
              lineHeight: 0.9,
              background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8C42 35%, #FFD166 70%, #FFE4A0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 40px rgba(255, 107, 157, 0.35)) drop-shadow(0 0 80px rgba(255, 140, 66, 0.2)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            }}>
              GRAND THEFT<br />AUTO VI
            </h1>

            {/* Subtitle — neon cyan small caps */}
            <p className="fade-up-delay-2 neon-text-cyan" style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#00F5FF',
              marginBottom: '2rem',
            }}>
              19 November 2026 &middot; Vice City &middot; PS5 &middot; Xbox Series X
            </p>

            {/* Countdown widget */}
            <div className="fade-up-delay-3" style={{ marginBottom: '2.5rem' }}>
              <Countdown />
            </div>

            {/* Description */}
            <p className="fade-up-delay-3" style={{ color: '#8A7A90', fontSize: '1rem', maxWidth: '520px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Nyheter, guider, karaktärsanalyser och release-information — allt om GTA 6 på svenska.
            </p>

            {/* Category pills — neon buttons */}
            <div className="fade-up-delay-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
              {categoryNav.map(cat => (
                <Link key={cat.href} href={cat.href} className="article-card" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.4rem',
                  border: `1px solid ${cat.color}35`,
                  borderRadius: '4px',
                  color: cat.color,
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  background: `linear-gradient(135deg, ${cat.color}0A, ${cat.color}04)`,
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                }}>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Category cards strip ═══ */}
        <section style={{ background: '#0D080A', borderTop: '1px solid rgba(255,45,123,0.08)', borderBottom: '1px solid rgba(255,45,123,0.08)' }}>
          <div className="max-w-6xl mx-auto px-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {categoryNav.map((cat, i) => (
              <Link key={cat.href} href={cat.href}
                style={{
                  padding: '1.75rem 1rem',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  position: 'relative',
                }}
                className="hover:bg-white/[0.02]">
                <span className="cat-badge" style={{ color: cat.color, display: 'block', marginBottom: '0.4rem', textShadow: `0 0 12px ${cat.color}50` }}>{cat.label}</span>
                <span style={{ fontSize: '0.75rem', color: '#554A58' }}>{cat.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ Articles ═══ */}
        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          {/* Featured article */}
          {featured && (
            <section style={{ marginBottom: '4rem' }}>
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
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
