import { getArticlesByCategory, categoryLabels } from '@/lib/content'
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
        <section style={{ padding: '3rem 1rem 2.5rem', borderBottom: '1px solid rgba(255,45,123,0.08)', background: 'linear-gradient(180deg, #110810 0%, #0A0609 100%)' }}>
          <div className="max-w-6xl mx-auto">
            <span className="cat-badge neon-text-pink" style={{ color: '#FF2D7B', display: 'block', marginBottom: '0.5rem' }}>GTA6.SE</span>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#F0E8F4' }}>
              Nyheter
            </h1>
            <p style={{ color: '#5A4E60', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Senaste nytt om GTA 6 — trailers, tillkännagivanden och Rockstar-uppdateringar
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
          {articles.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#333' }}>
              <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.75rem' }}>Inga artiklar ännu</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.4rem', color: '#444' }}>MaxiAI publicerar snart innehåll här</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
