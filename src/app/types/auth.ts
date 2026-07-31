export interface PublicUser {
  id: number
  username: string
  localisation?: string | null
  bio?: string | null
  avatar_url?: string | null
  banner_url?: string | null
  created_at: string
  updated_at: string
  friendship_status?: 'none' | 'pending_sent' | 'pending_received' | 'friends' | 'blocked' | 'blocked_by'
  friendship_id?: number | null
}

export interface User extends PublicUser{
  email: string
  birthdate: string
  role: string
  is_deleted: boolean
  is_admin: boolean
  is_moderator: boolean
  theme_preference?: string | null
  profile_visibility: 'public' | 'friends_only' | 'private'
  friends_count : number
  posts_count: number
  library_count: number
  topics_count: number
}

/**
 * Réponse de `GET /users/{id}/profile`.
 * `role` n'est renvoyé que si l'appelant a le droit de voir le profil :
 * son absence est le signal d'un accès restreint (privé, non-ami, ou blocage).
 */
export interface ProfileUser extends PublicUser {
  profile_visibility: 'public' | 'friends_only' | 'private'
  posts_count: number
  friends_count: number
  library_count: number
  topics_count: number
  friendship_status: 'none' | 'pending_sent' | 'pending_received' | 'friends' | 'blocked' | 'blocked_by'
  friendship_id: number | null
  role?: string
}

export interface AuthResponse {
  user: User
  token: string
  token_type: string
  expires_in: number
}