export interface Anime {
    id: number;
    slug: string;
    titleEn: string;
    titleJp: string | null;
    synopsis: string;
    type: string;
    subtype: string;
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
    synopsis: string;
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