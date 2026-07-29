'use client'

import { getAnimeCharacters, getMangaCharacters } from '@/app/lib/catalogue'
import { Anime, AnimeCharacter, Manga, MangaCharacter, Person } from '@/app/types/catalog'
import { useState } from 'react'
import Image from 'next/image'
import CharacterModal from './CharacterModal'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'

type Character = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export type GroupedAnimeCharacter = Omit<AnimeCharacter, 'person' | 'personId'> & {
  persons: Person[]
}

export default function CharacterPage({ type, item }: Character) {
  const [detail, setDetail] = useState<
    { type: 'anime'; item: GroupedAnimeCharacter } | { type: 'manga'; item: MangaCharacter }
  >()
  const [characterModal, setCharacterModal] = useState(false)

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

  return (
    <div className="border border-border bg-accent rounded-card p-5">
      {isLoading && <Loader variant="plain" className="my-[90px]" />}
      {!isLoading && type === 'anime' && (
        <ul className="flex flex-wrap gap-2 justify-center">
          {groupedAnimeCharacters.map((ac) => (
            <button
              key={ac.characterId}
              onClick={() => {
                setCharacterModal(true)
                setDetail({ type: 'anime', item: ac })
              }}
              className="flex gap-4 border border-border w-[170px] rounded-card bg-muted hover:bg-accent p-3"
            >
              <li className="flex flex-col gap-3 w-[170px]">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-30 h-[187px] rounded-card overflow-hidden shrink-0">
                    <Image
                      src={ac.character.imageUrl || '/logo.png'}
                      alt={ac.character.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>{ac.character.name}</p>
                </div>
              </li>
            </button>
          ))}
        </ul>
      )}
      {!isLoading && type === 'manga' && (
        <ul className="flex flex-wrap gap-2 justify-center">
          {sortedMangaCharacters.map((mc) => (
            <button
              key={mc.characterId}
              onClick={() => {
                setCharacterModal(true)
                setDetail({ type: 'manga', item: mc })
              }}
              className="flex gap-4 border border-border w-[170px] rounded-card bg-muted hover:bg-accent p-3"
            >
              <li className="flex flex-col gap-3 justify-between w-[170px]">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-30 h-[187px] rounded-card overflow-hidden shrink-0">
                    <Image
                      src={mc.character.imageUrl || '/logo.png'}
                      alt={mc.character.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>{mc.character.name}</p>
                </div>
              </li>
            </button>
          ))}
        </ul>
      )}

      {detail && <CharacterModal isOpen={characterModal} onClose={() => setCharacterModal(false)} {...detail} />}
    </div>
  )
}
