import { useReveal } from '../hooks/useReveal'

const contacts = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'eggybrillian9@gmail.com',
    href: 'mailto:eggybrillian9@gmail.com',
    color: 'var(--cyan)',
  },
  {
    icon: '📱',
    label: 'WhatsApp / Telepon',
    value: '+62 878-8709-9841',
    href: 'tel:+6287887099841',
    color: '#34d399',
  },
  {
    icon: '📍',
    label: 'Lokasi',
    value: 'Samarinda, Kalimantan Timur',
    href: null,
    color: '#a78bfa',
  },
]

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact">
      <div className="container" ref={ref}>
        <div className="section-label reveal">// contact.reach()</div>
        <h2 className="section-title reveal reveal-delay-1">
          Hubungi <span>Saya</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          {/* CTA text */}
          <div className="reveal reveal-delay-1">
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
              color: 'var(--text-dim)', lineHeight: 2, marginBottom: '32px',
            }}>
              Tertarik berkolaborasi atau memiliki peluang kerja yang cocok? 
              Saya selalu terbuka untuk diskusi dan koneksi baru. 
              Jangan ragu untuk menghubungi saya!
            </p>

            <div style={{
              padding: '20px 24px',
              background: 'var(--cyan-dim)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              color: 'var(--text-dim)',
              lineHeight: 1.8,
            }}>
              <div style={{ color: 'var(--cyan)', marginBottom: '8px' }}>// Availability</div>
              <div>🟢 <span style={{ color: 'var(--text)' }}>Open to work</span></div>
              <div>📌 Full-time / Internship / Project</div>
              <div>🏢 On-site Samarinda / Remote</div>
            </div>
          </div>

          {/* Contact cards */}
          <div className="reveal reveal-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {contacts.map(c => (
              <div key={c.label}>
                {c.href ? (
                  <a href={c.href} className="glass" style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '20px 24px', textDecoration: 'none',
                  }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: `${c.color}15`,
                      border: `1px solid ${c.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem', flexShrink: 0,
                    }}>{c.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '2px' }}>{c.label}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: c.color }}>{c.value}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: c.color, opacity: 0.5 }}>→</span>
                  </a>
                ) : (
                  <div className="glass" style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '20px 24px',
                  }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: `${c.color}15`,
                      border: `1px solid ${c.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem', flexShrink: 0,
                    }}>{c.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '2px' }}>{c.label}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: c.color }}>{c.value}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #contact .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
