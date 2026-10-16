'use client'

import { useAuth } from '../../context/AuthContext'
import { getMyAnime, getMyManga } from '../../lib/library'
import { getAnimeById, getMangaById } from '../../lib/catalogue'
import { MyAnime, MyManga } from '../../types/library'
import { Anime, Manga } from '../../types/catalog'
import { useQuery, useQueries } from '@tanstack/react-query'
import ScrollableRow from './ScrollableRow'
import CardRow from './CardRow'
import Loader from '@/app/components/Loader'

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
        <Loader variant="plain" className="mx-auto my-[90px]" />
      ) : (
        <CardRow
          items={items.map(({ _type, ...item }) => ({ type: _type, item }))}
          moreHref="/bibliotheque/manga"
          moreLabel="Ajouter un titre"
        />
      )}
    </ScrollableRow>
  )
}
