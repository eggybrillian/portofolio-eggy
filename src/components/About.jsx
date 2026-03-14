import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about">
      <div className="container" ref={ref}>
        <div className="section-label reveal">// about.me</div>
        <h2 className="section-title reveal reveal-delay-1">
          Tentang <span>Saya</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          {/* Avatar side */}
          <div className="reveal reveal-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              width: '100%', aspectRatio: '1',
              maxWidth: '320px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Decorative avatar */}
              <div style={{
                width: '120px', height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--cyan-dim), var(--purple-dim))',
                border: '2px solid var(--border-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800,
                color: 'var(--cyan)',
              }}>EB</div>
              {/* Grid overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
              {/* Corner accents */}
              {['top-left','top-right','bottom-left','bottom-right'].map(pos => (
                <div key={pos} style={{
                  position: 'absolute',
                  top: pos.includes('top') ? '12px' : 'auto',
                  bottom: pos.includes('bottom') ? '12px' : 'auto',
                  left: pos.includes('left') ? '12px' : 'auto',
                  right: pos.includes('right') ? '12px' : 'auto',
                  width: '16px', height: '16px',
                  borderTop: pos.includes('top') ? '2px solid var(--cyan)' : 'none',
                  borderBottom: pos.includes('bottom') ? '2px solid var(--cyan)' : 'none',
                  borderLeft: pos.includes('left') ? '2px solid var(--cyan)' : 'none',
                  borderRight: pos.includes('right') ? '2px solid var(--cyan)' : 'none',
                }} />
              ))}
            </div>

            {/* Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '📍', label: 'Lokasi', value: 'Samarinda, Kalimantan Timur' },
                { icon: '🎓', label: 'Universitas', value: 'Universitas Mulawarman' },
                { icon: '📅', label: 'Status', value: 'Fresh Graduate 2025' },
              ].map(item => (
                <div key={item.label} className="glass" style={{
                  padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px',
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>{item.label}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text side */}
          <div className="reveal reveal-delay-2">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 2, marginBottom: '24px' }}>
              Saya adalah fresh graduate Sistem Informasi dari Universitas Mulawarman (2025) 
              dengan minat kuat di bidang <span style={{ color: 'var(--cyan)' }}>Data Analytics</span> dan{' '}
              <span style={{ color: 'var(--cyan)' }}>Data Science</span>.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 2, marginBottom: '24px' }}>
              Pengalaman saya mencakup analisis data eksploratif (EDA), visualisasi data, 
              machine learning, dan membangun dashboard interaktif. Saya percaya bahwa data yang 
              baik adalah fondasi pengambilan keputusan yang tepat.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 2, marginBottom: '32px' }}>
              Skripsi saya berfokus pada prediksi harga Bitcoin menggunakan model{' '}
              <span style={{ color: '#a78bfa' }}>GRU (Gated Recurrent Unit)</span>, 
              yang menunjukkan passion saya dalam deep learning dan time-series analysis.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Deep Learning'].map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #about .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
