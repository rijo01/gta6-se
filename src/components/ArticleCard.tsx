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
        background: 'linear-gradient(135deg, #110810 0%, #0D080A 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '4px',
        padding: featured ? '2.25rem' : '1.5rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${catColor}, transparent)`,
        opacity: 0.4,
      }} />

      {/* Category */}
      <span className="cat-badge" style={{
        color: catColor,
        display: 'block',
        marginBottom: '0.7rem',
        textShadow: `0 0 10px ${catColor}40`,
      }}>
        {catLabel}
      </span>

      {/* Title */}
      <h2 style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: featured ? '2.25rem' : '1.35rem',
        letterSpacing: '0.03em',
        lineHeight: 1.1,
        color: '#F0E8F4',
        marginBottom: '0.7rem',
      }}>
        {article.title}
      </h2>

      {/* Description */}
      <p style={{ fontSize: '0.85rem', color: '#7A6E80', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        {article.description}
      </p>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{
          width: 24, height: 1,
          background: catColor,
          display: 'block',
          boxShadow: `0 0 6px ${catColor}60`,
        }} />
        <span style={{ fontSize: '0.7rem', color: '#5A4E60', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {formatDate(article.date)}
        </span>
        {article.readTime && (
          <>
            <span style={{ color: '#2A222E' }}>·</span>
            <span style={{ fontSize: '0.7rem', color: '#4A3E50', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.06em' }}>
              {article.readTime} min läsning
            </span>
          </>
        )}
      </div>
    </Link>
  )
}
