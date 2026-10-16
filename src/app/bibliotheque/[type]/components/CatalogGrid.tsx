'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Anime, Manga } from '@/app/types/catalog'
import { MyAnime, MyManga } from '@/app/types/library'
import { addMyAnime, addMyManga, deleteMyAnime, deleteMyManga, getMyAnime, getMyManga } from '@/app/lib/library'
import { useAuth } from '@/app/context/AuthContext'
import { useToast } from '@/app/context/ToastContext'
import CatalogCard from './CatalogCard'

export default function CatalogGrid({ type, items }: { type: 'anime' | 'manga'; items: (Anime | Manga)[] }) {
  const { isLoggedIn } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [pendingId, setPendingId] = useState<number | null>(null)

  const { data: library = [] } = useQuery<(MyAnime | MyManga)[]>({
    queryKey: ['library', type],
    queryFn: type === 'anime' ? getMyAnime : getMyManga,
    enabled: isLoggedIn,
  })
  const followedIds = new Set(library.map((entry) => ('anime_id' in entry ? entry.anime_id : entry.manga_id)))

  const { mutate: toggle } = useMutation({
    mutationFn: async (id: number) => {
      if (followedIds.has(id)) {
        await (type === 'anime' ? deleteMyAnime(id) : deleteMyManga(id))
        return 'removed' as const
      }
      await (type === 'anime'
        ? addMyAnime({ anime_id: id, status: 'plan_to_watch', progress: null, rewatch_count: null, score: null, is_private: false })
        : addMyManga({ manga_id: id, status: 'plan_to_read', progress: null, reread_count: null, score: null, is_private: false }))
      return 'added' as const
    },
    onMutate: (id) => setPendingId(id),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['library', type] })
      showToast(
        result === 'removed'
          ? 'Retiré de votre liste'
          : type === 'anime'
            ? 'Anime ajouté à votre liste'
            : 'Manga ajouté à votre liste',
        'success'
      )
    },
    onError: (error) => showToast((error as Error).message, 'error'),
    onSettled: () => setPendingId(null),
  })

  const handleToggle = (id: number) => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    toggle(id)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
      {items.map((item) => (
        <CatalogCard
          key={item.id}
          type={type}
          item={item}
          followed={followedIds.has(item.id)}
          pending={pendingId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  )
}
