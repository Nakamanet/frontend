import type { User } from './auth'

export interface Post {
  id: number
  user_id: number
  related_anime_id: number | null
  related_manga_id: number | null
  content: string
  image_urls: string[] | null
  is_spoiler: boolean
  created_at: string
  updated_at: string
  likes_count: number
  comments_count: number
  user: User
}

export interface PaginatedPosts {
  current_page: number
  data: Post[]
  per_page: number
  total: number
  last_page: number
  next_page_url: string | null
  prev_page_url: string | null
}
