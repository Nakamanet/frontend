'use client'

import { getAnimeCharacters, getMangaCharacters } from '@/app/lib/catalogue'
import { Anime, AnimeCharacter, Manga, MangaCharacter, Person } from '@/app/types/catalog'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import CharacterModal from './CharacterModal'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'

type Character = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export type GroupedAnimeCharacter = Omit<AnimeCharacter, 'person' | 'personId'> & {
  persons: Person[]
}

// Environ 3 rangées avant de charger la suite au scroll (approximatif : le nombre
// de colonnes varie selon la largeur d'écran, donc ce n'est pas un calcul exact).
const PAGE_SIZE = 15

export default function CharacterPage({ type, item }: Character) {
  const [detail, setDetail] = useState<
    { type: 'anime'; item: GroupedAnimeCharacter } | { type: 'manga'; item: MangaCharacter }
  >()
  const [characterModal, setCharacterModal] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const { data: animeCharacters = [], isLoading: animeLoading } = useQuery({
    queryKey: ['anime', item.id, 'characters'],
    queryFn: () => getAnimeCharacters(item.id),
    enabled: type === 'anime',
    staleTime: 5 * 60 * 1000,
  })
  const { data: mangaCharacters = [], isLoading: mangaLoading } = useQuery({
    queryKey: ['manga', item.id, 'characters'],
    queryFn: () => getMangaCharacters(item.id),
    enabled: type === 'manga',
    staleTime: 5 * 60 * 1000,
  })

  const isLoading = type === 'anime' ? animeLoading : mangaLoading

  const groupedAnimeCharacters = animeCharacters
    .reduce<GroupedAnimeCharacter[]>((acc, ac) => {
      const existing = acc.find(g => g.characterId === ac.characterId)
      if (existing) {
        existing.persons.push(ac.person)
      } else {
        acc.push({ animeId: ac.animeId, characterId: ac.characterId, role: ac.role, character: ac.character, persons: [ac.person] })
      }
      return acc
    }, [])
    .sort((a, b) => {
      const rank = (r: string) => r.toLowerCase() === 'main' ? 0 : 1
      return rank(a.role) - rank(b.role) || a.character.name.localeCompare(b.character.name)
    })

  const sortedMangaCharacters = [...mangaCharacters].sort((a, b) => {
    const rank = (r: string | null) => r?.toLowerCase() === 'main' ? 0 : 1
    return rank(a.role) - rank(b.role) || a.character.name.localeCompare(b.character.name)
  })

  const totalCount = type === 'anime' ? groupedAnimeCharacters.length : sortedMangaCharacters.length
  const hasMore = visibleCount < totalCount

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasMore) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCount((prev) => prev + PAGE_SIZE)
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore])

  return (
    <div className="border border-border bg-accent rounded-card p-5">
      {isLoading && <Loader variant="plain" className="my-[90px]" />}
      {!isLoading && type === 'anime' && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {groupedAnimeCharacters.slice(0, visibleCount).map((ac) => (
            <button
              key={ac.characterId}
              onClick={() => {
                setCharacterModal(true)
                setDetail({ type: 'anime', item: ac })
              }}
              className="flex flex-col items-center gap-2 border border-border rounded-card bg-muted hover:bg-accent p-2"
            >
              <div className="relative w-full aspect-2/3 rounded-card overflow-hidden shrink-0">
                <Image
                  src={ac.character.imageUrl || '/logo.png'}
                  alt={ac.character.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-center line-clamp-2">{ac.character.name}</p>
            </button>
          ))}
        </div>
      )}
      {!isLoading && type === 'manga' && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {sortedMangaCharacters.slice(0, visibleCount).map((mc) => (
            <button
              key={mc.characterId}
              onClick={() => {
                setCharacterModal(true)
                setDetail({ type: 'manga', item: mc })
              }}
              className="flex flex-col items-center gap-2 border border-border rounded-card bg-muted hover:bg-accent p-2"
            >
              <div className="relative w-full aspect-2/3 rounded-card overflow-hidden shrink-0">
                <Image
                  src={mc.character.imageUrl || '/logo.png'}
                  alt={mc.character.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-center line-clamp-2">{mc.character.name}</p>
            </button>
          ))}
        </div>
      )}

      {!isLoading && hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          <Loader variant="inline" size="sm" />
        </div>
      )}

      {detail && <CharacterModal isOpen={characterModal} onClose={() => setCharacterModal(false)} {...detail} />}
    </div>
  )
}
