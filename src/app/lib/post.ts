import api from './axios'
import type { Post, PaginatedPosts } from '../types/post'

export async function getPosts(page = 1): Promise<PaginatedPosts> {
  const { data } = await api.get<PaginatedPosts>('/posts', { params: { page } })
  return data
}

export async function getPostById(id: number): Promise<Post> {
  const { data } = await api.get<Post>(`/posts/${id}`)
  return data
}

export async function createPost(
  post: Pick<Post, 'content' | 'related_anime_id' | 'related_manga_id' | 'image_urls' | 'is_spoiler'>
): Promise<Post> {
  const { data } = await api.post<Post>('/posts', post)
  return data
}

export async function updatePost(
  id: number,
  post: Partial<Pick<Post, 'content' | 'image_urls' | 'is_spoiler'>>
): Promise<Post> {
  const { data } = await api.patch<Post>(`/posts/${id}`, post)
  return data
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/${id}`)
}

export async function getMylikedPosts(): Promise<PaginatedPosts> {
  const { data } = await api.get<PaginatedPosts>('/posts/me/liked')
  return data
}

export async function getMySavedPosts(): Promise<PaginatedPosts> {
  const { data } = await api.get<PaginatedPosts>('/posts/me/saved')
  return data
} 

export async function getMyArchivedPost(): Promise<PaginatedPosts> {
  const { data } = await api.get<PaginatedPosts>('/posts/me/archived')
  return data
}

export async function savePost(id: number): Promise<{ message: string, saved: boolean }> {
  const { data } = await api.post(`/posts/${id}/save`)
  return data
}

export async function unsavePost(id: number): Promise<{ message: string, saved: boolean }> {
  const { data } = await api.delete(`/posts/${id}/save`)
  return data
}

export async function archivePost(id: number): Promise<{ message: string, archived: boolean }> {
  const { data } = await api.patch(`/posts/${id}/archive`)
  return data
} 

export async function unarchivePost(id: number): Promise<{ message: string, archived: boolean }> {
  const { data } = await api.patch(`/posts/${id}/unarchive`)
  return data
}