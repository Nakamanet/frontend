'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { getAnimeById, getMangaById } from '@/app/lib/catalogue'
import { Anime, Manga } from '@/app/types/catalog'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Chat from '@/app/components/home/Chat'
import Calendar from '@/app/components/home/Calendar'
import EpisodePage from './components/EpisodePage'
import Thread from './components/Thread'
import Information from './components/Information'
import CharacterPage from './components/CharacterPage'
import { addMyAnime, addMyManga } from '@/app/lib/library'
import { useToast } from '@/app/context/ToastContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function DetailPage() {
  const { type, slug } = useParams()
  const { user } = useAuth()
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [voirPlus, setVoirPlus] = useState(false)
  const [filter, setFilter] = useState('characters')

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  const { data: item } = useQuery<Anime | Manga>({
    queryKey: [type, slug],
    queryFn: () => type === 'anime' ? getAnimeById(slug as string) : getMangaById(slug as string),
    enabled: !!type && !!slug,
    staleTime: 5 * 60 * 1000,
  })

  const { mutate: handleSubmit } = useMutation({
    mutationFn: (id: number) => type === 'anime'
      ? addMyAnime({ anime_id: id, status: 'plan_to_watch', progress: 1, rewatch_count: 0, score: 1, is_private: false })
      : addMyManga({ manga_id: id, status: 'plan_to_read', progress: 1, reread_count: 0, score: 1, is_private: false }),
    onSuccess: () => {
      showToast(type === 'anime' ? 'Anime ajouté à votre bibliothèque avec succès' : 'Manga ajouté à votre bibliothèque avec succès', 'success')
      queryClient.invalidateQueries({ queryKey: ['library', type as string] })
    },
    onError: (err) => showToast((err as Error).message, 'error'),
  })

  if (!item) return null

  return (
    <main className="md:grid md:grid-cols-5 max-w-[1500px] mx-auto py-10 px-15">
      <section className="col-span-4 pr-6">
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
          <div className="w-full h-40 shrink-0 rounded-[15px] overflow-hidden bg-primary">
            {item?.coverImage ? (
              <Image
                src={item.coverImage}
                alt="Bannière"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image src="/bg.png" alt="Bannière" width={100} height={100} className="object-cover w-full h-full" />
            )}
          </div>
        </div>
        {/* Section Content */}
        <div className="flex w-full px-5 gap-5" style={{ marginTop: '-80px', marginBottom: '30px' }}>
          <div className="w-1/4 shrink-0 self-start gap-4 flex flex-col items-center">
            {item?.posterImage ? (
              <Image
                src={item.posterImage}
                alt="Avatar"
                width={250}
                height={390}
                className="w-full object-cover rounded-[15px]"
              />
            ) : (
              <Image
                src="/bg.png"
                alt="Bannière"
                width={100}
                height={100}
                className="object-cover w-full h-full rounded-[15px]"
              />
            )}
            <button  
              onClick={() => handleSubmit(item.id)}
              className="btn btn-ghost border-none rounded-full bg-primary text-primary-content"
            >
              Ajouter à ma liste
            </button>
          </div>
          <div className="w-3/4 min-w-0 flex flex-col gap-10 overflow-hidden">
            <div className="min-w-0">
              <p className="text-2xl font-bold">{item?.titleEn || item?.titleJp}</p>
              {item?.titleEn && <p className="text-lg">{item.titleJp || 'N/A'}</p>}
            </div>
            <div className="bg-accent rounded-[15px] p-5 gap-4 flex flex-col min-w-0 overflow-hidden">
              <p className="text-xl">Synopsis</p>
              {item?.synopsis ? (
                <>
                  {voirPlus ? (
                    <p className="min-w-0 ">{item?.synopsis}</p>
                  ) : (
                    <p>{item?.synopsis.length > 300 ? item?.synopsis.substring(0, 300) + '...' : item?.synopsis}</p>
                  )}
                  <button onClick={() => setVoirPlus(!voirPlus)}>{voirPlus ? 'Voir moins' : 'Voir plus'}</button>
                </>
              ) : null}
            </div>
          </div>
        </div>
        {/* Episodes/Personnages/Thread */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between border border-border bg-accent rounded-full py-1 px-6">
            <div className="flex gap-5 items-center justify-center w-full">
              <button
                onClick={() => {
                  setFilter('characters')
                }}
                className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'characters' ? 'bg-alerts text-white' : 'text-border'}`}
              >
                <span className="hidden md:inline">Personnages</span>
              </button>
              <button
                onClick={() => {
                  if (filter === 'episode') {
                    setFilter('characters')
                  } else {
                    setFilter('episode')
                  }
                }}
                className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'episode' ? 'bg-alerts text-white' : 'text-border'}`}
              >
                <span className="hidden md:inline">{type === 'anime' ? 'Episodes' : 'Chapitres'}</span>
              </button>
              <button
                onClick={() => {
                  if (filter === 'thread') {
                    setFilter('characters')
                  } else {
                    setFilter('thread')
                  }
                }}
                className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'thread' ? 'bg-alerts text-white' : 'text-border'}`}
              >
                <span className="hidden md:inline">Fil de discussion</span>
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
        <Chat user={user} />
        {item && type === 'anime' ? (
          <Information type="anime" item={item as Anime} />
        ) : item && type === 'manga' ? (
          <Information type="manga" item={item as Manga} />
        ) : null}
        <Calendar user={user} />
      </section>
    </main>
  )
}
