'use client'

import { getAnimeCharacters, getMangaCharacters } from "@/app/lib/catalogue";
import { Anime, AnimeCharacter, Manga, MangaCharacter } from "@/app/types/catalog"
import { useEffect, useState } from "react";
import Image from "next/image"; 

type Character = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export default function CharacterPage({ type, item }: Character) {
  const [animeCharacters, setAnimeCharacters] = useState<AnimeCharacter[]>([])
  const [mangaCharacters, setMangaCharacters] = useState<MangaCharacter[]>([])

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
                    />
                  ) : (
                    <span className="border border-accent w-[120px] h-[187px] bg-accent"></span>
                  )}
                  <p>{ac.character.name}</p>
                </div>
                <div className="flex gap-2  bg-accent rounded-[15px]">
                  {ac.person.imageUrl && (
                    <Image
                      src={ac.person.imageUrl}
                      alt={ac.person.name}
                      width={40}
                      height={60}
                      className="rounded-l-[15px]"
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
        <></>
      )}
    </div>
  )
}
