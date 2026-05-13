'use client'

import { useEffect, useState } from 'react'
import { getMyAnime, getMyManga } from '@/app/lib/library'
import { Book, TvMinimalPlay } from 'lucide-react'
import { MyAnime, MyManga } from '@/app/types/library'
import { Anime, Manga } from '@/app/types/catalog'
import { getAnimeById, getMangaById } from '@/app/lib/catalogue'
import Image from 'next/image'
import Link from 'next/link'
import FilterTab from '../../components/FilterTab'

const FILTER_OPTIONS = [
  { value: 'manga', label: 'Mangas', icon: <Book size={18} /> },
  { value: 'anime', label: 'Animes', icon: <TvMinimalPlay size={18} /> },
]

export default function Library() {
  const [filter, setFilter] = useState('manga')
  const [animes, setAnimes] = useState<(MyAnime & { detail: Anime })[]>([])
  const [mangas, setMangas] = useState<(MyManga & { detail: Manga })[]>([])

  useEffect(() => {
    getMyAnime()
      .then(myAnimes => Promise.all(
        myAnimes.map((entry: MyAnime) =>
          getAnimeById(entry.anime_id).then(detail => ({ ...entry, detail }))
        )
      ))
      .then(result => setAnimes(result))
      .catch(err => console.error(err))
    getMyManga()
      .then(myMangas => Promise.all(
        myMangas.map((entry: MyManga) =>
          getMangaById(entry.manga_id).then(detail => ({ ...entry, detail }))
        )
      ))
      .then(result => setMangas(result))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="flex flex-col gap-8 p-7">
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />

      {filter === "manga" ? (
        <div>
          {mangas && mangas.length > 0 ? (
            <div className='flex gap-2'>
              {mangas.map((manga) => (
                <div 
                  key={manga.manga_id} 
                  className='card bg-accent border border-border rounded-[15px] h-[450px] w-[250px] flex flex-col overflow-hidden'
                >
                  <Link href={`/bibliotheque/manga/${manga.detail.slug}`} className="flex flex-col h-full min-h-0">
                    <figure className="h-[350px] w-full shrink-0 overflow-hidden rounded-t-[15px]">
                      <Image
                        src={manga.detail.posterImage || './bg.png'}
                        alt={manga.detail.titleEn}
                        width={250}
                        height={350}
                      />
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
                    <figure className="h-[350px] w-full shrink-0 overflow-hidden rounded-t-[15px]">
                      <Image
                        src={anime.detail.posterImage || './bg.png'}
                        alt={anime.detail.titleEn}
                        width={250}
                        height={350}
                      />
                    </figure>
                    <div className="card-body flex-1 min-h-[100px] flex flex-col items-center justify-center py-3">
                      <h2 className="card-title text-center line-clamp-2">{anime.detail.titleEn}</h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>Vous n&apos;avez pas encore d&apos;anime ajouté dans votre bibliothèque</p>
          )}
        </div>
      )}
    </div>
  )
}
