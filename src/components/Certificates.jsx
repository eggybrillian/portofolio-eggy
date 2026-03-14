import { useReveal } from '../hooks/useReveal'

export default function Certificates({ certificates }) {
  const ref = useReveal()
  return (
    <section id="certificates" style={{ background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)' }}>
      <div className="container" ref={ref}>
        <div className="section-label reveal">// certificates.length</div>
        <h2 className="section-title reveal reveal-delay-1">Sertifikat & <span>Pelatihan</span></h2>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'20px' }}>
          {certificates.map((c, i) => (
            <div key={c.id} className={`glass reveal reveal-delay-${Math.min(i+1,4)}`} style={{ padding:'24px' }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px' }}>
                <div style={{ width:'44px',height:'44px',borderRadius:'10px',background:`${c.color}15`,border:`1px solid ${c.color}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem' }}>{c.icon}</div>
                <div style={{ display:'flex',gap:'6px',flexDirection:'column',alignItems:'flex-end' }}>
                  <span style={{ padding:'2px 8px',background:`${c.color}15`,border:`1px solid ${c.color}33`,borderRadius:'4px',fontSize:'0.65rem',color:c.color,fontFamily:'var(--font-mono)' }}>{c.type}</span>
                  <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--text-muted)' }}>{c.year}</span>
                </div>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)',fontSize:'0.95rem',fontWeight:700,color:'var(--text)',marginBottom:'6px',lineHeight:1.3 }}>{c.title}</h3>
              <p style={{ fontFamily:'var(--font-mono)',fontSize:'0.75rem',color:c.color,opacity:0.85 }}>{c.organization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
