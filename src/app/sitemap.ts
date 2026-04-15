import { MetadataRoute } from 'next'
import { getAllArticles, Category } from '@/lib/content'

const BASE_URL = 'https://gta6.se'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/nyheter`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/guider`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/karaktarer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/release`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/trailers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${BASE_URL}/${article.category}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}
