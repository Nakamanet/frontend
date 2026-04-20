'use client'

import { getAnimeCharacters, getMangaCharacters } from '@/app/lib/catalogue'
import { Anime, AnimeCharacter, Manga, MangaCharacter } from '@/app/types/catalog'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import CharacterModal from './CharacterModal'

type Character = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export default function CharacterPage({ type, item }: Character) {
  const [animeCharacters, setAnimeCharacters] = useState<AnimeCharacter[]>([])
  const [mangaCharacters, setMangaCharacters] = useState<MangaCharacter[]>([])
  const [detail, setDetail] = useState<
    { type: 'anime'; item: AnimeCharacter } | { type: 'manga'; item: MangaCharacter }
  >()
  const [characterModal, setCharacterModal] = useState(false)

  useEffect(() => {
    if (type === 'anime') {
      getAnimeCharacters(item.id)
        .then((res) => setAnimeCharacters(res))
        .catch((err) => console.error(err))
    }
    if (type === 'manga') {
      getMangaCharacters(item.id)
        .then((res) => setMangaCharacters(res))
        .catch((err) => console.error(err))
    }
  }, [type, item])

  return (
    <div className="border border-border bg-accent rounded-[15px] p-5">
      {type === 'anime' && (
        <ul className="flex flex-wrap gap-2 justify-center">
          {animeCharacters.map((ac) => (
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
          {mangaCharacters.map((mc) => (
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
