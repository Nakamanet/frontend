export interface Anime {
  id: number
  slug: string
  titleEn: string
  titleJp: string | null
  synopsis: string | null
  type: string
  subtype: string | null
  status: string
  startDate: string | null
  endDate: string | null
  nsfw: boolean | null
  posterImage: string | null
  coverImage: string | null
  ageRating: string | null
  episodeCount: number | null
  episodeLength: number | null
  createdAt: string | null
  updatedAt: string | null
}

export interface Manga {
  id: number
  slug: string
  titleEn: string
  titleJp: string | null
  synopsis: string | null
  type: string
  status: string
  volumeCount: number | null
  chapterCount: number | null
  startDate: string | null
  endDate: string | null
  posterImage: string | null
  coverImage: string | null
  createdAt: string | null
}

export interface Category {
  id: number
  name: string
  description: string
}

export interface Genre {
  id: number
  name: string
  slug: string
}

export interface PaginatedMeta {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string | null
  previous_page_url: string | null
}

export interface PaginatedResponse<T> {
  meta: PaginatedMeta
  data: T[]
}

export interface Person {
  id: number
  name: string
  imageUrl: string | null
  description: string | null
  kitsuId: number | null
}

export interface AnimeStaff {
  animeId: number
  characterId: number | null
  personId: number
  role: string
  person: Person
}

export interface MangaStaff {
  mangaId: number
  personId: number
  role: string
  person: Person
}

export interface Episode {
  id: number
  animeId: number
  number: number
  title: string
  airdate: string
  length: number
  thumbnailUrl: string | null
}

export interface Chapter {
  id: number
  mangaId: number
  number: number
  volumeNumber: number
  title: string | null
  releaseDate: string | null
}

export interface Production {
  animeId: number
  companyId: number
  role: string
  company: Company
}

export interface Company {
  id: number
  name: string
  country: string | null
  type: string | null
  kitsuId: number
}

export interface AnimeCharacter {
  animeId: number
  characterId: number
  personId: number
  role: string
  character: Character
  person: Person
}

export interface MangaCharacter {
  mangaId: number
  characterId: number
  role: string | null
  character: Character
}

export interface Character {
  id: number
  name: string
  description: string | null
  imageUrl: string | null
  kitsuId: number | null
}
