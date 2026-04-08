import Link from 'next/link'
import { Article, categoryLabels, categoryColors } from '@/lib/content'

interface Props { article: Article; featured?: boolean }

function fmtDate(d: string) {
  try { return new Date(d).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' }) }
  catch { return d }
}

export default function ArticleCard({ article, featured = false }: Props) {
  const c = categoryColors[article.category]
  const label = categoryLabels[article.category]

  if (featured) {
    return (
      <Link href={`/${article.category}/${article.slug}`} className="article-card block" style={{
        background: '#0D0A12', border: '1px solid #1A1325', borderLeft: `3px solid ${c}`,
        borderRadius: '2px', padding: 'clamp(1.75rem, 3vw, 2.75rem)',
        textDecoration: 'none', position: 'relative', overflow: 'hidden',
      }}>
        <span className="cat-badge" style={{ color: c, display: 'inline-block', marginBottom: '1rem' }}>{label}</span>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', letterSpacing: '0.03em', lineHeight: 1.05, color: '#F0E8F8', marginBottom: '0.9rem' }}>
          {article.title}
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#7A6880', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '620px' }}>
          {article.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ width: 28, height: 2, background: c }} />
          <span style={{ fontSize: '0.67rem', color: '#5A4E60', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{fmtDate(article.date)}</span>
          {article.readTime && (
            <span style={{ fontSize: '0.6rem', color: c, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.1em', padding: '0.15rem 0.55rem', border: `1px solid ${c}25`, borderRadius: '2px', background: `${c}08` }}>{article.readTime} MIN</span>
          )}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.5rem', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c }}>
          Läsa mer &rarr;
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/${article.category}/${article.slug}`} className="article-card block" style={{
      background: '#0D0A12', border: '1px solid #1A1325', borderLeft: `3px solid ${c}`,
      borderRadius: '2px', padding: '1.4rem 1.5rem 1.4rem 1.65rem',
      textDecoration: 'none', position: 'relative', overflow: 'hidden',
      transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
    }}>
      <span className="cat-badge" style={{ color: c, display: 'inline-block', marginBottom: '0.65rem' }}>{label}</span>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', letterSpacing: '0.03em', lineHeight: 1.08, color: '#F0E8F8', marginBottom: '0.6rem' }}>
        {article.title}
      </h2>
      <p style={{ fontSize: '0.82rem', color: '#5A4E60', lineHeight: 1.6, marginBottom: '1.1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {article.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.65rem', color: '#4A3E55', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{fmtDate(article.date)}</span>
        {article.readTime && (
          <span style={{ fontSize: '0.58rem', color: c, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.1em', padding: '0.12rem 0.5rem', border: `1px solid ${c}20`, borderRadius: '2px', background: `${c}06` }}>{article.readTime} MIN</span>
        )}
      </div>
    </Link>
  )
}
