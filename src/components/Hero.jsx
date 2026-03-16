import { useState, useEffect, useRef } from 'react'

const phrases = ['Data Analyst', 'Data Scientist', 'ML Enthusiast', 'Fresh Graduate']

function GridBackground() {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0,
    }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      {/* Radial glow center */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Purple accent */}
      <div style={{
        position: 'absolute', top: '60%', right: '10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Dots */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10 + (i * 8) % 80}%`,
          top: `${15 + (i * 13) % 70}%`,
          width: '2px', height: '2px',
          background: i % 3 === 0 ? 'var(--cyan)' : 'var(--purple)',
          borderRadius: '50%',
          opacity: 0.4,
          animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}
    </div>
  )
}

function TypingText({ phrases }) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const current = phrases[phraseIdx]
    const speed = deleting ? 50 : 90
    const pause = !deleting && charIdx === current.length ? 1800 : 0

    const timeout = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true)
      } else if (deleting && charIdx > 0) {
        setText(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else {
        setDeleting(false)
        setPhraseIdx(p => (p + 1) % phrases.length)
      }
    }, pause || speed)

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx, phrases])

  return (
    <span style={{ color: 'var(--cyan)' }}>
      {text}
      <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--cyan)' }}>|</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', padding: '100px 0 60px',
    }}>
      <GridBackground />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ animation: 'fadeUp 0.8s ease both' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
            color: 'var(--cyan)', letterSpacing: '0.2em', marginBottom: '20px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ opacity: 0.5 }}>// hello, world</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800, lineHeight: 1.0, marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            Eggy B.<br />
            <span style={{
              WebkitTextStroke: '1px var(--cyan)',
              color: 'transparent',
            }}>Brillian</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: 'var(--text-dim)', marginBottom: '16px',
            minHeight: '2em',
          }}>
            <TypingText phrases={phrases} />
          </p>

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
            color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '520px',
            lineHeight: 1.8,
          }}>
            Fresh graduate Sistem Informasi Universitas Mulawarman.<br />
            Passionate mengubah data menjadi insight yang bermakna.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn btn-primary">
              <span>→</span> Lihat Proyek
            </a>
            <a href="#contact" className="btn btn-outline">
              Kontak Saya
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: 'clamp(10px, 4vw, 40px)',
          marginTop: '80px',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          animation: 'fadeUp 0.8s ease 0.3s both',
        }}>
          {[
            { num: '5+', label: 'Projects' },
            { num: '7+', label: 'Certificates' },
            { num: '2025', label: 'Graduate' },
          ].map(s => (
            <div key={s.label} style={{
              borderLeft: '2px solid var(--border)',
              paddingLeft: 'clamp(8px, 2vw, 16px)',
              flex: '1 1 0',
              minWidth: 0,
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 5vw, 1.8rem)',
                fontWeight: 800, color: 'var(--cyan)',
              }}>{s.num}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.62rem, 2.2vw, 0.75rem)',
                color: 'var(--text-muted)', letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'float 2s ease-in-out infinite',
      }}>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(var(--cyan), transparent)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>scroll</span>
      </div>
    </section>
  )
}
