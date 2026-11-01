import { MetadataRoute } from 'next'
import { getIndexableArticles } from '@/lib/content'

const BASE_URL = 'https://gta6.se'

// Sitemapen far bara innehalla URL:er som svarar 200 och ar indexerbara:
// - inga noindex-markta artiklar (getIndexableArticles filtrerar bort dem)
// - inga sammanslagna slugs (de finns inte langre som filer, se next.config.mjs)
// - inga slutande snedstreck (Next 308-omdirigerar /foo/ -> /foo)
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getIndexableArticles()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/nyheter`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/guider`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/karaktarer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/release`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/trailers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/om`, lastModified: new Date('2026-11-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date('2026-11-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/integritetspolicy`, lastModified: new Date('2026-11-01'), changeFrequency: 'yearly', priority: 0.2 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${BASE_URL}/${article.category}/${article.slug}`,
    lastModified: new Date(article.updated || article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}
