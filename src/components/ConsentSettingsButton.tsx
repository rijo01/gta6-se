'use client'
import { OPEN_CONSENT_EVENT } from '@/components/CookieConsent'

export default function ConsentSettingsButton({ label = 'Cookieinställningar', style }: { label?: string; style?: React.CSSProperties }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit', textDecoration: 'underline', ...style }}
    >
      {label}
    </button>
  )
}
