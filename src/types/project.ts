export type Language = 'pt-BR' | 'en'

export interface Project {
  id: string
  name: string
  language: Language
  thumbnail: string
  created_at: string
  user_id: string
}

export interface Video {
  id: number
  title: string
  url: string
  thumbnail: string
  createdAt: string
} 