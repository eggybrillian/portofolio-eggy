import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function usePortfolioData() {
  const [data, setData] = useState({ projects: [], certificates: [], skills: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [projects, certificates, skills] = await Promise.all([
          supabase.from('projects').select('*').order('sort_order'),
          supabase.from('certificates').select('*').order('sort_order'),
          supabase.from('skills').select('*').order('sort_order'),
        ])

        if (projects.error) throw projects.error
        if (certificates.error) throw certificates.error
        if (skills.error) throw skills.error

        setData({
          projects: projects.data,
          certificates: certificates.data,
          skills: skills.data,
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return { data, loading, error, refetch: () => setLoading(true) }
}
