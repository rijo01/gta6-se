/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C8A84B',
          orange: '#E8531A',
          dark: '#0A0A0A',
          card: '#111111',
          border: '#1E1E1E',
          muted: '#888888',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}
