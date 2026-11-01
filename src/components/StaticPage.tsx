import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function StaticPage({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '56px' }}>
        <section style={{ padding: '3.5rem 1rem 2rem', background: 'linear-gradient(180deg, #100C15 0%, #07040A 100%)' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', lineHeight: 1.05, color: '#F0E8F8', marginBottom: '0.75rem' }}>{title}</h1>
            {intro && <p style={{ color: '#9A8CA4', fontSize: '1rem', lineHeight: 1.6 }}>{intro}</p>}
          </div>
        </section>
        <div style={{ maxWidth: '740px', margin: '0 auto', padding: '2rem 1rem 3rem' }}>
          <div className="prose-gta">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
