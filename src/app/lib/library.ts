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