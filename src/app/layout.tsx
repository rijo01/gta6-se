import type { Metadata } from 'next'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import './globals.css'
import NewsTicker from '@/components/NewsTicker'

export const metadata: Metadata = {
  title: {
    default: 'GTA 6 – Nyheter, Guider & Release-info | GTA6.se',
    template: '%s | GTA6.se',
  },
  description: 'Sveriges ledande källa för GTA 6. Senaste nytt, guider, karaktärer och all release-information om Grand Theft Auto 6.',
  keywords: ['GTA 6', 'Grand Theft Auto 6', 'GTA 6 Sverige', 'GTA 6 release', 'GTA 6 guide'],
  verification: {
    google: 'REPLACE_WITH_GSC_CODE', // Replace with your Google Search Console verification code
  },
  metadataBase: new URL('https://gta6.se'),
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://gta6.se',
    siteName: 'GTA6.se',
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
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
      <body>
        <GoogleAnalytics />
        <NewsTicker />
        {children}
      </body>
    </html>
  )
}
