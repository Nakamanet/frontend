'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getAnimeById, getMangaById } from '@/app/lib/catalogue'
import { Anime, Manga } from '@/app/types/catalog'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Chat from '@/app/components/home/Chat'
import Calendar from '@/app/components/home/Calendar'
import Episode from './components/Episode'
import Character from './components/Character'
import Thread from './components/Thread'
import Information from './components/Information'

export default function DetailPage() {
  const { type } = useParams()
  const { slug } = useParams()
  const { user } = useAuth()
  const [item, setItem] = useState<Manga | Anime | null>(null)
  const [voirPlus, setVoirPlus] = useState(false)
  const [filter, setFilter] = useState('episode')

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  useEffect(() => {
    if (!type || !slug) return
    const load = async () => {
      if (type === 'anime') {
        getAnimeById(slug as string)
          .then((res) => setItem(res))
          .catch((err) => console.error(err))
      } else if (type === 'manga') {
        getMangaById(slug as string)
          .then((res) => setItem(res))
          .catch((err) => console.error(err))
      }
    }
    load()
  }, [type, slug])

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
            <button className="btn btn-ghost border-none rounded-full bg-primary text-primary-content">
              Ajouter à ma liste
            </button>
          </div>
          <div className="w-3/4 min-w-0 flex flex-col gap-10 overflow-hidden">
            <div className="min-w-0">
              <p className="text-2xl font-bold">{item?.titleEn}</p>
              <p className="text-lg">{item?.titleJp || 'N/A'}</p>
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
            <div className="flex gap-5 items-center w-full">
              <button
                onClick={() => {
                  setFilter('episode')
                }}
                className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'episode' ? 'bg-alerts text-white' : 'text-border'}`}
              >
                <span className="hidden md:inline">{type === 'anime' ? 'Episodes' : 'Chapitres'}</span>
              </button>
              <button
                onClick={() => {
                  if (filter === 'characters') {
                    setFilter('episode')
                  } else {
                    setFilter('characters')
                  }
                }}
                className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'characters' ? 'bg-alerts text-white' : 'text-border'}`}
              >
                <span className="hidden md:inline">Personnages</span>
              </button>
              <button
                onClick={() => {
                  if (filter === 'thread') {
                    setFilter('episode')
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
              <Episode />
            </div>
          ) : filter === 'characters' ? (
            <div className="flex flex-col gap-4">
              <Character />
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
