'use client'

import { getMangas } from '../../lib/catalogue'
import type { Manga } from '../../types/catalog'
import { useQuery } from '@tanstack/react-query'
import ScrollableRow from './ScrollableRow'
import CardRow from './CardRow'
import Loader from '@/app/components/Loader'

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
        <Loader variant="plain" className="h-full mx-auto my-[90px]" />
      ) : isError ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{(error as Error)?.message ?? 'Erreur lors du chargement du catalogue'}</p>
        </div>
      ) : (
        <CardRow
          items={mangasList.map((item) => ({ type: 'manga' as const, item }))}
          moreHref="/bibliotheque/manga"
          moreLabel="Tous les mangas"
        />
      )}
    </ScrollableRow>
  )
}
