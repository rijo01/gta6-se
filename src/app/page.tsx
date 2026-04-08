import { getAllArticles } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CountdownHero from '@/components/CountdownHero'
import Link from 'next/link'

const cats = [
  { href: '/nyheter', label: 'Nyheter', desc: 'Trailers, tillkännagivanden och uppdateringar', color: '#FF2D7B', count: 'nyheter' },
  { href: '/guider', label: 'Guider', desc: 'Tips, tricks och djupgående spelguider', color: '#00F5FF', count: 'guider' },
  { href: '/karaktarer', label: 'Karaktärer', desc: 'Lucia, Jason och Vice Citys invånare', color: '#9B2FFF', count: 'karaktarer' },
  { href: '/release', label: 'Release', desc: 'Datum, plattformar och förbeställningar', color: '#FF6B1A', count: 'release' },
]

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles[0]
  const recent = articles.slice(1, 7)

  return (
    <>
      <Header />
      <main style={{ paddingTop: '56px' }}>

        {/* ═══ HERO — Vice City Cover Page ═══ */}
        <section className="hero-gradient" style={{
          minHeight: '100vh', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center',
          padding: '8rem 1.5rem 6rem',
        }}>
          {/* Scanlines */}
          <div className="scanlines-overlay" />

          {/* Horizon glow */}
          <div className="horizon-line" />

          {/* Left decorative vertical text */}
          <div style={{
            position: 'absolute', left: 'clamp(1rem, 3vw, 2.5rem)', top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            transformOrigin: 'center center',
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
            fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase',
            color: 'rgba(255, 45, 123, 0.08)',
            whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>
            VICE CITY &middot; LEONIDA &middot; 2026
          </div>

          {/* Ambient glows */}
          <div style={{ position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '600px', background: 'radial-gradient(ellipse, rgba(155,47,255,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', width: '1200px', height: '400px', background: 'radial-gradient(ellipse, rgba(255,107,26,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

          {/* Grid dots decoration — right side */}
          <div style={{
            position: 'absolute', right: 'clamp(1rem, 5vw, 4rem)', top: '50%', transform: 'translateY(-50%)',
            width: '120px', height: '200px',
            backgroundImage: 'radial-gradient(circle, rgba(255,45,123,0.1) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            pointerEvents: 'none', opacity: 0.5,
          }} />

          <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            {/* Eyebrow */}
            <p className="fade-up neon-text-cyan" style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
              fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#00F5FF', marginBottom: '1.5rem',
            }}>
              Sverige &middot; Grand Theft Auto VI
            </p>

            {/* Main title */}
            <h1 className="fade-up-d1" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(4.5rem, 15vw, 11rem)',
              letterSpacing: '0.06em',
              lineHeight: 0.88,
              background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8C42 35%, #FFD166 70%, #FFE8AA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.25rem',
              filter: 'drop-shadow(0 0 40px rgba(255,107,157,0.3)) drop-shadow(0 0 80px rgba(255,140,66,0.15))',
            }}>
              GRAND THEFT<br />AUTO VI
            </h1>

            {/* Divider */}
            <div className="fade-up-d2" style={{
              width: '80px', height: '2px', marginBottom: '1.5rem',
              background: 'linear-gradient(90deg, #FF2D7B, #FF6B1A, #FFD166)',
              boxShadow: '0 0 12px rgba(255,107,26,0.4)',
            }} />

            {/* Release info */}
            <p className="fade-up-d2 neon-text-gold" style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
              fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#FFD166', marginBottom: '2rem',
            }}>
              19 &middot; NOV &middot; 2026
            </p>

            {/* Countdown */}
            <div className="fade-up-d3" style={{ marginBottom: '2.5rem' }}>
              <CountdownHero />
            </div>

            {/* CTA buttons */}
            <div className="fade-up-d4" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/nyheter" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                background: 'rgba(255,45,123,0.12)', border: '1px solid rgba(255,45,123,0.35)',
                borderRadius: '2px', color: '#FF2D7B',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.3s',
              }}>
                Senaste nytt <span style={{ fontSize: '1rem' }}>&rarr;</span>
              </Link>
              <Link href="/guider" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                background: 'transparent', border: '1px solid rgba(0,245,255,0.25)',
                borderRadius: '2px', color: '#00F5FF',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.3s',
              }}>
                Komplett guide <span style={{ fontSize: '1rem' }}>&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ CATEGORY GRID — 2x2 mobile, 4-col desktop ═══ */}
        <section style={{ background: '#0A0710', borderTop: '1px solid rgba(255,45,123,0.06)', borderBottom: '1px solid rgba(255,45,123,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
            {cats.map((cat, i) => (
              <Link key={cat.href} href={cat.href}
                className="article-card block"
                style={{
                  padding: '2rem 1.25rem',
                  borderRight: (i < 3 && i !== 1) ? '1px solid rgba(255,255,255,0.03)' : (i === 1 ? '1px solid rgba(255,255,255,0.03)' : 'none'),
                  textDecoration: 'none',
                }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: cat.color, display: 'block', marginBottom: '0.4rem', textShadow: `0 0 20px ${cat.color}30`, lineHeight: 1 }}>
                  {cat.label}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#4A3E55', display: 'block', lineHeight: 1.5 }}>{cat.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ FEATURED ARTICLE ═══ */}
        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          {featured && (
            <section style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                <span className="accent-line" />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A3E55' }}>
                  Senaste
                </span>
              </div>
              <ArticleCard article={featured} featured />
            </section>
          )}

          {/* ═══ ARTICLE GRID ═══ */}
          {recent.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                <span className="accent-line" />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A3E55' }}>
                  Fler artiklar
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {recent.map(a => (
                  <ArticleCard key={`${a.category}-${a.slug}`} article={a} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
