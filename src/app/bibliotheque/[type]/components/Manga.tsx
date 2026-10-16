'use client'

import { useState } from 'react'
import { getMangas } from '@/app/lib/catalogue'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'
import Pagination from './Pagination'
import CatalogGrid from './CatalogGrid'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import AppLayout from '@/app/components/layout/AppLayout'

export default function MangaPage() {
  const [limit] = useState(24)
  const [genre] = useState<string | undefined>(undefined)
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['manga', { page, limit, genre }],
    queryFn: () => getMangas(page, limit, genre),
    staleTime: 5 * 60 * 1000,
  })
  const manga = data?.data ?? []
  const maxPage = data?.meta?.lastPage ?? 1

  return (
    <AppLayout>
      <div className="flex items-center justify-between gap-4">
        <p className="flex gap-1 text-sm items-center">
          <Link href="/bibliotheque/" className="flex gap-1 text-sm items-center">
            Bibliothèque
          </Link>
          <ChevronRight size={16} />
          Manga
        </p>
        <button onClick={() => setOpenModal(true)} className="btn btn-ghost bg-accent rounded-card shrink-0">
          <SlidersHorizontal />
          <p>Filtres</p>
        </button>
      </div>
      {isLoading ? (
        <Loader variant="plain" className="h-full my-[90px]" />
      ) : (
      <CatalogGrid type="manga" items={manga} />
      )}
      <Pagination page={page} lastPage={maxPage} onPageChange={setPage} />
    </AppLayout>
  )
}
