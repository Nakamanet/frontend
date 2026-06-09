'use client'

import { getAnimeCharacters, getMangaCharacters } from '@/app/lib/catalogue'
import { Anime, AnimeCharacter, Manga, MangaCharacter } from '@/app/types/catalog'
import { useState } from 'react'
import Image from 'next/image'
import CharacterModal from './CharacterModal'
import { useQuery } from '@tanstack/react-query'

type Character = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export default function CharacterPage({ type, item }: Character) {
  const [detail, setDetail] = useState<
    { type: 'anime'; item: AnimeCharacter } | { type: 'manga'; item: MangaCharacter }
  >()
  const [characterModal, setCharacterModal] = useState(false)

  const { data: animeCharacters = [] } = useQuery({
    queryKey: ['anime', item.id, 'characters'],
    queryFn: () => getAnimeCharacters(item.id),
    enabled: type === 'anime',
    staleTime: 5 * 60 * 1000,
  })
  const { data: mangaCharacters = [] } = useQuery({
    queryKey: ['manga', item.id, 'characters'],
    queryFn: () => getMangaCharacters(item.id),
    enabled: type === 'manga',
    staleTime: 5 * 60 * 1000,
  })

  const sortedAnimeCharacters = [...animeCharacters].sort((a, b) => {
    const rank = (r: string) => r.toLowerCase() === 'main' ? 0 : 1
    return rank(a.role) - rank(b.role) || a.character.name.localeCompare(b.character.name)
  })

  const sortedMangaCharacters = [...mangaCharacters].sort((a, b) => {
    const rank = (r: string | null) => r?.toLowerCase() === 'main' ? 0 : 1
    return rank(a.role) - rank(b.role) || a.character.name.localeCompare(b.character.name)
  })

  return (
    <div className="border border-border bg-accent rounded-[15px] p-5">
      {type === 'anime' && (
        <ul className="flex flex-wrap gap-2 justify-center">
          {sortedAnimeCharacters.map((ac) => (
            <button
              key={ac.characterId}
              onClick={() => {
                setCharacterModal(true)
                setDetail({ type: 'anime', item: ac })
              }}
              className="flex gap-4 border border-border w-[170px] rounded-[15px] bg-muted hover:bg-accent p-3"
            >
              <li className="flex flex-col gap-3 justify-between w-[170px]">
                <div className="flex flex-col items-center gap-3">
                  {ac.character.imageUrl ? (
                    <Image 
                      src={ac.character.imageUrl} 
                      alt={ac.character.name} 
                      width={120} 
                      height={100} 
                      className='rounded-[15px] overflow-hidden'
                    />
                  ) : (
                    <span className="border border-accent w-[120px] h-[187px] bg-accent"></span>
                  )}
                  <p>{ac.character.name}</p>
                </div>
                <div className="flex gap-2  bg-accent rounded-[15px] overflow-hidden">
                  {ac.person.imageUrl && (
                    <Image
                      src={ac.person.imageUrl}
                      alt={ac.person.name}
                      width={40}
                      height={60}
                    />
                  )}
                  <p className="flex items-center">{ac.person.name}</p>
                </div>
              </li>
            </button>
          ))}
        </ul>
      )}
      {type === 'manga' && (
        <ul className="flex flex-wrap gap-2 justify-center">
          {sortedMangaCharacters.map((mc) => (
            <button
              key={mc.characterId}
              onClick={() => {
                setCharacterModal(true)
                setDetail({ type: 'manga', item: mc })
              }}
              className="flex gap-4 border border-border w-[170px] rounded-[15px] bg-muted hover:bg-accent p-3"
            >
              <li className="flex flex-col gap-3 justify-between w-[170px]">
                <div className="flex flex-col items-center gap-3">
                  {mc.character.imageUrl ? (
                    <Image 
                      src={mc.character.imageUrl} 
                      alt={mc.character.name} 
                      width={120} 
                      height={100} 
                      className='rounded-[15px] overflow-hidden'
                    />
                  ) : (
                    <span className="border border-accent w-[120px] h-[187px] bg-accent"></span>
                  )}
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
