import type { Metadata } from 'next'
import { type Article, type Category, categoryLabels } from '@/lib/content'

// Gemensam metadata för artikelsidor i alla fyra kategorier.
// Next slår inte ihop openGraph på djupet, så locale/siteName måste med här.
// Delningsbilden kommer från opengraph-image.tsx i respektive [slug]-mapp.
export function articleMetadata(a: Article, cat: Category, slug: string): Metadata {
  const url = `/${cat}/${slug}`
  const modified = a.updated && a.updated !== a.date ? a.updated : undefined
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: url },
    ...(a.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'article',
      locale: 'sv_SE',
      siteName: 'GTA6.se',
      url,
      title: a.title,
      description: a.description,
      publishedTime: a.date,
      ...(modified ? { modifiedTime: modified } : {}),
      section: categoryLabels[cat],
    },
    twitter: { card: 'summary_large_image', title: a.title, description: a.description },
  }
}
