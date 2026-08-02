'use client'

import Image from 'next/image'
import { User } from '../../types/auth'
import Link from 'next/link'
import { CircleUser, Users, Flame } from 'lucide-react'
import { getUserPosts } from '@/app/lib/user'
import { getFriends } from '@/app/lib/friends'
import { getMyAnime, getMyManga, getTopAnime, getTopManga } from '@/app/lib/library'
import { getAnimeById, getMangaById } from '@/app/lib/catalogue'
import { Anime, Manga } from '@/app/types/catalog'
import { useQueries, useQuery } from '@tanstack/react-query'

export default function SideBar({ isLoggedIn, isAuthLoading = false, user }: { isLoggedIn: boolean; isAuthLoading?: boolean; user: User | null }) {
  const results = useQueries({
    queries: [
      { queryKey: ['user', user?.id, 'posts'], queryFn: () => getUserPosts(user!.id), enabled: !!user },
      { queryKey: ['library', 'anime'], queryFn: getMyAnime, enabled: !!user },
      { queryKey: ['library', 'manga'], queryFn: getMyManga, enabled: !!user },
      { queryKey: ['friends', user!.id], queryFn: () => getFriends(user!.id), enabled: !!user },
    ],
  })
  const postCounts = results[0]?.data?.total ?? 0
  const workCount = (results[1]?.data?.length ?? 0) + (results[2]?.data?.length ?? 0)
  const friendsCount = results[3]?.data?.length ?? 0

  const { data: topMangaEntries = [] } = useQuery({
    queryKey: ['library', 'top-manga'],
    queryFn: getTopManga,
  })
  const { data: topAnimeEntries = [] } = useQuery({
    queryKey: ['library', 'top-anime'],
    queryFn: getTopAnime,
  })

  const topMangaDetails = useQueries({
    queries: topMangaEntries.map((entry) => ({
      queryKey: ['manga', entry.manga_id],
      queryFn: () => getMangaById(entry.manga_id!),
      staleTime: 5 * 60 * 1000,
      enabled: !!entry.manga_id,
    })),
  })
  const topAnimeDetails = useQueries({
    queries: topAnimeEntries.map((entry) => ({
      queryKey: ['anime', entry.anime_id],
      queryFn: () => getAnimeById(entry.anime_id!),
      staleTime: 5 * 60 * 1000,
      enabled: !!entry.anime_id,
    })),
  })

  const topManga = topMangaEntries
    .map((entry, i) => (topMangaDetails[i]?.data ? { ...entry, detail: topMangaDetails[i].data as Manga } : null))
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0, 3)

  const topAnime = topAnimeEntries
    .map((entry, i) => (topAnimeDetails[i]?.data ? { ...entry, detail: topAnimeDetails[i].data as Anime } : null))
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0, 3)

  return (
    <div className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
      {!isAuthLoading && isLoggedIn && user ? (
        <div className="card w-full bg-accent shadow-sm border border-border overflow-hidden rounded-card">
          {/* Bloc identité de l'utilisateur */}
          {/* Bannière : image ou fond rouge */}
          <div className="relative w-full h-20 shrink-0 rounded-t-[8px] overflow-hidden bg-primary">
            {user.banner_url ? (
              <Image
                src={user.banner_url}
                alt="Bannière"
                fill
                className="object-cover"
                sizes="(max-width: 400px) 100vw, 400px"
              />
            ) : null}
          </div>
          <div className="card-body pt-0 px-4 pb-4">
            {/* Avatar (chevauche la bannière) + pseudo + handle */}
            <div className="flex items-end gap-3 -mt-6">
              <div className="w-18 h-18 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden z-10 text-base-content/70">
              <Link href={`/profil/${user.id}`}>
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt="Avatar"
                      width={65}
                      height={65}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CircleUser size={50} strokeWidth={1.5} />
                  )}
              </Link>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-base text-white truncate">{user.username}</p>
                <p className="text-sm text-white/60">@{user.username}</p>
              </div>
            </div>
            {/* Stats : Oeuvres, Amis, Posts */}
            <div className="mt-2 p-2 rounded-[8px] bg-muted border border-border">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xl font-bold text-white">{workCount}</p>
                  <p className="text-sm text-white/60">Oeuvres</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{friendsCount}</p>
                  <p className="text-sm text-white/60">Amis</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{postCounts}</p>
                  <p className="text-sm text-white/60">Posts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Bloc Activité des amis a remplir quand l'API fonctionnera*/}
      <div className="card w-full bg-accent shadow-sm place-items-center border border-border rounded-card">
        <div className="card-body flex justify-center w-full">
          {isAuthLoading ? null : isLoggedIn ? (
            <div className="flex gap-2">
              <Users size={20} />
              <p className="text-sm"> Activité amis</p>
              {/* Ajouter les activités des amis */}
            </div>
          ) : (
            <div>
              <Link
                href="/login"
                className="flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary"
              >
                Se connecter
              </Link>
              <p className="flex justify-center p-2">ou</p>
              <Link
                href="/register"
                className="flex justify-center border-2 border-primary rounded-full p-2 pr-3 pl-3 bg-primary"
              >
                S&apos;inscrire
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Bloc Top Mangas */}
      <div className="card w-full bg-accent shadow-sm border border-border rounded-card">
        <div className="card-body w-full">
          <div className="flex gap-2 items-center">
            <Flame size={20} />
            <h3 className="text-sm font-semibold">Top Mangas</h3>
          </div>
          {topManga.length > 0 ? (
            <ul className="flex flex-col gap-2 mt-2">
              {topManga.map((manga, i) => (
                <li key={manga.manga_id}>
                  <Link
                    href={`/bibliotheque/manga/${manga.detail.slug}`}
                    className="flex items-center gap-3 hover:bg-base-200/50 rounded-[8px] p-1 transition-colors"
                  >
                    <span className="text-sm font-bold text-primary w-4 text-center">{i + 1}</span>
                    <Image
                      src={manga.detail.posterImage || '/bg.png'}
                      alt={manga.detail.titleEn}
                      width={32}
                      height={45}
                      className="rounded object-cover shrink-0"
                    />
                    <span className="text-sm truncate">{manga.detail.titleEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text/60">Aucune donnée pour l&apos;instant</p>
          )}
        </div>
      </div>
      {/* Bloc Top Anime */}
      <div className="card w-full bg-accent shadow-sm border border-border rounded-card">
        <div className="card-body w-full">
          <div className="flex gap-2 items-center">
            <Flame size={20} />
            <h3 className="text-sm font-semibold">Top Anime</h3>
          </div>
          {topAnime.length > 0 ? (
            <ul className="flex flex-col gap-2 mt-2">
              {topAnime.map((anime, i) => (
                <li key={anime.anime_id}>
                  <Link
                    href={`/bibliotheque/anime/${anime.detail.slug}`}
                    className="flex items-center gap-3 hover:bg-base-200/50 rounded-[8px] p-1 transition-colors"
                  >
                    <span className="text-sm font-bold text-primary w-4 text-center">{i + 1}</span>
                    <Image
                      src={anime.detail.posterImage || '/bg.png'}
                      alt={anime.detail.titleEn}
                      width={32}
                      height={45}
                      className="rounded object-cover shrink-0"
                    />
                    <span className="text-sm truncate">{anime.detail.titleEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text/60">Aucune donnée pour l&apos;instant</p>
          )}
        </div>
      </div>
    </div>
  )
}
