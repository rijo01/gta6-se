# SEO-sanering 7 september 2026

Utgångsläge i Google Search Console 7 sep 2026: 65 av 162 artiklar indexerade,
39 "sida med omdirigering", 38 "crawlad – för närvarande inte indexerad", 1 omdirigeringsfel.

## Vad mätningen faktiskt visade

- Sitemapen innehöll **inga** omdirigerande URL:er. Den innehöll däremot **tre URL:er som
  404:ade i produktion** — slugs med `ö` i sig. Next matchar mot den procentkodade sökvägen,
  så `/guider/gta-6-basta-gömstallen` gick aldrig att nå trots att filen fanns.
- De 39 omdirigeringarna kommer från domännivån (`www.` → apex, `http` → `https`,
  slutande snedstreck). `http://www.gta6.se/nyheter/` gick i **tre hopp** — det är den
  rimliga källan till omdirigeringsfelet. Åtgärdas i Vercels domäninställningar, inte i repot.
- Artikelsidorna saknade `rel=canonical` helt. Tillagt nu på alla fyra mallar.

## Beslut per artikel

### Slå ihop + 301 (56 omdirigeringar, samtliga verifierade i ett hopp)

| Borttagen URL | Ord | Skäl | 301 till |
|---|---|---|---|
| `/guider/gta-6-brottslighet-moral-system-2026` | 655 | tunn (655 ord) + dubblett, SANERING P1+P2+P3 | `/guider/gta-6-brottslighet-och-moral` |
| `/guider/gta-6-fordon-garage-guide-2026` | 765 | tunn (765 ord) + dubblett, SANERING P1+P2+P3 | `/guider/gta-6-fordon-och-bilar` |
| `/guider/gta-6-foto-mode-guide-2026` | 662 | tunn (662 ord) + dubblett, SANERING P2+P3 | `/guider/gta-6-foto-mode` |
| `/guider/gta-6-grafik-instaellningar-ps5-2026` | 657 | tunn (657 ord) + dubblett | `/guider/gta-6-basta-instaallningar-ps5` |
| `/guider/gta-6-grafikkort-rekommendation-2026` | 838 | dubblett | `/guider/gta-6-grafikkort-pc` |
| `/guider/gta-6-musik-radio-guide-2026` | 688 | tunn (688 ord) + dubblett, SANERING P1+P2 | `/guider/gta-6-musik-och-radio` |
| `/guider/gta-6-naturen-djurliv-2026` | 661 | tunn (661 ord) + dubblett, SANERING P2+P3 | `/guider/gta-6-djurliv-och-natur` |
| `/guider/gta-6-simning-dykning-guide-2026` | 548 | tunn (548 ord) + dubblett, SANERING P2 | `/guider/gta-6-simning-och-dykning` |
| `/guider/gta-6-swimming-underwater-2026` | 1390 | dubblett, SANERING P1 | `/guider/gta-6-simning-och-dykning` |
| `/guider/gta-6-speed-run-tips-2026` | 601 | tunn (601 ord) + dubblett, SANERING P2 | `/guider/gta-6-klara-spelet-snabbt` |
| `/guider/gta-6-tatueringar-karaktarsanpassning-2026` | 616 | tunn (616 ord) + dubblett, SANERING P2+P3 | `/guider/gta-6-tatueringar-och-utseende` |
| `/guider/gta-6-tips-online-overleva-uppdaterad` | 754 | tunn (754 ord) + dubblett, SANERING P2 | `/guider/gta-6-tips-online-overleva` |
| `/guider/gta-6-vapen-guide-komplett-2026` | 737 | tunn (737 ord) + dubblett, SANERING P2+P3 | `/guider/gta-6-vapen-och-strid` |
| `/guider/gta-6-kopa-fastigheter-business-guide` | 688 | tunn (688 ord) + dubblett, SANERING P1+P2 | `/guider/gta-6-fastigheter-och-business` |
| `/guider/gta-6-heist-guide-strategi-2026` | 754 | tunn (754 ord) + dubblett, SANERING P1+P2+P3 | `/guider/gta-6-bankran-och-heist-tips-2026` |
| `/guider/gta-6-multiplayer-online-guide-2026` | 846 | dubblett, SANERING P1+P2 | `/guider/gta-6-gta-online-2-vad-vi-vet` |
| `/guider/gta-6-multiplayer-crew-system-2026` | 601 | tunn (601 ord) + dubblett, SANERING P2 | `/guider/gta-6-online-multiplayer` |
| `/guider/gta-6-collectibles-hemligheter-2026` | 653 | tunn (653 ord) + dubblett, SANERING P2 | `/guider/gta-6-samla-collectibles` |
| `/guider/gta-6-forsta-timmarna-guide-2026` | 772 | tunn (772 ord) + dubblett, SANERING P2 | `/guider/gta-6-tips-forsta-spelaren` |
| `/guider/gta-6-guide-nybörjare-snabbstart-2026` | 752 | tunn (752 ord) + dubblett, SANERING P2 | `/guider/gta-6-basta-tips-nyborjare` |
| `/guider/gta-6-pengar-tjana-snabbt-2026` | 779 | tunn (779 ord) + dubblett, SANERING P1+P2 | `/guider/gta-6-ekonomi-och-pengar` |
| `/guider/gta-6-smuggling-kriminellt-natverk-2026` | 604 | tunn (604 ord) + dubblett, SANERING P1+P2 | `/guider/gta-6-ekonomi-och-pengar` |
| `/guider/gta-6-karta-leonida-vice-city` | 627 | tunn (627 ord) + dubblett | `/guider/gta-6-vice-city-karta-guide` |
| `/guider/gta-6-wanted-level-undvika-polis-2026` | 823 | dubblett | `/guider/gta-6-polisen-och-wanted` |
| `/guider/gta-6-gameplay-nyheter-mekanik` | 297 | tunn (297 ord) + dubblett | `/nyheter/gta-6-an-extended-look-allt-rockstar-visade` |
| `/guider/gta-6-lucia-spelguide-tips-2026` | 788 | tunn (788 ord) + dubblett, SANERING P1+P2 | `/karaktarer/gta-6-lucia-forvandling-storyline-2026` |
| `/karaktarer/jason-duval-gta-6` | 247 | tunn (247 ord) + dubblett | `/karaktarer/gta-6-jason-bakgrund-djupdykning` |
| `/karaktarer/lucia-caminos-gta-6` | 278 | tunn (278 ord) + dubblett | `/karaktarer/gta-6-lucia-bakgrund-djupdykning` |
| `/karaktarer/gta-6-karaktarer-oversikt` | 288 | tunn (288 ord) + dubblett | `/karaktarer/gta-6-karaktarer-sidofigurer` |
| `/karaktarer/gta-6-lucia-utseende-karaktaersdesign` | 580 | tunn (580 ord) + dubblett, SANERING P2 | `/karaktarer/gta-6-lucia-utseende-stil` |
| `/karaktarer/gta-6-sidokaraktarer-npc-2026` | 649 | tunn (649 ord) + dubblett, SANERING P2+P3 | `/karaktarer/gta-6-karaktarer-sidofigurer` |
| `/karaktarer/gta-6-antagonister-skurkar-2026` | 725 | tunn (725 ord) + dubblett, SANERING P1+P2 | `/karaktarer/gta-6-skurkar-och-antagonister` |
| `/karaktarer/gta-6-jason-spelguide-tips-2026` | 659 | tunn (659 ord) + dubblett, SANERING P1+P2 | `/karaktarer/gta-6-jason-bakgrund-djupdykning` |
| `/nyheter/gta-6-marketing-sommar-2026` | 196 | tunn (196 ord) + dubblett | `/nyheter/gta-6-an-extended-look-allt-rockstar-visade` |
| `/nyheter/gta-6-forsening-november-2026` | 254 | tunn (254 ord) + dubblett | `/nyheter/nar-kommer-gta-6-till-sverige` |
| `/nyheter/gta-6-officiell-trailer-2-allt-vi-vet` | 271 | tunn (271 ord) + dubblett | `/nyheter/gta-6-trailer-2-analys` |
| `/nyheter/gta-6-take-two-investor-maj-2026` | 488 | tunn (488 ord) + dubblett | `/nyheter/gta-6-take-two-rapport-2026` |
| `/nyheter/gta-6-nyheter-maj-2026` | 516 | tunn (516 ord) + dubblett, SANERING P1+P2 | `/nyheter/gta-6-nyheter-maj-22-2026` |
| `/nyheter/gta-6-gameplay-features-maj-2026` | 547 | tunn (547 ord) + dubblett, SANERING P1+P2+P3 | `/nyheter/gta-6-an-extended-look-allt-rockstar-visade` |
| `/nyheter/gta-6-trailer-3-rykte-analys-2026` | 613 | tunn (613 ord) + dubblett, SANERING P1+P2 | `/nyheter/gta-6-rykte-trailer-3-gameplay` |
| `/nyheter/gta-6-gaming-marknad-rekord-2026` | 625 | tunn (625 ord) + dubblett | `/nyheter/gta-6-forsaljning-rekord-prognos` |
| `/nyheter/gta-6-rockstar-uppdateringar-april-2026` | 623 | tunn (623 ord) + dubblett, SANERING P1+P2 | `/nyheter/gta-6-rockstar-twitter-uppdateringar` |
| `/nyheter/gta-6-konsol-exklusivitet-2026` | 691 | tunn (691 ord) + dubblett | `/guider/gta-6-pc-release-datum` |
| `/nyheter/gta-6-release-pris-sverige-2026` | 766 | tunn (766 ord) + dubblett | `/release/gta-6-pris-sverige-kostnad` |
| `/nyheter/gta-6-nedrakning-dagar-kvar` | 725 | tunn (725 ord) + dubblett | `/nyheter/nar-kommer-gta-6-till-sverige` |
| `/nyheter/gta-6-pre-order-oppnar-snart` | 911 | dubblett | `/release/gta-6-forbestalla-sverige-guide` |
| `/release/gta-6-plattformar-ps5-xbox-pc` | 298 | tunn (298 ord) + dubblett | `/nyheter/nar-kommer-gta-6-till-sverige` |
| `/release/gta-6-release-datum-november-2026` | 431 | tunn (431 ord) + dubblett | `/nyheter/nar-kommer-gta-6-till-sverige` |
| `/release/gta-6-trailer-3-nar-kommer` | 352 | tunn (352 ord) + dubblett | `/nyheter/gta-6-rykte-trailer-3-gameplay` |
| `/release/gta-6-midnight-release-launch-2026` | 713 | tunn (713 ord) + dubblett | `/nyheter/gta-6-lansering-dag-ett` |
| `/release/gta-6-forbestallning-bonus-2026` | 748 | tunn (748 ord) + dubblett | `/release/gta-6-forbestalla-sverige-guide` |
| `/release/gta-6-pc-release-datum-2027` | 683 | tunn (683 ord) + dubblett | `/guider/gta-6-pc-release-datum` |
| `/release/gta-6-xbox-series-x-guide-2026` | 709 | tunn (709 ord) + dubblett | `/release/gta-6-xbox-series-x-guide` |
| `/guider/gta-6-allt-vi-vet-2026` | 375 | tunn (375 ord) + dubblett | `/nyheter/gta-6-an-extended-look-allt-rockstar-visade` |

Utöver dessa 54 sammanslagningar finns 3 omdirigeringar från de icke-ASCII-slugs som
404:ade (`gta-6-basta-tips-nybörjare`, `gta-6-basta-gömstallen`,
`gta-6-guide-nybörjare-snabbstart-2026`), varav den sista också var en sammanslagning.
Filerna för de två första är omdöpta till ASCII. Alla interna länkar i brödtexten är
omskrivna till de kanoniska målen, så ingen intern länk går längre via en omdirigering.

### Noindex (behålls för läsare, ur index och ur sitemap)

| URL | Ord | Skäl |
|---|---|---|
| `/nyheter/gta-6-spiderman-trailer-rekordet` | 312 | Tunn, handlar inte om GTA 6 i sak. Inget rimligt sammanslagningsmål. |
| `/nyheter/gta-6-vs-red-dead-redemption-3-2026` | 663 | SANERING P2. Spekulation om ett spel som inte är annonserat — kan inte källbeläggas. |

### Förbättra med källa — **inget ändrat, kräver källarbete**

Dessa är kvar i index men är antingen tunna eller källbelastade. De behöver riktig
research innan de rörs; ingen text har skrivits om utan källa.

| URL | Ord | Vad som saknas |
|---|---|---|
| `/release/gta-6-accessibility-tillganglighet-2026` | 566 | Unikt ämne utan dubblett, men behöver Rockstars egen tillgänglighetsinformation. |
| `/guider/gta-6-fastigheter-och-business` | 793 | Är nu sammanslagningsmål men fortfarande tunn — behöver material från An Extended Look. |
| `/guider/gta-6-byta-karaktar-lucia-jason-2026` | 795 | SANERING P2 — läckaggregator som källa. |
| `/karaktarer/gta-6-lucia-jason-relation` | 1152 | SANERING P1 — gameplay-fakta ur läckan 2022 måste bytas mot tillåten källa. |
| `/guider/gta-6-vice-city-stadsdelar-guide-2026` | 887 | SANERING P1+P2. Överlappar kartguiden — slå ihop om källorna inte går att byta. |
| `/release/gta-6-svenska-sprak-undertexter` | 844 | Behöver bekräftelse på språkstöd. |
| `/guider/gta-6-mods-pc-guide` | 905 | Behöver Rockstars uttalanden om modstöd. |

## Kodändringar

- `next.config.mjs` — 56 permanenta omdirigeringar. Inga kedjor: ingen högersida
  förekommer som vänstersida.
- `src/lib/content.ts` — `noindex`-flagga i frontmatter, `getIndexableArticles()`.
- `src/app/sitemap.ts` — bygger på `getIndexableArticles()`, använder `updated` när den
  finns. Sitemapen innehåller nu 117 URL:er, alla 200 och alla indexerbara.
- `src/app/{nyheter,guider,karaktarer,release}/[slug]/page.tsx` — `rel=canonical` samt
  `robots: noindex, follow` när frontmatter säger det.

## Kvar att göra utanför repot

Kapa omdirigeringskedjan i Vercel: `http://www.gta6.se/x/` tar tre hopp
(`http://www.` → `https://www.` → `https://` apex utan snedstreck). Peka `www` direkt
mot apex över https så blir det ett hopp.
