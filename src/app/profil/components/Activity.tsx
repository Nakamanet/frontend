'use client'

import PostCards from '../../components/PostCards'
import { User } from '../../types/auth'
import { useState } from 'react'
import { Flame, ThumbsUp, Bookmark, Trash } from 'lucide-react'
import { getUserPosts } from '@/app/lib/user'
import FilterTab from '../../components/FilterTab'
import { useQuery } from '@tanstack/react-query'

const FILTER_OPTIONS = [
  { value: 'mine', label: 'Mes Posts', icon: <Flame size={18} /> },
  { value: 'save', label: 'Sauvegardés', icon: <Bookmark size={18} /> },
  { value: 'liked', label: 'Liké', icon: <ThumbsUp size={18} /> },
  { value: 'deleted', label: 'Archivés', icon: <Trash size={18} /> },
]

export default function Activity({ user }: { user: User }) {
  const [filter, setFilter] = useState('mine')

  const { data, isLoading } = useQuery({
    queryKey: ['user', user.id, 'posts'],
    queryFn: () => getUserPosts(user.id),
  })

  const posts = data?.data ?? []

  return (
    <div className="flex flex-col gap-8 p-7">
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />
      {isLoading ? (
        <div className="flex justify-center items-center p-10 border border-border bg-accent rounded-[15px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : posts.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {posts.map((post) => (
            <PostCards key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-text/60">Vous n&apos;avez pas encore de posts</p>
      )}
    </div>
  )
}
