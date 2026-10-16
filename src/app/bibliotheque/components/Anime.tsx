'use client'

import { getAnimes } from '../../lib/catalogue'
import type { Anime } from '../../types/catalog'
import { useQuery } from '@tanstack/react-query'
import ScrollableRow from './ScrollableRow'
import CardRow from './CardRow'
import Loader from '@/app/components/Loader'

export default function Anime() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['anime', { page: 1 }],
    queryFn: () => getAnimes(),
    staleTime: 5 * 60 * 1000,
  })

  const animesList: Anime[] = data?.data ?? []

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
          items={animesList.map((item) => ({ type: 'anime' as const, item }))}
          moreHref="/bibliotheque/anime"
          moreLabel="Tous les animes"
        />
      )}
    </ScrollableRow>
  )
}
