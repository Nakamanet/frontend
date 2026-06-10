'use client'

import { getMangas } from '../../lib/catalogue'
import type { Manga } from '../../types/catalog'
import { Loader2, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import ScrollableRow from './ScrollableRow'

export default function Manga() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['manga', { page: 1 }],
    queryFn: () => getMangas(),
    staleTime: 5 * 60 * 1000,
  })

  const mangasList: Manga[] = data?.data ?? []

  return (
    <ScrollableRow>
      {isLoading ? (
        <div className="flex justify-center items-center h-full mx-auto my-[90px]">
          <Loader2 className="animate-spin" />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{(error as Error)?.message ?? 'Erreur lors du chargement du catalogue'}</p>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="flex gap-4">
            {mangasList.map((item) => (
              <div key={item.id}>
                {item.posterImage ? (
                  <Link href={`/bibliotheque/manga/${item.slug}`}>
                    <Image
                      src={item.posterImage}
                      alt={item.titleEn}
                      width={145}
                      height={100}
                      className="object-cover rounded-[15px] min-w-[145px] min-h-[100px]"
                      priority
                    />
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
          <Link href="/bibliotheque/manga">
            <div className="flex flex-col border border-border gap-2 rounded-[15px] items-center justify-center w-[145px] h-full">
              <Plus size={35} />
              <p>Tous les mangas</p>
            </div>
          </Link>
        </div>
      )}
    </ScrollableRow>
  )
}
