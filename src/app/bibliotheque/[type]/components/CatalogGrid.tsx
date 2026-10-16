'use client'

import { Anime, Manga } from '@/app/types/catalog'
import { useLibraryFollow } from '@/app/hooks/useLibraryFollow'
import CatalogCard from './CatalogCard'

export default function CatalogGrid({ type, items }: { type: 'anime' | 'manga'; items: (Anime | Manga)[] }) {
  const { isFollowed, isPending, toggle } = useLibraryFollow()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
      {items.map((item) => (
        <CatalogCard
          key={item.id}
          type={type}
          item={item}
          followed={isFollowed(type, item.id)}
          pending={isPending(type, item.id)}
          onToggle={() => toggle(type, item.id)}
        />
      ))}
    </div>
  )
}
