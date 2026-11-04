'use client'

import { useState } from 'react'
import { getAnimes } from '@/app/lib/catalogue'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'
import Pagination from './Pagination'
import FilterModal, { CatalogFilters } from './FilterModal'
import CatalogGrid from './CatalogGrid'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import AppLayout from '@/app/components/layout/AppLayout'

export default function AnimePage() {
  const [limit] = useState(24)
  const [filters, setFilters] = useState<CatalogFilters>({ search: '', includeGenres: [], excludeGenres: [] })
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(1)
  const activeFilters = (filters.search ? 1 : 0) + filters.includeGenres.length + filters.excludeGenres.length

  const { data, isLoading } = useQuery({
    queryKey: ['anime', { page, limit, filters }],
    queryFn: () => getAnimes(page, limit, filters),
    staleTime: 5 * 60 * 1000,
  })
  const anime = data?.data ?? []
  const maxPage = data?.meta?.lastPage ?? 1

  return (
    <AppLayout>
      <div className="flex items-center justify-between gap-4">
        <p className="flex gap-1 text-sm items-center">
          <Link href="/bibliotheque/" className="flex gap-1 text-sm items-center">
            Bibliothèque
          </Link>
          <ChevronRight size={16} />
          Anime
        </p>
        <button
          onClick={() => setOpenModal(true)}
          aria-label="Filtres"
          className="btn btn-ghost bg-accent rounded-card shrink-0 px-3 sm:px-5"
        >
          <SlidersHorizontal />
          <p className="hidden sm:inline">Filtres</p>
          {activeFilters > 0 && <span>({activeFilters})</span>}
        </button>
      </div>
      <FilterModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        filters={filters}
        onApply={(next) => {
          setFilters(next)
          setPage(1)
        }}
      />
      {isLoading ? (
        <Loader variant="plain" className="h-full my-[90px]" />
      ) : anime.length > 0 ? (
      <CatalogGrid type="anime" items={anime} />
      ) : (
        <p className="text-center text-text-muted my-[90px]">Aucun résultat pour ces filtres.</p>
      )}
      <Pagination page={page} lastPage={maxPage} onPageChange={setPage} />
    </AppLayout>
  )
}
