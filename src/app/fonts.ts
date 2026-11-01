import { Barlow, Barlow_Condensed, Bebas_Neue } from 'next/font/google'

// next/font laddar ner typsnitten vid bygget och serverar dem från gta6.se.
// Besökarens webbläsare gör inga anrop till fonts.googleapis.com/gstatic.com.
export const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--nf-bebas' })
export const barlow = Barlow({ weight: ['300', '400', '500', '600'], subsets: ['latin'], display: 'swap', variable: '--nf-barlow' })
export const barlowCondensed = Barlow_Condensed({ weight: ['400', '600', '700'], subsets: ['latin'], display: 'swap', variable: '--nf-barlow-condensed' })
