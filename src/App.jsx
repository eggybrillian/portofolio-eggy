import { usePortfolioData } from './hooks/usePortfolioData'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Admin from './pages/Admin'

export default function App() {
  const { data, loading, error } = usePortfolioData()
  const isAdmin = window.location.pathname === '/admin'

  if (isAdmin) return <Admin />
  if (loading) return <Loading />
  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '700px', width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', marginBottom: '10px' }}>Data gagal dimuat</h2>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects projects={data.projects} />
        <Certificates certificates={data.certificates} />
        <Skills skills={data.skills} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
