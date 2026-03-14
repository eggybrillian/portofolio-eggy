import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
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
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const isAdmin = window.location.pathname === '/admin'

  useEffect(() => {
    if (isAdmin) { setLoading(false); return }
    async function fetchAll() {
      const [projects, certificates, skills] = await Promise.all([
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('certificates').select('*').order('sort_order'),
        supabase.from('skills').select('*').order('sort_order'),
      ])
      setData({
        projects: projects.data || [],
        certificates: certificates.data || [],
        skills: skills.data || [],
      })
      setLoading(false)
    }
    fetchAll()
  }, [isAdmin])

  if (isAdmin) return <Admin />
  if (loading) return <Loading />

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Certificates certificates={data.certificates} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
