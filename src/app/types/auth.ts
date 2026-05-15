export interface User {
  id: number
  username: string
  email: string
  birthdate: string
  role: string
  is_deleted: boolean
  localisation?: string | null
  bio?: string | null
  avatar_url?: string | null
  banner_url?: string | null
  theme_preference?: string | null
  profile_visibility: 'public' | 'friends_only' | 'private'
  friends_count : number
  posts_count: number
  library_count: number
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  token: string
  token_type: string
  expires_in: number
}
