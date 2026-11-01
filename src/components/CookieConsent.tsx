'use client'
import Script from 'next/script'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CONSENT_KEY, GA_ID } from '@/lib/site'

// GA4 laddas bara efter uttryckligt "Godkänn". Inget gtag-skript, ingen
// dataLayer och inga cookies innan dess. "Neka" och "Godkänn" är lika stora
// och ligger på samma nivå.

type Choice = 'granted' | 'denied' | null
export const OPEN_CONSENT_EVENT = 'gta6se:open-consent'

function readChoice(): Choice {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

function clearGaCookies() {
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`]
  document.cookie.split(';').forEach(c => {
    const name = c.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid') {
      domains.forEach(d => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
      })
    }
  })
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<Choice>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const c = readChoice()
    setChoice(c)
    setOpen(c === null)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  const decide = (c: 'granted' | 'denied') => {
    const wasGranted = choice === 'granted'
    try { window.localStorage.setItem(CONSENT_KEY, c) } catch {}
    setChoice(c)
    setOpen(false)
    if (c === 'denied' && wasGranted) {
      // Redan laddat gtag kan inte avregistreras; rensa cookies och ladda om utan skriptet.
      clearGaCookies()
      window.location.reload()
    }
  }

  const btn: React.CSSProperties = {
    flex: '1 1 0', minWidth: 120, padding: '0.7rem 1rem', borderRadius: 2, cursor: 'pointer',
    fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.9rem',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    background: 'transparent', color: '#F0E8F8', border: '1px solid #F0E8F8',
  }

  return (
    <>
      {choice === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cc-title"
          style={{
            position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 100, maxWidth: 560, margin: '0 auto',
            background: '#100C15', border: '1px solid #3A2E45', borderRadius: 4, padding: '1.1rem 1.1rem 1rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)', color: '#C4B8D4', fontSize: '0.9rem', lineHeight: 1.55,
          }}
        >
          <p id="cc-title" style={{ fontWeight: 600, color: '#F0E8F8', marginBottom: '0.35rem' }}>Får vi mäta besök?</p>
          <p style={{ marginBottom: '0.9rem' }}>
            Vi vill använda Google Analytics för att se vilka sidor som läses. Det sätter cookies och
            skickar data till Google. Sajten fungerar likadant om du nekar.{' '}
            <Link href="/integritetspolicy" style={{ color: '#00F5FF' }}>Läs mer</Link>
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button type="button" style={btn} onClick={() => decide('denied')}>Neka</button>
            <button type="button" style={btn} onClick={() => decide('granted')}>Godkänn</button>
          </div>
        </div>
      )}
    </>
  )
}
