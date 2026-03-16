export default function Footer() {
  return (
    <footer style={{
      padding: '32px 24px',
      borderTop: '1px solid var(--border)',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
        color: 'var(--text-muted)',
      }}>
        <span style={{ color: 'var(--cyan)' }}>Eggy B. Brillian</span>
        {' '}·{' '}
        {new Date().getFullYear()}
      </div>
    </footer>
  )
}
