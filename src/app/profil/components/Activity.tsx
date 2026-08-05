'use client'

import PostCards from '../../components/PostCards'
import { User } from '../../types/auth'
import { useState } from 'react'
import { Flame, ThumbsUp, Bookmark, Trash } from 'lucide-react'
import { getUserPosts } from '@/app/lib/user'
import FilterTab from '../../components/FilterTab'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/app/context/AuthContext'
import Loader from '@/app/components/Loader'
import { getMyArchivedPost, getMySavedPosts, getUserLikedPosts } from '@/app/lib/post'
import { PaginatedPosts } from '@/app/types/post'
import { useTranslations } from 'next-intl'

export default function Activity({ user }: { user: User }) {
  const [filter, setFilter] = useState('mine')
  const { user: connectedUser } = useAuth()
  const isOwnProfil = connectedUser?.id === user.id
  const t = useTranslations('activity')

  const FILTER_OPTIONS = [
    { value: 'mine', label: t('myPosts'), icon: <Flame size={18} /> },
    { value: 'save', label: t('saved'), icon: <Bookmark size={18} /> },
    { value: 'liked', label: t('liked'), icon: <ThumbsUp size={18} /> },
    { value: 'deleted', label: t('archived'), icon: <Trash size={18} /> },
  ]

  const FILTER_OPTIONS_OTHER = [
    { value: 'mine', label: t('publishedPosts'), icon: <Flame size={18} /> },
    { value: 'liked', label: t('likedPosts'), icon: <ThumbsUp size={18} /> },
  ]

  const fetchers: Record<string, () => Promise<PaginatedPosts>> = {
    mine: () => getUserPosts(user.id),
    liked: () => getUserLikedPosts(user.id),
    save: () => getMySavedPosts(),
    deleted: () => getMyArchivedPost(),
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user', user.id, 'posts', filter],
    queryFn: () => (fetchers[filter] ?? fetchers.mine)(),
  })

  const posts = data?.data ?? []

  const emptyMessages: Record<string, string> = {
    mine: isOwnProfil ? t('emptyMine') : t('emptyMineOther'),
    save: t('emptySave'),
    liked: isOwnProfil ? t('emptyLiked') : t('emptyLikedOther'),
    deleted: t('emptyDeleted'),
  }

  return (
    <div className="flex flex-col gap-5 md:gap-8 p-3 md:p-7">
      <FilterTab value={filter} onChange={setFilter} options={isOwnProfil ? FILTER_OPTIONS : FILTER_OPTIONS_OTHER} />
      {isLoading ? (
        <Loader />
      ) : posts.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {posts.map((post) => (
            <PostCards key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-text/60">{emptyMessages[filter]}</p>
      )}
    </div>
  )
}
