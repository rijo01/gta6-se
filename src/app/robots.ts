import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: ['https://gta6.se/sitemap.xml', 'https://gta6.se/news-sitemap.xml'],
  }
}
