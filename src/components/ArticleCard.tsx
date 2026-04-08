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

  if (featured) {
    return (
      <Link href={`/${article.category}/${article.slug}`}
        className="article-card block"
        style={{
          background: `linear-gradient(135deg, rgba(17, 8, 16, 0.95) 0%, rgba(13, 8, 10, 0.98) 60%, ${catColor}08 100%)`,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderLeft: `4px solid ${catColor}`,
          borderRadius: '6px',
          padding: '2.5rem',
          textDecoration: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}>
        {/* Dramatic gradient overlay */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%',
          background: `linear-gradient(135deg, transparent 0%, ${catColor}06 100%)`,
          pointerEvents: 'none',
        }} />

        <span className="cat-badge" style={{
          color: catColor,
          display: 'inline-block',
          marginBottom: '1rem',
          textShadow: `0 0 12px ${catColor}50`,
          position: 'relative',
        }}>
          {catLabel}
        </span>

        <h2 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          letterSpacing: '0.04em',
          lineHeight: 1.05,
          color: '#F0E8F4',
          marginBottom: '1rem',
          position: 'relative',
        }}>
          {article.title}
        </h2>

        <p style={{ fontSize: '0.9rem', color: '#8A7E90', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '600px', position: 'relative' }}>
          {article.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
          <span style={{
            width: 28, height: 2, background: catColor, display: 'block',
            boxShadow: `0 0 8px ${catColor}60`,
          }} />
          <span style={{ fontSize: '0.7rem', color: '#5A4E60', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {formatDate(article.date)}
          </span>
          {article.readTime && (
            <>
              <span style={{ color: '#2A222E' }}>&middot;</span>
              <span style={{
                fontSize: '0.65rem',
                color: catColor,
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.2rem 0.6rem',
                border: `1px solid ${catColor}30`,
                borderRadius: '20px',
                background: `${catColor}08`,
              }}>
                {article.readTime} min
              </span>
            </>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/${article.category}/${article.slug}`}
      className="article-card block"
      style={{
        background: 'linear-gradient(145deg, rgba(17, 8, 16, 0.9) 0%, rgba(13, 8, 10, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderLeft: `4px solid ${catColor}`,
        borderRadius: '6px',
        padding: '1.5rem 1.5rem 1.5rem 1.75rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}>

      {/* Category */}
      <span className="cat-badge" style={{
        color: catColor,
        display: 'block',
        marginBottom: '0.75rem',
        textShadow: `0 0 10px ${catColor}40`,
      }}>
        {catLabel}
      </span>

      {/* Title */}
      <h2 style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '1.5rem',
        letterSpacing: '0.03em',
        lineHeight: 1.08,
        color: '#F0E8F4',
        marginBottom: '0.7rem',
      }}>
        {article.title}
      </h2>

      {/* Description */}
      <p style={{ fontSize: '0.82rem', color: '#7A6E80', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        {article.description}
      </p>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{
          width: 20, height: 1.5, background: catColor, display: 'block',
          boxShadow: `0 0 6px ${catColor}60`,
        }} />
        <span style={{ fontSize: '0.68rem', color: '#5A4E60', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {formatDate(article.date)}
        </span>
        {article.readTime && (
          <>
            <span style={{ color: '#2A222E' }}>&middot;</span>
            <span style={{
              fontSize: '0.6rem',
              color: catColor,
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.15rem 0.5rem',
              border: `1px solid ${catColor}25`,
              borderRadius: '20px',
              background: `${catColor}06`,
            }}>
              {article.readTime} min
            </span>
          </>
        )}
      </div>
    </Link>
  )
}
