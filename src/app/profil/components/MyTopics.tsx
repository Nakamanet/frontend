'use client'

import { User } from '../../types/auth'
import { useState } from 'react'
import { Flame, ThumbsUp, Pin, Archive } from 'lucide-react'
import { getUserForum } from '@/app/lib/user'
import { getUserPins, getMyArchivedTopics, getMyVotedTopics } from '@/app/lib/forum'
import ForumCards from '@/app/components/ForumCards'
import FilterTab from '../../components/FilterTab'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import { useAuth } from '@/app/context/AuthContext'

const FILTER_OWN = [
  { value: 'mine',     label: 'Mes Forums', icon: <Flame   size={18} /> },
  { value: 'pinned',   label: 'Épinglés',   icon: <Pin     size={18} /> },
  { value: 'liked',    label: 'Likés',      icon: <ThumbsUp size={18} /> },
  { value: 'archived', label: 'Archivés',   icon: <Archive size={18} /> },
]

const FILTER_OTHER = [
  { value: 'mine', label: 'Forums Publiés', icon: <Flame size={18} /> },
]

const EMPTY_MESSAGES: Record<string, string> = {
  mine:     "Vous n'avez pas encore publié de sujet.",
  pinned:   "Vous n'avez pas encore épinglé de sujet.",
  liked:    "Vous n'avez pas encore liké de sujet.",
  archived: "Vous n'avez pas encore archivé de sujet.",
}

export default function MyTopics({ user }: { user: User }) {
  const { user: connectedUser } = useAuth()
  const isOwnProfil = connectedUser?.id === user.id
  const [filter, setFilter] = useState('mine')

  const queryFnMap: Record<string, () => Promise<{ data: unknown[] }>> = {
    mine:     () => getUserForum(user.id),
    pinned:   () => getUserPins(),
    liked:    () => getMyVotedTopics(),
    archived: () => getMyArchivedTopics(),
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user', user.id, 'forums', filter],
    queryFn:  queryFnMap[filter] ?? (() => getUserForum(user.id)),
    enabled:  filter === 'mine' || isOwnProfil,
  })

  const forums = (data?.data ?? []) as Parameters<typeof ForumCards>[0]['topic'][]

  return (
    <div className="flex flex-col gap-8 p-7">
      <FilterTab
        value={filter}
        onChange={setFilter}
        options={isOwnProfil ? FILTER_OWN : FILTER_OTHER}
      />
      {isLoading ? (
        <Loader />
      ) : forums.length > 0 ? (
        <div className="flex flex-col gap-2">
          {forums.map((forum) => (
            <ForumCards key={forum.id} topic={forum} />
          ))}
        </div>
      ) : (
        <p className="text-text/60">
          {isOwnProfil
            ? EMPTY_MESSAGES[filter]
            : "Cet utilisateur n'a pas encore publié de sujet."}
        </p>
      )}
    </div>
  )
}
