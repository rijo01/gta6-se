import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export type Category = 'nyheter' | 'guider' | 'karaktarer' | 'release'

export interface Article {
  slug: string
  title: string
  date: string
  category: Category
  description: string
  content: string
  readTime?: number
}

const contentDir = path.join(process.cwd(), 'src/content')

async function mdxToHtml(content: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(content)
  return result.toString()
}

export function getArticlesByCategory(category: Category): Article[] {
  const dir = path.join(contentDir, category)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  const articles = files.map(filename => {
    const slug = filename.replace(/\.(mdx|md)$/, '')
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
    const { data, content } = matter(raw)
    const words = content.split(/\s+/).length
    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || category,
      description: data.description || '',
      content,
      readTime: Math.ceil(words / 200),
    } as Article
  })
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllArticles(): Article[] {
  const cats: Category[] = ['nyheter', 'guider', 'karaktarer', 'release']
  return cats.flatMap(getArticlesByCategory)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getArticleWithHtml(category: Category, slug: string): Promise<Article | null> {
  const filePath = path.join(contentDir, category, `${slug}.mdx`)
  const fallback = path.join(contentDir, category, `${slug}.md`)
  const target = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null
  if (!target) return null
  const raw = fs.readFileSync(target, 'utf-8')
  const { data, content } = matter(raw)
  const words = content.split(/\s+/).length
  const html = await mdxToHtml(content)
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category || category,
    description: data.description || '',
    content: html,
    readTime: Math.ceil(words / 200),
  }
}

export function getArticle(category: Category, slug: string): Article | null {
  const filePath = path.join(contentDir, category, `${slug}.mdx`)
  const fallback = path.join(contentDir, category, `${slug}.md`)
  const target = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null
  if (!target) return null
  const raw = fs.readFileSync(target, 'utf-8')
  const { data, content } = matter(raw)
  const words = content.split(/\s+/).length
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category || category,
    description: data.description || '',
    content,
    readTime: Math.ceil(words / 200),
  }
}

export const categoryLabels: Record<Category, string> = {
  nyheter: 'Nyheter',
  guider: 'Guider',
  karaktarer: 'Karaktarer',
  release: 'Release',
}

export const categoryColors: Record<Category, string> = {
  nyheter: '#FF2D7B',
  guider: '#00F5FF',
  karaktarer: '#9B2FFF',
  release: '#FF6B1A',
}
