'use client'

import { useState } from 'react'
import { getAnimes } from '@/app/lib/catalogue'
import { useAuth } from '@/app/context/AuthContext'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'
import SearchBarPage from '../../components/SearchBar'
import Pagination from './Pagination'
import Image from 'next/image'
import Link from 'next/link'
import Chat from '@/app/components/home/Chat'
import Calendar from '@/app/components/home/Calendar'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'

export default function AnimePage() {
  const { user } = useAuth()
  const [limit] = useState(20)
  const [genre] = useState<string | undefined>(undefined)
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['anime', { page, limit, genre }],
    queryFn: () => getAnimes(page, limit, genre),
    staleTime: 5 * 60 * 1000,
  })
  const anime = data?.data ?? []
  const maxPage = data?.meta?.lastPage ?? 1

  return (
    <main className="md:grid md:grid-cols-5 max-w-[1500px] mx-auto py-10 px-15">
      <section className="flex flex-col gap-10 w-full h-full col-span-4 pr-6">
        <div className="flex flex-col gap-4 justify-between">
          <p className="flex gap-1 text-sm items-center">
            <Link href="/bibliotheque/" className="flex gap-1 text-sm items-center">
              Bibliothèque
            </Link>
            <ChevronRight size={16} />
            Anime
          </p>
          <div className="flex gap-10 w-full h-full">
            <SearchBarPage className="w-full" />
            <button onClick={() => setOpenModal(true)} className="btn btn-ghost bg-accent rounded-[15px]">
              <SlidersHorizontal />
              <p>Filtres</p>
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loader variant="plain" className="h-full my-[90px]" />
        ) : (
        <div className="grid grid-cols-5 gap-4">
          {anime.map((item) => (
            <div
              key={item.id}
              className="card bg-accent border border-border rounded-[15px] h-[450px] flex flex-col overflow-hidden"
            >
              <Link href={`/bibliotheque/anime/${item.slug}`} className="flex flex-col h-full min-h-0">
                <figure className="h-[350px] w-full shrink-0 overflow-hidden rounded-t-[15px]">
                  {item.posterImage || item.coverImage ? (
                    <Image
                      src={(item.posterImage || item.coverImage)!}
                      alt={item.titleEn || item.titleJp || ''}
                      width={250}
                      height={350}
                      className="h-full w-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="h-full w-full bg-base-200 flex items-center justify-center">
                      <span className="text-base-content/30 text-sm">Pas d&apos;image</span>
                    </div>
                  )}
                </figure>
                <div className="card-body flex-1 min-h-[100px] flex flex-col items-center justify-center py-3">
                  <h2 className="card-title text-center line-clamp-2">{item.titleEn || item.titleJp}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
        )}
        <Pagination page={page} lastPage={maxPage} onPageChange={setPage} />
      </section>
      <section className="pt-11">
        <Chat user={user} />
        <Calendar user={user} />
      </section>
    </main>
  )
}
