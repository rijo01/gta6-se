import { getArticleWithHtml, getArticlesByCategory } from '@/lib/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShareButtons from '@/components/ShareButtons'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getArticlesByCategory('nyheter').map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleWithHtml('nyheter', slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    openGraph: { title: article.title, description: article.description, type: 'article', publishedTime: article.date },
  }
}

function formatDate(d: string) {
  try { return new Date(d).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' }) }
  catch { return d }
}

export default async function NyheterArticle({ params }: Props) {
  const { slug } = await params
  const article = await getArticleWithHtml('nyheter', slug)
  if (!article) notFound()

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'NewsArticle',
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        inLanguage: 'sv-SE',
        publisher: { '@type': 'Organization', name: 'GTA6.se', url: 'https://gta6.se' },
      })}} />

      <main style={{ paddingTop: '56px' }}>
        <section style={{ padding: '3rem 1rem 2rem', borderBottom: '1px solid rgba(255,45,123,0.1)', background: 'linear-gradient(180deg, #110810 0%, #0A0609 100%)', position: 'relative' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="cat-badge neon-text-pink" style={{ color: '#FF2D7B', display: 'block', marginBottom: '0.75rem' }}>Nyheter</span>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.05, color: '#F0E8F4', marginBottom: '1rem' }}>
              {article.title}
            </h1>
            <p style={{ color: '#7A6E80', fontSize: '1rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {article.description}
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ width: 32, height: 1, background: '#FF2D7B', display: 'block', boxShadow: '0 0 8px rgba(255,45,123,0.4)' }} />
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.7rem', color: '#5A4E60', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {formatDate(article.date)}
              </span>
              {article.readTime && (
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.7rem', color: '#4A3E50', letterSpacing: '0.06em' }}>
                  · {article.readTime} min läsning
                </span>
              )}
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2.5rem 1rem 4rem' }}>
          <div className="prose-gta" dangerouslySetInnerHTML={{ __html: article.content }} />
          <ShareButtons title={article.title} category="nyheter" slug={article.slug} />
        </div>
      </main>
      <Footer />
    </>
  )
}
