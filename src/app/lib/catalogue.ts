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

export async function getAnimes(page = 1, limit = 20, genre?: string): Promise<PaginatedResponse<Anime>> {
  const { data } = await catalogueApi.get<PaginatedResponse<Anime>>('/anime', {
    params: { page, limit, ...(genre && { genre }) },
  })
  return data
}

export async function getMangas(page = 1, limit = 20, genre?: string): Promise<PaginatedResponse<Manga>> {
  const { data } = await catalogueApi.get<PaginatedResponse<Manga>>('/manga', {
    params: { page, limit, ...(genre && { genre }) },
  })
  return data
}

export async function getAnimeById(id: number | string): Promise<Anime> {
  const { data } = await catalogueApi.get<Anime>(`/anime/${id}`)
  return data
}

export async function getMangaById(id: number | string): Promise<Manga> {
  const { data } = await catalogueApi.get<Manga>(`/manga/${id}`)
  return data
}

export async function getGenres(): Promise<Genre[]> {
  const { data } = await catalogueApi.get<Genre[]>('/genres')
  return data
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await catalogueApi.get<Category[]>('/categories')
  return data
}

export async function getAnimeCategories(id: number): Promise<Category[]> {
  const { data } = await catalogueApi.get<Category[]>(`/anime/${id}/categories`)
  return data
}

export async function getAnimeGenres(id: number): Promise<Genre[]> {
  const { data } = await catalogueApi.get<Genre[]>(`/anime/${id}/genres`)
  return data
}

export async function getMangaCategories(id: number): Promise<Category[]> {
  const { data } = await catalogueApi.get<Category[]>(`/manga/${id}/categories`)
  return data
}

export async function getMangaGenres(id: number): Promise<Genre[]> {
  const { data } = await catalogueApi.get<Genre[]>(`/manga/${id}/genres`)
  return data
}

export async function getAnimeStaffs(id: number): Promise<AnimeStaff[]> {
  const { data } = await catalogueApi.get<AnimeStaff[]>(`/anime/${id}/staff`)
  return data
}

export async function getMangaStaffs(id: number): Promise<MangaStaff[]> {
  const { data } = await catalogueApi.get<MangaStaff[]>(`/manga/${id}/staff`)
  return data
}

export async function getEpisodes(id: number, page = 1, limit = 20): Promise<PaginatedResponse<Episode>> {
  const { data } = await catalogueApi.get<PaginatedResponse<Episode>>(`/anime/${id}/episodes`, {
    params: { page, limit },
  })
  return data
}

export async function getChapters(id: number, page = 1, limit = 20): Promise<PaginatedResponse<Chapter>> {
  const { data } = await catalogueApi.get<PaginatedResponse<Chapter>>(`/manga/${id}/chapters`, {
    params: { page, limit },
  })
  return data
}

export async function getProductions(id: number): Promise<Production[]> {
  const { data } = await catalogueApi.get<Production[]>(`/anime/${id}/productions`)
  return data
}

export async function getAnimeCharacters(id: number): Promise<AnimeCharacter[]> {
  const { data } = await catalogueApi.get<AnimeCharacter[]>(`/anime/${id}/characters`)
  return data
}

export async function getMangaCharacters(id: number): Promise<MangaCharacter[]> {
  const { data } = await catalogueApi.get<MangaCharacter[]>(`/manga/${id}/characters`)
  return data
}
