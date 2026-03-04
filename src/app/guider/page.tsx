import { getArticlesByCategory } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GTA 6 Guider – Tips, Tricks & Hemligheter',
  description: 'Kompletta guider för GTA 6. Lär dig spelmekaniker, hitta hemligheter och bli bäst i spelet.',
}

export default function GuiderPage() {
  const articles = getArticlesByCategory('guider')
  return (
    <>
      <Header />
      <main style={{ paddingTop: '56px' }}>
        <section style={{ padding: '3rem 1rem 2.5rem', borderBottom: '1px solid #1A1A1A', background: 'linear-gradient(180deg, #0D0D0D 0%, #0A0A0A 100%)' }}>
          <div className="max-w-6xl mx-auto">
            <span className="cat-badge" style={{ color: '#3B82F6', display: 'block', marginBottom: '0.5rem' }}>GTA6.SE</span>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#F0F0F0' }}>Guider</h1>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>Tips, tricks, kartor och hemligheter för GTA 6</p>
          </div>
        </section>
        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
          {articles.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
              {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#333' }}>
              <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.75rem' }}>Inga guider ännu</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
