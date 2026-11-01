import type { Metadata } from 'next'
import Link from 'next/link'
import StaticPage from '@/components/StaticPage'
import { PUBLISHER } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: `Kontakta GTA6.se om rättelser, tips eller frågor om personuppgifter. Utgivare: ${PUBLISHER.name}.`,
  alternates: { canonical: '/kontakt' },
}

export default function KontaktPage() {
  return (
    <StaticPage title="Kontakt" intro="Tips, rättelser eller frågor om sajten – hör av dig.">
      <h2>E-post</h2>
      <p>
        <a href={`mailto:${PUBLISHER.email}`}>{PUBLISHER.email}</a>
      </p>
      <p>Skriv gärna vilken artikel det gäller om du vill påpeka ett fel.</p>

      <h2>Utgivare</h2>
      <p>
        {PUBLISHER.name}
        <br />
        Org.nr {PUBLISHER.orgNr}
        <br />
        Ansvarig för innehållet: {PUBLISHER.responsible}
      </p>

      <h2>Personuppgifter</h2>
      <p>
        Frågor om hur vi hanterar personuppgifter och cookies besvaras i
        vår <Link href="/integritetspolicy">integritetspolicy</Link>. Där kan du också ändra ditt
        samtycke till statistikcookies.
      </p>

      <h2>Rockstar Games</h2>
      <p>
        Vi är inte Rockstar Games och kan inte hjälpa till med köp, konton, förbokningar eller
        tekniska problem i spelet. Kontakta <a href="https://support.rockstargames.com" rel="noopener">Rockstar Support</a> för det.
      </p>
    </StaticPage>
  )
}
