'use client'

import { useState, useEffect } from 'react'
import { getMangas } from '@/app/lib/catalogue'
import { Manga } from '@/app/types/catalog'
import { useAuth } from '@/app/context/AuthContext'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'
import SearchBarPage from '../../components/SearchBar'
import Pagination from './Pagination'
import Image from 'next/image'
import Link from 'next/link'
import Chat from '@/app/components/home/Chat'
import Calendar from '@/app/components/home/Calendar'

export default function MangaPage() {
  const { user } = useAuth()
  const [manga, setManga] = useState<Manga[]>([])
  const [limit, setLimit] = useState(20)
  const [genre, setGenre] = useState<string | undefined>(undefined)
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1) // A changer plus tard

  useEffect(() => {
    getMangas(page, limit, genre)
      .then((res) => {
        setManga(res.data); 
        setMaxPage(res.meta.lastPage)
      })
      .catch((err) => console.error(err))
  }, [page, limit, genre])

  console.log('manga', manga, 'page', page, 'limit', limit, 'genre', genre, 'openModal', openModal)

  return (
    <main className="md:grid md:grid-cols-5 max-w-[1500px] mx-auto py-10 px-15">
      <section className="flex flex-col gap-10 w-full h-full col-span-4 pr-6">
        <div className="flex flex-col gap-4 justify-between">
          <p className="flex gap-1 text-sm items-center">
            <Link href="/bibliotheque/" className="flex gap-1 text-sm items-center">
              Bibliothèque
            </Link>
            <ChevronRight size={16} />
            Manga
          </p>
          <div className="flex gap-10 w-full h-full">
            <SearchBarPage className="w-full" />
            <button onClick={() => setOpenModal(true)} className="btn btn-ghost bg-accent rounded-[15px]">
              <SlidersHorizontal />
              <p>Filtres</p>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {manga.map((item) => (
            <div
              key={item.id}
              className="card bg-accent border border-border rounded-[15px] h-[450px] flex flex-col overflow-hidden"
            >
              {item.posterImage ? (
                <Link href={`/bibliotheque/manga/${item.slug}`} className="flex flex-col h-full min-h-0">
                  <figure className="h-[350px] w-full shrink-0 overflow-hidden rounded-t-[15px]">
                    <Image
                      src={item.posterImage}
                      alt={item.titleEn}
                      width={250}
                      height={350}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </figure>
                  <div className="card-body flex-1 min-h-[100px] flex flex-col items-center justify-center py-3">
                    <h2 className="card-title text-center line-clamp-2">{item.titleEn}</h2>
                  </div>
                </Link>
              ) : null}
            </div>
          ))}
        </div>
        <Pagination page={page} lastPage={maxPage} onPageChange={setPage} />
      </section>
      <section className="pt-11">
        <Chat user={user} />
        <Calendar user={user} />
      </section>
    </main>
  )
}
