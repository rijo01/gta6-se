import { PUBLISHER } from '@/lib/site'

// Schema.org-noder för utgivare, ansvarig person och webbplats. Samma @id
// används på alla sidor så att sökmotorer kan knyta ihop dem.
export const BASE_URL = 'https://gta6.se'
export const ORG_ID = `${BASE_URL}/#organization`
export const PERSON_ID = `${BASE_URL}/#rickard-johansson`
export const WEBSITE_ID = `${BASE_URL}/#website`

export const organizationNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: PUBLISHER.name,
  legalName: PUBLISHER.name,
  url: BASE_URL,
  email: PUBLISHER.email,
  identifier: { '@type': 'PropertyValue', propertyID: 'Organisationsnummer', value: PUBLISHER.orgNr },
  address: { '@type': 'PostalAddress', addressCountry: 'SE' },
}

export const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PUBLISHER.responsible,
  url: `${BASE_URL}/om`,
  worksFor: { '@id': ORG_ID },
}

export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'GTA6.se',
  url: BASE_URL,
  description: 'Nyheter, guider och release-information om Grand Theft Auto 6 på svenska.',
  inLanguage: 'sv-SE',
  publisher: { '@id': ORG_ID },
}

// JSON.stringify escapar inte "<", vilket kan bryta ut ur <script>.
export function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
