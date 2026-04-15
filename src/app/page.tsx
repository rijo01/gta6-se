import { getAllArticles, getArticlesByCategory } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CountdownHero from '@/components/CountdownHero'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import Link from 'next/link'

const cats = [
  { href: '/nyheter', label: 'Nyheter', num: '01', desc: 'Trailers, tillkännagivanden och Rockstar-uppdateringar', color: '#FF2D7B', cat: 'nyheter' as const },
  { href: '/guider', label: 'Guider', num: '02', desc: 'Tips, tricks och djupgående spelguider för Vice City', color: '#00F5FF', cat: 'guider' as const },
  { href: '/karaktarer', label: 'Karaktärer', num: '03', desc: 'Lucia, Jason och alla invånare i Vice City', color: '#9B2FFF', cat: 'karaktarer' as const },
  { href: '/release', label: 'Release', num: '04', desc: 'Datum, plattformar, pris och förbeställningar', color: '#FF6B1A', cat: 'release' as const },
]

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles[0]
  const recent = articles.slice(1, 7)

  return (
    <>
      <Header />
      <main style={{ paddingTop: '88px' }}>

        {/* ═══ HERO — Clean cinematic sunset ═══ */}
        <section className="hero-gradient" style={{
          minHeight: '100vh', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '6rem 1.5rem 4rem',
        }}>
          {/* Scanlines */}
          <div className="scanlines-overlay" />

          {/* Horizon radial glow */}
          <div style={{
            position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)',
            width: '140%', height: '35%',
            background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,107,26,0.25) 0%, rgba(255,68,0,0.1) 40%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Bottom fade to dark */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%',
            background: 'linear-gradient(180deg, transparent 0%, #07040A 100%)',
            pointerEvents: 'none', zIndex: 3,
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '800px' }}>

            <p className="fade-up neon-text-cyan" style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
              fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase',
              color: '#00F5FF', marginBottom: '1.25rem',
            }}>
              Sveriges #1 sajt om
            </p>

            <h1 className="fade-up-d1" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(6rem, 18vw, 13rem)',
              letterSpacing: '0.06em',
              lineHeight: 0.85,
              background: 'linear-gradient(135deg, #FF2D7B 0%, #FF6B1A 45%, #FFD166 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
              filter: 'drop-shadow(0 0 30px rgba(255,45,123,0.3)) drop-shadow(0 0 60px rgba(255,107,26,0.15))',
            }}>
              GTA 6
            </h1>

            <p className="fade-up-d1" style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
              fontSize: '1rem', letterSpacing: '0.5em', textTransform: 'uppercase',
              color: '#FFD166', opacity: 0.8, marginBottom: '2rem',
            }}>
              Grand Theft Auto VI
            </p>

            {/* Divider */}
            <div className="fade-up-d2" style={{
              width: '100%', maxWidth: '320px', height: '1px', margin: '0 auto 2rem',
              background: 'linear-gradient(90deg, transparent, #FF6B1A 50%, transparent)',
            }} />

            {/* Release badge */}
            <div className="fade-up-d2" style={{
              display: 'inline-block', padding: '0.5rem 1.5rem', marginBottom: '2.5rem',
              background: 'rgba(13,10,18,0.8)', border: '1px solid rgba(255,107,26,0.4)',
              borderRadius: '2px',
            }}>
              <span style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.85rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                color: '#FFD166',
              }}>
                19 November 2026
              </span>
            </div>

            <br />

            {/* Countdown */}
            <div className="fade-up-d3" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <CountdownHero />
            </div>

            {/* CTA buttons */}
            <div className="fade-up-d4" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/nyheter" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.5rem',
                background: 'rgba(255,45,123,0.1)', border: '1px solid rgba(255,45,123,0.35)',
                borderRadius: '2px', color: '#FF2D7B',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.25s',
              }}>
                Senaste nytt &rarr;
              </Link>
              <Link href="/guider" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.5rem',
                background: 'transparent', border: '1px solid rgba(0,245,255,0.25)',
                borderRadius: '2px', color: '#00F5FF',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.25s',
              }}>
                Komplett guide &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ CATEGORY SECTION — horizontal cards ═══ */}
        <section style={{ background: '#07040A' }}>
          <div className="max-w-6xl mx-auto px-4 py-2">
            {cats.map((cat) => {
              const count = getArticlesByCategory(cat.cat).length
              return (
                <Link key={cat.href} href={cat.href} className="article-card block" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.5rem 1.25rem',
                  borderBottom: `1px solid ${cat.color}20`,
                  textDecoration: 'none', position: 'relative', overflow: 'hidden',
                  background: `linear-gradient(90deg, ${cat.color}03, transparent)`,
                  transition: 'background 0.25s',
                }}>
                  {/* Faded number */}
                  <span style={{
                    position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: '4rem', color: 'rgba(255,255,255,0.025)',
                    lineHeight: 1, pointerEvents: 'none',
                  }}>
                    {cat.num}
                  </span>

                  <div style={{ paddingLeft: '3rem', position: 'relative', zIndex: 1 }}>
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', color: cat.color, display: 'block', lineHeight: 1, marginBottom: '0.25rem' }}>
                      {cat.label}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#5A4E60', display: 'block', lineHeight: 1.4 }}>
                      {cat.desc} &middot; <span style={{ color: cat.color, opacity: 0.6 }}>{count} artiklar</span>
                    </span>
                  </div>

                  <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.2rem', color: cat.color, opacity: 0.5, transition: 'transform 0.25s, opacity 0.25s' }}>
                    &rarr;
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ═══ ARTICLES ═══ */}
        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
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

        {/* ═══ OFFICIELLA TRAILERS ═══ */}
        <section style={{
          background: 'linear-gradient(180deg, #07040A 0%, #0D0812 50%, #07040A 100%)',
          borderTop: '1px solid rgba(255,45,123,0.15)',
          borderBottom: '1px solid rgba(255,45,123,0.15)',
          padding: '4rem 1rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: '900px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(255,45,123,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#FF2D7B', display: 'block', marginBottom: '0.75rem',
              }}>
                Från Rockstar Games
              </span>
              <h2 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                background: 'linear-gradient(135deg, #FF2D7B 0%, #FF6B1A 50%, #FFD166 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1, letterSpacing: '0.03em',
                filter: 'drop-shadow(0 0 25px rgba(255,45,123,0.25))',
              }}>
                Officiella Trailers
              </h2>
              <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #FF6B1A, transparent)', margin: '1rem auto 0' }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem',
            }}>
              {[
                { videoId: 'QdBZY2fkU-0', title: 'GTA 6 – Trailer 1', badge: '90M+ visningar', color: '#FF2D7B' },
                { videoId: 'VQRLujxTm3c', title: 'GTA 6 – Trailer 2', badge: '475M+ visningar', color: '#00F5FF' },
              ].map(t => (
                <div key={t.videoId}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}>
                    <span style={{
                      fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.3rem',
                      color: '#F0E8F8', letterSpacing: '0.03em',
                    }}>
                      {t.title}
                    </span>
                    <span style={{
                      fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                      fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: t.color, padding: '0.25rem 0.6rem',
                      border: `1px solid ${t.color}40`, borderRadius: '2px',
                      background: `${t.color}0A`,
                    }}>
                      {t.badge}
                    </span>
                  </div>
                  <YouTubeEmbed videoId={t.videoId} title={t.title} />
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href="/trailers" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.7rem 1.6rem',
                background: 'rgba(255,45,123,0.08)',
                border: '1px solid rgba(255,45,123,0.35)',
                borderRadius: '2px', color: '#FF2D7B',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}>
                Alla trailers &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
