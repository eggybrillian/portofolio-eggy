import { useReveal } from '../hooks/useReveal'

export default function Projects({ projects }) {
  const ref = useReveal()
  return (
    <section id="projects">
      <div className="container" ref={ref}>
        <div className="section-label reveal">// projects.forEach()</div>
        <h2 className="section-title reveal reveal-delay-1">Proyek <span>Terpilih</span></h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {projects.map((p, i) => (
            <div key={p.id} className={`glass reveal reveal-delay-${Math.min(i+1,4)}`} style={{
              padding: '28px 32px', display: 'grid', gridTemplateColumns: '64px 1fr auto',
              gap: '24px', alignItems: 'start', borderLeft: `3px solid ${p.accent}`, borderRadius: '0 12px 12px 0',
            }}>
              <div style={{ width:'56px',height:'56px',borderRadius:'12px',background:`${p.accent}15`,border:`1px solid ${p.accent}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',flexShrink:0 }}>{p.icon}</div>
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'6px',flexWrap:'wrap' }}>
                  <h3 style={{ fontFamily:'var(--font-display)',fontSize:'1.1rem',fontWeight:700,color:'var(--text)' }}>{p.title}</h3>
                  <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:p.accent,opacity:0.8 }}>{p.subtitle}</span>
                </div>
                <p style={{ fontFamily:'var(--font-mono)',fontSize:'0.8rem',color:'var(--text-muted)',lineHeight:1.8,marginBottom:'16px' }}>{p.description}</p>
                <div style={{ display:'flex',gap:'8px',flexWrap:'wrap' }}>
                  {p.tools.map(t => (
                    <span key={t} style={{ padding:'3px 10px',background:`${p.accent}10`,border:`1px solid ${p.accent}30`,borderRadius:'4px',fontSize:'0.68rem',color:p.accent,fontFamily:'var(--font-mono)' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontFamily:'var(--font-mono)',fontSize:'0.72rem',color:'var(--text-muted)',whiteSpace:'nowrap' }}>{p.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
