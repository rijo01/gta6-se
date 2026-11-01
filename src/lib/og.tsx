import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'
import { type Category, categoryColors, categoryLabels, getArticle } from '@/lib/content'

// Delningsbilder: bara text och mall. Inga bilder från Rockstar.
// Typsnitten (OFL) ligger i src/assets/fonts så att bygget inte behöver nätet.

export const OG_SIZE = { width: 1200, height: 630 }

const fontDir = path.join(process.cwd(), 'src/assets/fonts')
const fonts = Promise.all([
  readFile(path.join(fontDir, 'BebasNeue-Regular.ttf')),
  readFile(path.join(fontDir, 'BarlowCondensed-Bold.ttf')),
])

function titleSize(title: string): number {
  const n = title.length
  if (n <= 32) return 112
  if (n <= 48) return 96
  if (n <= 64) return 84
  if (n <= 84) return 72
  return 62
}

export async function renderOg({ title, label, color }: { title: string; label: string; color: string }) {
  const [bebas, barlow] = await fonts
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '64px 72px', background: '#07040A',
          backgroundImage: `radial-gradient(circle at 85% 0%, ${color}33 0%, transparent 55%), linear-gradient(180deg, #100C15 0%, #07040A 100%)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 56, height: 6, background: color }} />
          <div style={{ fontFamily: 'Barlow', fontSize: 30, letterSpacing: 6, textTransform: 'uppercase', color }}>{label}</div>
        </div>
        <div style={{ display: 'flex', fontFamily: 'Bebas', fontSize: titleSize(title), lineHeight: 1.02, color: '#F0E8F8', maxWidth: 1050 }}>
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid #2A2035', paddingTop: 26 }}>
          <div style={{ display: 'flex', fontFamily: 'Bebas', fontSize: 52, color: '#F0E8F8', letterSpacing: 2 }}>
            GTA6<span style={{ color: '#FF2D7B' }}>.SE</span>
          </div>
          <div style={{ fontFamily: 'Barlow', fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', color: '#7A6880' }}>
            GTA 6 på svenska
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Bebas', data: bebas, weight: 400, style: 'normal' },
        { name: 'Barlow', data: barlow, weight: 700, style: 'normal' },
      ],
    },
  )
}

export async function renderArticleOg(cat: Category, slug: string) {
  const a = getArticle(cat, slug)
  return renderOg({ title: a?.title || 'GTA6.se', label: categoryLabels[cat], color: categoryColors[cat] })
}
