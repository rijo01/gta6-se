import { getArticlesByCategory } from '@/lib/content'
import ArticleCard from '@/components/ArticleCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GTA 6 Karaktärer – Jason, Lucia & Mer',
  description: 'Allt om karaktärerna i GTA 6. Djupdykningar i Jason, Lucia och övriga karaktärer i Vice City.',
}

export default function KaraktarerPage() {
  const articles = getArticlesByCategory('karaktarer')
  return (
    <>
      <Header />
      <main style={{ paddingTop: '56px' }}>
        <section style={{ padding: '3rem 1rem 2.5rem', borderBottom: '1px solid rgba(155,47,255,0.08)', background: 'linear-gradient(180deg, #110810 0%, #0A0609 100%)' }}>
          <div className="max-w-6xl mx-auto">
            <span className="cat-badge neon-text-purple" style={{ color: '#9B2FFF', display: 'block', marginBottom: '0.5rem' }}>GTA6.SE</span>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#F0E8F4' }}>Karaktärer</h1>
            <p style={{ color: '#5A4E60', fontSize: '0.9rem', marginTop: '0.5rem' }}>Jason, Lucia och alla karaktärer i GTA 6</p>
          </div>
        </section>
        <div className="max-w-6xl mx-auto px-4" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
          {articles.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
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
