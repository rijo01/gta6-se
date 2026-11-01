import { OG_SIZE, renderOg } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'GTA6.se – nyheter, guider och release-information om GTA 6 på svenska'

export default function Image() {
  return renderOg({ title: 'Grand Theft Auto VI på svenska', label: 'Nyheter · Guider · Release', color: '#FF2D7B' })
}
