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
          {/* Category color ambient glow */}
          <div style={{
            position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
            width: '800px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(255,45,123,0.08) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }} />
          <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <span className="cat-badge neon-text-pink" style={{ color: '#FF2D7B', display: 'block', marginBottom: '0.75rem' }}>GTA6.SE</span>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#F0E8F4', letterSpacing: '0.04em' }}>
              Nyheter
            </h1>
            <p style={{ color: '#6A5E70', fontSize: '0.95rem', marginTop: '0.75rem', maxWidth: '500px' }}>
              Senaste nytt om GTA 6 — trailers, tillkännagivanden och Rockstar-uppdateringar
            </p>
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FF2D7B', display: 'block', marginTop: '1rem', opacity: 0.6 }}>
              {articles.length} artiklar
            </span>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '3rem', paddingBottom: '3.5rem' }}>
          {articles.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#333' }}>
              <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.75rem' }}>Inga artiklar ännu</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
