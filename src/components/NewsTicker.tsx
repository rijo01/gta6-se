'use client'

const ticker = '\u{1F3AE} GTA 6 LANSERAS 19 NOVEMBER 2026 \u00B7 \u23F0 TRAILER 3 V\u00C4NTAS MAJ/JUNI 2026 \u00B7 \u{1F3AF} F\u00D6RBEST\u00C4LLNINGAR \u00D6PPNAR SNART \u00B7 \u{1F334} V\u00C4LKOMMEN TILL VICE CITY \u00B7 '

export default function NewsTicker() {
  return (
    <div style={{
      height: '32px',
      background: '#07040A',
      borderBottom: '1px solid rgba(255,45,123,0.15)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    }}>
      {/* Edge fades */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, #07040A, transparent)', zIndex: 2 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px', background: 'linear-gradient(270deg, #07040A, transparent)', zIndex: 2 }} />

      <div className="ticker-scroll" style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'marquee 40s linear infinite',
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 700,
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#FF2D7B',
      }}>
        <span style={{ paddingRight: '2rem' }}>{ticker}{ticker}{ticker}</span>
        <span style={{ paddingRight: '2rem' }}>{ticker}{ticker}{ticker}</span>
      </div>
    </div>
  )
}
