'use client'
import { useState } from 'react'
import { getMyAnime, getMyManga } from '@/app/lib/library'
import { Book, TvMinimalPlay } from 'lucide-react'
import { MyAnime, MyManga } from '@/app/types/library'
import { Anime, Manga } from '@/app/types/catalog'
import { getAnimeById, getMangaById } from '@/app/lib/catalogue'
import Image from 'next/image'
import Link from 'next/link'
import FilterTab from '../../components/FilterTab'
import { useQuery, useQueries } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import { useTranslations } from 'next-intl'

export default function Library() {
  const [filter, setFilter] = useState('manga')
  const t = useTranslations('library')

  const FILTER_OPTIONS = [
    { value: 'manga', label: t('manga'), icon: <Book size={18} /> },
    { value: 'anime', label: t('anime'), icon: <TvMinimalPlay size={18} /> },
  ]

  const { data: myAnimes = [], isLoading: loadingAnime } = useQuery<MyAnime[]>({
    queryKey: ['library', 'anime'],
    queryFn: getMyAnime,
  })
  const { data: myMangas = [], isLoading: loadingManga } = useQuery<MyManga[]>({
    queryKey: ['library', 'manga'],
    queryFn: getMyManga,
  })

  const isLoading = loadingAnime || loadingManga

  const animeDetails = useQueries({
    queries: myAnimes.map((entry) => ({
      queryKey: ['anime', entry.anime_id],
      queryFn: () => getAnimeById(entry.anime_id),
      staleTime: 5 * 60 * 1000,
    })),
  })
  const mangaDetails = useQueries({
    queries: myMangas.map((entry) => ({
      queryKey: ['manga', entry.manga_id],
      queryFn: () => getMangaById(entry.manga_id),
      staleTime: 5 * 60 * 1000,
    })),
  })

  const animes: (MyAnime & { detail: Anime })[] = myAnimes
    .map((entry, i) => animeDetails[i]?.data ? { ...entry, detail: animeDetails[i].data as Anime } : null)
    .filter((x): x is MyAnime & { detail: Anime } => x !== null)

  const mangas: (MyManga & { detail: Manga })[] = myMangas
    .map((entry, i) => mangaDetails[i]?.data ? { ...entry, detail: mangaDetails[i].data as Manga } : null)
    .filter((x): x is MyManga & { detail: Manga } => x !== null)

  const statusLabel = (status: string) =>
    t(`status.${status}` as any) ?? status

  return (
    <div className="flex flex-col gap-5 md:gap-8 p-3 md:p-7">
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />
      {isLoading ? (
        <Loader />
      ) : filter === 'manga' ? (
        <div>
          {mangas.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {mangas.map((manga) => (
                <div key={manga.manga_id} className='card bg-accent border border-border rounded-card flex flex-col overflow-hidden'>
                  <Link href={`/bibliotheque/manga/${manga.detail.slug}`} className="flex flex-col h-full min-h-0">
                    <figure className="relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-t-card">
                      <Image src={manga.detail.posterImage || './bg.png'} alt={manga.detail.titleEn} fill className="object-cover" />
                      {manga.status && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                          {statusLabel(manga.status)}
                        </span>
                      )}
                    </figure>
                    <div className="card-body flex-1 min-h-[100px] flex flex-col items-center justify-center py-3">
                      <h2 className="card-title text-center line-clamp-2">{manga.detail.titleEn}</h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>{t('emptyManga')}</p>
          )}
        </div>
      ) : (
        <div>
          {animes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {animes.map((anime) => (
                <div key={anime.anime_id} className='card bg-accent border border-border rounded-card flex flex-col overflow-hidden'>
                  <Link href={`/bibliotheque/anime/${anime.detail.slug}`} className="flex flex-col h-full min-h-0">
                    <figure className="relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-t-card">
                      <Image src={anime.detail.posterImage || './bg.png'} alt={anime.detail.titleEn} fill className="object-cover" />
                      {anime.status && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                          {statusLabel(anime.status)}
                        </span>
                      )}
                    </figure>
                    <div className="card-body flex-1 min-h-[100px] flex flex-col items-center justify-center py-3">
                      <h2 className="card-title text-center line-clamp-2">{anime.detail.titleEn}</h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text/60">{t('emptyAnime')}</p>
          )}
        </div>
      )}
    </div>
  )
}
