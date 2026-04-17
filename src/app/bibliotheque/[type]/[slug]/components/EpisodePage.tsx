'use client'

import { getChapters, getEpisodes } from "@/app/lib/catalogue";
import { Anime, Manga, Chapter, Episode } from "@/app/types/catalog"
import { useEffect, useState } from "react";
import Image from "next/image";
import EpisodeModal from "./EpisodeModal";
import Pagination from "../../components/Pagination";

type EpisodeProps = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export default function EpisodePage({ type, item } : EpisodeProps ) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodeModal, setEpisodeModal] = useState(false);
  const [detail, setDetail] = useState<{ type: 'anime' ; item: Episode } | { type: 'manga'; item: Chapter }>();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1)
  const limit = 10;

  useEffect(() => {
    if (type === 'anime') {
      getEpisodes(item.id, page, limit)
        .then((res) => {
          setEpisodes(res.data); 
          setLastPage(res.meta.lastPage)
        })
        .catch((err) => console.error(err))
    }
    if (type === 'manga') {
      getChapters(item.id, page, limit)
        .then((res) => setChapters(res.data))
        .catch((err) => console.error(err))
    }
  }, [type, item, page, limit])


  return (
    <div className="border border-border bg-accent rounded-[15px] p-5 ">
      {/* Content */}
      {type === 'anime' && (
        <ul className="flex flex-wrap gap-2 justify-center">
          {episodes.map((e) => (
            <button 
              key={e.id} 
              className="border border-border p-2 max-w-[250px] rounded-[15px] bg-muted hover:bg-accent"
              onClick={() => {setEpisodeModal(true); setDetail({ type: 'anime', item: e })}}
            >
              <li className="flex flex-col gap-2">
                {e.thumbnailUrl && (
                  <Image 
                    src={e.thumbnailUrl}
                    alt={e.title}
                    height="200"
                    width="200"
                    className="mx-[20px] rounded-[15px]"
                  />
                )}
                <p className="truncate">{e.number}. {e.title}</p>
              </li>
            </button>
          ))}
        </ul>
      )}
      {type === 'manga' && (
        <ul className="flex flex-wrap gap-2 justify-center">
          {chapters.map((e) => (
            <button 
              key={e.id} 
              className="border border-border p-2 max-w-[250px] rounded-[15px] bg-muted hover:bg-accent"
              onClick={() => {setEpisodeModal(true); setDetail({ type: 'manga', item: e })}}
            >
              <li className="flex flex-col gap-2">
                {/* {e.thumbnailUrl && (
                  <Image 
                    src={e.thumbnailUrl}
                    alt={e.title}
                    height="200"
                    width="200"
                    className="mx-[20px]"
                  />
                )} */}
                <p className="truncate">{e.number}. {e.title}</p>
              </li>
            </button>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {lastPage > 1 && (
        <Pagination page={page} lastPage={lastPage} onPageChange={setPage} />
      )}

      {detail && (
        <EpisodeModal 
          isOpen={episodeModal} 
          onClose={() => setEpisodeModal(false)} 
          {... detail}
        />
      )}
    </div>
  )
}
