export default function CitySkyline() {
  /* Buildings: [left%, width%, height%, color, windows?] */
  const buildings: [number, number, number, string, boolean][] = [
    [2, 5, 28, '#0C0418', true],
    [6, 4, 22, '#0A0215', false],
    [9, 6, 35, '#0E0520', true],
    [14, 3, 18, '#0B0316', false],
    [16, 7, 42, '#0D0419', true],
    [22, 4, 25, '#0A0214', true],
    [25, 5, 32, '#0C0318', false],
    [29, 8, 55, '#0E051E', true],  /* tall tower */
    [36, 4, 20, '#0A0215', false],
    [39, 6, 38, '#0D0419', true],
    [44, 3, 15, '#0B0316', false],
    [46, 7, 45, '#0C0418', true],
    [52, 5, 30, '#0E0520', true],
    [56, 4, 22, '#0A0214', false],
    [59, 6, 48, '#0D041C', true],  /* tall tower */
    [64, 3, 17, '#0B0316', false],
    [66, 5, 28, '#0C0418', true],
    [70, 7, 36, '#0E051E', true],
    [76, 4, 24, '#0A0215', false],
    [79, 6, 40, '#0D0419', true],
    [84, 3, 15, '#0B0316', false],
    [86, 5, 32, '#0C0418', true],
    [90, 4, 20, '#0A0214', false],
    [93, 5, 26, '#0E0520', true],
  ]

  /* Window glow positions per building (box-shadow trick) */
  function windowGlow(w: number, h: number): string {
    const dots: string[] = []
    const cols = Math.max(1, Math.floor(w * 0.5))
    const rows = Math.max(1, Math.floor(h * 0.12))
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.55) {
          const x = 4 + c * 8
          const y = 4 + r * 10
          const color = Math.random() > 0.7 ? 'rgba(255,220,120,0.7)' : 'rgba(255,255,200,0.4)'
          dots.push(`${x}px ${y}px 0 1px ${color}`)
        }
      }
    }
    return dots.length ? dots.join(',') : 'none'
  }

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', pointerEvents: 'none', zIndex: 2 }}>
      {/* Sun/moon orb on horizon */}
      <div style={{
        position: 'absolute', bottom: '38%', left: '50%', transform: 'translateX(-50%)',
        width: 'clamp(60px, 10vw, 120px)', height: 'clamp(60px, 10vw, 120px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,200,100,0.35) 0%, rgba(255,140,50,0.15) 40%, transparent 70%)',
        filter: 'blur(8px)',
      }} />

      {/* Buildings */}
      {buildings.map(([left, width, height, color, hasWindows], i) => (
        <div key={i} style={{
          position: 'absolute',
          bottom: 0,
          left: `${left}%`,
          width: `${width}%`,
          height: `${height}%`,
          background: color,
          borderRadius: '1px 1px 0 0',
        }}>
          {hasWindows && (
            <div style={{
              position: 'absolute',
              inset: '3px',
              boxShadow: windowGlow(width * 5, height),
              borderRadius: 'inherit',
            }} />
          )}
        </div>
      ))}

      {/* Palm tree left */}
      <svg viewBox="0 0 80 160" style={{ position: 'absolute', bottom: 0, left: '8%', height: '55%', opacity: 0.5 }}>
        <path d="M40 160 C38 130, 35 100, 38 70" stroke="#0A0215" strokeWidth="4" fill="none" />
        <path d="M38 70 C25 60, 5 55, 0 65" stroke="#0E0822" strokeWidth="3" fill="none" />
        <path d="M38 70 C30 55, 10 42, 2 45" stroke="#0E0822" strokeWidth="3" fill="none" />
        <path d="M38 70 C48 55, 65 45, 78 48" stroke="#0E0822" strokeWidth="3" fill="none" />
        <path d="M38 70 C50 60, 70 58, 80 65" stroke="#0E0822" strokeWidth="3" fill="none" />
        <path d="M38 70 C35 50, 25 35, 15 30" stroke="#0E0822" strokeWidth="2" fill="none" />
      </svg>

      {/* Palm tree right */}
      <svg viewBox="0 0 80 160" style={{ position: 'absolute', bottom: 0, right: '5%', height: '65%', opacity: 0.4, transform: 'scaleX(-1)' }}>
        <path d="M40 160 C38 120, 36 90, 38 60" stroke="#0A0215" strokeWidth="5" fill="none" />
        <path d="M38 60 C25 50, 5 45, 0 55" stroke="#0E0822" strokeWidth="3" fill="none" />
        <path d="M38 60 C28 45, 8 35, 0 38" stroke="#0E0822" strokeWidth="3" fill="none" />
        <path d="M38 60 C50 48, 68 42, 78 45" stroke="#0E0822" strokeWidth="3" fill="none" />
        <path d="M38 60 C52 52, 72 50, 80 58" stroke="#0E0822" strokeWidth="3" fill="none" />
      </svg>

      {/* Palm tree center-left */}
      <svg viewBox="0 0 60 120" style={{ position: 'absolute', bottom: 0, left: '30%', height: '35%', opacity: 0.25 }}>
        <path d="M30 120 C29 100, 28 80, 30 55" stroke="#0A0215" strokeWidth="3" fill="none" />
        <path d="M30 55 C20 47, 5 44, 0 50" stroke="#0E0822" strokeWidth="2" fill="none" />
        <path d="M30 55 C38 45, 52 40, 60 46" stroke="#0E0822" strokeWidth="2" fill="none" />
        <path d="M30 55 C25 40, 12 30, 5 28" stroke="#0E0822" strokeWidth="2" fill="none" />
      </svg>

      {/* Ground glow — neon city light reflection */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '15%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(255,45,123,0.04) 40%, rgba(255,107,26,0.06) 100%)',
      }} />
    </div>
  )
}
