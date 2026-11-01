import { getIndexableArticles, categoryLabels } from '@/lib/content'
import { xmlEscape as x } from '@/lib/xml'

const BASE_URL = 'https://gta6.se'
const LIMIT = 50

// Byggs statiskt vid deploy. Innehållet ligger i git, så varje ny artikel
// betyder en ny deploy och därmed ett nytt flöde. Noindex-sidor är inte med.
export const dynamic = 'force-static'

export function GET() {
  const items = getIndexableArticles().slice(0, LIMIT)
  const stamps = items.map(a => new Date(a.updated || a.date).getTime())
  const lastBuild = stamps.length ? new Date(Math.max(...stamps)) : new Date()

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>GTA6.se</title>
<link>${BASE_URL}</link>
<description>Nyheter, guider och release-information om Grand Theft Auto 6 på svenska.</description>
<language>sv-SE</language>
<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
<atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items.map(a => {
  const url = `${BASE_URL}/${a.category}/${a.slug}`
  return `<item>
<title>${x(a.title)}</title>
<link>${url}</link>
<guid isPermaLink="true">${url}</guid>
<description>${x(a.description)}</description>
<category>${x(categoryLabels[a.category])}</category>
<pubDate>${new Date(a.date).toUTCString()}</pubDate>
</item>`
}).join('\n')}
</channel>
</rss>
`
  return new Response(body, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } })
}
