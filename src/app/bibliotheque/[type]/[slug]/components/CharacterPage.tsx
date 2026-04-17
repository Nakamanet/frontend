'use client'

import { getAnimeCharacters } from "@/app/lib/catalogue";
import { Anime, AnimeCharacter, Manga, MangaCharacter } from "@/app/types/catalog"
import { useEffect, useState } from "react";

type Character = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export default function Character({ type, item }: Character) {
  const [animeCharacters, setAnimeCharacters] = useState<AnimeCharacter[]>([])
  const [mangaCharacters, setMangaCharacters] = useState<MangaCharacter[]>([])

  useEffect(() => {
    if (type === 'anime') {
      getAnimeCharacters(item.id)
    }
  }, [])
  return (
    <div className="border border-border bg-accent rounded-[15px] p-5">
      {type === 'anime' && (
        <div>

        </div>
      )}
      {type === 'manga' && (
        <></>
      )}
    </div>
  )
}
