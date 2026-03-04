import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'GTA 6 – Nyheter, Guider & Release-info | GTA6.se',
    template: '%s | GTA6.se',
  },
  description: 'Sveriges ledande källa för GTA 6. Senaste nytt, guider, karaktärer och all release-information om Grand Theft Auto 6.',
  keywords: ['GTA 6', 'Grand Theft Auto 6', 'GTA 6 Sverige', 'GTA 6 release', 'GTA 6 guide'],
  metadataBase: new URL('https://gta6.se'),
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://gta6.se',
    siteName: 'GTA6.se',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'GTA6.se',
              url: 'https://gta6.se',
              description: 'Sveriges ledande källa för GTA 6-nyheter och guider',
              inLanguage: 'sv-SE',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://gta6.se/sok?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
