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

const PAGE_SIZE = 15

export default function CharacterPage({ type, item }: Character) {
  const [detail, setDetail] = useState<
    { type: 'anime'; item: GroupedAnimeCharacter } | { type: 'manga'; item: MangaCharacter }
  >()
  const [characterModal, setCharacterModal] = useState(false)
  const [requestedCount, setRequestedCount] = useState(PAGE_SIZE)
  const [loadedIds, setLoadedIds] = useState<Set<number>>(() => new Set())
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

  const characterIds = (type === 'anime' ? groupedAnimeCharacters : sortedMangaCharacters).map((c) => c.characterId)
  const renderedCount = Math.min(requestedCount, characterIds.length)

  let visibleCount = 0
  while (
    visibleCount < renderedCount &&
    characterIds.slice(visibleCount, visibleCount + PAGE_SIZE).every((id) => loadedIds.has(id))
  ) {
    visibleCount = Math.min(visibleCount + PAGE_SIZE, renderedCount)
  }

  const isBlockLoading = visibleCount < renderedCount
  const hasMore = renderedCount < characterIds.length

  const markLoaded = (id: number) =>
    setLoadedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || isBlockLoading || !hasMore) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setRequestedCount((prev) => prev + PAGE_SIZE)
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isBlockLoading, hasMore, visibleCount])

  const renderCard = (index: number, id: number, name: string, imageUrl: string | null, onClick: () => void) => (
    <button
      key={id}
      onClick={onClick}
      className={`${index < visibleCount ? 'flex animate-fade-in' : 'hidden'} flex-col items-center gap-2 border border-border rounded-card bg-muted hover:bg-accent p-2`}
    >
      <div className="relative w-full aspect-2/3 rounded-card overflow-hidden shrink-0">
        <Image
          src={imageUrl || '/logo.png'}
          alt={name}
          fill
          sizes="(min-width: 1024px) 15vw, (min-width: 640px) 25vw, 33vw"
          loading="eager"
          onLoad={() => markLoaded(id)}
          onError={() => markLoaded(id)}
          className="object-cover"
        />
      </div>
      <p className="text-sm text-center line-clamp-2">{name}</p>
    </button>
  )

  return (
    <div className="border border-border bg-accent rounded-card p-5">
      {(isLoading || (visibleCount === 0 && renderedCount > 0)) && <Loader variant="plain" className="my-[90px]" />}
      {!isLoading && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {type === 'anime' &&
            groupedAnimeCharacters.slice(0, renderedCount).map((ac, index) =>
              renderCard(index, ac.characterId, ac.character.name, ac.character.imageUrl, () => {
                setCharacterModal(true)
                setDetail({ type: 'anime', item: ac })
              })
            )}
          {type === 'manga' &&
            sortedMangaCharacters.slice(0, renderedCount).map((mc, index) =>
              renderCard(index, mc.characterId, mc.character.name, mc.character.imageUrl, () => {
                setCharacterModal(true)
                setDetail({ type: 'manga', item: mc })
              })
            )}
        </div>
      )}

      {!isLoading && visibleCount > 0 && (isBlockLoading || hasMore) && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {isBlockLoading && <Loader variant="inline" size="sm" />}
        </div>
      )}

      {detail && <CharacterModal isOpen={characterModal} onClose={() => setCharacterModal(false)} {...detail} />}
    </div>
  )
}
