# GTA6.se

Sveriges ledande källa för GTA 6-nyheter, guider, karaktärer och release-information.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Content:** MDX via gray-matter (läser från `src/content/`)
- **Hosting:** Vercel
- **DNS:** Loopia → A-record `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`

## Kom igång

```bash
npm install
npm run dev
```

## Innehållsstruktur (MaxiAI)

Alla artiklar skrivs som `.mdx`-filer med gray-matter frontmatter:

```
src/content/
├── nyheter/       → /nyheter/[slug]
├── guider/        → /guider/[slug]
├── karaktarer/    → /karaktarer/[slug]
└── release/       → /release/[slug]
```

### Frontmatter-format

```yaml
---
title: "Artikelns titel"
date: "YYYY-MM-DD"
category: "nyheter|guider|karaktarer|release"
slug: "url-vanligt-slag"
description: "150-160 tecken, inkludera primärt sökord"
---
```

### MaxiAI-schema (5 artiklar/dag kl 08:00 vardagar)

| Dag | Kategorier |
|-----|-----------|
| Måndag | nyheter + guider |
| Tisdag | release + karaktarer |
| Onsdag | nyheter + guider |
| Torsdag | release + nyheter |
| Fredag | guider + karaktarer |

## Deploy

```bash
git add .
git commit -m "feat: ny artikel - [titel]"
git push
```

Vercel auto-deployer vid push till `main`.

## Sitemap

Genereras automatiskt på `/sitemap.xml` — inkluderar alla artiklar dynamiskt.
