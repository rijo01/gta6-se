import { getArticleWithHtml, getArticlesByCategory, categoryColors } from '@/lib/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShareButtons from '@/components/ShareButtons'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const CAT = 'release' as const
const CAT_LABEL = 'Release'
const CAT_COLOR = categoryColors[CAT]

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getArticlesByCategory(CAT).map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const a = await getArticleWithHtml(CAT, slug)
  if (!a) return {}
  return { title: a.title, description: a.description }
}

function fmtDate(d: string) {
  try { return new Date(d).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' }) } catch { return d }
}

export default async function ReleaseArticle({ params }: Props) {
  const { slug } = await params
  const article = await getArticleWithHtml(CAT, slug)
  if (!article) notFound()
  const related = getArticlesByCategory(CAT).filter(a => a.slug !== slug).slice(0, 3)

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'NewsArticle', headline: article.title, description: article.description, datePublished: article.date, inLanguage: 'sv-SE' }) }} />
      <main style={{ paddingTop: '88px' }}>
        <section style={{ padding: '3.5rem 1rem 2.5rem', position: 'relative', overflow: 'hidden', background: `linear-gradient(180deg, #100C15 0%, #07040A 100%)`, borderBottom: `1px solid ${CAT_COLOR}15` }}>
          <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '200px', background: `radial-gradient(ellipse, ${CAT_COLOR}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: '740px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <nav style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3A2E45', marginBottom: '1.25rem' }}>
              <Link href="/" style={{ color: '#3A2E45', textDecoration: 'none' }}>Hem</Link>
              <span style={{ margin: '0 0.4rem' }}>&rsaquo;</span>
              <Link href={`/${CAT}`} style={{ color: CAT_COLOR, textDecoration: 'none', opacity: 0.6 }}>{CAT_LABEL}</Link>
            </nav>
            <span className="cat-badge neon-text-orange" style={{ color: CAT_COLOR, display: 'inline-block', marginBottom: '0.9rem', background: `${CAT_COLOR}0A`, padding: '0.2rem 0.6rem', borderRadius: '2px' }}>{CAT_LABEL}</span>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.05, color: '#F0E8F8', marginBottom: '1rem' }}>{article.title}</h1>
            <p style={{ color: '#7A6880', fontSize: '1rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>{article.description}</p>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ width: 28, height: 2, background: CAT_COLOR, boxShadow: `0 0 8px ${CAT_COLOR}60` }} />
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.67rem', color: '#4A3E55', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{fmtDate(article.date)}</span>
              {article.readTime && (
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.6rem', color: CAT_COLOR, fontWeight: 700, letterSpacing: '0.1em', padding: '0.12rem 0.5rem', border: `1px solid ${CAT_COLOR}25`, borderRadius: '2px', background: `${CAT_COLOR}08` }}>{article.readTime} MIN</span>
              )}
            </div>
          </div>
        </section>
        <div style={{ maxWidth: '740px', margin: '0 auto', padding: '2.5rem 1rem 3rem' }}>
          <div className="prose-gta" dangerouslySetInnerHTML={{ __html: article.content }} />
          <ShareButtons title={article.title} category={CAT} slug={article.slug} />
          {related.length > 0 && (
            <section style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid #1A1325' }}>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A3E55', display: 'block', marginBottom: '1.25rem' }}>Relaterade artiklar</span>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {related.map(r => <ArticleCard key={r.slug} article={r} />)}
              </div>
            </section>
          )}
          <div style={{ marginTop: '2.5rem' }}>
            <Link href={`/${CAT}`} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: CAT_COLOR, textDecoration: 'none', opacity: 0.7 }}>&larr; Tillbaka till {CAT_LABEL}</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
