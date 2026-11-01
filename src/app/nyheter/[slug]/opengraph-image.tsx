import { getArticlesByCategory } from '@/lib/content'
import { OG_SIZE, renderArticleOg } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Delningsbild från GTA6.se'
export const dynamicParams = false

// Förrenderas vid bygget, så typsnitten bara behöver läsas där.
export function generateStaticParams() {
  return getArticlesByCategory('nyheter').map(a => ({ slug: a.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return renderArticleOg('nyheter', slug)
}
