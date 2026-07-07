import api from './axios'
import type { Post, PaginatedPosts } from '../types/post'

export interface GetPostsParams {
  page?: number
  filter?: 'all' | 'trends' | 'recent' | 'friends'
}

export async function getPosts({ page = 1, filter = 'all' }: GetPostsParams = {}): Promise<PaginatedPosts> {
  const params: Record<string, string | number> = { page }

  if (filter === 'trends') {
    params.sort = 'most_liked'
  } else if (filter === 'recent') {
    params.sort = 'latest' // matches default, but explicit is fine
  } else if (filter === 'friends') {
    params.friends_only = 1
  }

  const { data } = await api.get<PaginatedPosts>('/posts', { params })
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
