'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MyAnime, MyManga } from '@/app/types/library'
import { addMyAnime, addMyManga, deleteMyAnime, deleteMyManga, getMyAnime, getMyManga } from '@/app/lib/library'
import { useAuth } from '@/app/context/AuthContext'
import { useToast } from '@/app/context/ToastContext'

type WorkType = 'anime' | 'manga'

export function useLibraryFollow() {
  const { isLoggedIn } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [pendingKey, setPendingKey] = useState<string | null>(null)

  const { data: myAnimes = [] } = useQuery<MyAnime[]>({
    queryKey: ['library', 'anime'],
    queryFn: getMyAnime,
    enabled: isLoggedIn,
  })
  const { data: myMangas = [] } = useQuery<MyManga[]>({
    queryKey: ['library', 'manga'],
    queryFn: getMyManga,
    enabled: isLoggedIn,
  })

  const followed = {
    anime: new Set(myAnimes.map((entry) => entry.anime_id)),
    manga: new Set(myMangas.map((entry) => entry.manga_id)),
  }

  const { mutate } = useMutation({
    mutationFn: async ({ type, id }: { type: WorkType; id: number }) => {
      if (followed[type].has(id)) {
        await (type === 'anime' ? deleteMyAnime(id) : deleteMyManga(id))
        return 'removed' as const
      }
      await (type === 'anime'
        ? addMyAnime({ anime_id: id, status: 'plan_to_watch', progress: null, rewatch_count: null, score: null, is_private: false })
        : addMyManga({ manga_id: id, status: 'plan_to_read', progress: null, reread_count: null, score: null, is_private: false }))
      return 'added' as const
    },
    onMutate: ({ type, id }) => setPendingKey(`${type}-${id}`),
    onSuccess: (result, { type }) => {
      queryClient.invalidateQueries({ queryKey: ['library', type] })
      showToast(
        result === 'removed' ? 'Retiré de votre liste' : type === 'anime' ? 'Anime ajouté à votre liste' : 'Manga ajouté à votre liste',
        'success'
      )
    },
    onError: (error) => showToast((error as Error).message, 'error'),
    onSettled: () => setPendingKey(null),
  })

  return {
    isFollowed: (type: WorkType, id: number) => followed[type].has(id),
    isPending: (type: WorkType, id: number) => pendingKey === `${type}-${id}`,
    toggle: (type: WorkType, id: number) => {
      if (!isLoggedIn) {
        router.push('/login')
        return
      }
      mutate({ type, id })
    },
  }
}
