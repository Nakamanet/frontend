'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Anime, Manga } from '@/app/types/catalog'
import { useLibraryFollow } from '@/app/hooks/useLibraryFollow'
import CatalogCard from '../[type]/components/CatalogCard'

export type RowItem = { type: 'anime' | 'manga'; item: Anime | Manga }

export default function CardRow({ items, moreHref, moreLabel }: { items: RowItem[]; moreHref: string; moreLabel: string }) {
  const { isFollowed, isPending, toggle } = useLibraryFollow()

  return (
    <div className="flex gap-4">
      {items.map(({ type, item }) => (
        <div key={`${type}-${item.id}`} className="w-[145px] shrink-0">
          <CatalogCard
            type={type}
            item={item}
            followed={isFollowed(type, item.id)}
            pending={isPending(type, item.id)}
            onToggle={() => toggle(type, item.id)}
          />
        </div>
      ))}
      <Link
        href={moreHref}
        className="w-[145px] shrink-0 aspect-2/3 flex flex-col items-center justify-center gap-2 rounded-card border border-border text-text/70 hover:border-primary hover:text-primary transition-colors"
      >
        <Plus size={30} />
        <span className="text-sm text-center px-3">{moreLabel}</span>
      </Link>
    </div>
  )
}
