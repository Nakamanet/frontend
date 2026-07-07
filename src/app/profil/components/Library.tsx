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

const FILTER_OPTIONS = [
  { value: 'manga', label: 'Mangas', icon: <Book size={18} /> },
  { value: 'anime', label: 'Animes', icon: <TvMinimalPlay size={18} /> },
]

const STATUS_LABELS: Record<string, string> = {
  plan_to_watch: 'À regarder',
  watching:      'En cours',
  plan_to_read:  'À lire',
  reading:       'En cours',
  completed:     'Terminé',
  on_hold:       'En pause',
  dropped:       'Abandonné',
}

export default function Library() {
  const [filter, setFilter] = useState('manga')

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

  return (
    <div className="flex flex-col gap-8 p-7">
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />

      {isLoading ? (
        <Loader />
      ) : filter === "manga" ? (
        <div>
          {mangas && mangas.length > 0 ? (
            <div className='flex gap-2'>
              {mangas.map((manga) => (
                <div
                  key={manga.manga_id}
                  className='card bg-accent border border-border rounded-[15px] h-[450px] w-[250px] flex flex-col overflow-hidden'
                >
                  <Link href={`/bibliotheque/manga/${manga.detail.slug}`} className="flex flex-col h-full min-h-0">
                    <figure className="relative h-[350px] w-full shrink-0 overflow-hidden rounded-t-[15px]">
                      <Image
                        src={manga.detail.posterImage || './bg.png'}
                        alt={manga.detail.titleEn}
                        width={250}
                        height={350}
                      />
                      {manga.status && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                          {STATUS_LABELS[manga.status] ?? manga.status}
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
            <p>Vous n&apos;avez pas encore de manga ajouté dans votre bibliothèque</p>
          )}
        </div>
      ) : (
        <div>
          {animes && animes.length > 0 ? (
            <div className='flex gap-2'>
              {animes.map((anime) => (
                <div
                  key={anime.anime_id}
                  className='card bg-accent border border-border rounded-[15px] h-[450px] w-[250px] flex flex-col overflow-hidden'
                >
                  <Link href={`/bibliotheque/anime/${anime.detail.slug}`} className="flex flex-col h-full min-h-0">
                    <figure className="relative h-[350px] w-full shrink-0 overflow-hidden rounded-t-[15px]">
                      <Image
                        src={anime.detail.posterImage || './bg.png'}
                        alt={anime.detail.titleEn}
                        width={250}
                        height={350}
                      />
                      {anime.status && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                          {STATUS_LABELS[anime.status] ?? anime.status}
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
            <p className="text-text/60">Vous n&apos;avez pas encore d&apos;anime ajouté dans votre bibliothèque</p>
          )}
        </div>
      )}
    </div>
  )
}
