'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, CircleUser, Hash, Heart, MessageCircle } from 'lucide-react'
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

const STACK_AUTOPLAY = 5000

// Position des cartes derrière la carte active : décalage vers le bas, réduction, transparence
const STACK_STYLES = [
  'translate-y-0 scale-100 opacity-100 z-30',
  'translate-y-4 scale-[0.95] opacity-60 z-20',
  'translate-y-8 scale-[0.90] opacity-30 z-10',
]

function StackCarousel({
  items,
  label,
  cardClassName,
}: {
  items: { key: string | number; node: React.ReactNode }[]
  label: string
  /** Fond et bordure des cartes, réutilisés pour masquer le contenu des cartes empilées derrière */
  cardClassName: string
}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = items.length

  useEffect(() => {
    if (paused || count < 2) return
    const timer = setInterval(() => setActive((i) => (i + 1) % count), STACK_AUTOPLAY)
    return () => clearInterval(timer)
  }, [paused, count])

  const go = (step: number) => setActive((i) => (i + step + count) % count)

  return (
    <div
      className="flex flex-col gap-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid pb-8" aria-roledescription="carrousel" aria-label={label}>
        {items.map((item, i) => {
          const offset = (i - active + count) % count
          const isActive = offset === 0
          return (
            <div
              key={item.key}
              inert={!isActive}
              aria-hidden={!isActive}
              className={`relative col-start-1 row-start-1 origin-bottom transition-[translate,scale,opacity] duration-500 ease-out motion-reduce:transition-none [&>*]:h-full ${
                STACK_STYLES[offset] ?? 'translate-y-8 scale-[0.90] opacity-0 z-0'
              }`}
            >
              {item.node}
              <div
                aria-hidden
                className={`absolute inset-0 rounded-card border border-border ${cardClassName} transition-opacity duration-500 motion-reduce:transition-none ${
                  isActive ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </div>
          )
        })}
      </div>

      {count > 1 && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Précédent"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text/70 hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Afficher l’élément ${i + 1} sur ${count}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-primary' : 'w-2 bg-text/20 hover:bg-text/40'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Suivant"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text/70 hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export function ForumPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ['landing', 'forums'],
    queryFn: () => getForums(1),
    staleTime: STALE,
  })
  const topics = (data?.data ?? []).slice(0, 6)

  if (isLoading) return <PreviewLoader />
  if (topics.length === 0) return null

  return (
    <StackCarousel
      label="Sujets du forum"
      cardClassName="bg-accent"
      items={topics.map((topic) => ({
        key: topic.id,
        node: (
          <div className="[&>a]:block [&>a]:h-full [&>a>div]:h-full [&>a>div:hover]:bg-accent">
            <ForumCards topic={topic} />
          </div>
        ),
      }))}
    />
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

const ANIME_STATUSES = ['À regarder', 'En cours', 'Terminé', 'En pause', 'Abandonné']

// Statut mis en avant sur chaque carte, pour montrer les différents états de suivi
const SHOWCASE_STATUSES = ['En cours', 'Terminé', 'À lire', 'En pause', 'En cours', 'Terminé']

// Équivalent opaque de bg-bg/60 sur le fond de la section, pour que les cartes empilées ne se voient pas au travers
const MY_LIST_CARD_BG = 'bg-[color-mix(in_srgb,var(--bg)_60%,var(--accent))]'

export function MyListPreview() {
  // Les 3 premières œuvres sont déjà affichées dans l'aperçu de la bibliothèque
  const mangas = usePopular('manga', 6)
  const animes = usePopular('anime', 6)

  if (mangas.isLoading || animes.isLoading) return <PreviewLoader />

  const mangaWorks = (mangas.data ?? []).slice(3).map((work) => ({ ...work, type: 'manga' as const }))
  const animeWorks = (animes.data ?? []).slice(3).map((work) => ({ ...work, type: 'anime' as const }))
  const works = mangaWorks.flatMap((work, i) => [work, animeWorks[i]]).filter((work) => work !== undefined)
  if (works.length === 0) return null

  return (
    <StackCarousel
      label="Exemples d’œuvres à suivre"
      cardClassName={MY_LIST_CARD_BG}
      items={works.map((work, i) => {
        const statuses = work.type === 'manga' ? MANGA_STATUSES : ANIME_STATUSES
        const current = SHOWCASE_STATUSES[i % SHOWCASE_STATUSES.length].replace('À lire', statuses[0])
        return {
          key: `${work.type}-${work.id}`,
          node: (
            <div className={`flex gap-5 rounded-card border border-border ${MY_LIST_CARD_BG} p-5`}>
              <Link
                href={`/bibliotheque/${work.type}/${work.slug}`}
                className="relative w-28 shrink-0 aspect-2/3 rounded-card overflow-hidden bg-primary"
              >
                <Image
                  src={work.posterImage || work.coverImage || '/bg.png'}
                  alt={work.titleEn || work.titleJp || ''}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-col gap-3 min-w-0">
                <p className="font-bold truncate">{work.titleEn || work.titleJp}</p>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Link
                      key={status}
                      href="/login"
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${
                        status === current ? 'bg-primary text-white' : 'bg-muted text-text/70 hover:bg-primary/20 hover:text-text'
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
          ),
        }
      })}
    />
  )
}
