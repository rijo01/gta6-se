import type { Metadata } from 'next'
import Link from 'next/link'
import StaticPage from '@/components/StaticPage'
import { PUBLISHER } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Om GTA6.se – vem som står bakom och hur vi arbetar',
  description: `GTA6.se är en oberoende svensk sajt om Grand Theft Auto VI som ges ut av ${PUBLISHER.name}. Så väljer vi källor och rättar fel.`,
  alternates: { canonical: '/om' },
}

export default function OmPage() {
  return (
    <StaticPage title="Om GTA6.se" intro="En oberoende svensk sajt om Grand Theft Auto VI: nyheter, release-information och guider på svenska.">
      <h2>Vem står bakom sajten?</h2>
      <p>
        GTA6.se ges ut av <strong>{PUBLISHER.name}</strong> (org.nr {PUBLISHER.orgNr}).
        Ansvarig för innehållet är {PUBLISHER.responsible}.
      </p>
      <p>
        Sajten är inte knuten till Rockstar Games eller Take-Two Interactive. Grand Theft Auto
        är ett varumärke som tillhör Take-Two Interactive Software, Inc.
      </p>

      <h2>Hur vi arbetar med källor</h2>
      <ul>
        <li>
          <strong>Officiella källor går först.</strong> Uppgifter om datum, pris, plattformar och
          innehåll bygger på Rockstar Games Newswire, Rockstar Support, Take-Twos rapporter och
          PlayStation Store och Xbox Store.
        </li>
        <li>
          <strong>Rykten och läckor märks ut.</strong> När vi skriver om något som inte är bekräftat
          står det tydligt i texten.
        </li>
        <li>
          <strong>Spelguider före release.</strong> GTA VI släpps 19 november 2026. Före dess kan ingen
          guide bygga på eget spelande. Våra guider beskriver bara det Rockstar har visat och
          uppdateras när spelet är ute.
        </li>
      </ul>

      <h2>Rättelser</h2>
      <p>
        Har vi fel vill vi veta det. Skriv till oss via <Link href="/kontakt">kontaktsidan</Link>,
        så rättar vi och anger datum för ändringen i artikeln.
      </p>

      <h2>Annonser och länkar</h2>
      <p>
        Om en artikel innehåller länkar där vi får ersättning vid köp märks det ut i artikeln.
        Ersättningen påverkar inte vad vi skriver.
      </p>
    </StaticPage>
  )
}
