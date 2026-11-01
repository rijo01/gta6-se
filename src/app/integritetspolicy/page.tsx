import type { Metadata } from 'next'
import Link from 'next/link'
import StaticPage from '@/components/StaticPage'
import ConsentSettingsButton from '@/components/ConsentSettingsButton'
import { PUBLISHER, POLICY_UPDATED } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Integritetspolicy och cookies',
  description: 'Vilka personuppgifter och cookies GTA6.se använder, varför, och hur du nekar eller ändrar ditt samtycke.',
  alternates: { canonical: '/integritetspolicy' },
}

export default function IntegritetspolicyPage() {
  return (
    <StaticPage title="Integritetspolicy och cookies" intro={`Senast uppdaterad ${POLICY_UPDATED}.`}>
      <h2>Personuppgiftsansvarig</h2>
      <p>
        {PUBLISHER.name}, org.nr {PUBLISHER.orgNr}, är personuppgiftsansvarig för GTA6.se.
        Kontakt: <a href={`mailto:${PUBLISHER.email}`}>{PUBLISHER.email}</a>.
      </p>

      <h2>Kort sagt</h2>
      <ul>
        <li>Du behöver inte skapa konto eller lämna uppgifter för att läsa sajten.</li>
        <li>Vi använder bara statistikcookies om du klickar på <strong>Godkänn</strong>. Nekar du laddas ingen statistik alls.</li>
        <li>Vi säljer inga personuppgifter och använder inga annonscookies.</li>
      </ul>

      <h2>Statistik (Google Analytics 4) – kräver samtycke</h2>
      <p>
        Om du godkänner använder vi Google Analytics 4 för att se hur många som besöker sajten och
        vilka sidor som läses. Google Analytics sätter cookies (<code>_ga</code> och <code>_ga_*</code>,
        som lagras i upp till två år) och behandlar bland annat sidadress, ungefärlig plats,
        enhetstyp och webbläsare. Leverantör är Google Ireland Ltd. Uppgifterna kan överföras till USA,
        där Google är certifierat enligt EU–US Data Privacy Framework.
      </p>
      <p>
        <strong>Rättslig grund:</strong> ditt samtycke (art. 6.1 a GDPR och 9 kap. 28 § lagen om
        elektronisk kommunikation). Innan du har valt laddas inget skript från Google Analytics.
      </p>
      <p>
        <strong>Ändra eller återkalla samtycket:</strong>{' '}
        <ConsentSettingsButton label="öppna cookieinställningarna" />. Återkallar du tas
        Google Analytics-cookies bort och sidan laddas om utan statistik.
      </p>

      <h2>Nödvändig lagring</h2>
      <p>
        Ditt val om statistik sparas i webbläsarens lokala lagring (<code>gta6se-consent-v1</code>) så
        att vi inte frågar vid varje besök. Det är nödvändigt för att respektera valet och kräver
        inget samtycke.
      </p>

      <h2>Andra tjänster som sidan hämtar innehåll från</h2>
      <ul>
        <li>
          <strong>YouTube-videor</strong> bäddas in via <code>youtube-nocookie.com</code>. Google sätter
          då inga spårningscookies förrän du startar videon.
        </li>
        <li>
          <strong>Typsnitt</strong> serveras från vår egen domän. Din webbläsare gör inga anrop till
          Google Fonts.
        </li>
        <li>
          <strong>Drift:</strong> sajten körs hos Vercel Inc., som behandlar IP-adresser i serverloggar
          för att leverera sidan och skydda mot angrepp.
        </li>
      </ul>

      <h2>E-post till oss</h2>
      <p>
        Skriver du till oss sparar vi meddelandet så länge det behövs för att besvara det, högst
        12 månader. Rättslig grund är vårt berättigade intresse av att kunna svara.
      </p>

      <h2>Dina rättigheter</h2>
      <p>
        Du har rätt att begära tillgång till, rättelse eller radering av dina personuppgifter, att
        invända mot behandling och att återkalla samtycke. Kontakta oss via{' '}
        <Link href="/kontakt">kontaktsidan</Link>. Är du missnöjd kan du klaga hos
        Integritetsskyddsmyndigheten (<a href="https://www.imy.se" rel="noopener">imy.se</a>).
      </p>
    </StaticPage>
  )
}
