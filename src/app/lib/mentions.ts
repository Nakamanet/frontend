import api from './axios'

export interface MentionUser {
  id: number
  username: string
  handle: string
  avatar_url: string | null
}

export async function searchMentions(query: string): Promise<MentionUser[]> {
  const { data } = await api.get<MentionUser[]>('/users/search-mentions', { params: { q: query } })
  return data
}