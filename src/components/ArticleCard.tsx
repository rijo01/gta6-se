import Link from 'next/link'
import { Article, categoryLabels, categoryColors } from '@/lib/content'

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return dateStr }
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const catColor = categoryColors[article.category]
  const catLabel = categoryLabels[article.category]

  return (
    <Link href={`/${article.category}/${article.slug}`}
      className="article-card block"
      style={{
        background: '#111111',
        border: '1px solid #1E1E1E',
        borderRadius: '4px',
        padding: featured ? '2rem' : '1.25rem',
        textDecoration: 'none',
      }}>
      {/* Category */}
      <span className="cat-badge" style={{ color: catColor, display: 'block', marginBottom: '0.6rem' }}>
        {catLabel}
      </span>

      {/* Title */}
      <h2 style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: featured ? '2rem' : '1.25rem',
        letterSpacing: '0.03em',
        lineHeight: 1.1,
        color: '#F0F0F0',
        marginBottom: '0.6rem',
      }}>
        {article.title}
      </h2>

      {/* Description */}
      <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.5, marginBottom: '1rem' }}>
        {article.description}
      </p>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ width: 24, height: 1, background: catColor, display: 'block' }} />
        <span style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {formatDate(article.date)}
        </span>
        {article.readTime && (
          <>
            <span style={{ color: '#333' }}>·</span>
            <span style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.06em' }}>
              {article.readTime} min läsning
            </span>
          </>
        )}
      </div>
    </Link>
  )
}
