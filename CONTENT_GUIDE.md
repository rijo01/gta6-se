# CONTENT_GUIDE.md — GTA6.se

Teknisk och redaktionell handbok för innehållsproduktion. Skriven 1 sep 2026.
Kompletterar `README.md` (som beskriver stacken); den här filen beskriver
**hur innehåll är strukturerat, hur det renderas och vilka regler som gäller**.

---

## 1. Stack och rendering

| Del | Implementation |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript), React 18 |
| Innehåll | `.mdx`-filer i `src/content/`, lästa av `src/lib/content.ts` |
| Parsning | `gray-matter` (frontmatter) + `remark` → `remark-html` |
| Rendering | HTML injiceras via `dangerouslySetInnerHTML` i `.prose-gta` |
| Hosting | Vercel, auto-deploy vid push till `main` |

**Viktigt:** trots filändelsen `.mdx` renderas innehållet som **ren Markdown**
via `remark` — inte som MDX. JSX-komponenter i filerna körs **inte**.
`sanitize: false` är satt, så rå HTML i filerna släpps igenom.

---

## 2. Kataloger och routing

```
src/content/nyheter/<slug>.mdx      → /nyheter/<slug>
src/content/release/<slug>.mdx      → /release/<slug>
src/content/guider/<slug>.mdx       → /guider/<slug>
src/content/karaktarer/<slug>.mdx   → /karaktarer/<slug>
```

Filnamnet är sanningen för URL:en (`getArticlesByCategory` härleder slug ur
filnamnet). Frontmatter-fältet `slug` används **inte** för routing — det måste
ändå hållas synkat med filnamnet (se commit `3c1a9a8`).

Statiska sidor: `/`, `/nyheter`, `/guider`, `/karaktarer`, `/release`, `/trailers`.
`/trailers` har ingen innehållskatalog — den är hårdkodad i `src/app/trailers/page.tsx`.

Sitemap genereras dynamiskt i `src/app/sitemap.ts` från `getAllArticles()`.
**Nya artiklar hamnar automatiskt i sitemap — ingen manuell åtgärd krävs.**

---

## 3. Frontmatter-schema

### Fält som faktiskt används av koden

| Fält | Krav | Används till |
|---|---|---|
| `title` | **obligatoriskt** | `<h1>`, `<title>`, OG-titel, JSON-LD `headline` |
| `date` | **obligatoriskt** | sortering, datumrad, `datePublished`, sitemap `lastModified` |
| `category` | **obligatoriskt** | måste matcha katalogen |
| `description` | **obligatoriskt** | meta description, OG-description, ingresstext på sidan |
| `slug` | konvention | ej använd av routing, men håll synkad med filnamnet |

`readTime` beräknas automatiskt (ord / 200) — ska inte sättas manuellt.

### Fält som förekommer men är DÖDA (renderas inte)

`updated` (66 filer) · `type` (62) · `faqSchema` (62) · `author` (62)
· `metaDescription` (4 filer — **fel fältnamn**, ger tom meta description)

Se §7 för åtgärdslista.

### Mall

```yaml
---
title: "Artikelns titel — max ca 60 tecken"
date: "2026-09-01"
updated: "2026-09-01"
category: "nyheter"
slug: "matchar-filnamnet"
description: "150–160 tecken med primärt sökord."
---
```

---

## 4. Silor och interna länkar

Fyra silor. Varje artikel hör till exakt en.

| Silo | Färg | Roll |
|---|---|---|
| **nyheter** | `#FF2D7B` | Tidsbunden händelserapportering |
| **release** | `#FF6B1A` | Köp, plattformar, datum, teknik kring lansering |
| **guider** | `#00F5FF` | Evergreen spelmekanik och hur-gör-man |
| **karaktarer** | `#9B2FFF` | Personer i spelet |

**Länkregler:**
- Minst **3 interna länkar in i den egna silon** + **1 till relevant navartikel**.
- Länkformat: `[ankartext](/silo/slug)` — absoluta rotrelativa sökvägar.
- Navartikeln ska **uppdateras med länk tillbaka** när en djupdykning publiceras.
- "Relaterade artiklar" i sidfoten på artikelsidan är automatisk (3 senaste i
  samma silo) och räknas **inte** som redaktionell internlänkning.

---

## 5. Källhierarki och faktaregler

**Tillåtna källor, i fallande ordning:**

- **A.** Rockstar Newswire / rockstargames.com / officiella videopresentationer
- **B.** Take-Two investerarkommunikation och pressmeddelanden
- **C.** Etablerade redaktioner med egen Rockstar North-preview
  (GameSpot, IGN, PC Gamer, Eurogamer, VGC, Kotaku, Variety, Engadget, SVT)

**Förbjudet som källa:** läckt material ("CyberLeek" och motsvarande).
Inga gameplay-fakta får härledas ur läckor. Ingen inbäddning, ingen länk till
läckt footage. Take-Two driver aktiva DMCA-processer.
En läcka får **enbart** beskrivas som nyhetshändelse (juridiskt förlopp,
Rockstars uttalande) — aldrig som informationskälla om spelet.

**Faktadisciplin:**
- Varje siffra, datum och funktion webbsöks och verifieras mot primärkälla.
- Osäkert skrivs ut som osäkert, med källa och datum.
- Skriv "per <datum>" där läget kan ändras.
- **Hitta aldrig på systemkrav, filstorlekar eller specifikationer.**
- Spekulation ska märkas som spekulation i brödtexten — inte bara i titeln.

---

## 6. Skrivregler

- Svenska för svensk publik. Ingen översättningssvenska.
- **Ingen `# H1` i brödtexten** — `title` renderas som sidans enda `<h1>`.
  Bryt bara mot detta om du vill återskapa buggen som fixades i `8929c47`.
- Rubriker börjar på `##`. Korrekta svenska sammansättningar: *filstorlek*,
  *efterlyst-system*, *prestandaläge*, *bildfrekvens* — aldrig särskrivet.
- Entiteter, inte strängar: Rockstar North, Leonida, Vice City, Take-Two,
  Jason Duval, Lucia Caminos, PS5, Xbox Series X/S — koppla dem semantiskt.
- FAQ-block med frågor folk faktiskt söker på, som `### `-rubriker under `## Vanliga frågor`.
- Bilder: `.webp`, beskrivande filnamn, alt-text. Inga tunga inbäddningar
  ovanför viken (Core Web Vitals).
- Mobil 375 px kontrolleras på varje ny sida.

### YouTube-inbäddningar

Endast i `nyheter`, och endast via kartan `TRAILER_EMBEDS` i
`src/app/nyheter/[slug]/page.tsx`. Lägg till slug + videoId där — inte i MDX-filen.

---

## 7. Kända brister

Status efter innehållspasset 1 september 2026.

**Åtgärdat:**

1. ~~Ingen `BreadcrumbList`~~ — emitteras nu på alla artikelsidor via
   `src/components/ArticleJsonLd.tsx`.
2. ~~Ingen `FAQPage`~~ — emitteras nu när `extractFaq()` i `src/lib/content.ts` hittar
   minst två synliga fråga/svar-par under en H2 som heter "Vanliga frågor" eller "FAQ …".
   Det dolda `faqSchema`-fältet styr ingenting; det synliga innehållet gör det.
3. ~~`guider` deklarerade `HowTo` utan `step[]`~~ — ogiltigt schema, nu `Article`.
   `karaktarer` deklarerade `about.Person` med artikelrubriken som personnamn — borttaget.
4. ~~`updated` renderades inte~~ — visas nu på sidan och emitteras som `dateModified`,
   men **endast när `updated` skiljer sig från `date`**. Lika värden betyder "aldrig
   reviderad" och ska inte ge någon färskhetssignal.

**Kvarstår:**

5. **3 filer saknar `description`** (använder `metaDescription:`):
   `guider/gta-6-stunt-guide-2026`, `guider/gta-6-swimming-underwater-2026`,
   `karaktarer/gta-6-lucia-forvandling-storyline-2026`.
   (`nyheter/gta-6-nyheter-maj-22-2026` är åtgärdad.)
6. **Läckberoende innehåll** — se `SANERING.md` i repo-roten. Eget pass.
7. **Topikala närdubbletter** i guider/release (simning ×3, foto mode ×2, systemkrav ×2,
   förbeställning ×4, PS5 Pro ×2, multiplayer ×4, Lucia utseende ×2).

---

## 8. Faktaläge efter An Extended Look

Verifierat 1 september 2026. Ingen fil i repot får motsäga det här.

| Fakta | Läge | Källa |
|---|---|---|
| Efterlyst-systemet | **Sex stjärnor.** Brott måste bevittnas av vittne, larm eller kamera | Extended Look, Engadget |
| Criminal Profile | Permanent profil, skild från tillfällig Police Heat. Nollställs inte | Extended Look |
| Bildfrekvens | **30 fps på konsol vid lansering.** Inga annonserade grafiklägen. 60 fps varken utlovat eller uteslutet | Kotaku, Tom's Hardware |
| Kartan | ca 3× RDR2, ca 2× GTA 5. Vice City ca 2× Los Santos. Ingen area publicerad | Rob Nelson / GamesRadar, GameSpot, VGC |
| Kampanjlängd | ca 80 h — Rob Nelsons **egen** genomspelning, ej officiell speltid | TechSpot |
| Karaktärsbyte | Mitt i uppdrag. Vissa uppdrag låser karaktär | Extended Look |
| Mikrotransaktioner / generativ AI | Inga i singleplayer. Ingen generativ AI i produktionen | Rob Nelson, Push Square |
| Animationer | Över 600 000 (GTA 5 ~55 000, RDR2 ~300 000) | VGC |
| Förladdning | **12 november 2026.** Fysisk utgåva säljs samma dag, kod i ask, ingen skiva | GameSpot |
| Filstorlek | **Ingen officiell siffra.** Cirkulerande ~200 GB spåras till overifierat material | — |
| PC | Inget datum, ingen butik, inga systemkrav | PC Gamer, SVG |
| GTA Online | Inget nytt annonserat. "Single-player experience" är Take-Twos formulering — en **slutledning**, inte ett besked | GamesRadar |
| Pris i Sverige | 899 kr standard, 1 149 kr Ultimate | SVT, Take-Two |

**Navartikel:** `/nyheter/gta-6-an-extended-look-allt-rockstar-visade`. Nya djupdykningar
i ämnet ska länka dit, och navet ska uppdateras med länk tillbaka.

---

## 9. Checklista före commit

- [ ] `npm run build` går rent
- [ ] Ingen `# H1` i brödtexten
- [ ] `slug` = filnamn
- [ ] `description` finns, 150–160 tecken, unik mot övriga artiklar
- [ ] `title` unik mot övriga artiklar
- [ ] Minst 3 interna silolänkar + 1 navlänk, alla mål finns
- [ ] Navartikeln uppdaterad med länk tillbaka
- [ ] Varje siffra har källa och datum
- [ ] Inga läckor som faktakälla
- [ ] Mobil 375 px kontrollerad
- [ ] Sitemap: automatisk, ingen åtgärd

---

## 10. Fullständig artikelinventering (167 artiklar, 1 september 2026)

Primärt sökord är härlett ur slug — den är i praktiken sökordsmålet på den här sajten.

### Nyheter (40 artiklar)

| Slug | H1 / title | Primärt sökord | Publ. | Uppd. | Ord |
|---|---|---|---|---|---|
| `gta-6-Sverige-lanseringsevent` | GTA 6 Lanseringsevent i Sverige – Var Firar du Launch? | gta 6 Sverige lanseringsevent | 2026-04-07 | – | 865 |
| `gta-6-an-extended-look-allt-rockstar-visade` | An Extended Look – allt Rockstar visade om GTA 6 | gta 6 an extended look allt rockstar visade | 2026-09-01 | 2026-09-01 | 1624 |
| `gta-6-endast-singleplayer-release` | GTA 6 blir endast singleplayer vid release – inget nytt GTA Online | gta 6 endast singleplayer release | 2026-07-07 | 2026-07-07 | 885 |
| `gta-6-fan-theories` | GTA 6 Fan Theories – De Vildaste Teorierna om Storyn | gta 6 fan theories | 2026-04-01 | – | 1201 |
| `gta-6-fnac-pris-lacka-osakerhet` | GTA 6 pris-läckan: vad FNAC avslöjade – och hur den stod sig mot facit | gta 6 fnac pris lacka osakerhet | 2026-06-22 | 2026-07-07 | 1210 |
| `gta-6-forsaljning-rekord-prognos` | GTA 6 Försäljning – Kan det Bli Det Mest Säljande Spelet Någonsin? | gta 6 forsaljning rekord prognos | 2026-03-22 | – | 1412 |
| `gta-6-forsening-november-2026` | GTA 6 Försenat till November 2026 – Vad Hände? | gta 6 forsening november 2026 | 2026-03-20 | – | 254 |
| `gta-6-gameplay-features-maj-2026` | GTA 6 gameplay-features – vad vi vet maj 2026 | gta 6 gameplay features maj 2026 | 2026-05-08 | 2026-05-08 | 549 |
| `gta-6-gaming-marknad-rekord-2026` | GTA 6 – spelmarknadens rekord 2026 | gta 6 gaming marknad rekord 2026 | 2026-05-05 | 2026-05-05 | 627 |
| `gta-6-jamforelse-rdr2` | GTA 6 vs Red Dead Redemption 2 – Rockstars Teknologiska Språng | gta 6 jamforelse rdr2 | 2026-03-23 | – | 1203 |
| `gta-6-kartan-tre-ganger-storre-an-rdr2` | GTA 6:s karta – tre gånger större än Red Dead Redemption 2 | gta 6 kartan tre ganger storre an rdr2 | 2026-09-01 | 2026-09-01 | 898 |
| `gta-6-konkurrenter-2026` | GTA 6 Konkurrenter 2026 – Vilka Spel Törs Utmana Rockstar? | gta 6 konkurrenter 2026 | 2026-04-03 | – | 1067 |
| `gta-6-konsol-exklusivitet-2026` | GTA 6 konsolexklusivitet – hur länge? | gta 6 konsol exklusivitet 2026 | 2026-04-24 | 2026-09-01 | 693 |
| `gta-6-lackor-och-rykten-samling` | GTA 6 Läckor och Rykten – Vad Stämmer och Vad är Falskt? | gta 6 lackor och rykten samling | 2026-03-22 | – | 971 |
| `gta-6-lansering-dag-ett` | GTA 6 Lansering – Vad Händer Den 19 November 2026? | gta 6 lansering dag ett | 2026-03-21 | – | 852 |
| `gta-6-marketing-sommar-2026` | GTA 6 Marknadsföring Startar Sommaren 2026 – Vad Väntar Oss? | gta 6 marketing sommar 2026 | 2026-03-21 | – | 196 |
| `gta-6-musikartister-soundtrack` | GTA 6 Soundtrack – Artister, Låtar och Radiokanaler | gta 6 musikartister soundtrack | 2026-04-09 | – | 953 |
| `gta-6-nar-far-vi-veta-priset-25-juni` | När fick vi veta GTA 6:s pris? 25 juni-beskedet | gta 6 nar far vi veta priset 25 juni | 2026-06-22 | 2026-07-07 | 886 |
| `gta-6-nedrakning-dagar-kvar` | GTA 6 Nedräkning – Så Många Dagar Kvar till 19 November | gta 6 nedrakning dagar kvar | 2026-05-28 | – | 725 |
| `gta-6-nyheter-maj-2026` | GTA 6 nyheter maj 2026 – sammanfattning | gta 6 nyheter maj 2026 | 2026-05-12 | 2026-05-12 | 518 |
| `gta-6-nyheter-maj-22-2026` | GTA 6 nyheter 22 maj 2026 | gta 6 nyheter maj 22 2026 | 2026-05-22 | 2026-09-01 | 1379 |
| `gta-6-nyheter-mars-2026` | GTA 6 Nyheter Mars 2026 – Senaste Uppdateringarna | gta 6 nyheter mars 2026 | 2026-03-23 | – | 1170 |
| `gta-6-officiell-trailer-2-allt-vi-vet` | GTA 6 Officiell Trailer 2 – Allt vi Vet | gta 6 officiell trailer 2 allt vi vet | 2025-03-01 | – | 271 |
| `gta-6-pre-order-oppnar-snart` | GTA 6 Förbeställning Öppnar Snart – Var du Ska Förbeställa | gta 6 pre order oppnar snart | 2026-04-09 | 2026-07-07 | 911 |
| `gta-6-recensioner-embargo-betyg` | När Kommer GTA 6-recensionerna? Embargo, Betyg och Metacritic | gta 6 recensioner embargo betyg | 2026-06-12 | – | 1773 |
| `gta-6-release-pris-sverige-2026` | GTA 6 pris i Sverige – vad kostar det 2026? | gta 6 release pris sverige 2026 | 2026-04-17 | 2026-07-07 | 768 |
| `gta-6-release-time-natt` | GTA 6 Releasetid – Vilken Tid Lanseras Spelet i Sverige? | gta 6 release time natt | 2026-03-30 | – | 1025 |
| `gta-6-rockstar-twitter-uppdateringar` | Rockstar Games Twitter – Alla GTA 6 Uppdateringar Samlade | gta 6 rockstar twitter uppdateringar | 2026-04-05 | – | 950 |
| `gta-6-rockstar-union-konflikt` | GTA 6 och Rockstar Games – Fackkonflikt, Uppsägningar och Bakom Kulisserna | gta 6 rockstar union konflikt | 2026-03-15 | – | 1444 |
| `gta-6-rockstar-uppdateringar-april-2026` | GTA 6 Rockstar-uppdateringar april 2026 | gta 6 rockstar uppdateringar april 2026 | 2026-04-28 | 2026-04-28 | 625 |
| `gta-6-rykte-trailer-3-gameplay` | GTA 6 Trailer 3 Rykten – Gameplay, HUD och Vad vi Förväntar Oss | gta 6 rykte trailer 3 gameplay | 2026-03-20 | 2026-09-01 | 762 |
| `gta-6-spiderman-trailer-rekordet` | GTA 6 Tappar Trailer-Rekordet till Spider-Man: Brand New Day | gta 6 spiderman trailer rekordet | 2026-03-22 | – | 312 |
| `gta-6-take-two-investor-maj-2026` | Take-Two investerardag maj 2026 – GTA 6 | gta 6 take two investor maj 2026 | 2026-05-15 | 2026-05-15 | 490 |
| `gta-6-take-two-rapport-2026` | Take-Two Q3 2026 – GTA 6 på Schema och Marknadsföring Bekräftad | gta 6 take two rapport 2026 | 2026-03-19 | – | 768 |
| `gta-6-trailer-1-analys` | GTA 6 Trailer 1 – Komplett Analys av Allt Vi Såg | gta 6 trailer 1 analys | 2026-03-17 | – | 1245 |
| `gta-6-trailer-2-analys` | GTA 6 Trailer 2 – Komplett Analys och Allt Som Avslöjades | gta 6 trailer 2 analys | 2026-03-18 | – | 1235 |
| `gta-6-trailer-3-rykte-analys-2026` | GTA 6 Trailer 3 – rykten och vad vi förväntar | gta 6 trailer 3 rykte analys 2026 | 2026-04-24 | 2026-09-01 | 615 |
| `gta-6-vad-hander-med-gta-online` | Vad Händer med GTA Online och GTA 5 När GTA 6 Släpps? | gta 6 vad hander med gta online | 2026-05-28 | – | 978 |
| `gta-6-vs-red-dead-redemption-3-2026` | GTA 6 vs Red Dead Redemption 3 – vad kommer?   | gta 6 vs red dead redemption 3 2026 | 2026-05-01 | 2026-05-01 | 665 |
| `nar-kommer-gta-6-till-sverige` | När Kommer GTA 6? Officiellt Datum 19 November 2026 | nar kommer gta 6 till sverige | 2026-03-23 | – | 1062 |

### Release (30 artiklar)

| Slug | H1 / title | Primärt sökord | Publ. | Uppd. | Ord |
|---|---|---|---|---|---|
| `gta-6-accessibility-tillganglighet-2026` | GTA 6 tillgänglighetsfunktioner 2026 | gta 6 accessibility tillganglighet 2026 | 2026-05-08 | 2026-05-08 | 568 |
| `gta-6-aldersgrans-pegi` | GTA 6 Åldersgräns – PEGI 18 och Vad Föräldrar Bör Veta | gta 6 aldersgrans pegi | 2026-05-28 | – | 947 |
| `gta-6-cloud-gaming-geforce-now` | Kan du Spela GTA 6 i Molnet? GeForce Now, Xbox Cloud och Streaming | gta 6 cloud gaming geforce now | 2026-06-09 | – | 1624 |
| `gta-6-collector-edition-2026` | GTA 6 Collector's Edition – finns den? (läget juli 2026) | gta 6 collector edition 2026 | 2026-05-22 | 2026-07-07 | 1358 |
| `gta-6-crossplay-cross-platform` | GTA 6 Crossplay – Kan du Spela med Vänner på Annan Plattform? | gta 6 crossplay cross platform | 2026-05-28 | – | 1002 |
| `gta-6-digital-vs-fysisk` | GTA 6 Digital eller Fysisk – Vad ska du Välja? | gta 6 digital vs fysisk | 2026-03-21 | 2026-07-07 | 1024 |
| `gta-6-forbestalla-sverige-guide` | Förbeställa GTA 6 i Sverige – komplett guide 2026 | gta 6 forbestalla sverige guide | 2026-07-07 | 2026-07-07 | 1439 |
| `gta-6-forbestallning-bonus-2026` | GTA 6 förbeställning – bonus och var du köper | gta 6 forbestallning bonus 2026 | 2026-05-01 | 2026-07-07 | 750 |
| `gta-6-forbestellning-var-kop` | GTA 6 Förbeställning – Var och När kan du Förbeställa? | gta 6 forbestellning var kop | 2026-03-20 | 2026-07-07 | 1098 |
| `gta-6-forhandsbokning-25-juni-guide` | GTA 6 förhandsbokning öppnade 25 juni – så förbokar du | gta 6 forhandsbokning 25 juni guide | 2026-06-22 | 2026-07-07 | 999 |
| `gta-6-fysisk-utgava-utan-skiva` | GTA 6 fysisk utgåva utan skiva – endast nedladdningskod i boxen | gta 6 fysisk utgava utan skiva | 2026-07-07 | 2026-07-07 | 1043 |
| `gta-6-midnight-release-launch-2026` | GTA 6 midnight release – köa eller digital? | gta 6 midnight release launch 2026 | 2026-04-28 | 2026-04-28 | 715 |
| `gta-6-nedladdningsstorlek-forladda` | Hur stor blir GTA 6? Filstorlek, lagring och förladdning 12 nov | gta 6 nedladdningsstorlek forladda | 2026-05-28 | 2026-09-01 | 1057 |
| `gta-6-nintendo-switch-2` | Kommer GTA 6 till Nintendo Switch 2? | gta 6 nintendo switch 2 | 2026-06-11 | – | 1522 |
| `gta-6-pc-release-datum-2027` | GTA 6 PC release datum – när kommer den? | gta 6 pc release datum 2027 | 2026-04-21 | 2026-04-21 | 685 |
| `gta-6-pc-steam-epic-rockstar` | Var Köper du GTA 6 på PC – Steam, Epic eller Rockstar? | gta 6 pc steam epic rockstar | 2026-06-09 | – | 1838 |
| `gta-6-plattformar-ps5-xbox-pc` | GTA 6 Plattformar – PS5, Xbox Series X/S och PC | gta 6 plattformar ps5 xbox pc | 2026-03-22 | – | 298 |
| `gta-6-playstation-plus` | Kommer GTA 6 till PS Plus? Ingår Spelet i Abonnemanget? | gta 6 playstation plus | 2026-06-10 | – | 1798 |
| `gta-6-prestandalage-60fps-konsol` | Varför 30 fps på PS5 och Xbox – och kommer 60 fps? | gta 6 prestandalage 60fps konsol | 2026-06-07 | 2026-09-01 | 1137 |
| `gta-6-pris-sverige-kostnad` | GTA 6 Pris i Sverige – Vad Kostar Spelet 2026? | gta 6 pris sverige kostnad | 2026-03-21 | 2026-07-07 | 1194 |
| `gta-6-pris-sverige-uppskattning-25-juni` | Vad kostar GTA 6 i Sverige? Bekräftade priser i kronor | gta 6 pris sverige uppskattning 25 juni | 2026-06-22 | 2026-07-07 | 873 |
| `gta-6-ps5-pro-prestanda` | GTA 6 på PS5 Pro – 30 fps och inga annonserade Pro-lägen | gta 6 ps5 pro prestanda | 2026-05-28 | 2026-09-01 | 1101 |
| `gta-6-ps5-pro-vart-det-uppgradera` | Är PS5 Pro Värt Det för GTA 6? Lönar sig Uppgraderingen? | gta 6 ps5 pro vart det uppgradera | 2026-06-06 | 2026-09-01 | 2082 |
| `gta-6-release-datum-november-2026` | GTA 6 Releasedatum – 19 november 2026 officiellt bekräftat | gta 6 release datum november 2026 | 2026-03-23 | – | 431 |
| `gta-6-svenska-sprak-undertexter` | GTA 6 på Svenska? – Språk, Undertexter och Röster | gta 6 svenska sprak undertexter | 2026-05-28 | – | 844 |
| `gta-6-systemkrav-pc` | GTA 6 PC Systemkrav – Vad Behöver Din Dator? (Spekulation 2026) | gta 6 systemkrav pc | 2026-03-17 | – | 1433 |
| `gta-6-trailer-3-nar-kommer` | GTA 6 Trailer 3 – När Kommer Den och Vad Visar Den? | gta 6 trailer 3 nar kommer | 2026-03-23 | 2026-09-01 | 352 |
| `gta-6-xbox-game-pass` | GTA 6 och Xbox Game Pass – Ingår Spelet i Abonnemanget? | gta 6 xbox game pass | 2026-06-10 | – | 1556 |
| `gta-6-xbox-series-x-guide-2026` | GTA 6 på Xbox Series X – allt du behöver veta | gta 6 xbox series x guide 2026 | 2026-05-12 | 2026-05-12 | 711 |
| `gta-6-xbox-series-x-guide` | GTA 6 på Xbox Series X/S – Allt du Behöver Veta | gta 6 xbox series x guide | 2026-03-19 | 2026-09-01 | 1425 |

### Guider (80 artiklar)

| Slug | H1 / title | Primärt sökord | Publ. | Uppd. | Ord |
|---|---|---|---|---|---|
| `gta-6-100-procent-komplettering` | GTA 6 100% Komplettering – Vad Krävs för Platinum Trophy? | gta 6 100 procent komplettering | 2026-04-09 | – | 909 |
| `gta-6-allt-vi-vet-2026` | GTA 6 – Allt Vi Vet Inför Lanseringen November 2026 | gta 6 allt vi vet 2026 | 2026-03-23 | – | 375 |
| `gta-6-bankran-och-heist-tips-2026` | GTA 6 Bankrån & Heist: Planera Perfekta Rånet | gta 6 bankran och heist tips 2026 | 2026-05-26 | 2026-05-26 | 1479 |
| `gta-6-basta-bilar` | GTA 6 Bästa Bilar – Snabbaste och Coolaste Fordonen | gta 6 basta bilar | 2026-04-10 | – | 997 |
| `gta-6-basta-gömstallen` | GTA 6 Bästa Gömställen – Safehouses och Baser i Vice City | gta 6 basta gömstallen | 2026-04-01 | – | 972 |
| `gta-6-basta-instaallningar-ps5` | GTA 6 Bästa Inställningar på PS5 – Grafik, Ljud och Kontroller | gta 6 basta instaallningar ps5 | 2026-04-08 | 2026-09-01 | 901 |
| `gta-6-basta-tips-nybörjare` | GTA 6 Tips för Nybörjare – 15 Saker du Måste Veta | gta 6 basta tips nybörjare | 2026-04-03 | 2026-09-01 | 1236 |
| `gta-6-berattelse-handling` | GTA 6 Berättelse och Handling – Vad Vet Vi om Storyn? | gta 6 berattelse handling | 2026-03-21 | – | 1422 |
| `gta-6-brottslighet-moral-system-2026` | GTA 6 brottslighet och moralsystem guide | gta 6 brottslighet moral system 2026 | 2026-05-01 | 2026-05-01 | 657 |
| `gta-6-brottslighet-och-moral` | GTA 6 Moral och Val – Påverkar dina Handlingar Storyn? | gta 6 brottslighet och moral | 2026-04-05 | – | 1052 |
| `gta-6-byta-karaktar-lucia-jason-2026` | GTA 6 – Lucia vs Jason: när byter du karaktär? | gta 6 byta karaktar lucia jason 2026 | 2026-04-21 | 2026-04-21 | 797 |
| `gta-6-cheat-codes` | GTA 6 Cheat Codes – Alla Bekräftade och Förväntade Fuskoder | gta 6 cheat codes | 2026-04-10 | – | 989 |
| `gta-6-collectibles-hemligheter-2026` | GTA 6 collectibles och hemligheter – guide | gta 6 collectibles hemligheter 2026 | 2026-05-12 | 2026-05-12 | 655 |
| `gta-6-djurliv-och-natur` | GTA 6 Djurliv och Natur – Krokodiler, Stränder och Leonidas Ekosystem | gta 6 djurliv och natur | 2026-03-23 | – | 947 |
| `gta-6-easter-eggs-hemligheter` | GTA 6 Easter Eggs och Hemligheter – Vad Gömmer sig i Trailers? | gta 6 easter eggs hemligheter | 2026-03-22 | – | 955 |
| `gta-6-ekonomi-och-pengar` | GTA 6 Ekonomi – Pengar, Rån och Kriminell Verksamhet | gta 6 ekonomi och pengar | 2026-03-17 | – | 827 |
| `gta-6-fastigheter-och-business` | GTA 6 Fastigheter och Business – Köpa Hus och Driva Verksamhet | gta 6 fastigheter och business | 2026-03-17 | – | 793 |
| `gta-6-flyga-helikopter-plan` | GTA 6 Flyga – Helikoptrar, Plan och Luftfordon | gta 6 flyga helikopter plan | 2026-04-06 | 2026-09-01 | 1011 |
| `gta-6-fordon-garage-guide-2026` | GTA 6 fordon och garage – komplett guide | gta 6 fordon garage guide 2026 | 2026-04-28 | 2026-09-01 | 767 |
| `gta-6-fordon-och-bilar` | GTA 6 Fordon och Bilar – Bilar, Båtar, Motorcyklar och Flyg | gta 6 fordon och bilar | 2026-03-16 | – | 926 |
| `gta-6-forsta-timmarna-guide-2026` | GTA 6 – guide för de första timmarna | gta 6 forsta timmarna guide 2026 | 2026-04-24 | 2026-09-01 | 774 |
| `gta-6-forstapersonslage-first-person` | GTA 6 i Förstaperson – Finns Det Ett First Person-läge? | gta 6 forstapersonslage first person | 2026-06-05 | – | 1783 |
| `gta-6-foto-mode-guide-2026` | GTA 6 Foto Mode – guide och tips 2026 | gta 6 foto mode guide 2026 | 2026-05-08 | 2026-05-08 | 664 |
| `gta-6-foto-mode` | GTA 6 Foto Mode – Ta Fantastiska Screenshots i Vice City | gta 6 foto mode | 2026-03-31 | – | 1079 |
| `gta-6-gameplay-nyheter-mekanik` | GTA 6 Gameplay – Nya Mekaniker, AI och Spelvärlden | gta 6 gameplay nyheter mekanik | 2026-03-21 | – | 297 |
| `gta-6-gang-territorium-guide-2026` | GTA 6 Gang-territorier: Kontrollera Leonida 2026 | gta 6 gang territorium guide 2026 | 2026-05-26 | 2026-09-01 | 1580 |
| `gta-6-grafik-instaellningar-ps5-2026` | GTA 6 grafikinställningar PS5 – guide 2026 | gta 6 grafik instaellningar ps5 2026 | 2026-04-24 | 2026-09-01 | 659 |
| `gta-6-grafik-och-teknologi` | GTA 6 Grafik och Teknologi – Vad Gör Spelet Unikt? | gta 6 grafik och teknologi | 2026-03-21 | 2026-09-01 | 1573 |
| `gta-6-grafikkort-pc` | GTA 6 PC Grafikkort – Vilket GPU Klarar Spelet? | gta 6 grafikkort pc | 2026-04-10 | – | 1055 |
| `gta-6-grafikkort-rekommendation-2026` | GTA 6 grafikkort – vad ska du köpa 2026? | gta 6 grafikkort rekommendation 2026 | 2026-05-05 | 2026-05-05 | 840 |
| `gta-6-gta-online-2-vad-vi-vet` | GTA Online 2 – Vad Vet Vi om GTA 6:s Multiplayerläge? | gta 6 gta online 2 vad vi vet | 2026-04-07 | – | 1019 |
| `gta-6-guide-nybörjare-snabbstart-2026` | GTA 6 snabbstart – guide för nybörjare | gta 6 guide nybörjare snabbstart 2026 | 2026-05-08 | 2026-09-01 | 754 |
| `gta-6-heist-guide-strategi-2026` | GTA 6 Heist guide – strategi och förberedelse | gta 6 heist guide strategi 2026 | 2026-04-21 | 2026-09-01 | 756 |
| `gta-6-hemliga-platser` | GTA 6 Hemliga Platser och Secrets – Vad Gömmer sig i Vice City? | gta 6 hemliga platser | 2026-04-09 | – | 947 |
| `gta-6-historia-och-bakgrund` | Grand Theft Auto 6 – Historiken, Utvecklingen och Vägen Hit | gta 6 historia och bakgrund | 2026-03-16 | – | 1406 |
| `gta-6-karta-leonida-vice-city` | GTA 6 Karta – Leonida, Vice City och Allt Vi Vet | gta 6 karta leonida vice city | 2026-03-22 | 2026-09-01 | 627 |
| `gta-6-klara-spelet-snabbt` | GTA 6 Speedrun – Kan du Klara Spelet på Under 10 Timmar? | gta 6 klara spelet snabbt | 2026-04-02 | – | 1118 |
| `gta-6-kopa-fastigheter-business-guide` | GTA 6 fastigheter och business – guide 2026 | gta 6 kopa fastigheter business guide | 2026-05-01 | 2026-05-01 | 690 |
| `gta-6-leonida-delstat` | Leonida – GTA 6:s Version av Florida Förklarad | gta 6 leonida delstat | 2026-03-15 | – | 834 |
| `gta-6-lucia-spelguide-tips-2026` | Lucia i GTA 6 – komplett spelguide och tips | gta 6 lucia spelguide tips 2026 | 2026-04-17 | 2026-04-17 | 790 |
| `gta-6-melee-narstrid-guide-2026` | GTA 6 Närstridskombat: Komplett Melee-guide | gta 6 melee narstrid guide 2026 | 2026-05-26 | 2026-05-26 | 1629 |
| `gta-6-minispel-aktiviteter-guide-2026` | GTA 6 Minispel & Aktiviteter i Leonida: Guide | gta 6 minispel aktiviteter guide 2026 | 2026-05-26 | 2026-05-26 | 1659 |
| `gta-6-mods-pc-guide` | GTA 6 Mods – Kommer PC-Versionen Stödja Mods? | gta 6 mods pc guide | 2026-05-28 | – | 905 |
| `gta-6-motorcyklar` | GTA 6 Motorcyklar – Snabbaste Bikes i Vice City | gta 6 motorcyklar | 2026-04-06 | – | 967 |
| `gta-6-multiplayer-crew-system-2026` | GTA 6 Crews – bygg och leda ditt gäng | gta 6 multiplayer crew system 2026 | 2026-05-12 | 2026-05-12 | 603 |
| `gta-6-multiplayer-modes` | GTA 6 Multiplayer – Spellägen, Co-op och Online-Funktioner | gta 6 multiplayer modes | 2026-03-20 | – | 860 |
| `gta-6-multiplayer-online-guide-2026` | GTA Online 2 – allt vi vet om multiplayer 2026 | gta 6 multiplayer online guide 2026 | 2026-04-17 | 2026-04-17 | 848 |
| `gta-6-musik-och-radio` | GTA 6 Musik och Radiokanaler – Soundtrack och Låtar | gta 6 musik och radio | 2026-03-19 | – | 969 |
| `gta-6-musik-radio-guide-2026` | GTA 6 musik och radio – guide 2026 | gta 6 musik radio guide 2026 | 2026-05-05 | 2026-05-05 | 690 |
| `gta-6-naturen-djurliv-2026` | GTA 6 natur och djurliv i Leonida | gta 6 naturen djurliv 2026 | 2026-04-28 | 2026-04-28 | 663 |
| `gta-6-npc-reaktioner` | GTA 6 NPC Reaktioner – Världens Smartaste Statister | gta 6 npc reaktioner | 2026-03-31 | – | 1110 |
| `gta-6-online-multiplayer` | GTA 6 Online – Vad Vet Vi om GTA VI:s Multiplayer? | gta 6 online multiplayer | 2026-03-19 | – | 1360 |
| `gta-6-pc-release-datum` | GTA 6 PC – När Kommer PC-Versionen och Vad Vet Vi? | gta 6 pc release datum | 2026-03-18 | 2026-09-01 | 1500 |
| `gta-6-pengar-tjana-snabbt-2026` | GTA 6 – tjäna pengar snabbt 2026 (guide) | gta 6 pengar tjana snabbt 2026 | 2026-04-17 | 2026-04-17 | 781 |
| `gta-6-polisen-och-wanted` | Sex stjärnor och Criminal Profile – så fungerar polisjakten | gta 6 polisen och wanted | 2026-03-18 | 2026-09-01 | 983 |
| `gta-6-ps5-guide` | GTA 6 på PS5 – Allt du Behöver Veta | gta 6 ps5 guide | 2026-03-19 | 2026-09-01 | 1348 |
| `gta-6-samla-collectibles` | GTA 6 Collectibles – Vad Finns det att Samla i Vice City? | gta 6 samla collectibles | 2026-04-02 | – | 970 |
| `gta-6-simning-dykning-guide-2026` | GTA 6 simning och dykning – guide 2026 | gta 6 simning dykning guide 2026 | 2026-05-15 | 2026-05-15 | 550 |
| `gta-6-simning-och-dykning` | GTA 6 Simning och Dykning – Utforska Havet i Vice City | gta 6 simning och dykning | 2026-04-07 | – | 1046 |
| `gta-6-smuggling-kriminellt-natverk-2026` | GTA 6 smuggling och kriminellt nätverk | gta 6 smuggling kriminellt natverk 2026 | 2026-05-08 | 2026-05-08 | 606 |
| `gta-6-speed-run-tips-2026` | GTA 6 speed run – tips för att klara snabbt | gta 6 speed run tips 2026 | 2026-05-15 | 2026-05-15 | 603 |
| `gta-6-speltid-langd-uppdrag` | Hur lång är GTA 6? Cirka 80 timmar enligt Rockstar North | gta 6 speltid langd uppdrag | 2026-06-08 | 2026-09-01 | 1940 |
| `gta-6-split-screen-delad-skarm` | GTA 6 Split Screen – Går det att Spela Delad Skärm och Co-op? | gta 6 split screen delad skarm | 2026-05-28 | – | 849 |
| `gta-6-stunt-guide-2026` | GTA 6 Stunt guide – tricks och fall 2026 | gta 6 stunt guide 2026 | 2026-05-22 | 2026-05-22 | 1544 |
| `gta-6-swimming-underwater-2026` | GTA 6 simning och dykning – komplett guide | gta 6 swimming underwater 2026 | 2026-05-22 | 2026-05-22 | 1392 |
| `gta-6-systemkrav-pc-2026` | GTA 6 PC systemkrav 2026 – vad behöver du? | gta 6 systemkrav pc 2026 | 2026-04-17 | 2026-09-01 | 857 |
| `gta-6-tatueringar-karaktarsanpassning-2026` | GTA 6 tatueringar och karaktärsanpassning | gta 6 tatueringar karaktarsanpassning 2026 | 2026-05-15 | 2026-05-15 | 618 |
| `gta-6-tatueringar-och-utseende` | GTA 6 Karaktärsanpassning – Tatueringar, Kläder och Utseende | gta 6 tatueringar och utseende | 2026-04-04 | – | 924 |
| `gta-6-tips-forsta-spelaren` | GTA 6 Tips – Förberedelser och Vad du ska Göra Dag Ett | gta 6 tips forsta spelaren | 2026-03-20 | – | 1351 |
| `gta-6-tips-online-overleva-uppdaterad` | GTA 6 Online – tips för att överleva 2026 | gta 6 tips online overleva uppdaterad | 2026-05-05 | 2026-05-05 | 756 |
| `gta-6-tips-online-overleva` | GTA 6 Online – Tips för att Överleva som Ny Spelare | gta 6 tips online overleva | 2026-03-29 | – | 1197 |
| `gta-6-vapen-guide-komplett-2026` | GTA 6 vapen – komplett guide 2026 | gta 6 vapen guide komplett 2026 | 2026-04-24 | 2026-04-24 | 739 |
| `gta-6-vapen-och-strid` | GTA 6 Vapen och Strid – Allt vi Vet om Vapensystemet | gta 6 vapen och strid | 2026-03-15 | – | 973 |
| `gta-6-vapenmodifiering` | GTA 6 Vapenmodifiering – Anpassa ditt Arsenal i Vice City | gta 6 vapenmodifiering | 2026-04-04 | – | 916 |
| `gta-6-vice-city-historia` | Vice City i GTA – Från GTA Vice City 2002 till GTA 6 2026 | gta 6 vice city historia | 2026-03-15 | – | 940 |
| `gta-6-vice-city-karta-guide` | GTA 6 Vice City – Karta, Platser och Allt Vi Vet om Leonida | gta 6 vice city karta guide | 2026-03-22 | – | 1442 |
| `gta-6-vice-city-stadsdelar-guide-2026` | GTA 6 Vice City stadsdelar – komplett guide | gta 6 vice city stadsdelar guide 2026 | 2026-04-21 | 2026-04-21 | 889 |
| `gta-6-vildmark-overlevnad-guide-2026` | GTA 6 Vildmarksöverlevnad: Leonidas Natur 2026 | gta 6 vildmark overlevnad guide 2026 | 2026-05-26 | 2026-05-26 | 1629 |
| `gta-6-vs-gta-5-jamforelse` | GTA 6 vs GTA 5 – Vad är Nytt och Vad har Förbättrats? | gta 6 vs gta 5 jamforelse | 2026-03-20 | – | 1727 |
| `gta-6-wanted-level-undvika-polis-2026` | GTA 6 wanted level – undvika polisen guide | gta 6 wanted level undvika polis 2026 | 2026-04-21 | 2026-09-01 | 823 |

### Karaktärer (17 artiklar)

| Slug | H1 / title | Primärt sökord | Publ. | Uppd. | Ord |
|---|---|---|---|---|---|
| `gta-6-antagonister-skurkar-2026` | GTA 6 antagonister – skurkarna vi vet om | gta 6 antagonister skurkar 2026 | 2026-04-28 | 2026-04-28 | 727 |
| `gta-6-jason-bakgrund-djupdykning` | Jason Duval – Allt om GTA 6:s Manlige Protagonist | gta 6 jason bakgrund djupdykning | 2026-03-16 | – | 964 |
| `gta-6-jason-personlighet` | Jason Duval Personlighet – Vad Vet Vi om GTA 6:s Manlige Hjälte? | gta 6 jason personlighet | 2026-04-06 | – | 946 |
| `gta-6-jason-spelguide-tips-2026` | Jason i GTA 6 – spelguide och tips 2026 | gta 6 jason spelguide tips 2026 | 2026-05-12 | 2026-05-12 | 661 |
| `gta-6-karaktarer-oversikt` | GTA 6 Karaktärer – Komplett Guide till Lucia, Jason och Mer | gta 6 karaktarer oversikt | 2026-03-21 | – | 288 |
| `gta-6-karaktarer-sidofigurer` | GTA 6 Karaktärer – Lucia, Jason och Alla Sidofigurer Vi Känner Till | gta 6 karaktarer sidofigurer | 2026-03-22 | – | 1499 |
| `gta-6-lucia-bakgrund-djupdykning` | Lucia Caminos – Djupdykning i GTA 6:s Huvudkaraktär | gta 6 lucia bakgrund djupdykning | 2026-03-16 | – | 940 |
| `gta-6-lucia-forvandling-storyline-2026` | Lucias förvandling – från kriminell till legend | gta 6 lucia forvandling storyline 2026 | 2026-05-22 | 2026-05-22 | 1892 |
| `gta-6-lucia-jason-relation-djupdyk` | Lucia och Jasons relation – vad Extended Look avslöjade | gta 6 lucia jason relation djupdyk | 2026-05-15 | 2026-09-01 | 828 |
| `gta-6-lucia-jason-relation` | Lucia och Jason – GTA 6:s Kärlekshistoria och Partnerskap | gta 6 lucia jason relation | 2026-03-30 | – | 1152 |
| `gta-6-lucia-utseende-karaktaersdesign` | Lucias utseende och karaktärsdesign i GTA 6 | gta 6 lucia utseende karaktaersdesign | 2026-05-01 | 2026-05-01 | 582 |
| `gta-6-lucia-utseende-stil` | Lucia Caminos Stil och Utseende – GTA 6:s Ikoniska Protagonist | gta 6 lucia utseende stil | 2026-04-08 | – | 1007 |
| `gta-6-rostskadespelare-voice-cast` | GTA 6 Röstskådespelare – Vilka Spelar Lucia och Jason? | gta 6 rostskadespelare voice cast | 2026-05-28 | – | 896 |
| `gta-6-sidokaraktarer-npc-2026` | GTA 6 sidokaraktärer och NPC:s – guide | gta 6 sidokaraktarer npc 2026 | 2026-05-05 | 2026-05-05 | 651 |
| `gta-6-skurkar-och-antagonister` | GTA 6 Skurkar och Antagonister – Vilka är Fienderna? | gta 6 skurkar och antagonister | 2026-03-18 | – | 831 |
| `jason-duval-gta-6` | Jason Duval – GTA 6:s Manliga Protagonist | jason duval gta 6 | 2026-03-22 | – | 247 |
| `lucia-caminos-gta-6` | Lucia Caminos – GTA 6:s Historiska Kvinnliga Protagonist | lucia caminos gta 6 | 2026-03-23 | – | 278 |
