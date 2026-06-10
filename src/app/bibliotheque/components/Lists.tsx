'use client'

import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { getMyAnime, getMyManga } from '../../lib/library'
import { getAnimeById, getMangaById } from '../../lib/catalogue'
import { MyAnime, MyManga } from '../../types/library'
import { Anime, Manga } from '../../types/catalog'
import { useQuery, useQueries } from '@tanstack/react-query'
import ScrollableRow from './ScrollableRow'

export default function Lists() {
  const { user } = useAuth()

  const { data: myAnimes = [], isLoading: loadingAnime } = useQuery<MyAnime[]>({
    queryKey: ['library', 'anime'],
    queryFn: getMyAnime,
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
  })

  const { data: myMangas = [], isLoading: loadingManga } = useQuery<MyManga[]>({
    queryKey: ['library', 'manga'],
    queryFn: getMyManga,
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
  })

  const animeDetails = useQueries({
    queries: myAnimes.map((e) => ({
      queryKey: ['anime', e.anime_id],
      queryFn: () => getAnimeById(e.anime_id),
      staleTime: 5 * 60 * 1000,
    })),
  })

  const mangaDetails = useQueries({
    queries: myMangas.map((e) => ({
      queryKey: ['manga', e.manga_id],
      queryFn: () => getMangaById(e.manga_id),
      staleTime: 5 * 60 * 1000,
    })),
  })

  const animes: (Anime & { _type: 'anime' })[] = myAnimes
    .map((e, i) => animeDetails[i]?.data ? { ...(animeDetails[i].data as Anime), _type: 'anime' as const } : null)
    .filter((x): x is Anime & { _type: 'anime' } => x !== null)

  const mangas: (Manga & { _type: 'manga' })[] = myMangas
    .map((e, i) => mangaDetails[i]?.data ? { ...(mangaDetails[i].data as Manga), _type: 'manga' as const } : null)
    .filter((x): x is Manga & { _type: 'manga' } => x !== null)

  const items = [...animes, ...mangas]
  const isLoading = loadingAnime || loadingManga

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full mx-auto my-3">
        <p>Vous devez être connecté pour voir votre bibliothèque</p>
      </div>
    )
  }

  return (
    <ScrollableRow>
      {isLoading ? (
        <div className="flex justify-center items-center mx-auto my-[90px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="flex gap-4">
          {items.map((item) => (
            item.posterImage ? (
              <Link key={`${item._type}-${item.id}`} href={`/bibliotheque/${item._type}/${item.slug}`}>
                <Image
                  src={item.posterImage}
                  alt={item.titleEn ?? ''}
                  width={145}
                  height={210}
                  className="object-cover rounded-[15px] min-w-[145px]"
                />
              </Link>
            ) : null
          ))}
          <Link href="/bibliotheque/manga" className="flex flex-col border border-border gap-2 rounded-[15px] items-center justify-center w-[145px] h-full py-6 px-3 shrink-0">
            <Plus size={20} />
            <p className="text-sm text-center">Ajouter un titre</p>
          </Link>
        </div>
      )}
    </ScrollableRow>
  )
}
