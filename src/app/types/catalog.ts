export interface Anime {
    id: number;
    slug: string;
    title_en: string;
    title_jp: string | null;
    synopsis: string;
    type: string;
    subtype: string | null;
    status: string;
    start_date: string | null;
    end_date: string | null;
    nsfw: boolean | null;
    poster_image: string | null;
    cover_image: string | null;
    age_rating: string | null;
    episode_count: number | null;
    episode_length: number | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface Manga {
    id: number;
    slug: string;
    title_en: string;
    title_jp: string | null;
    synopsis: string;
    type: string;
    status: string;
    volume_count: number | null;
    chapter_count: number | null;
    start_date: string | null;
    end_date: string | null;
    poster_image: string | null;
    cover_image: string | null;
    created_at: string | null;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
}

export interface PaginatedMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    previous_page_url: string | null;
}

export interface PaginatedResponse<T> {
    meta: PaginatedMeta;
    data: T[];
}
