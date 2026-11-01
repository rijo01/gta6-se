import type { Metadata } from 'next'
import CookieConsent from '@/components/CookieConsent'
import { bebas, barlow, barlowCondensed } from './fonts'
import { safeJson, websiteNode, organizationNode, personNode } from '@/lib/schema'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'GTA 6 – Nyheter, Guider & Release-info | GTA6.se',
    template: '%s | GTA6.se',
  },
  description: 'Nyheter, guider och release-information om Grand Theft Auto 6 på svenska.',
  keywords: ['GTA 6', 'Grand Theft Auto 6', 'GTA 6 Sverige', 'GTA 6 release', 'GTA 6 guide'],
  verification: {
    google: 'REPLACE_WITH_GSC_CODE', // Replace with your Google Search Console verification code
  },
  metadataBase: new URL('https://gta6.se'),
  // Ingen og:url här: den ärvs av alla sidor och pekade tidigare startsidan
  // som URL för varje artikel. Artiklar sätter egen url i lib/meta.ts.
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
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
    <html lang="sv" className={`${bebas.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        {/* Fast i <head>: sidor med egen canonical ersätter hela alternates-objektet. */}
        <link rel="alternate" type="application/rss+xml" title="GTA6.se" href="https://gta6.se/rss.xml" />
        {/* Webbplats, utgivare och ansvarig person. Inget sökformulär: sajten har ingen sökfunktion. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJson({ '@context': 'https://schema.org', '@graph': [websiteNode, organizationNode, personNode] }),
          }}
        />
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
