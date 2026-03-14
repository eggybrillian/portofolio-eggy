import { useReveal } from '../hooks/useReveal'

function SkillBar({ name, level, color }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)' }}>{name}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color, opacity: 0.8 }}>{level}%</span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${level}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: '2px', animation: 'growBar 1s ease both', transformOrigin: 'left',
        }} />
      </div>
    </div>
  )
}

export default function Skills({ skills }) {
  const ref = useReveal()
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = { label: skill.category, icon: skill.category_icon, color: skill.category_color, skills: [] }
    acc[skill.category].skills.push(skill)
    return acc
  }, {})
  const groups = Object.values(grouped)

  return (
    <section id="skills" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)' }}>
      <div className="container" ref={ref}>
        <div className="section-label reveal">// skills.map()</div>
        <h2 className="section-title reveal reveal-delay-1">Keahlian <span>Teknis</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {groups.map((group, gi) => (
            <div key={group.label} className={`glass reveal reveal-delay-${gi + 1}`} style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.2rem' }}>{group.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: group.color }}>{group.label}</h3>
              </div>
              {group.skills.map(s => <SkillBar key={s.id} name={s.name} level={s.level} color={group.color} />)}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes growBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}@media(max-width:900px){#skills .container>div:last-child{grid-template-columns:1fr 1fr!important}}@media(max-width:600px){#skills .container>div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
