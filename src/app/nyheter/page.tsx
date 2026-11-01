import { getArticlesByCategory } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GTA 6 Nyheter – Senaste nytt om Grand Theft Auto 6',
  description: 'Håll dig uppdaterad med de senaste nyheterna om GTA 6. Officiella tillkännagivanden, trailers och uppdateringar från Rockstar Games.',
}

export default function NyheterPage() {
  const articles = getArticlesByCategory('nyheter')
  return (
    <>
      <Header />
      <main style={{ paddingTop: '56px' }}>
        <section className="category-hero" style={{ borderBottom: '1px solid rgba(255,45,123,0.1)' }}>
          <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '250px', background: 'radial-gradient(ellipse, rgba(255,45,123,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <span className="cat-badge neon-text-pink" style={{ color: '#FF2D7B', display: 'block', marginBottom: '0.75rem' }}>GTA6.SE</span>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: '#F0E8F8', letterSpacing: '0.03em' }}>Nyheter</h1>
            <p style={{ color: '#5A4E65', fontSize: '0.95rem', marginTop: '0.75rem', maxWidth: '460px', lineHeight: 1.6 }}>Senaste nytt om GTA 6 — trailers, tillkännagivanden och Rockstar-uppdateringar</p>
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FF2D7B', display: 'block', marginTop: '1.25rem', opacity: 0.5 }}>{articles.length} ARTIKLAR</span>
          </div>
        </section>
        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
          {articles.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '5rem 0', color: '#333', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.75rem' }}>Inga artiklar ännu</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
