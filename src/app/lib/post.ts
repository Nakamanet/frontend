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
