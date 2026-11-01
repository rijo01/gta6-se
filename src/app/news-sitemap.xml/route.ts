import { getIndexableArticles } from '@/lib/content'
import { xmlEscape as x } from '@/lib/xml'

const BASE_URL = 'https://gta6.se'
const WINDOW_MS = 2 * 24 * 60 * 60 * 1000 // Google News: bara artiklar från de senaste två dygnen

// Fönstret är tidsberoende, så sitemapen förnyas varje timme (ISR) även
// när ingen deploy sker. En tom <urlset> är giltig.
export const revalidate = 3600

export function GET() {
  const now = Date.now()
  const items = getIndexableArticles().filter(a => {
    if (a.category !== 'nyheter' && a.category !== 'release') return false
    const t = new Date(a.date).getTime()
    return t <= now && now - t <= WINDOW_MS
  })

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items.map(a => `<url>
<loc>${BASE_URL}/${a.category}/${a.slug}</loc>
<news:news>
<news:publication><news:name>GTA6.se</news:name><news:language>sv</news:language></news:publication>
<news:publication_date>${a.date}</news:publication_date>
<news:title>${x(a.title)}</news:title>
</news:news>
</url>`).join('\n')}
</urlset>
`
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}
