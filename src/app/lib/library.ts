import api from "./axios"
import { MyAnime, MyManga } from "../types/library"

export async function getMyAnime() {
    const { data } = await api.get('/library/anime')
    return data
}

export async function getMyManga() {
    const { data } = await api.get('/library/manga')
    return data
}

export async function addMyAnime(body: MyAnime) {
    const { data } = await api.post('/library/anime', body)
    return data
}

export async function addMyManga(body: MyManga) {
    const { data } = await api.post('/library/manga', body)
    return data
}

export async function editMyAnime(id: number, body: Partial<MyAnime>) {
    const { data } = await api.patch(`/library/anime/${id}`, body)
    return data
}

export async function editMyManga(id: number, body: Partial<MyManga>) {
    const { data } = await api.patch(`/library/manga/${id}`, body)
    return data
}

export async function deleteMyAnime(id: number) {
    const { data } = await api.delete(`/library/anime/${id}`)
    return data
}

export async function deleteMyManga(id: number) {
    const { data } = await api.delete(`/library/manga/${id}`)
    return data
}

export interface FriendsExploreEntry {
  anime_id?: number
  manga_id?: number
  friends_count: number
}

export interface FriendsExploreResponse {
  anime: FriendsExploreEntry[]
  manga: FriendsExploreEntry[]
}

export async function getFriendsExplore(): Promise<FriendsExploreResponse> {
  const res = await api.get('/library/explore/friends') // adjust to your axios instance import
  return res.data
}

export interface TopEntry {
  anime_id?: number
  manga_id?: number
  count: number
}

export async function getTopAnime(): Promise<TopEntry[]> {
  const { data } = await api.get('/library/top/anime')
  return data
}

export async function getTopManga(): Promise<TopEntry[]> {
  const { data } = await api.get('/library/top/manga')
  return data
}