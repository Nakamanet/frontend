'use client'

import PostCards from '../../components/PostCards'
import { User } from '../../types/auth'
import { useState } from 'react'
import { Flame, ThumbsUp, Bookmark, Trash } from 'lucide-react'
import { getUserPosts } from '@/app/lib/user'
import { getMylikedPosts, getMySavedPosts, getMyArchivedPost } from '@/app/lib/post'
import FilterTab from '../../components/FilterTab'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/app/context/AuthContext'
import Loader from '@/app/components/Loader'

const FILTER_OPTIONS = [
  { value: 'mine', label: 'Mes Posts', icon: <Flame size={18} /> },
  { value: 'save', label: 'Sauvegardés', icon: <Bookmark size={18} /> },
  { value: 'liked', label: 'Posts Liké', icon: <ThumbsUp size={18} /> },
  { value: 'deleted', label: 'Archivés', icon: <Trash size={18} /> },
]

const FILTER_OPTIONS_OTHER = [
  { value: 'mine', label: 'Posts Publiés', icon: <Flame size={18} /> },
  { value: 'liked', label: 'Posts Likés', icon: <ThumbsUp size={18} /> },
]

export default function Activity({ user }: { user: User }) {
  const [filter, setFilter] = useState('mine')
  const { user: connectedUser } = useAuth()
  const isOwnProfil = connectedUser?.id === user.id

  const { data, isLoading } = useQuery({
    queryKey: ['user', user.id, 'posts', filter],
    queryFn: () => {
      switch (filter) {
        case 'save':
          return getMySavedPosts()
        case 'liked':
          return getMylikedPosts()
        case 'deleted':
          return getMyArchivedPost()
        default:
          return getUserPosts(user.id)
      }
    },
  })

  const posts = data?.data ?? []

  const emptyMessages: Record<string, string> = {
    mine: isOwnProfil ? "Vous n'avez pas encore de posts" : "Cet utilisateur n'a pas encore posté",
    save: "Vous n'avez pas encore sauvegardé de posts",
    liked: isOwnProfil ? "Vous n'avez pas encore liké de posts" : "Cet utilisateur n'a pas encore liké de posts",
    deleted: "Vous n'avez pas encore de posts archivés",
  }

  return (
    <div className="flex flex-col gap-8 p-7">
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
