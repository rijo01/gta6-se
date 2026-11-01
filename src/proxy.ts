import { NextResponse, type NextRequest } from 'next/server'

// Borttagna sidor som svarar 410 Gone (1 november 2026): nyhetsartiklar med
// påhittade citat och händelser. De ska inte omdirigeras – innehållet finns inte.
// Hit hör även gamla URL:er som tidigare 308:ade till dem.
const GONE = new Set([
  '/nyheter/gta-6-nyheter-maj-22-2026',
  '/nyheter/gta-6-nyheter-mars-2026',
  '/nyheter/gta-6-take-two-rapport-2026',
  '/nyheter/gta-6-Sverige-lanseringsevent',
  '/nyheter/gta-6-sverige-lanseringsevent',
  '/nyheter/gta-6-konkurrenter-2026',
  '/nyheter/gta-6-take-two-investor-maj-2026',
  '/nyheter/gta-6-nyheter-maj-2026',
])

const BODY = `<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sidan är borttagen | GTA6.se</title><style>body{background:#07040A;color:#C4B8D4;font:16px/1.6 system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 16px}a{color:#00F5FF}</style></head><body><h1 style="color:#F0E8F8">Sidan är borttagen</h1><p>Artikeln har tagits bort eftersom den innehöll uppgifter vi inte kunde belägga.</p><p><a href="/nyheter">Till nyheterna</a> · <a href="/">Startsidan</a></p></body></html>`

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, '')
  if (GONE.has(path)) {
    return new NextResponse(BODY, {
      status: 410,
      headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex', 'cache-control': 'public, max-age=3600' },
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/nyheter/:path*'],
}
