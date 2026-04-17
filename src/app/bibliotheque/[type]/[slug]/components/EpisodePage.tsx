'use client'

import { getChapters, getEpisodes } from "@/app/lib/catalogue";
import { Anime, Manga, Chapter, Episode } from "@/app/types/catalog"
import { useEffect, useState } from "react";
import Image from "next/image";
import EpisodeModal from "./EpisodeModal";

type EpisodeProps = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export default function EpisodePage({ type, item } : EpisodeProps ) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodeModal, setEpisodeModal] = useState(false);
  const [detail, setDetail] = useState<Episode | Chapter | undefined>();
  const page = 1;
  const limit = 10;

  useEffect(() => {
    if (type === 'anime') {
      getEpisodes(item.id, page, limit)
        .then((res) => setEpisodes(res.data))
        .catch((err) => console.error(err))
    }
    if (type === 'manga') {
      getChapters(item.id, page, limit)
        .then((res) => setChapters(res.data))
        .catch((err) => console.error(err))
    }
  }, [type, item, page, limit])


  return (
    <div className="border border-border bg-accent rounded-[15px] p-5">
      {type === 'anime' && (
        <>
          <h1 className="text-center">Episodes</h1>
          <div className="flex">
            {episodes.map((e) => (
              <button 
                key={e.id} 
                className=""
                onClick={() => {setEpisodeModal(true); setDetail(e); console.log(episodeModal)}}
              >
                {e.thumbnailUrl && (
                  <Image 
                    src={e.thumbnailUrl}
                    alt={e.title}
                    height="100"
                    width="100"
                  />
                )}
                <p>{e.number}. {e.title}</p>
              </button>
            ))}
          </div>
        </>
      )}
      {type === 'manga' && (
        <>
          <h1 className="text-center">Chapitres</h1>
          <div className="flex">
            {chapters.map((c) => (
              <button 
                key={c.id} 
                className=""
                onClick={() => {setEpisodeModal(true); console.log(episodeModal)}}
              >
                {/* {c.thumbnailUrl && (
                  <Image 
                    src={c.thumbnailUrl}
                    alt={c.title}
                    height="100"
                    width="100"
                  />
                )} */}
                <p>{c.number}. {c.title}</p>
              </button>
            ))}
          </div>
        </>
      )}

      <EpisodeModal 
        isOpen={episodeModal} 
        onClose={() => setEpisodeModal(false)} 
        item={detail}
        type={type}
      />
    </div>
  )
}
