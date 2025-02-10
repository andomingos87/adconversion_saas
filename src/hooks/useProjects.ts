import { createBrowserClient } from '@supabase/ssr'
import { Project, Language } from '@/types/project'
import { useState } from 'react'

export function useProjects() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const createProject = async (name: string, language: Language): Promise<Project | null> => {
    setLoading(true)
    setError(null)

    try {
      const { data: project, error } = await supabase
        .from('projects')
        .insert([
          {
            name,
            language,
            thumbnail: '/images/projects/default.jpg'
          }
        ])
        .select()
        .single()

      if (error) throw error

      return project
    } catch (err) {
      setError('Erro ao criar projeto')
      console.error('Erro ao criar projeto:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getProjects = async (): Promise<Project[]> => {
    setLoading(true)
    setError(null)

    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      return projects || []
    } catch (err) {
      setError('Erro ao carregar projetos')
      console.error('Erro ao carregar projetos:', err)
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    createProject,
    getProjects,
    loading,
    error
  }
} 