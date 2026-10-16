'use client'

import { useState } from 'react'
import { getMyAnime, getMyManga, getUserAnime, getUserManga } from '@/app/lib/library'
import { Book, TvMinimalPlay } from 'lucide-react'
import { MyAnime, MyManga } from '@/app/types/library'
import { Anime, Manga } from '@/app/types/catalog'
import { getAnimeById, getMangaById } from '@/app/lib/catalogue'
import CatalogCard from '@/app/bibliotheque/[type]/components/CatalogCard'
import { useLibraryFollow } from '@/app/hooks/useLibraryFollow'
import FilterTab from '../../components/FilterTab'
import { useQuery, useQueries } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import { User } from '@/app/types/auth'

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

export default function Library({ user }: { user?: User }) {
  const [filter, setFilter] = useState('manga')
  const { isFollowed, isPending, toggle } = useLibraryFollow()

  const { data: myAnimes = [], isLoading: loadingAnime, isError: errorAnime } = useQuery<MyAnime[]>({
    queryKey: user ? ['user', user.id, 'library', 'anime'] : ['library', 'anime'],
    queryFn: user ? () => getUserAnime(user.id) : getMyAnime,
  })
  const { data: myMangas = [], isLoading: loadingManga, isError: errorManga } = useQuery<MyManga[]>({
    queryKey: user ? ['user', user.id, 'library', 'manga'] : ['library', 'manga'],
    queryFn: user ? () => getUserManga(user.id) : getMyManga,
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
    <div className="flex flex-col gap-5 md:gap-8 p-3 md:p-7">
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />

      {isLoading ? (
        <Loader />
      ) : errorAnime || errorManga ? (
        <p className="text-text/60">Impossible d&apos;afficher la bibliothèque de cet utilisateur.</p>
      ) : filter === "manga" ? (
        <div>
          {mangas && mangas.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {mangas.map((entry) => (
                <CatalogCard
                  key={entry.manga_id}
                  type="manga"
                  item={entry.detail}
                  badge={entry.status ? STATUS_LABELS[entry.status] ?? entry.status : undefined}
                  followed={isFollowed('manga', entry.manga_id)}
                  pending={isPending('manga', entry.manga_id)}
                  onToggle={() => toggle('manga', entry.manga_id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-text/60">
              {user
                ? "Cet utilisateur n'a pas encore de manga dans sa bibliothèque"
                : "Vous n'avez pas encore de manga ajouté dans votre bibliothèque"}
            </p>
          )}
        </div>
      ) : (
        <div>
          {animes && animes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {animes.map((entry) => (
                <CatalogCard
                  key={entry.anime_id}
                  type="anime"
                  item={entry.detail}
                  badge={entry.status ? STATUS_LABELS[entry.status] ?? entry.status : undefined}
                  followed={isFollowed('anime', entry.anime_id)}
                  pending={isPending('anime', entry.anime_id)}
                  onToggle={() => toggle('anime', entry.anime_id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-text/60">
              {user
                ? "Cet utilisateur n'a pas encore d'anime dans sa bibliothèque"
                : "Vous n'avez pas encore d'anime ajouté dans votre bibliothèque"}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
