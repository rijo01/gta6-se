'use client'
import { useState } from 'react'

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

interface ShareButtonsProps {
  title: string
  category: string
  slug: string
}

export default function ShareButtons({ title, category, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://gta6.se/${category}/${slug}`
  const tweetText = `${title} \u{1F3AE} #GTA6 #GTA6SE`

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}&via=GTA6_SE`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard not available */
    }
  }

  const buttonBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontFamily: 'Barlow Condensed, sans-serif',
    fontWeight: 600,
    fontSize: '0.85rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  return (
    <div style={{
      borderTop: '1px solid rgba(255,45,123,0.1)',
      marginTop: '3rem',
      paddingTop: '2rem',
    }}>
      <span style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 700,
        fontSize: '0.7rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#5A4E60',
        display: 'block',
        marginBottom: '1rem',
      }}>
        Dela artikeln
      </span>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...buttonBase,
            background: 'rgba(255, 45, 123, 0.08)',
            border: '1px solid rgba(255, 45, 123, 0.2)',
            color: '#FF2D7B',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 45, 123, 0.15)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 45, 123, 0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 45, 123, 0.08)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <XIcon />
          Dela på X
        </a>
        <button
          onClick={handleCopy}
          style={{
            ...buttonBase,
            background: 'rgba(0, 245, 255, 0.06)',
            border: '1px solid rgba(0, 245, 255, 0.15)',
            color: copied ? '#00FF88' : '#00F5FF',
          }}
          onMouseEnter={e => {
            if (!copied) {
              e.currentTarget.style.background = 'rgba(0, 245, 255, 0.12)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.1)'
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0, 245, 255, 0.06)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {copied ? <CheckIcon /> : <LinkIcon />}
          {copied ? 'Kopierad!' : 'Kopiera länk'}
        </button>
      </div>
    </div>
  )
}
