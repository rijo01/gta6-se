import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export type Category = 'nyheter' | 'guider' | 'karaktarer' | 'release'

export interface FaqItem {
  question: string
  answer: string
}

export interface Article {
  slug: string
  title: string
  date: string
  updated?: string
  category: Category
  description: string
  content: string
  readTime?: number
  faq?: FaqItem[]
}

const contentDir = path.join(process.cwd(), 'src/content')

async function mdxToHtml(content: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(content)
  return result.toString()
}

// --- FAQ-extraktion -------------------------------------------------------
// Plockar ut synliga FAQ-block ur brödtexten: H3-rubriker under en H2 som
// heter "Vanliga frågor" / "FAQ ...". Används för FAQPage-JSON-LD, som bara
// ska emitteras när frågorna faktiskt syns på sidan.

const FAQ_HEADING = /^##\s+(?:vanliga\s+frågor|faq\b|frågor\s+och\s+svar)/i

function toPlainText(md: string): string {
  return md
    .split('\n')
    .filter(line => !line.trim().startsWith('|'))
    .join(' ')
    .replace(/^\s*\*\*S:\*\*\s*/i, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/^\s*[-–]\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanQuestion(raw: string): string {
  return raw
    .replace(/^\s*(?:H|F|Q):\s*/i, '')
    .replace(/[*_`]/g, '')
    .replace(/^[\u2b50\s]+/, '')
    .trim()
}

export function extractFaq(markdown: string): FaqItem[] {
  const items: FaqItem[] = []
  let inFaq = false
  let question: string | null = null
  let buffer: string[] = []

  const flush = () => {
    if (question) {
      const answer = toPlainText(buffer.join('\n'))
      if (answer) items.push({ question, answer })
    }
    question = null
    buffer = []
  }

  for (const line of markdown.split('\n')) {
    const h3 = /^###\s+(.*)$/.exec(line)
    if (h3) {
      if (inFaq) {
        flush()
        question = cleanQuestion(h3[1])
      }
      continue
    }
    if (/^##\s+/.test(line)) {
      flush()
      inFaq = FAQ_HEADING.test(line)
      continue
    }
    if (inFaq && question) buffer.push(line)
  }
  flush()

  return items.filter(i => i.question.length > 0)
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
      updated: data.updated || undefined,
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
    updated: data.updated || undefined,
    category: data.category || category,
    description: data.description || '',
    content: html,
    readTime: Math.ceil(words / 200),
    faq: extractFaq(content),
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
    updated: data.updated || undefined,
    category: data.category || category,
    description: data.description || '',
    content,
    readTime: Math.ceil(words / 200),
    faq: extractFaq(content),
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
