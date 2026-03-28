import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.3 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 24px',
      background: scrolled ? 'rgba(5,11,24,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,212,255,0.08)' : 'none',
      transition: '0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '64px',
    }}>
      {/* Logo */}
      <a href="/admin" style={{
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem',
        color: 'var(--cyan)', textDecoration: 'none', letterSpacing: '-0.02em',
      }}>
        EB<span style={{ color: 'var(--text-muted)' }}>.</span>
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
           className="nav-links">
        {links.map(l => (
          <a key={l.href} href={l.href} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
            color: active === l.href.slice(1) ? 'var(--cyan)' : 'var(--text-muted)',
            textDecoration: 'none', letterSpacing: '0.05em',
            transition: 'color 0.2s',
            position: 'relative',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
          onMouseLeave={e => e.target.style.color = active === l.href.slice(1) ? 'var(--cyan)' : 'var(--text-muted)'}
          >
            <span style={{ color: 'var(--cyan)', marginRight: '4px', opacity: 0.6 }}>{'>'}</span>
            {l.label}
          </a>
        ))}
      </div>

      {/* Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--cyan)', fontSize: '1.4rem', display: 'none',
        padding: '4px',
      }} className="hamburger">☰</button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0,
          background: 'rgba(5,11,24,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: 0,
          padding: '16px 0',
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '14px 32px', color: 'var(--text)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
              <span style={{ color: 'var(--cyan)', marginRight: '8px' }}>{'>'}</span>
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
