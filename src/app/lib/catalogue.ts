import axios from 'axios'
import type {
  Anime,
  Manga,
  Category,
  Genre,
  PaginatedResponse,
  AnimeStaff,
  MangaStaff,
  Episode,
  Chapter,
  Production,
  AnimeCharacter,
  MangaCharacter,
} from '../types/catalog'

const catalogueApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LIB_API_URL || 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const cache = new Map<string, { data: unknown; expiresAt: number; promise?: Promise<unknown> }>()

async function cachedGet<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const key = url + (params ? JSON.stringify(params) : '')
  const cached = cache.get(key)
  const now = Date.now()

  if (cached) {
    if (cached.expiresAt > now) return cached.data as T
    if (cached.promise) return cached.promise as Promise<T>
  }

  const promise = catalogueApi.get<T>(url, params ? { params } : undefined).then(({ data }) => {
    cache.set(key, { data, expiresAt: now + CACHE_TTL })
    return data
  })

  cache.set(key, { data: cached?.data, expiresAt: 0, promise })
  return promise as Promise<T>
}

export async function getAnimes(page = 1, limit = 20, genre?: string): Promise<PaginatedResponse<Anime>> {
  return cachedGet<PaginatedResponse<Anime>>('/anime', { page, limit, ...(genre && { genre }) })
}

export async function getMangas(page = 1, limit = 20, genre?: string): Promise<PaginatedResponse<Manga>> {
  return cachedGet<PaginatedResponse<Manga>>('/manga', { page, limit, ...(genre && { genre }) })
}

export async function getAnimeById(id: number | string): Promise<Anime> {
  return cachedGet<Anime>(`/anime/${id}`)
}

export async function getMangaById(id: number | string): Promise<Manga> {
  return cachedGet<Manga>(`/manga/${id}`)
}

export async function getGenres(): Promise<Genre[]> {
  return cachedGet<Genre[]>('/genres')
}

export async function getCategories(): Promise<Category[]> {
  return cachedGet<Category[]>('/categories')
}

export async function getAnimeCategories(id: number): Promise<Category[]> {
  return cachedGet<Category[]>(`/anime/${id}/categories`)
}

export async function getAnimeGenres(id: number): Promise<Genre[]> {
  return cachedGet<Genre[]>(`/anime/${id}/genres`)
}

export async function getMangaCategories(id: number): Promise<Category[]> {
  return cachedGet<Category[]>(`/manga/${id}/categories`)
}

export async function getMangaGenres(id: number): Promise<Genre[]> {
  return cachedGet<Genre[]>(`/manga/${id}/genres`)
}

export async function getAnimeStaffs(id: number): Promise<AnimeStaff[]> {
  return cachedGet<AnimeStaff[]>(`/anime/${id}/staff`)
}

export async function getMangaStaffs(id: number): Promise<MangaStaff[]> {
  return cachedGet<MangaStaff[]>(`/manga/${id}/staff`)
}

export async function getEpisodes(id: number, page = 1, limit = 20): Promise<PaginatedResponse<Episode>> {
  return cachedGet<PaginatedResponse<Episode>>(`/anime/${id}/episodes`, { page, limit })
}

export async function getChapters(id: number, page = 1, limit = 20): Promise<PaginatedResponse<Chapter>> {
  return cachedGet<PaginatedResponse<Chapter>>(`/manga/${id}/chapters`, { page, limit })
}

export async function getProductions(id: number): Promise<Production[]> {
  return cachedGet<Production[]>(`/anime/${id}/productions`)
}

export async function getAnimeCharacters(id: number): Promise<AnimeCharacter[]> {
  return cachedGet<AnimeCharacter[]>(`/anime/${id}/characters`)
}

export async function getMangaCharacters(id: number): Promise<MangaCharacter[]> {
  return cachedGet<MangaCharacter[]>(`/manga/${id}/characters`)
}


export async function searchAnime(query: string): Promise<Anime[]> {
  if (!query.trim()) return []
  const { data } = await catalogueApi.get('/anime', { params: { search: query, limit: 8 } })
  return data.data // paginate() wraps results in { data: [...], meta: {...} }
}

export async function searchManga(query: string): Promise<Manga[]> {
  if (!query.trim()) return []
  const { data } = await catalogueApi.get('/manga', { params: { search: query, limit: 8 } })
  return data.data
}