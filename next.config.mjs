/** @type {import('next').NextConfig} */

// 301-karta efter SEO-saneringen 7 september 2026.
// Vanster = borttagen/sammanslagen URL, hoger = kanonisk artikel.
// Inga kedjor: ingen hogersida forekommer som vanstersida.
const REDIRECTS = [
  // Icke-ASCII-slugs som 404:ade i produktion -> ASCII-slugs.
  // Next matchar mot den procentkodade sokvagen, darfor %C3%B6 och inte 'o' har.
  ['/guider/gta-6-basta-tips-nyb%C3%B6rjare', '/guider/gta-6-basta-tips-nyborjare'],
  ['/guider/gta-6-basta-g%C3%B6mstallen', '/guider/gta-6-basta-gomstallen'],
  ['/guider/gta-6-guide-nyb%C3%B6rjare-snabbstart-2026', '/guider/gta-6-basta-tips-nyborjare'],

  // Sammanslagna tunna/dubblerade artiklar
  ['/guider/gta-6-brottslighet-moral-system-2026', '/guider/gta-6-brottslighet-och-moral'],
  ['/guider/gta-6-fordon-garage-guide-2026', '/guider/gta-6-fordon-och-bilar'],
  ['/guider/gta-6-foto-mode-guide-2026', '/guider/gta-6-foto-mode'],
  ['/guider/gta-6-grafik-instaellningar-ps5-2026', '/guider/gta-6-basta-instaallningar-ps5'],
  ['/guider/gta-6-grafikkort-rekommendation-2026', '/guider/gta-6-grafikkort-pc'],
  ['/guider/gta-6-musik-radio-guide-2026', '/guider/gta-6-musik-och-radio'],
  ['/guider/gta-6-naturen-djurliv-2026', '/guider/gta-6-djurliv-och-natur'],
  ['/guider/gta-6-simning-dykning-guide-2026', '/guider/gta-6-simning-och-dykning'],
  ['/guider/gta-6-swimming-underwater-2026', '/guider/gta-6-simning-och-dykning'],
  ['/guider/gta-6-speed-run-tips-2026', '/guider/gta-6-klara-spelet-snabbt'],
  ['/guider/gta-6-tatueringar-karaktarsanpassning-2026', '/guider/gta-6-tatueringar-och-utseende'],
  ['/guider/gta-6-tips-online-overleva-uppdaterad', '/guider/gta-6-tips-online-overleva'],
  ['/guider/gta-6-vapen-guide-komplett-2026', '/guider/gta-6-vapen-och-strid'],
  ['/guider/gta-6-kopa-fastigheter-business-guide', '/guider/gta-6-fastigheter-och-business'],
  ['/guider/gta-6-heist-guide-strategi-2026', '/guider/gta-6-bankran-och-heist-tips-2026'],
  ['/guider/gta-6-multiplayer-online-guide-2026', '/guider/gta-6-gta-online-2-vad-vi-vet'],
  ['/guider/gta-6-multiplayer-crew-system-2026', '/guider/gta-6-online-multiplayer'],
  ['/guider/gta-6-collectibles-hemligheter-2026', '/guider/gta-6-samla-collectibles'],
  ['/guider/gta-6-forsta-timmarna-guide-2026', '/guider/gta-6-tips-forsta-spelaren'],
  ['/guider/gta-6-pengar-tjana-snabbt-2026', '/guider/gta-6-ekonomi-och-pengar'],
  ['/guider/gta-6-smuggling-kriminellt-natverk-2026', '/guider/gta-6-ekonomi-och-pengar'],
  ['/guider/gta-6-karta-leonida-vice-city', '/guider/gta-6-vice-city-karta-guide'],
  ['/guider/gta-6-wanted-level-undvika-polis-2026', '/guider/gta-6-polisen-och-wanted'],
  ['/guider/gta-6-gameplay-nyheter-mekanik', '/nyheter/gta-6-an-extended-look-allt-rockstar-visade'],
  ['/guider/gta-6-lucia-spelguide-tips-2026', '/karaktarer/gta-6-lucia-forvandling-storyline-2026'],
  ['/karaktarer/jason-duval-gta-6', '/karaktarer/gta-6-jason-bakgrund-djupdykning'],
  ['/karaktarer/lucia-caminos-gta-6', '/karaktarer/gta-6-lucia-bakgrund-djupdykning'],
  ['/karaktarer/gta-6-karaktarer-oversikt', '/karaktarer/gta-6-karaktarer-sidofigurer'],
  ['/karaktarer/gta-6-lucia-utseende-karaktaersdesign', '/karaktarer/gta-6-lucia-utseende-stil'],
  ['/karaktarer/gta-6-sidokaraktarer-npc-2026', '/karaktarer/gta-6-karaktarer-sidofigurer'],
  ['/karaktarer/gta-6-antagonister-skurkar-2026', '/karaktarer/gta-6-skurkar-och-antagonister'],
  ['/karaktarer/gta-6-jason-spelguide-tips-2026', '/karaktarer/gta-6-jason-bakgrund-djupdykning'],
  ['/nyheter/gta-6-marketing-sommar-2026', '/nyheter/gta-6-an-extended-look-allt-rockstar-visade'],
  ['/nyheter/gta-6-forsening-november-2026', '/nyheter/nar-kommer-gta-6-till-sverige'],
  ['/nyheter/gta-6-officiell-trailer-2-allt-vi-vet', '/nyheter/gta-6-trailer-2-analys'],
  ['/nyheter/gta-6-take-two-investor-maj-2026', '/nyheter/gta-6-take-two-rapport-2026'],
  ['/nyheter/gta-6-nyheter-maj-2026', '/nyheter/gta-6-nyheter-maj-22-2026'],
  ['/nyheter/gta-6-gameplay-features-maj-2026', '/nyheter/gta-6-an-extended-look-allt-rockstar-visade'],
  ['/nyheter/gta-6-trailer-3-rykte-analys-2026', '/nyheter/gta-6-rykte-trailer-3-gameplay'],
  ['/nyheter/gta-6-gaming-marknad-rekord-2026', '/nyheter/gta-6-forsaljning-rekord-prognos'],
  ['/nyheter/gta-6-rockstar-uppdateringar-april-2026', '/nyheter/gta-6-rockstar-twitter-uppdateringar'],
  ['/nyheter/gta-6-konsol-exklusivitet-2026', '/guider/gta-6-pc-release-datum'],
  ['/nyheter/gta-6-release-pris-sverige-2026', '/release/gta-6-pris-sverige-kostnad'],
  ['/nyheter/gta-6-nedrakning-dagar-kvar', '/nyheter/nar-kommer-gta-6-till-sverige'],
  ['/nyheter/gta-6-pre-order-oppnar-snart', '/release/gta-6-forbestalla-sverige-guide'],
  ['/release/gta-6-plattformar-ps5-xbox-pc', '/nyheter/nar-kommer-gta-6-till-sverige'],
  ['/release/gta-6-release-datum-november-2026', '/nyheter/nar-kommer-gta-6-till-sverige'],
  ['/release/gta-6-trailer-3-nar-kommer', '/nyheter/gta-6-rykte-trailer-3-gameplay'],
  ['/release/gta-6-midnight-release-launch-2026', '/nyheter/gta-6-lansering-dag-ett'],
  ['/release/gta-6-forbestallning-bonus-2026', '/release/gta-6-forbestalla-sverige-guide'],
  ['/release/gta-6-pc-release-datum-2027', '/guider/gta-6-pc-release-datum'],
  ['/release/gta-6-xbox-series-x-guide-2026', '/release/gta-6-xbox-series-x-guide'],
  ['/guider/gta-6-allt-vi-vet-2026', '/nyheter/gta-6-an-extended-look-allt-rockstar-visade'],
]

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }))
  },
}

export default nextConfig
