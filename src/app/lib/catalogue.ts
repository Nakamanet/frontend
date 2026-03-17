import axios from 'axios';
import type { Anime, Manga } from '../types/catalog';

const catalogueApi = axios.create({
    baseURL: process.env.LIB_API_URL || 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export async function getAnimes(): Promise<Anime[]> {
    const { data } = await catalogueApi.get<Anime[]>('/anime');
    return data;
}

export async function getMangas(): Promise<Manga[]> {
    const { data } = await catalogueApi.get<Manga[]>('/manga');
    return data;
}

export async function getAnimeById(id: number): Promise<Anime> {
    const { data } = await catalogueApi.get<Anime>(`/anime/${id}`);
    return data;
}

export async function getMangaById(id: number): Promise<Manga> {
    const { data } = await catalogueApi.get<Manga>(`/manga/${id}`);
    return data;
}