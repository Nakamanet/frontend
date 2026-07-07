import api from './axios'
import type { Forum, ForumReply, PaginatedForums } from '../types/forum'

export async function getForums(
  page = 1,
  category?: Forum['category'],
  search?: string,
  is_pinned?: boolean
): Promise<PaginatedForums> {
  const { data } = await api.get<PaginatedForums>('/forum/topics', {
    params: {
      page,
      ...(category && { category }),
      ...(search && { search }),
      ...(is_pinned !== undefined && { is_pinned }),
    },
  })
  return data
}

export async function getForumById(id: number): Promise<Forum> {
  const { data } = await api.get<Forum>(`/forum/topics/${id}`)
  return data
}

export async function createForum(
  forum: Pick<Forum, 'title' | 'content' | 'category' | 'related_anime_id' | 'related_manga_id'>
): Promise<Forum> {
  const { data } = await api.post<Forum>('/forum/topics', forum)
  return data
}

export async function deleteForum(id: number): Promise<void> {
  await api.delete(`/forum/topics/${id}`)
}

export async function replyToForum(id: number, content: string, parent_id?: number): Promise<ForumReply> {
  const { data } = await api.post<ForumReply>(`/forum/topics/${id}/reply`, {
    content,
    ...(parent_id !== undefined && { parent_id }),
  })
  return data
}

export async function voteOnTopic(id: number): Promise<{ votes_count: number; user_has_voted: boolean }> {
  const { data } = await api.post(`/forum/topics/${id}/vote`)
  return data
}

export async function voteOnReply(id: number): Promise<{ votes_count: number; user_has_voted: boolean }> {
  const { data } = await api.post(`/forum/replies/${id}/vote`)
  return data
}

export async function archiveTopic(id: number): Promise<{ is_archived: boolean }> {
  const { data } = await api.post(`/forum/topics/${id}/archive`)
  return data
}

export async function pinTopic(id: number): Promise<{ user_has_pinned: boolean }> {
  const { data } = await api.post(`/forum/topics/${id}/pin`)
  return data
}

export async function getUserPins(page = 1): Promise<PaginatedForums> {
  const { data } = await api.get<PaginatedForums>('/forum/my-pins', { params: { page } })
  return data
}
