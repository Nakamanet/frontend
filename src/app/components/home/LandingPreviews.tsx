'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CircleUser, Hash, Heart, MessageCircle } from 'lucide-react'
import { getPosts } from '@/app/lib/post'
import { getForums } from '@/app/lib/forum'
import { getChannels } from '@/app/lib/channels'
import { getAnimes, getMangas } from '@/app/lib/catalogue'
import ForumCards from '@/app/components/ForumCards'
import Loader from '@/app/components/Loader'

const STALE = 5 * 60 * 1000

const MANGA_STATUSES = ['À lire', 'En cours', 'Terminé', 'En pause', 'Abandonné']

function PreviewLoader() {
  return <Loader variant="plain" className="py-16" />
}

export function PostsPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ['landing', 'posts'],
    queryFn: () => getPosts({ filter: 'trends' }),
    staleTime: STALE,
  })
  const posts = (data?.data ?? []).filter((post) => !post.is_spoiler).slice(0, 2)

  if (isLoading) return <PreviewLoader />
  if (posts.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.id}`}
          className="flex flex-col gap-3 rounded-card border border-border bg-bg/60 p-4 hover:border-primary transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 shrink-0 rounded-full overflow-hidden bg-muted border-2 border-border flex items-center justify-center">
              {post.user.avatar_url ? (
                <Image src={post.user.avatar_url} alt="Avatar" width={36} height={36} className="w-full h-full object-cover" />
              ) : (
                <CircleUser size={20} strokeWidth={1.5} className="text-base-content/70" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{post.user.username}</p>
              <p className="text-xs text-text/45 truncate">
                @{post.user.handle} · {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: fr })}
              </p>
            </div>
          </div>
          <p className="text-sm text-text/80 line-clamp-3">{post.content}</p>
          <div className="flex items-center gap-5 text-xs text-text/50">
            <span className="flex items-center gap-1.5">
              <Heart size={15} /> {post.likes_count}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle size={15} /> {post.comments_count}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function ChannelsPreview() {
  const { data: channels = [], isLoading } = useQuery({
    queryKey: ['channels'],
    queryFn: getChannels,
    staleTime: STALE,
  })

  if (isLoading) return <PreviewLoader />

  const list = channels.length > 0 ? channels : [{ room: 'general', label: 'Général', group: 'Salons' }]
  const groups = list.reduce<Record<string, typeof list>>((acc, channel) => {
    const group = channel.group || 'Salons'
    acc[group] = [...(acc[group] ?? []), channel]
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-5 rounded-card border border-border bg-bg/60 p-5">
      {Object.entries(groups)
        .slice(0, 3)
        .map(([group, items]) => (
          <div key={group}>
            <p className="text-xs uppercase tracking-[0.2em] text-text/40 font-semibold mb-2">{group}</p>
            <ul className="flex flex-col gap-1">
              {items.slice(0, 4).map((channel) => (
                <li key={channel.room}>
                  <Link
                    href="/chat"
                    className="flex items-center gap-2 rounded-[8px] px-2 py-1.5 text-sm text-text/80 hover:bg-primary/10 hover:text-text transition-colors"
                  >
                    <Hash size={16} className="text-primary" />
                    {channel.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}

export function ForumPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ['landing', 'forums'],
    queryFn: () => getForums(1),
    staleTime: STALE,
  })
  const topics = (data?.data ?? []).slice(0, 3)

  if (isLoading) return <PreviewLoader />
  if (topics.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      {topics.map((topic) => (
        <ForumCards key={topic.id} topic={topic} />
      ))}
    </div>
  )
}

function usePopular(type: 'anime' | 'manga', limit: number) {
  return useQuery({
    queryKey: ['landing', type, limit],
    queryFn: async () => (await (type === 'anime' ? getAnimes(1, limit) : getMangas(1, limit))).data,
    staleTime: STALE,
  })
}

export function LibraryPreview() {
  const mangas = usePopular('manga', 3)
  const animes = usePopular('anime', 3)

  if (mangas.isLoading || animes.isLoading) return <PreviewLoader />

  const works = [
    ...(mangas.data ?? []).map((work) => ({ ...work, type: 'manga' as const })),
    ...(animes.data ?? []).map((work) => ({ ...work, type: 'anime' as const })),
  ]
  if (works.length === 0) return null

  return (
    <div className="grid grid-cols-3 gap-3">
      {works.map((work) => (
        <Link key={`${work.type}-${work.id}`} href={`/bibliotheque/${work.type}/${work.slug}`} className="group flex flex-col gap-1.5 min-w-0">
          <div className="relative aspect-2/3 rounded-card overflow-hidden bg-primary">
            <Image
              src={work.posterImage || work.coverImage || '/bg.png'}
              alt={work.titleEn || work.titleJp || ''}
              fill
              sizes="(min-width: 768px) 140px, 30vw"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <p className="text-xs text-text/70 truncate group-hover:text-primary transition-colors">{work.titleEn || work.titleJp}</p>
        </Link>
      ))}
    </div>
  )
}

export function MyListPreview() {
  const { data, isLoading } = usePopular('manga', 1)
  const work = data?.[0]

  if (isLoading) return <PreviewLoader />
  if (!work) return null

  return (
    <div className="flex gap-5 rounded-card border border-border bg-bg/60 p-5">
      <Link href={`/bibliotheque/manga/${work.slug}`} className="relative w-28 shrink-0 aspect-2/3 rounded-card overflow-hidden bg-primary">
        <Image src={work.posterImage || work.coverImage || '/bg.png'} alt={work.titleEn || work.titleJp || ''} fill sizes="112px" className="object-cover" />
      </Link>
      <div className="flex flex-col gap-3 min-w-0">
        <p className="font-bold truncate">{work.titleEn || work.titleJp}</p>
        <div className="flex flex-wrap gap-2">
          {MANGA_STATUSES.map((status) => (
            <Link
              key={status}
              href="/login"
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                status === 'En cours' ? 'bg-primary text-white' : 'bg-muted text-text/70 hover:bg-primary/20 hover:text-text'
              }`}
            >
              {status}
            </Link>
          ))}
        </div>
        <Link
          href="/login"
          className="self-start mt-1 rounded-full px-4 py-2 text-sm font-bold bg-primary hover:bg-primary/85 text-white transition-colors"
        >
          Ajouter à ma liste
        </Link>
      </div>
    </div>
  )
}
