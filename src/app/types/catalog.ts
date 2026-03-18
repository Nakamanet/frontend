export interface Anime {
    id: number;
    slug: string;
    titleEn: string;
    titleJp: string | null;
    synopsis: string | null;
    type: string;
    subtype: string | null;
    status: string;
    startDate: string | null;
    endDate: string | null;
    nsfw: boolean | null;
    posterImage: string | null;
    coverImage: string | null;
    ageRating: string | null;
    episodeCount: number | null;
    episodeLength: number | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface Manga {
    id: number;
    slug: string;
    titleEn: string;
    titleJp: string | null;
    synopsis: string | null;
    type: string;
    status: string;
    volumeCount: number | null;
    chapterCount: number | null;
    startDate: string | null;
    endDate: string | null;
    posterImage: string | null;
    coverImage: string | null;
    createdAt: string | null;
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

// À utiliser quand le backend implémentera la pagination
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
