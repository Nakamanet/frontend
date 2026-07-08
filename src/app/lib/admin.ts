import api from './axios'

export interface AdminUser {
  id: number
  username: string
  email: string
  role: 'user' | 'moderator' | 'admin'
  is_admin: boolean
  is_moderator: boolean
  is_deleted: boolean
  avatar_url: string | null
  created_at?: string
}

export interface PaginatedAdminUsers {
  data: AdminUser[]
  total: number
  current_page: number
  last_page: number
}

export async function getAdminUsers(params: { search?: string; role?: string; page?: number } = {}): Promise<PaginatedAdminUsers> {
  const { data } = await api.get('/admin/users', { params })
  return data
}

export async function updateAdminUser(id: number, body: Partial<Pick<AdminUser, 'username' | 'email' | 'role' | 'is_admin' | 'is_moderator'>>): Promise<AdminUser> {
  const { data } = await api.patch(`/admin/users/${id}`, body)
  return data
}

export async function deleteAdminUser(id: number): Promise<void> {
  await api.delete(`/admin/users/${id}`)
}

export async function restoreAdminUser(id: number): Promise<void> {
  await api.patch(`/admin/users/${id}/restore`)
}
