'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { getAnimeById, getMangaById, getAnimeCharacters, getMangaCharacters, getEpisodes, getChapters } from '@/app/lib/catalogue'
import { Anime, AnimeCharacter, Manga, MangaCharacter } from '@/app/types/catalog'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ChevronDown, Check, Trash2 } from 'lucide-react'
import Chat from '@/app/components/home/Chat'
import Calendar from '@/app/components/home/Calendar'
import EpisodePage from './components/EpisodePage'
import Thread from './components/Thread'
import Information from './components/Information'
import CharacterPage from './components/CharacterPage'
import { addMyAnime, addMyManga, deleteMyAnime, deleteMyManga, getMyAnime, getMyManga } from '@/app/lib/library'
import { useToast } from '@/app/context/ToastContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'

export default function DetailPage() {
  const { type, slug } = useParams()
  const { user } = useAuth()
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [voirPlus, setVoirPlus] = useState(false)
  const [userFilter, setUserFilter] = useState<string | null>(null)

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  const { data: item } = useQuery<Anime | Manga>({
    queryKey: [type, slug],
    queryFn: () => type === 'anime' ? getAnimeById(slug as string) : getMangaById(slug as string),
    enabled: !!type && !!slug,
    staleTime: 5 * 60 * 1000,
  })

  const { data: characters = [], isFetched: charactersFetched } = useQuery<AnimeCharacter[] | MangaCharacter[]>({
    queryKey: [type === 'anime' ? 'anime' : 'manga', item?.id, 'characters'],
    queryFn: () => type === 'anime' ? getAnimeCharacters(item!.id) : getMangaCharacters(item!.id),
    enabled: !!item?.id,
    staleTime: 5 * 60 * 1000,
  })

  const { data: episodeData, isFetched: episodesFetched } = useQuery({
    queryKey: ['anime', item?.id, 'episodes', { page: 1, limit: 1 }],
    queryFn: () => getEpisodes(item!.id, 1, 1),
    enabled: !!item?.id && type === 'anime',
    staleTime: 5 * 60 * 1000,
  })

  const { data: chapterData, isFetched: chaptersFetched } = useQuery({
    queryKey: ['manga', item?.id, 'chapters', { page: 1, limit: 1 }],
    queryFn: () => getChapters(item!.id, 1, 1),
    enabled: !!item?.id && type === 'manga',
    staleTime: 5 * 60 * 1000,
  })

  const hasCharacters = characters.length > 0
  const hasEpisodes = type === 'anime' ? (episodeData?.meta.total ?? 0) > 0 : (chapterData?.meta.total ?? 0) > 0
  const contentFetched = charactersFetched && (type === 'anime' ? episodesFetched : chaptersFetched)
  const defaultFilter = !contentFetched 
  ? 'characters'
  : hasCharacters ? 'characters'
  : hasEpisodes ? 'episode'
  : 'thread'
  const filter = userFilter ?? defaultFilter

  const ANIME_STATUSES = [
    { value: 'plan_to_watch', label: 'À regarder' },
    { value: 'watching',      label: 'En cours' },
    { value: 'completed',     label: 'Terminé' },
    { value: 'on_hold',       label: 'En pause' },
    { value: 'dropped',       label: 'Abandonné' },
  ]
  const MANGA_STATUSES = [
    { value: 'plan_to_read', label: 'À lire' },
    { value: 'reading',      label: 'En cours' },
    { value: 'completed',    label: 'Terminé' },
    { value: 'on_hold',      label: 'En pause' },
    { value: 'dropped',      label: 'Abandonné' },
  ]
  const statuses = type === 'anime' ? ANIME_STATUSES : MANGA_STATUSES

  const { data: myLibrary = [] } = useQuery<Array<{ anime_id?: number; manga_id?: number; status: string }>>({
    queryKey: ['library', type as string],
    queryFn: () => type === 'anime' ? getMyAnime() : getMyManga(),
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
  })

  const myEntry = item
    ? myLibrary.find((e) => type === 'anime' ? e.anime_id === item.id : e.manga_id === item.id)
    : undefined

  const { mutate: setStatus, isPending: isStatusPending } = useMutation({
    mutationFn: (status: string) => type === 'anime'
      ? addMyAnime({ anime_id: item!.id, status, progress: null, rewatch_count: null, score: null, is_private: false })
      : addMyManga({ manga_id: item!.id, status, progress: null, reread_count: null, score: null, is_private: false }),
    onSuccess: (_data, status) => {
      queryClient.invalidateQueries({ queryKey: ['library', type as string] })
      if (!myEntry) {
        showToast(type === 'anime' ? 'Anime ajouté à votre liste' : 'Manga ajouté à votre liste', 'success')
      } else {
        const label = statuses.find((s) => s.value === status)?.label
        showToast(`Status mis à jour : ${label}.`, 'success')
      }
    },
    onError: (err) => showToast((err as Error).message, 'error'),
  })

  const { mutate: removeEntry, isPending: isRemovePending } = useMutation({
    mutationFn: () => type === 'anime' ? deleteMyAnime(item!.id) : deleteMyManga(item!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['library', type as string] })
      showToast('Retiré de votre liste', 'success')
    },
    onError: (err) => showToast((err as Error).message, 'error'),
  })

  const isMutating = isStatusPending || isRemovePending

  if (!item) return null

  return (
    <main className="lg:grid lg:grid-cols-5 max-w-[1500px] mx-auto px-4 md:px-8 lg:px-15 py-5 md:py-10 pb-20 md:pb-10">
      <section className="lg:col-span-4 lg:pr-6">
        {/* Section Header */}
        <div className="flex flex-col w-full h-auto gap-2">
          {/* Breadcrumb */}
          <div className="flex gap-1 text-sm items-center">
            <Link href="/bibliotheque/" className="flex gap-1 text-sm items-center">
              Bibliothèque
            </Link>
            <ChevronRight size={16} />
            <Link href={`/bibliotheque/${type}`} className="flex gap-1 text-sm items-center">
              {capitalize(type as string)}
            </Link>
            <ChevronRight size={16} />
            <Link href={`/bibliotheque/${type}/${slug}`} className="flex gap-1 text-sm items-center">
              {capitalize(slug as string)}
            </Link>
          </div>
          {/* Fond */}
          <div className="relative w-full h-64 shrink-0 rounded-card overflow-hidden bg-primary z-0">
            {item?.coverImage ? (
              <Image
                src={item.coverImage}
                alt="Bannière"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
                priority
              />
            ) : (
              <Image src="/bg.png" alt="Bannière" fill sizes="(max-width: 768px) 100vw, 80vw" className="object-cover" priority />
            )}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60" />
          </div>
        </div>
        {/* Section Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 w-full px-5 gap-5" style={{ marginTop: '-80px', marginBottom: '30px' }}>
          <div className="w-32 md:w-auto md:col-span-1 shrink-0 gap-4 flex flex-col items-center">
            {item?.posterImage ? (
              <Image
                src={item.posterImage}
                alt="Avatar"
                width={250}
                height={390}
                className="w-full object-cover rounded-card"
              />
            ) : (
              <Image
                src="/bg.png"
                alt="Bannière"
                width={100}
                height={100}
                className="object-cover w-full h-full rounded-card"
              />
            )}
          </div>
          <div className="md:col-span-3 min-w-0 flex flex-col gap-10 overflow-hidden">
            <div className="flex items-end justify-between gap-4 min-w-0">
              <div className="min-w-0">
                <p className="text-3xl font-bold drop-shadow-md">{item?.titleEn || item?.titleJp}</p>
                {item?.titleEn && <p className="text-xl drop-shadow-md">{item.titleJp || 'N/A'}</p>}
              </div>
              {user && myEntry ? (
                <div className="dropdown dropdown-end shrink-0">
                  <button tabIndex={0} disabled={isMutating} className="btn btn-ghost border-none rounded-full bg-primary text-primary-content flex items-center gap-2 disabled:opacity-70">
                    {isMutating
                      ? <Loader variant="inline" size="xs" />
                      : <>{statuses.find(s => s.value === myEntry.status)?.label ?? myEntry.status}<ChevronDown size={16} /></>
                    }
                  </button>
                  <ul tabIndex={0} className="dropdown-content z-50 mt-1 w-44 bg-base-100 border border-border rounded-xl shadow-lg overflow-hidden">
                    {statuses.map((s) => (
                      <li key={s.value}>
                        <button
                          onClick={() => setStatus(s.value)}
                          disabled={isMutating}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
                        >
                          {s.label}
                          {myEntry.status === s.value && <Check size={14} />}
                        </button>
                      </li>
                    ))}
                    <li className="border-t border-border">
                      <button
                        onClick={() => removeEntry()}
                        disabled={isMutating}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-primary hover:bg-accent disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        Supprimer
                      </button>
                    </li>
                  </ul>
                </div>
              ) : user ? (
                <button
                  onClick={() => setStatus(type === 'anime' ? 'plan_to_watch' : 'plan_to_read')}
                  disabled={isMutating}
                  className="btn btn-ghost border-none rounded-full bg-primary text-primary-content shrink-0 disabled:opacity-70"
                >
                  {isMutating ? <Loader variant="inline" size="xs" /> : 'Ajouter à ma liste'}
                </button>
              ) : null}
            </div>
            <div className="bg-accent rounded-card p-5 gap-4 flex flex-col min-w-0 overflow-hidden flex-1">
              <p className="text-xl">Synopsis</p>
              {item?.synopsis ? (
                <>
                  {voirPlus ? (
                    <p className="min-w-0">{item?.synopsis}</p>
                  ) : (
                    <p>{item?.synopsis.split(/\s+/).length > 50 ? item?.synopsis.split(/\s+/).slice(0, 50).join(' ') + '...' : item?.synopsis}</p>
                  )}
                  {item?.synopsis.split(/\s+/).length > 50 && (
                    <div className="flex justify-end">
                      <button onClick={() => setVoirPlus(!voirPlus)}>{voirPlus ? 'Voir moins' : 'Voir plus'}</button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-text-muted italic">Pas de synopsis pour le moment.</p>
              )}
            </div>
          </div>
        </div>
        {/* Informations */}
        {item && type === 'anime' ? (
          <Information type="anime" item={item as Anime} />
        ) : item && type === 'manga' ? (
          <Information type="manga" item={item as Manga} />
        ) : null}

        {/* Episodes/Personnages/Thread */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between border border-border bg-accent rounded-full py-1 px-3">
            <div className="flex gap-1 sm:gap-3 items-center justify-center w-full">
              {hasCharacters && (
                <button
                  onClick={() => setUserFilter('characters')}
                  className={`flex px-3 gap-1.5 btn btn-ghost border-none btn-xs text-sm py-2 font-normal hover:bg-primary rounded-full ${filter === 'characters' ? 'bg-primary text-white' : 'text-text-muted'}`}
                >
                  <span>Personnages</span>
                </button>
              )}
              {hasEpisodes && (
                <button
                  onClick={() => setUserFilter(filter === 'episode' ? (hasCharacters ? 'characters' : 'thread') : 'episode')}
                  className={`flex px-3 gap-1.5 btn btn-ghost border-none btn-xs text-sm py-2 font-normal hover:bg-primary rounded-full ${filter === 'episode' ? 'bg-primary text-white' : 'text-text-muted'}`}
                >
                  <span>{type === 'anime' ? 'Episodes' : 'Chapitres'}</span>
                </button>
              )}
              <button
                onClick={() => setUserFilter(filter === 'thread' ? (hasCharacters ? 'characters' : hasEpisodes ? 'episode' : 'thread') : 'thread')}
                className={`flex px-3 gap-1.5 btn btn-ghost border-none btn-xs text-sm py-2 font-normal hover:bg-primary rounded-full ${filter === 'thread' ? 'bg-primary text-white' : 'text-text-muted'}`}
              >
                <span>Forums</span>
              </button>
            </div>
          </div>
          {filter === 'episode' ? (
            <div className="flex flex-col gap-4">
              {item && type === 'anime' && <EpisodePage type="anime" item={item as Anime} />}
              {item && type === 'manga' && <EpisodePage type="manga" item={item as Manga} />}
            </div>
          ) : filter === 'characters' ? (
            <div className="flex flex-col gap-4">
              {item && type === 'manga' && <CharacterPage type="manga" item={item as Manga} />}
              {item && type === 'anime' && <CharacterPage type="anime" item={item as Anime} />}
            </div>
          ) : filter === 'thread' ? (
            <div className="flex flex-col gap-4">
              <Thread />
            </div>
          ) : null}
        </div>
      </section>
      <section className="flex flex-col gap-5 py-6">
        <div className="hidden lg:block">
          <Chat user={user} />
        </div>
        <div className="hidden lg:block">
          <Calendar user={user} />
        </div>
      </section>
    </main>
  )
}
