import Header from '@/components/Header'
import Footer from '@/components/Footer'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GTA 6 Trailers – Officiella Videor från Rockstar Games',
  description:
    'Se alla officiella GTA 6-trailers från Rockstar Games. Trailer 1 och Trailer 2 med beskrivningar, visningsrekord och bakgrund inför release 19 november 2026.',
  openGraph: {
    title: 'GTA 6 Trailers – Officiella Videor från Rockstar Games',
    description:
      'Alla officiella trailers för GTA 6 samlade på en sida. Se Trailer 1 och Trailer 2 inför lanseringen.',
    type: 'website',
  },
}

const trailers = [
  {
    videoId: 'QdBZY2fkU-0',
    title: 'GTA 6 – Officiell Trailer 1 (December 2023)',
    description:
      'Världspremiären som satte rekord med 90 miljoner visningar på 24 timmar. Introducerar Lucia och Vice City.',
    viewBadge: '90M+ visningar på 24h',
    uploadDate: '2023-12-05',
    color: '#FF2D7B',
  },
  {
    videoId: 'VQRLujxTm3c',
    title: 'GTA 6 – Officiell Trailer 2 (Maj 2025)',
    description:
      'Avslöjar Jason Duval och djupdyker i berättelsen. Samlade 475 miljoner visningar på 24 timmar.',
    viewBadge: '475M+ visningar på 24h',
    uploadDate: '2025-05-06',
    color: '#00F5FF',
  },
]

export default function TrailersPage() {
  const videoSchema = trailers.map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t.title,
    description: t.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${t.videoId}/maxresdefault.jpg`,
    uploadDate: t.uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${t.videoId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${t.videoId}`,
    publisher: {
      '@type': 'Organization',
      name: 'Rockstar Games',
    },
    inLanguage: 'en',
  }))

  return (
    <>
      <Header />
      {videoSchema.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main style={{ paddingTop: '88px' }}>
        <section
          style={{
            padding: '3.5rem 1rem 2.5rem',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #100C15 0%, #07040A 100%)',
            borderBottom: '1px solid rgba(255,45,123,0.15)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '800px',
              height: '300px',
              background:
                'radial-gradient(ellipse, rgba(255,45,123,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            <nav
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#3A2E45',
                marginBottom: '1.25rem',
              }}
            >
              <Link href="/" style={{ color: '#3A2E45', textDecoration: 'none' }}>
                Hem
              </Link>
              <span style={{ margin: '0 0.4rem' }}>&rsaquo;</span>
              <span style={{ color: '#FF2D7B', opacity: 0.6 }}>Trailers</span>
            </nav>
            <span
              className="cat-badge"
              style={{
                color: '#FF2D7B',
                display: 'inline-block',
                marginBottom: '0.9rem',
                background: 'rgba(255,45,123,0.06)',
                padding: '0.2rem 0.6rem',
                borderRadius: '2px',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,45,123,0.2)',
              }}
            >
              Officiella Videor
            </span>
            <h1
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                lineHeight: 1,
                background:
                  'linear-gradient(135deg, #FF2D7B 0%, #FF6B1A 50%, #FFD166 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
                filter: 'drop-shadow(0 0 30px rgba(255,45,123,0.25))',
              }}
            >
              GTA 6 Trailers
            </h1>
            <p
              style={{
                color: '#9A8AA0',
                fontSize: '1.05rem',
                marginBottom: '0',
                lineHeight: 1.6,
                maxWidth: '640px',
                margin: '0 auto',
              }}
            >
              Alla officiella trailers från Rockstar Games samlade på en sida.
              Se Lucia Caminos, Jason Duval och Vice City i rörelse inför
              releasen <strong style={{ color: '#FFD166' }}>19 november 2026</strong>.
            </p>
          </div>
        </section>

        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '3rem 1rem 4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '3.5rem',
          }}
        >
          {trailers.map((t, i) => (
            <article key={t.videoId}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '3rem',
                    color: t.color,
                    lineHeight: 1,
                    filter: `drop-shadow(0 0 15px ${t.color}60)`,
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: t.color,
                    padding: '0.3rem 0.7rem',
                    border: `1px solid ${t.color}40`,
                    borderRadius: '2px',
                    background: `${t.color}0A`,
                  }}
                >
                  {t.viewBadge}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
                  color: '#F0E8F8',
                  marginBottom: '0.6rem',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                }}
              >
                {t.title}
              </h2>
              <p
                style={{
                  color: '#9A8AA0',
                  fontSize: '0.98rem',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem',
                }}
              >
                {t.description}
              </p>
              <YouTubeEmbed videoId={t.videoId} title={t.title} />
            </article>
          ))}

          <section
            style={{
              marginTop: '1.5rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid #1A1325',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#4A3E55',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Vill du veta mer?
            </span>
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/nyheter/gta-6-trailer-1-analys"
                style={{
                  padding: '0.6rem 1.4rem',
                  border: '1px solid rgba(255,45,123,0.35)',
                  color: '#FF2D7B',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                }}
              >
                Analys av Trailer 1 &rarr;
              </Link>
              <Link
                href="/nyheter/gta-6-trailer-2-analys"
                style={{
                  padding: '0.6rem 1.4rem',
                  border: '1px solid rgba(0,245,255,0.35)',
                  color: '#00F5FF',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                }}
              >
                Analys av Trailer 2 &rarr;
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
