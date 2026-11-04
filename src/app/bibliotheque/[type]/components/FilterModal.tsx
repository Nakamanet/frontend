'use client'

import { useEffect, useState } from 'react'
import { X, Search, Plus, Minus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getGenres } from '@/app/lib/catalogue'

export type CatalogFilters = {
  search: string
  includeGenres: string[]
  excludeGenres: string[]
}

type FilterModalProps = {
  isOpen: boolean
  onClose: () => void
  filters: CatalogFilters
  onApply: (filters: CatalogFilters) => void
}

const EMPTY_FILTERS: CatalogFilters = { search: '', includeGenres: [], excludeGenres: [] }

export default function FilterModal({ isOpen, onClose, filters, onApply }: FilterModalProps) {
  const [search, setSearch] = useState(filters.search)
  const [includeGenres, setIncludeGenres] = useState(filters.includeGenres)
  const [excludeGenres, setExcludeGenres] = useState(filters.excludeGenres)

  const { data: genres = [], isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: 60 * 60 * 1000,
    enabled: isOpen,
  })

  const sortedGenres = [...genres].sort((a, b) => a.name.localeCompare(b.name))

  useEffect(() => {
    if (isOpen) {
      setSearch(filters.search)
      setIncludeGenres(filters.includeGenres)
      setExcludeGenres(filters.excludeGenres)
    }
  }, [isOpen, filters])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const cycleGenre = (slug: string) => {
    if (includeGenres.includes(slug)) {
      setIncludeGenres((prev) => prev.filter((s) => s !== slug))
      setExcludeGenres((prev) => [...prev, slug])
    } else if (excludeGenres.includes(slug)) {
      setExcludeGenres((prev) => prev.filter((s) => s !== slug))
    } else {
      setIncludeGenres((prev) => [...prev, slug])
    }
  }

  const apply = () => {
    onApply({ search: search.trim(), includeGenres, excludeGenres })
    onClose()
  }

  const reset = () => {
    setSearch('')
    setIncludeGenres([])
    setExcludeGenres([])
    onApply(EMPTY_FILTERS)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-base-100 w-11/12 max-w-2xl rounded-xl shadow-2xl border border-border flex flex-col max-h-[80dvh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-bold text-lg">Filtres</h2>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form
          className="flex flex-col min-h-0 flex-1"
          onSubmit={(e) => {
            e.preventDefault()
            apply()
          }}
        >
          <div className="p-4 flex flex-col gap-5 overflow-y-auto">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Titre</span>
              <div className="flex items-center gap-2 border border-border bg-accent rounded-full px-4 py-2">
                <Search size={18} className="text-text-muted shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un titre…"
                  className="bg-transparent outline-none w-full text-base sm:text-sm"
                />
              </div>
            </label>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Genres</span>
              {isLoading ? (
                <p className="text-sm text-text-muted">Chargement des genres…</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {sortedGenres.map((g) => {
                    const included = includeGenres.includes(g.slug)
                    const excluded = excludeGenres.includes(g.slug)
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => cycleGenre(g.slug)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border transition-colors ${
                          included
                            ? 'bg-primary text-white border-primary'
                            : excluded
                              ? 'border-border text-text-muted line-through opacity-60'
                              : 'border-border text-text-muted hover:bg-primary/20 hover:text-text'
                        }`}
                      >
                        {included && <Plus size={14} />}
                        {excluded && <Minus size={14} />}
                        {g.name}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-border flex justify-end gap-2">
            <button type="button" onClick={reset} className="btn btn-ghost rounded-full">
              Réinitialiser
            </button>
            <button type="submit" className="btn btn-ghost border-none rounded-full bg-primary text-primary-content px-6">
              Appliquer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
