import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref = useReveal()
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    const { data } = supabase.storage.from('avatars').getPublicUrl('profile.jpg')
    setAvatarUrl(data.publicUrl)
  }, [])

  return (
    <section id="about">
      <div className="container" ref={ref}>
        <div className="section-label reveal">// about.me</div>
        <h2 className="section-title reveal reveal-delay-1">
          Tentang <span>Saya</span>
        </h2>

        <div
          className="about-layout"
          style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '48px',
          alignItems: 'start',
          }}
        >
          {/* Kolom kiri — foto + info cards */}
          <div className="about-sidebar reveal reveal-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Foto */}
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
            }}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Eggy B. Brillian"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  onError={() => setAvatarUrl(null)}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: 'var(--cyan)',
                  background: 'linear-gradient(135deg, var(--cyan-dim), var(--purple-dim))',
                }}>EB</div>
              )}
              {/* Corner accents */}
              {['top-left','top-right','bottom-left','bottom-right'].map(pos => (
                <div key={pos} style={{
                  position: 'absolute',
                  top: pos.includes('top') ? '10px' : 'auto',
                  bottom: pos.includes('bottom') ? '10px' : 'auto',
                  left: pos.includes('left') ? '10px' : 'auto',
                  right: pos.includes('right') ? '10px' : 'auto',
                  width: '14px', height: '14px',
                  borderTop: pos.includes('top') ? '2px solid var(--cyan)' : 'none',
                  borderBottom: pos.includes('bottom') ? '2px solid var(--cyan)' : 'none',
                  borderLeft: pos.includes('left') ? '2px solid var(--cyan)' : 'none',
                  borderRight: pos.includes('right') ? '2px solid var(--cyan)' : 'none',
                  zIndex: 2,
                }} />
              ))}
            </div>

            {/* Info cards */}
            {[
              { label: 'Pekerjaan', value: 'IT Software - GPE' },
              { label: 'Lokasi', value: 'Samarinda, Kaltim' }
            ].map(item => (
              <div key={item.label} className="glass" style={{
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>{item.label}</div>
                  <div className="about-card-value" style={{ fontSize: '0.78rem', color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Kolom kanan — teks */}
          <div className="about-content reveal reveal-delay-2" style={{ paddingTop: '8px', minWidth: 0 }}>
            {/* Nama besar */}
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 800, lineHeight: 1.1, marginBottom: '6px', color: 'var(--text)',
            }}>Eggy B. Brillian</h3>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              color: 'var(--cyan)', marginBottom: '28px', letterSpacing: '0.05em',
            }}>Data Analyst & Data Scientist</div>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 2, marginBottom: '18px' }}>
              Fresh graduate <span style={{ color: 'var(--cyan)' }}>Sistem Informasi</span> dari Universitas Mulawarman (2025)
              dengan minat kuat di bidang <span style={{ color: 'var(--cyan)' }}>Data Analytics</span> dan{' '}
              <span style={{ color: 'var(--cyan)' }}>Data Science</span>.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: '2', marginBottom: '18px' }}>
              Pengalaman mencakup analisis data eksploratif (EDA), visualisasi data,
              machine learning, dan membangun dashboard interaktif. Percaya bahwa data yang
              baik adalah fondasi pengambilan keputusan yang tepat.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 2, marginBottom: '28px' }}>
              Skripsi berfokus pada prediksi harga Bitcoin menggunakan model{' '}
              <span style={{ color: '#a78bfa' }}>GRU (Gated Recurrent Unit)</span>,
              menunjukkan passion dalam deep learning dan time-series analysis.
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Deep Learning'].map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>

            {/* Quick stats */}
            <div
              className="about-stats"
              style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
              borderTop: '1px solid var(--border)', paddingTop: '28px',
              }}
            >
              {[
                { num: '5+', label: 'Projects' },
                { num: '7+', label: 'Sertifikat' },
                { num: '4+', label: 'Tahun Belajar' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--cyan)' }}>{s.num}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #about .about-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          #about .about-content {
            padding-top: 0 !important;
          }

          #about .about-stats {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 10px !important;
          }

          #about .about-card-value {
            word-break: break-word;
          }
        }
      `}</style>
    </section>
  )
}
