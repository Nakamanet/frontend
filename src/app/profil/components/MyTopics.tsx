'use client'

import { User } from '../../types/auth'
import { useEffect, useState } from 'react'
import { Flame, ThumbsUp, Bookmark, Trash } from 'lucide-react'
import { getUserForum } from '@/app/lib/user'
import { Forum } from '@/app/types/forum'
import ForumCards from '@/app/components/ForumCards'

export default function MyTopics({ user }: { user: User }) {
  const [filter, setFilter] = useState('mine')
  const [forums, setForums] = useState<Forum[]>([])

  useEffect(() => {
    getUserForum(user.id)
      .then(res => setForums(res.data))
      .catch(err => console.error(err))

  }, [user.id])

  return (
    <div className="flex flex-col gap-8 p-7 ">
      <div className="flex justify-center border border-border bg-accent rounded-full py-1 px-6">
        <div className="flex gap-5">
          <button
            onClick={() => {
              if (filter === 'mine') {
                setFilter('all')
              } else {
                setFilter('mine')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'mine' ? 'bg-alerts text-white' : 'text-border'}`}
          >
            <Flame size={18} />
            <span className="hidden md:inline">Mes Forums</span>
          </button>
          <button
            onClick={() => {
              if (filter === 'save') {
                setFilter('all')
              } else {
                setFilter('save')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'save' ? 'bg-alerts text-white' : 'text-border'}`}
          >
            <Bookmark size={18} />
            <span className="hidden md:inline">Sauvegardés</span>
          </button>
          <button
            onClick={() => {
              if (filter === 'liked') {
                setFilter('all')
              } else {
                setFilter('liked')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'liked' ? 'bg-alerts text-white' : 'text-border'}`}
          >
            <ThumbsUp size={18} />
            <span className="hidden md:inline">Liké</span>
          </button>
          <button
            onClick={() => {
              if (filter === 'deleted') {
                setFilter('all')
              } else {
                setFilter('deleted')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'deleted' ? 'bg-alerts text-white' : 'text-border'}`}
          >
            <Trash size={18} />
            <span className="hidden md:inline">Archivés</span>
          </button>
        </div>
      </div>
      {forums && forums.length > 0 ? (
        <div>
          {forums.map((forum) => (
            <ForumCards key={forum.id} topic={forum} />
          ))}
        </div>
      ) : (
        <p>Vous n&apos;avez pas encore de forum</p>
      )}
    </div>
  )
}
