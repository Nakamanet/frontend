'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, Eye, Plus } from 'lucide-react'
import { Anime, Manga } from '@/app/types/catalog'
import { useTranslation } from '@/app/context/TranslationContext'
import Loader from '@/app/components/Loader'

type CatalogCardProps = {
  type: 'anime' | 'manga'
  item: Anime | Manga
  followed: boolean
  pending: boolean
  onToggle: () => void
  badge?: string
}

const REVEAL = 'opacity-100 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'

export default function CatalogCard({ type, item, followed, pending, onToggle, badge }: CatalogCardProps) {
  const { translateTerm } = useTranslation()
  const title = item.titleEn || item.titleJp || ''
  const href = `/bibliotheque/${type}/${item.slug}`
  const genre = item.genres?.[0]?.name
  const count = type === 'anime' ? (item as Anime).episodeCount : (item as Manga).chapterCount
  const poster = item.posterImage || item.coverImage

  return (
    <div className="group relative aspect-2/3 rounded-card overflow-hidden border border-transparent bg-primary bg-clip-padding hover:border-primary focus-within:border-primary transition-colors">
      {poster ? (
        <Image
          src={poster}
          alt={title}
          fill
          sizes="(min-width: 1280px) 180px, (min-width: 768px) 22vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200">
          <span className="text-base-content/30 text-sm">Pas d&apos;image</span>
        </div>
      )}

      <Link href={href} aria-label={title} className="absolute inset-0 z-0" />

      {badge && (
        <span className="pointer-events-none absolute top-2 right-2 z-10 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
          {badge}
        </span>
      )}

      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-300 ${REVEAL}`}
      />

      <div className={`absolute inset-0 z-10 flex items-center justify-center gap-3 transition-opacity duration-300 ${REVEAL}`}>
        <Link
          href={href}
          aria-label={`Voir ${title}`}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-black/55 backdrop-blur-sm text-white hover:bg-primary transition-colors"
        >
          <Eye size={17} />
        </Link>
        <button
          type="button"
          onClick={onToggle}
          disabled={pending}
          aria-label={followed ? `Retirer ${title} de ma liste` : `Ajouter ${title} à ma liste`}
          aria-pressed={followed}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-black/55 backdrop-blur-sm text-white hover:bg-primary transition-colors cursor-pointer disabled:cursor-wait"
        >
          {pending ? <Loader variant="inline" size="xs" /> : followed ? <Check size={17} /> : <Plus size={17} />}
        </button>
      </div>

      <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 flex flex-col gap-0.5 transition-opacity duration-300 ${REVEAL}`}>
        <p className="font-bold text-white leading-tight line-clamp-2">{title}</p>
        <div className="flex items-center justify-between gap-2 text-xs text-white/75">
          <span className="truncate">{genre ? translateTerm(genre) : ''}</span>
          {count ? (
            <span className="shrink-0">
              {count} {type === 'anime' ? 'ep' : 'ch'}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
