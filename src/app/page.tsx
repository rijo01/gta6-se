import { getAllArticles } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CountdownHero from '@/components/CountdownHero'
import CitySkyline from '@/components/CitySkyline'
import NeonSign from '@/components/NeonSign'
import Link from 'next/link'

const cats = [
  { href: '/nyheter', label: 'Nyheter', desc: 'Trailers, tillkännagivanden och uppdateringar', color: '#FF2D7B' },
  { href: '/guider', label: 'Guider', desc: 'Tips, tricks och djupgående spelguider', color: '#00F5FF' },
  { href: '/karaktarer', label: 'Karaktärer', desc: 'Lucia, Jason och Vice Citys invånare', color: '#9B2FFF' },
  { href: '/release', label: 'Release', desc: 'Datum, plattformar och förbeställningar', color: '#FF6B1A' },
]

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles[0]
  const recent = articles.slice(1, 7)

  return (
    <>
      <Header />
      <main style={{ paddingTop: '88px' }}> {/* 32px ticker + 56px header */}

        {/* ═══════════════════════════════════════════
            HERO — ENTER VICE CITY
            Layered cinematic sunset skyline
            ═══════════════════════════════════════════ */}
        <section className="vc-sky vc-stars" style={{
          minHeight: '100vh', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '6rem 1.5rem 4rem',
        }}>
          {/* Scanlines overlay */}
          <div className="scanlines-overlay" style={{ zIndex: 3 }} />

          {/* City silhouette */}
          <CitySkyline />

          {/* Neon ground glow */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '120%', height: '20%',
            background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,107,26,0.12) 0%, rgba(255,45,123,0.06) 40%, transparent 70%)',
            pointerEvents: 'none', zIndex: 3,
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '800px' }}>
            {/* Welcome */}
            <p className="fade-up neon-text-cyan" style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
              fontSize: '0.62rem', letterSpacing: '0.4em', textTransform: 'uppercase',
              color: '#00F5FF', marginBottom: '1rem', opacity: 0.7,
            }}>
              Välkommen till
            </p>

            {/* VICE CITY — massive neon pink */}
            <h1 className="fade-up-d1" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(4rem, 14vw, 10rem)',
              letterSpacing: '0.08em',
              lineHeight: 0.9,
              color: '#FF2D7B',
              textShadow: '0 0 20px #FF2D7B, 0 0 60px rgba(255,45,123,0.5), 0 0 120px rgba(255,45,123,0.2)',
              marginBottom: '1.25rem',
              animation: 'glow-pulse-text 3s ease-in-out infinite alternate',
            }}>
              VICE CITY
            </h1>

            {/* Divider line */}
            <div className="fade-up-d2" style={{
              width: '100%', maxWidth: '400px', height: '1px', margin: '0 auto 1.5rem',
              background: 'linear-gradient(90deg, transparent, #FF2D7B 20%, #FF6B1A 50%, #00F5FF 80%, transparent)',
              boxShadow: '0 0 8px rgba(255,107,26,0.3)',
            }} />

            {/* Subtitle */}
            <p className="fade-up-d2 neon-text-gold" style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
              fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#FFD166', marginBottom: '2.5rem',
            }}>
              Grand Theft Auto VI &middot; 19 November 2026
            </p>

            {/* Countdown */}
            <div className="fade-up-d3" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <CountdownHero />
            </div>

            {/* CTA buttons */}
            <div className="fade-up-d4" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/nyheter" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.65rem 1.6rem',
                background: 'rgba(255,45,123,0.15)', border: '1px solid rgba(255,45,123,0.4)',
                borderRadius: '2px', color: '#FF2D7B',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.3s',
                boxShadow: '0 0 15px rgba(255,45,123,0.1)',
              }}>
                Senaste nytt &rarr;
              </Link>
              <Link href="/guider" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.65rem 1.6rem',
                background: 'transparent', border: '1px solid rgba(0,245,255,0.3)',
                borderRadius: '2px', color: '#00F5FF',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.3s',
              }}>
                Komplett guide &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ CATEGORY GRID ═══ */}
        <section className="wet-asphalt" style={{ borderTop: '1px solid rgba(255,45,123,0.06)', borderBottom: '1px solid rgba(255,45,123,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
            {cats.map((cat, i) => (
              <Link key={cat.href} href={cat.href} className="article-card block" style={{
                padding: '2rem 1.25rem', textDecoration: 'none',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.03)' : 'none',
              }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: cat.color, display: 'block', marginBottom: '0.4rem', textShadow: `0 0 20px ${cat.color}30`, lineHeight: 1 }}>
                  {cat.label}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#4A3E55', display: 'block', lineHeight: 1.5 }}>{cat.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ NEON SIGNS DECORATION ═══ */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 4vw, 3rem)', padding: '2.5rem 1rem', flexWrap: 'wrap', opacity: 0.6 }}>
          <NeonSign text="OPEN 24/7" color="cyan" size="1rem" />
          <NeonSign text="VICE CITY" color="pink" size="1rem" />
          <NeonSign text="NO VACANCY" color="orange" size="1rem" />
        </div>

        {/* ═══ ARTICLES ═══ */}
        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          {featured && (
            <section style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                <span className="accent-line" />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A3E55' }}>Senaste</span>
              </div>
              <ArticleCard article={featured} featured />
            </section>
          )}

          {recent.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                <span className="accent-line" />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A3E55' }}>Fler artiklar</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {recent.map(a => <ArticleCard key={`${a.category}-${a.slug}`} article={a} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
