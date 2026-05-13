'use client'

import PostCards from '../../components/PostCards'
import { User } from '../../types/auth'
import { useEffect, useState } from 'react'
import { Flame, ThumbsUp, Bookmark, Trash } from 'lucide-react'
import { Post } from '../../types/post'
import { getUserPosts } from '@/app/lib/user'
import FilterTab from '../../components/FilterTab'

const FILTER_OPTIONS = [
  { value: 'mine', label: 'Mes Posts', icon: <Flame size={18} /> },
  { value: 'save', label: 'Sauvegardés', icon: <Bookmark size={18} /> },
  { value: 'liked', label: 'Liké', icon: <ThumbsUp size={18} /> },
  { value: 'deleted', label: 'Archivés', icon: <Trash size={18} /> },
]

export default function Activity({ user }: { user: User }) {
  const [filter, setFilter] = useState('mine')
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    getUserPosts(user.id)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
  }, [user.id])

  return (
    <div className="flex flex-col gap-8 p-7">
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />
      {posts && posts.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {posts.map((post) => (
            <PostCards key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>Vous n&apos;avez pas encore de posts</p>
      )}
    </div>
  )
}
