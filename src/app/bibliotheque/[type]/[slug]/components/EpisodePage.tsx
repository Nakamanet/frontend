'use client'

import { getChapters, getEpisodes } from '@/app/lib/catalogue'
import { Anime, Manga, Chapter, Episode } from '@/app/types/catalog'
import { useState } from 'react'
import Image from 'next/image'
import EpisodeModal from './EpisodeModal'
import Pagination from '../../components/Pagination'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'

type EpisodeProps = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export default function EpisodePage({ type, item }: EpisodeProps) {
  const [episodeModal, setEpisodeModal] = useState(false)
  const [detail, setDetail] = useState<{ type: 'anime'; item: Episode } | { type: 'manga'; item: Chapter }>()
  const [page, setPage] = useState(1)
  const limit = 9

  const { data: episodeData, isLoading: episodeLoading } = useQuery({
    queryKey: ['anime', item.id, 'episodes', { page, limit }],
    queryFn: () => getEpisodes(item.id, page, limit),
    enabled: type === 'anime',
    staleTime: 5 * 60 * 1000,
  })
  const { data: chapterData, isLoading: chapterLoading } = useQuery({
    queryKey: ['manga', item.id, 'chapters', { page, limit }],
    queryFn: () => getChapters(item.id, page, limit),
    enabled: type === 'manga',
    staleTime: 5 * 60 * 1000,
  })

  const isLoading = type === 'anime' ? episodeLoading : chapterLoading

  const episodes: Episode[] = episodeData?.data ?? []
  const chapters: Chapter[] = chapterData?.data ?? []
  const lastPage = type === 'anime' ? (episodeData?.meta?.lastPage ?? 1) : (chapterData?.meta?.lastPage ?? 1)

  return (
    <div className="border border-border bg-accent rounded-[15px] p-5 ">
      {/* Content */}
      {isLoading && <Loader variant="plain" className="my-[90px]" />}
      {!isLoading && type === 'anime' && (
        <ul className="grid grid-cols-3 gap-2">
          {episodes.map((e) => (
            <button
              key={e.id}
              className="border border-border p-2 rounded-[15px] bg-muted hover:bg-accent text-left"
              onClick={() => {
                setEpisodeModal(true)
                setDetail({ type: 'anime', item: e })
              }}
            >
              <li className="flex flex-col gap-2">
                <div className="relative w-full aspect-video rounded-[10px] overflow-hidden bg-primary">
                  <Image
                    src={e.thumbnailUrl ?? item.coverImage ?? '/bg.png'}
                    alt={e.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <p className="truncate text-sm px-1">
                  {e.number}. {e.title}
                </p>
              </li>
            </button>
          ))}
        </ul>
      )}
      {!isLoading && type === 'manga' && (
        <ul className="grid grid-cols-3 gap-2">
          {chapters.map((e) => (
            <button
              key={e.id}
              className="border border-border p-2 rounded-[15px] bg-muted hover:bg-accent text-left"
              onClick={() => {
                setEpisodeModal(true)
                setDetail({ type: 'manga', item: e })
              }}
            >
              <li className="flex flex-col gap-2">
                <div className="relative w-full aspect-video rounded-[10px] overflow-hidden bg-primary">
                  <Image
                    src={item.posterImage ?? item.coverImage ?? '/bg.png'}
                    alt={e.title ?? `Chapitre ${e.number}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <p className="truncate text-sm px-1">
                  {e.number}. {e.title ?? `Chapitre ${e.number}`}
                </p>
              </li>
            </button>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {lastPage > 1 && <Pagination page={page} lastPage={lastPage} onPageChange={setPage} />}

      {detail && <EpisodeModal isOpen={episodeModal} onClose={() => setEpisodeModal(false)} coverImage={item.posterImage ?? item.coverImage} {...detail} />}
    </div>
  )
}
