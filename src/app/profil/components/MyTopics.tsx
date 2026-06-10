'use client'

import { User } from '../../types/auth'
import { useState } from 'react'
import { Flame, ThumbsUp, Bookmark, Trash } from 'lucide-react'
import { getUserForum } from '@/app/lib/user'
import { Forum } from '@/app/types/forum'
import ForumCards from '@/app/components/ForumCards'
import FilterTab from '../../components/FilterTab'
import { useQuery } from '@tanstack/react-query'

const FILTER_OPTIONS = [
  { value: 'mine', label: 'Mes Forums', icon: <Flame size={18} /> },
  { value: 'save', label: 'Sauvegardés', icon: <Bookmark size={18} /> },
  { value: 'liked', label: 'Liké', icon: <ThumbsUp size={18} /> },
  { value: 'deleted', label: 'Archivés', icon: <Trash size={18} /> },
]

export default function MyTopics({ user }: { user: User }) {
  const [filter, setFilter] = useState('mine')

  const { data, isLoading } = useQuery<{ data: Forum[] }>({
    queryKey: ['user', user.id, 'forums'],
    queryFn: () => getUserForum(user.id),
  })

  const forums = data?.data ?? []

  return (
    <div className="flex flex-col gap-8 p-7">
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />
      {isLoading ? (
        <div className="flex justify-center items-center p-10 border border-border bg-accent rounded-[15px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : forums.length > 0 ? (
        <div>
          {forums.map((forum) => (
            <ForumCards key={forum.id} topic={forum} />
          ))}
        </div>
      ) : (
        <p className="text-text/60">Vous n&apos;avez pas encore de forum</p>
      )}
    </div>
  )
}
