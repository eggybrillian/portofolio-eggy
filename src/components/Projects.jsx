import { useReveal } from '../hooks/useReveal'

const projectStyles = `
  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .project-card {
    padding: 28px 32px;
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr) auto;
    gap: 24px;
    align-items: start;
    border-radius: 0 12px 12px 0;
  }

  .project-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .project-content {
    min-width: 0;
  }

  .project-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
    flex-wrap: wrap;
  }

  .project-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
  }

  .project-subtitle {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    opacity: 0.8;
  }

  .project-description {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
    line-height: 1.8;
    margin-bottom: 16px;
  }

  .project-tools {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .project-year {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .project-card {
      padding: 22px 18px;
      grid-template-columns: 52px minmax(0, 1fr);
      gap: 16px;
    }

    .project-icon {
      width: 48px;
      height: 48px;
      font-size: 1.25rem;
    }

    .project-header {
      gap: 8px;
      margin-bottom: 10px;
    }

    .project-title {
      font-size: 1rem;
    }

    .project-description {
      font-size: 0.76rem;
      line-height: 1.75;
    }

    .project-year {
      grid-column: 1 / -1;
      padding-left: 68px;
      white-space: normal;
      font-size: 0.68rem;
      letter-spacing: 0.08em;
    }
  }

  @media (max-width: 480px) {
    .project-card {
      padding: 18px 14px;
      gap: 14px;
    }

    .project-year {
      padding-left: 0;
    }
  }
`

export default function Projects({ projects }) {
  const ref = useReveal()
  return (
    <section id="projects">
      <style>{projectStyles}</style>
      <div className="container" ref={ref}>
        <div className="section-label reveal">// projects.forEach()</div>
        <h2 className="section-title reveal reveal-delay-1">Proyek <span>Terpilih</span></h2>
        <div className="projects-list">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`glass project-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
              style={{ borderLeft: `3px solid ${p.accent}` }}
            >
              <div className="project-icon" style={{ background:`${p.accent}15`,border:`1px solid ${p.accent}33` }}>{p.icon}</div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{p.title}</h3>
                  <span className="project-subtitle" style={{ color:p.accent }}>{p.subtitle}</span>
                </div>
                <p className="project-description">{p.description}</p>
                <div className="project-tools">
                  {p.tools.map(t => (
                    <span key={t} style={{ padding:'3px 10px',background:`${p.accent}10`,border:`1px solid ${p.accent}30`,borderRadius:'4px',fontSize:'0.68rem',color:p.accent,fontFamily:'var(--font-mono)' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-year">{p.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
