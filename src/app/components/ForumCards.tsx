'use client'

import { Forum } from '../types/forum'
import Link from 'next/link'
import { MessageSquare, Eye, ThumbsUp, Pin } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { pinTopic } from '../lib/forum'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

export default function ForumCards({ topic }: { topic: Forum }) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const isPinned = topic.is_pinned || topic.user_has_pinned

  const pinMutation = useMutation({
    mutationFn: () => pinTopic(topic.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums'] })
      queryClient.invalidateQueries({ queryKey: ['user-pins'] })
    },
  })

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (topic.is_pinned) return
    if (!isLoggedIn) { router.push('/login'); return }
    pinMutation.mutate()
  }

  return (
    <Link href={`/forum/${topic.id}`}>
      <div className="flex flex-col border border-border bg-accent rounded-[15px] gap-4 p-4 hover:bg-white/2 transition cursor-pointer">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[14px] font-bold text-white">{topic.user?.username || 'Anonyme'}</span>
            <span className="text-xs text-border">
              • {new Date(topic.created_at).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <button
            onClick={handlePin}
            title={topic.is_pinned ? 'Sujet épinglé' : topic.user_has_pinned ? "Retirer l'épingle" : 'Épingler ce sujet'}
            className={`btn btn-ghost border-none btn-xs p-1 rounded-full shrink-0 transition-colors ${
              isPinned ? 'text-alerts' : 'text-border hover:text-alerts'
            } ${topic.is_pinned ? 'cursor-default' : ''}`}
          >
            <Pin size={15} fill={isPinned ? 'currentColor' : 'none'} />
          </button>
        </div>

        <h3 className="text-[16px] font-bold text-white leading-snug">{topic.title}</h3>
        <p className="text-[14px] text-border line-clamp-2">{topic.content}</p>

        <div className="flex flex-col gap-3 mt-2">
          <div>
            <span className="text-[10px] font-bold px-3 py-1 bg-alerts text-white rounded-full uppercase tracking-wide">
              {topic.category}
            </span>
          </div>
          <div className="flex items-center gap-6 text-border text-sm font-medium">
            <span className="flex items-center gap-1.5 hover:text-alerts transition-colors">
              <MessageSquare size={16} /> {topic.replies_count}
            </span>
            <span className="flex items-center gap-1.5 transition-colors">
              <Eye size={16} />{topic.views_count ?? 0}
            </span>
            <span className="flex items-center gap-1.5 transition-colors">
              <ThumbsUp size={16} />{topic.votes_count ?? 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
