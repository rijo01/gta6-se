import type { Article, Category } from '@/lib/content'
import { BASE_URL, ORG_ID, PERSON_ID, WEBSITE_ID, organizationNode, personNode, safeJson } from '@/lib/schema'

// nyheter/release är tidsbunden rapportering; guider/karaktärer är evergreen.
// Tidigare deklarerade guider HowTo utan step[] (ogiltigt) och karaktärer
// about.Person med artikelrubriken som personnamn (felaktigt) — båda borta.
const SCHEMA_TYPE: Record<Category, 'NewsArticle' | 'Article'> = {
  nyheter: 'NewsArticle',
  release: 'NewsArticle',
  guider: 'Article',
  karaktarer: 'Article',
}

interface Props {
  article: Article
  category: Category
  categoryLabel: string
}

export default function ArticleJsonLd({ article, category, categoryLabel }: Props) {
  const url = `${BASE_URL}/${category}/${article.slug}`
  const graph: Record<string, unknown>[] = []

  const main: Record<string, unknown> = {
    '@type': SCHEMA_TYPE[category],
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    inLanguage: 'sv-SE',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': WEBSITE_ID },
    // Delningsbilden från opengraph-image.tsx (1200x630, bara text).
    image: { '@type': 'ImageObject', url: `${url}/opengraph-image`, width: 1200, height: 630 },
    // Fullständiga noder (inte bara @id) så att artikeln står på egna ben.
    author: { ...personNode, '@id': PERSON_ID },
    publisher: { ...organizationNode, '@id': ORG_ID },
  }

  // dateModified sätts bara när artikeln faktiskt reviderats efter publicering.
  // updated === date betyder "aldrig ändrad" och ska inte ge färskhetssignal.
  if (article.updated && article.updated !== article.date) {
    main.dateModified = article.updated
  }

  graph.push(main)

  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${BASE_URL}/${category}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  })

  // FAQPage endast när frågorna faktiskt syns i brödtexten.
  if (article.faq && article.faq.length >= 2) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: article.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  )
}
