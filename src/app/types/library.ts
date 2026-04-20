export interface MyAnime {
    anime_id: number,
    status: string,
    progress: number | null,
    rewatch_count: number | null,
    score: number | null,
    is_private: boolean
}

export interface MyManga {
    manga_id: number,
    status: string,
    progress: number | null,
    reread_count: number | null,
    score: number | null,
    is_private: boolean
}