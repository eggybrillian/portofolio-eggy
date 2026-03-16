import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Footer from '../components/Footer'

const TABS = ['Projects', 'Certificates', 'Skills']

// ---- Login Form ----
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', padding:'24px' }}>
      <div style={{ width:'100%', maxWidth:'400px', background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:'16px', padding:'clamp(20px, 6vw, 40px)' }}>
        <div style={{ marginBottom:'32px', textAlign:'center' }}>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.8rem', color:'var(--cyan)', marginBottom:'8px' }}>EB.</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--text-muted)', letterSpacing:'0.15em' }}>// admin.login</div>
        </div>
        {error && <div style={{ padding:'12px 16px', marginBottom:'20px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'8px', fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'#f87171' }}>{error}</div>}
        <div style={{ marginBottom:'16px' }}>
          <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:'6px' }}>EMAIL</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==='Enter' && handleLogin()}
            style={{ width:'100%', padding:'11px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:'8px', color:'var(--text)', fontFamily:'var(--font-mono)', fontSize:'0.85rem', outline:'none', boxSizing:'border-box' }} />
        </div>
        <div style={{ marginBottom:'24px' }}>
          <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:'6px' }}>PASSWORD</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key==='Enter' && handleLogin()}
            style={{ width:'100%', padding:'11px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:'8px', color:'var(--text)', fontFamily:'var(--font-mono)', fontSize:'0.85rem', outline:'none', boxSizing:'border-box' }} />
        </div>
        <button onClick={handleLogin} disabled={loading}
          style={{ width:'100%', padding:'12px', background:'var(--cyan)', color:'var(--bg)', border:'none', borderRadius:'8px', fontFamily:'var(--font-mono)', fontSize:'0.85rem', fontWeight:700, cursor: loading ? 'not-allowed':'pointer', opacity: loading ? 0.7:1 }}>
          {loading ? 'Masuk...' : 'Masuk'}
        </button>
      </div>
    </div>
  )
}

// ---- Avatar Section ----
function AvatarSection() {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const { data } = supabase.storage.from('avatars').getPublicUrl('profile.jpg')
    setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`)
  }, [])

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true); setMessage('')
    const { error } = await supabase.storage.from('avatars').upload('profile.jpg', file, { upsert: true, contentType: file.type })
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      const { data } = supabase.storage.from('avatars').getPublicUrl('profile.jpg')
      setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`)
      setMessage('✅ Foto berhasil diperbarui!')
    }
    setUploading(false)
  }

  return (
    <div className="glass" style={{ padding:'24px', marginBottom:'28px', display:'flex', alignItems:'center', gap:'24px', flexWrap:'wrap' }}>
      <div style={{ width:'80px', height:'80px', borderRadius:'50%', border:'2px solid var(--border-hover)', overflow:'hidden', flexShrink:0, background:'var(--surface)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {avatarUrl
          ? <img src={avatarUrl} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={() => setAvatarUrl(null)} />
          : <span style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--cyan)' }}>EB</span>}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.95rem', marginBottom:'4px' }}>Foto Profil</div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)', marginBottom:'10px' }}>Format: JPG atau PNG · Disimpan di Supabase Storage</div>
        {message && <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', marginBottom:'10px', color: message.startsWith('Error') ? '#f87171':'#34d399' }}>{message}</div>}
        <label style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'8px 18px', background:'var(--cyan-dim)', border:'1px solid var(--border-hover)', borderRadius:'6px', fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'var(--cyan)', cursor: uploading ? 'not-allowed':'pointer', opacity: uploading ? 0.6:1 }}>
          {uploading ? 'Mengupload...' : '📷 Ganti Foto'}
          <input type="file" accept="image/*" onChange={handleUpload} style={{ display:'none' }} disabled={uploading} />
        </label>
      </div>
    </div>
  )
}

// ---- Modal ----
function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:'20px' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:'#0d1627', border:'1px solid var(--border)', borderRadius:'16px', padding:'clamp(18px, 5vw, 32px)', width:'100%', maxWidth:'560px', maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1rem, 4.5vw, 1.2rem)', fontWeight:700, color:'var(--text)' }}>{title}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-muted)', fontSize:'1.4rem', cursor:'pointer' }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom:'16px' }}>
      <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:'6px' }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle = { width:'100%', padding:'10px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:'8px', color:'var(--text)', fontFamily:'var(--font-mono)', fontSize:'0.85rem', outline:'none', boxSizing:'border-box' }

// ---- Forms ----
function ProjectForm({ item, onSave, onClose }) {
  const [form, setForm] = useState(item || { year:'', title:'', subtitle:'', description:'', tools:'', accent:'#00d4ff', icon:'📊', sort_order:0 })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }))

  async function handleSave() {
    setSaving(true); setError('')
    const payload = { ...form, tools: typeof form.tools==='string' ? form.tools.split(',').map(t=>t.trim()).filter(Boolean) : form.tools }
    const { error } = item?.id ? await supabase.from('projects').update(payload).eq('id', item.id) : await supabase.from('projects').insert(payload)
    if (error) setError(error.message)
    else onSave()
    setSaving(false)
  }

  return (
    <>
      {error && <div style={{ padding:'10px 14px', marginBottom:'16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'8px', fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'#f87171' }}>{error}</div>}
      <Field label="Tahun"><input style={inputStyle} value={form.year} onChange={e => set('year', e.target.value)} placeholder="2025" /></Field>
      <Field label="Judul"><input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} /></Field>
      <Field label="Subtitle"><input style={inputStyle} value={form.subtitle} onChange={e => set('subtitle', e.target.value)} /></Field>
      <Field label="Deskripsi"><textarea style={{ ...inputStyle, minHeight:'100px', resize:'vertical' }} value={form.description} onChange={e => set('description', e.target.value)} /></Field>
      <Field label="Tools (pisah koma)"><input style={inputStyle} value={typeof form.tools==='string' ? form.tools : form.tools?.join(', ')} onChange={e => set('tools', e.target.value)} placeholder="Python, Pandas" /></Field>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))', gap:'12px' }}>
        <Field label="Icon"><input style={inputStyle} value={form.icon} onChange={e => set('icon', e.target.value)} /></Field>
        <Field label="Warna"><input type="color" style={{ ...inputStyle, padding:'4px', height:'42px', cursor:'pointer' }} value={form.accent} onChange={e => set('accent', e.target.value)} /></Field>
        <Field label="Urutan"><input type="number" style={inputStyle} value={form.sort_order} onChange={e => set('sort_order', +e.target.value)} /></Field>
      </div>
      <div style={{ display:'flex', gap:'12px', marginTop:'8px', flexWrap:'wrap' }}>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ flex:'1 1 180px' }}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
        <button onClick={onClose} className="btn btn-outline" style={{ flex:'1 1 140px', justifyContent:'center' }}>Batal</button>
      </div>
    </>
  )
}

function CertForm({ item, onSave, onClose }) {
  const [form, setForm] = useState(item || { title:'', organization:'', year:'', type:'Sertifikasi', icon:'🏅', color:'#00d4ff', sort_order:0 })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }))

  async function handleSave() {
    setSaving(true); setError('')
    const { error } = item?.id ? await supabase.from('certificates').update(form).eq('id', item.id) : await supabase.from('certificates').insert(form)
    if (error) setError(error.message)
    else onSave()
    setSaving(false)
  }

  return (
    <>
      {error && <div style={{ padding:'10px 14px', marginBottom:'16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'8px', fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'#f87171' }}>{error}</div>}
      <Field label="Judul"><input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} /></Field>
      <Field label="Organisasi"><input style={inputStyle} value={form.organization} onChange={e => set('organization', e.target.value)} /></Field>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'12px' }}>
        <Field label="Tahun"><input style={inputStyle} value={form.year} onChange={e => set('year', e.target.value)} /></Field>
        <Field label="Tipe">
          <select style={inputStyle} value={form.type} onChange={e => set('type', e.target.value)}>
            {['Sertifikasi','Bootcamp','Course','Industri'].map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))', gap:'12px' }}>
        <Field label="Icon"><input style={inputStyle} value={form.icon} onChange={e => set('icon', e.target.value)} /></Field>
        <Field label="Warna"><input type="color" style={{ ...inputStyle, padding:'4px', height:'42px', cursor:'pointer' }} value={form.color} onChange={e => set('color', e.target.value)} /></Field>
        <Field label="Urutan"><input type="number" style={inputStyle} value={form.sort_order} onChange={e => set('sort_order', +e.target.value)} /></Field>
      </div>
      <div style={{ display:'flex', gap:'12px', marginTop:'8px', flexWrap:'wrap' }}>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ flex:'1 1 180px' }}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
        <button onClick={onClose} className="btn btn-outline" style={{ flex:'1 1 140px', justifyContent:'center' }}>Batal</button>
      </div>
    </>
  )
}

function SkillForm({ item, onSave, onClose }) {
  const [form, setForm] = useState(item || { category:'Bahasa & Tools', category_icon:'⚙️', category_color:'#00d4ff', name:'', level:80, sort_order:0 })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }))

  async function handleSave() {
    setSaving(true); setError('')
    const { error } = item?.id ? await supabase.from('skills').update(form).eq('id', item.id) : await supabase.from('skills').insert(form)
    if (error) setError(error.message)
    else onSave()
    setSaving(false)
  }

  return (
    <>
      {error && <div style={{ padding:'10px 14px', marginBottom:'16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'8px', fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'#f87171' }}>{error}</div>}
      <Field label="Nama Skill"><input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} /></Field>
      <Field label={`Level: ${form.level}%`}><input type="range" min="0" max="100" value={form.level} onChange={e => set('level', +e.target.value)} style={{ width:'100%' }} /></Field>
      <Field label="Kategori"><input style={inputStyle} value={form.category} onChange={e => set('category', e.target.value)} /></Field>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))', gap:'12px' }}>
        <Field label="Icon Kategori"><input style={inputStyle} value={form.category_icon} onChange={e => set('category_icon', e.target.value)} /></Field>
        <Field label="Warna"><input type="color" style={{ ...inputStyle, padding:'4px', height:'42px', cursor:'pointer' }} value={form.category_color} onChange={e => set('category_color', e.target.value)} /></Field>
        <Field label="Urutan"><input type="number" style={inputStyle} value={form.sort_order} onChange={e => set('sort_order', +e.target.value)} /></Field>
      </div>
      <div style={{ display:'flex', gap:'12px', marginTop:'8px', flexWrap:'wrap' }}>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ flex:'1 1 180px' }}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
        <button onClick={onClose} className="btn btn-outline" style={{ flex:'1 1 140px', justifyContent:'center' }}>Batal</button>
      </div>
    </>
  )
}

// ---- Main Admin ----
export default function Admin() {
  const [session, setSession] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [tab, setTab] = useState('Projects')
  const [data, setData] = useState({ Projects:[], Certificates:[], Skills:[] })
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setCheckingAuth(false) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => { if (session) fetchData() }, [session])

  async function fetchData() {
    setLoading(true)
    const [p, c, s] = await Promise.all([
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('certificates').select('*').order('sort_order'),
      supabase.from('skills').select('*').order('sort_order'),
    ])
    setData({ Projects: p.data||[], Certificates: c.data||[], Skills: s.data||[] })
    setLoading(false)
  }

  async function handleDelete(id) {
    const tableMap = { Projects:'projects', Certificates:'certificates', Skills:'skills' }
    await supabase.from(tableMap[tab]).delete().eq('id', id)
    setDeleteConfirm(null); fetchData()
  }

  if (checkingAuth) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.8rem', color:'var(--text-muted)' }}>Memeriksa sesi...</div>
    </div>
  )

  if (!session) return <LoginForm />

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      {/* Header */}
      <div style={{ borderBottom:'1px solid var(--border)', padding:'clamp(14px, 4vw, 16px) clamp(14px, 5vw, 28px)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--cyan)', letterSpacing:'0.15em', marginBottom:'2px' }}>// admin.dashboard</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.1rem, 5vw, 1.4rem)', fontWeight:800 }}>Portfolio Manager</h1>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'10px', alignItems:'stretch', width:'min(100%, 420px)' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--text-muted)', maxWidth:'100%', overflowWrap:'anywhere', textAlign:'right' }}>{session.user.email}</span>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', justifyContent:'flex-end' }}>
            <a href="/" className="btn btn-outline" style={{ fontSize:'0.75rem', padding:'8px 16px', flex:'1 1 170px', justifyContent:'center' }}>← Portfolio</a>
            <button onClick={() => supabase.auth.signOut()} style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', color:'#f87171', borderRadius:'6px', padding:'8px 16px', fontFamily:'var(--font-mono)', fontSize:'0.75rem', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', flex:'1 1 140px' }}>Logout</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop:'28px', paddingBottom:'32px', flex:1, width:'100%' }}>
        {/* Avatar Section */}
        <AvatarSection />

        {/* Tabs */}
        <div style={{ display:'flex', gap:'4px', marginBottom:'28px', borderBottom:'1px solid var(--border)', overflowX:'auto', scrollbarWidth:'thin' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-mono)', fontSize:'0.8rem', color: tab===t ? 'var(--cyan)':'var(--text-muted)', padding:'10px 20px', borderBottom: tab===t ? '2px solid var(--cyan)':'2px solid transparent', transition:'all 0.2s', marginBottom:'-1px', whiteSpace:'nowrap', flexShrink:0 }}>
              {t} <span style={{ opacity:0.5 }}>({data[t].length})</span>
            </button>
          ))}
        </div>

        {/* Add button */}
        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:'16px' }}>
          <button onClick={() => setModal({ type:tab, item:null })} className="btn btn-primary" style={{ fontSize:'0.8rem', padding:'9px 20px' }}>
            + Tambah {tab==='Projects' ? 'Project' : tab==='Certificates' ? 'Sertifikat' : 'Skill'}
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div style={{ textAlign:'center', padding:'60px', color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>Memuat...</div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {data[tab].map(item => (
              <div key={item.id} className="glass" style={{ padding:'14px 20px', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap' }}>
                <span style={{ fontSize:'1.2rem', flexShrink:0 }}>{item.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.92rem', color:'var(--text)', marginBottom:'2px' }}>{item.title || item.name}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)' }}>
                    {item.subtitle || item.organization || item.category}{item.year ? ` · ${item.year}`:''}{item.level !== undefined ? ` · ${item.level}%`:''}
                  </div>
                </div>
                <div style={{ display:'flex', gap:'8px', flexShrink:0, flexWrap:'wrap', width:'100%', justifyContent:'flex-end' }}>
                  <button onClick={() => setModal({ type:tab, item })} style={{ background:'var(--cyan-dim)', border:'1px solid var(--border-hover)', color:'var(--cyan)', borderRadius:'6px', padding:'6px 14px', fontFamily:'var(--font-mono)', fontSize:'0.72rem', cursor:'pointer' }}>Edit</button>
                  <button onClick={() => setDeleteConfirm(item)} style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', color:'#f87171', borderRadius:'6px', padding:'6px 14px', fontFamily:'var(--font-mono)', fontSize:'0.72rem', cursor:'pointer' }}>Hapus</button>
                </div>
              </div>
            ))}
            {data[tab].length === 0 && (
              <div style={{ textAlign:'center', padding:'60px', color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:'0.82rem' }}>Belum ada data. Klik tombol "+ Tambah" di atas.</div>
            )}
          </div>
        )}
      </div>

      <Footer />

      {/* Modal */}
      {modal && (
        <Modal title={`${modal.item ? 'Edit':'Tambah'} ${modal.type==='Projects' ? 'Project' : modal.type==='Certificates' ? 'Sertifikat':'Skill'}`} onClose={() => setModal(null)}>
          {modal.type==='Projects' && <ProjectForm item={modal.item} onSave={() => { setModal(null); fetchData() }} onClose={() => setModal(null)} />}
          {modal.type==='Certificates' && <CertForm item={modal.item} onSave={() => { setModal(null); fetchData() }} onClose={() => setModal(null)} />}
          {modal.type==='Skills' && <SkillForm item={modal.item} onSave={() => { setModal(null); fetchData() }} onClose={() => setModal(null)} />}
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <Modal title="Konfirmasi Hapus" onClose={() => setDeleteConfirm(null)}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.85rem', color:'var(--text-dim)', marginBottom:'24px', lineHeight:1.8 }}>
            Yakin hapus <span style={{ color:'var(--text)' }}>"{deleteConfirm.title || deleteConfirm.name}"</span>? Tindakan ini tidak bisa dibatalkan.
          </p>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <button onClick={() => handleDelete(deleteConfirm.id)} style={{ flex:1, padding:'10px', background:'rgba(239,68,68,0.15)', border:'1px solid rgba(239,68,68,0.35)', color:'#f87171', borderRadius:'8px', fontFamily:'var(--font-mono)', cursor:'pointer' }}>Ya, Hapus</button>
            <button onClick={() => setDeleteConfirm(null)} className="btn btn-outline" style={{ flex:1 }}>Batal</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
