import type { User } from './auth'

export interface ForumReply {
  id: number
  topic_id: number
  user_id: number
  parent_id: number | null
  content: string
  created_at: string
  updated_at: string
  user: User
}

export interface Forum {
  id: number
  user_id: number
  category: 'general' | 'anime' | 'manga' | 'recommendations' | 'spoilers'
  title: string
  content: string
  related_anime_id: number | null
  related_manga_id: number | null
  is_pinned: boolean
  is_locked: boolean
  created_at: string
  updated_at: string
  user: User
  replies?: ForumReply[]
}

export interface PaginatedForums {
  current_page: number
  data: Forum[]
  per_page: number
  total: number
  last_page: number
  next_page_url: string | null
  prev_page_url: string | null
}
