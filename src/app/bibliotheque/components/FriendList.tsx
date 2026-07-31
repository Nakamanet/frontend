'use client'

import { useQuery, useQueries } from '@tanstack/react-query'
import { getFriendsExplore } from '@/app/lib/library'
import { getAnimeById, getMangaById } from '@/app/lib/catalogue'
import { Anime, Manga } from '@/app/types/catalog'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Loader from '@/app/components/Loader'
import ScrollableRow from './ScrollableRow'
import { useAuth } from '../../context/AuthContext'

export default function FriendList() {
  const { user } = useAuth()

  const { data, isLoading, error } = useQuery({
    queryKey: ['library', 'explore-friends'],
    queryFn: getFriendsExplore,
    enabled: !!user,
  })

  const animeEntries = data?.anime ?? []
  const mangaEntries = data?.manga ?? []

  const animeDetails = useQueries({
    queries: animeEntries.map((entry) => ({
      queryKey: ['anime', entry.anime_id],
      queryFn: () => getAnimeById(entry.anime_id!),
      staleTime: 5 * 60 * 1000,
      enabled: !!entry.anime_id,
    })),
  })

  const mangaDetails = useQueries({
    queries: mangaEntries.map((entry) => ({
      queryKey: ['manga', entry.manga_id],
      queryFn: () => getMangaById(entry.manga_id!),
      staleTime: 5 * 60 * 1000,
      enabled: !!entry.manga_id,
    })),
  })

  const animeList = animeEntries
    .map((entry, i) => (animeDetails[i]?.data ? { ...entry, detail: animeDetails[i].data as Anime, type: 'anime' } : null))
    .filter((x): x is NonNullable<typeof x> => x !== null)

  const mangaList = mangaEntries
    .map((entry, i) => (mangaDetails[i]?.data ? { ...entry, detail: mangaDetails[i].data as Manga, type: 'manga' } : null))
    .filter((x): x is NonNullable<typeof x> => x !== null)

  const list = [...animeList, ...mangaList]

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full mx-auto my-3">
        <p>Vous devez être connecté pour voir cette bibliothèque</p>
      </div>
    )
  }

  return (
    <ScrollableRow>
      {isLoading ? (
        <Loader variant="plain" className="h-full mx-auto my-[90px]" />
      ) : error ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-primary">Une erreur est survenue</p>
        </div>
      ) : list.length > 0 ? (
        <div className="flex gap-4">
          <div className="flex gap-4">
            {list.map((item) => (
              <div key={`${item.type}-${item.anime_id ?? item.manga_id}`}>
                {item.detail.posterImage ? (
                  <Link href={`/bibliotheque/${item.type}/${item.detail.slug}`}>
                    <Image
                      src={item.detail.posterImage}
                      alt={item.detail.titleEn}
                      width={145}
                      height={100}
                      className="object-cover rounded-card min-w-[145px] min-h-[100px]"
                      priority
                    />
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
          <Link href="/bibliotheque/friends">
            <div className="flex flex-col border border-border gap-2 rounded-card items-center justify-center w-[145px] h-full">
              <Plus size={35} />
              <p>Tous les amis</p>
            </div>
          </Link>
        </div>
      ) : (
        <p>Vos amis n&apos;ont pas encore de titre dans leur bibliothèque</p>
      )}
    </ScrollableRow>
  )
}
