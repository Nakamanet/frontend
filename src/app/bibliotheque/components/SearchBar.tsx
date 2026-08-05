'use client'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchAnime, searchManga } from '@/app/lib/catalogue'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import Loader from '@/app/components/Loader'
import { useTranslations } from 'next-intl'

export default function SearchBarPage({ className }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('search')

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const { data: animeResults = [], isLoading: loadingAnime } = useQuery({
    queryKey: ['search', 'anime', debounced],
    queryFn: () => searchAnime(debounced),
    enabled: debounced.length > 1,
  })

  const { data: mangaResults = [], isLoading: loadingManga } = useQuery({
    queryKey: ['search', 'manga', debounced],
    queryFn: () => searchManga(debounced),
    enabled: debounced.length > 1,
  })

  const isLoading = loadingAnime || loadingManga
  const hasResults = animeResults.length > 0 || mangaResults.length > 0

  return (
    <div ref={containerRef} className={`relative flex justify-center ${className ?? ''}`}>
      <div className="relative w-full">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
        <input
          className="input input-bordered w-full bg-border rounded-full pl-10"
          placeholder={t('placeholder')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && debounced.length > 1 && (
        <div className="absolute top-full mt-2 w-full max-w-xl bg-base-100 border border-base-300 rounded-card shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 flex justify-center">
              <Loader variant="inline" size="sm" />
            </div>
          ) : !hasResults ? (
            <p className="p-4 text-sm text-base-content/50 text-center">{t('noResults')}</p>
          ) : (
            <>
              {animeResults.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase text-base-content/40">{t('anime')}</p>
                  {animeResults.map((anime) => (
                    <Link
                      key={anime.id}
                      href={`/bibliotheque/anime/${anime.slug}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-base-200 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <Image
                        src={anime.posterImage || '/bg.png'}
                        alt={anime.titleEn}
                        width={32}
                        height={45}
                        className="rounded object-cover"
                      />
                      <span className="text-sm">{anime.titleEn}</span>
                    </Link>
                  ))}
                </div>
              )}

              {mangaResults.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase text-base-content/40">{t('manga')}</p>
                  {mangaResults.map((manga) => (
                    <Link
                      key={manga.id}
                      href={`/bibliotheque/manga/${manga.slug}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-base-200 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <Image
                        src={manga.posterImage || '/bg.png'}
                        alt={manga.titleEn}
                        width={32}
                        height={45}
                        className="rounded object-cover"
                      />
                      <span className="text-sm">{manga.titleEn}</span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
