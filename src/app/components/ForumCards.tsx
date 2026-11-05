'use client'

import { Forum } from '../types/forum'
import Link from 'next/link'
import { MessageSquare, Eye, ThumbsUp, Pin, Archive, Ban, Crown } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { pinTopic, archiveTopic } from '../lib/forum'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import Card from './ui/Card'

export default function ForumCards({ topic }: { topic: Forum }) {
  const { isLoggedIn, user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const isPinned = topic.is_pinned || topic.user_has_pinned
  const isAuthorAdmin = Boolean(topic.user?.is_admin || topic.user?.role === 'admin')
  const isAuthorBanned = Boolean(
    topic.user?.is_deleted ||
    (topic.user?.banned_until && new Date(topic.user.banned_until) > new Date())
  )
  const canArchive = !!user && (
    user.id === topic.user_id || ['moderator', 'admin'].includes(user.role)
  )

  const pinMutation = useMutation({
    mutationFn: () => pinTopic(topic.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums'] })
      queryClient.invalidateQueries({ queryKey: ['user-pins'] })
      queryClient.invalidateQueries({ queryKey: ['user', user?.id, 'forums'] })
    },
  })

  const archiveMutation = useMutation({
    mutationFn: () => archiveTopic(topic.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums'] })
      queryClient.invalidateQueries({ queryKey: ['user', topic.user_id] })
    },
  })

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (topic.is_pinned) return
    if (!isLoggedIn) { router.push('/login'); return }
    pinMutation.mutate()
  }

  const handleArchive = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    archiveMutation.mutate()
  }

  return (
    <Link href={`/forum/${topic.id}`}>
      <Card
        variant="compact"
        className={`flex flex-col gap-4 hover:bg-white/2 transition cursor-pointer ${
          isAuthorBanned ? 'border-red-950/70 bg-red-950/15' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {isAuthorAdmin && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40">
                <Crown size={10} className="text-amber-400 fill-amber-400" />
                Staff
              </span>
            )}
            {isAuthorBanned && !isAuthorAdmin && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-500/40 shadow-xs">
                <Ban size={10} className="text-red-400" />
                Compte Banni
              </span>
            )}
            <span
              className={`text-[14px] font-bold ${
                isAuthorBanned && !isAuthorAdmin
                  ? 'text-red-400 line-through decoration-red-500/50'
                  : 'text-white'
              }`}
            >
              {topic.user?.username || 'Anonyme'}
            </span>
            {isAuthorBanned && !isAuthorAdmin && (
              <Ban size={13} className="text-red-400 shrink-0" />
            )}
            <span className="text-xs text-text-muted">
              • {new Date(topic.created_at).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {canArchive && (
              <button
                onClick={handleArchive}
                title={topic.is_archived ? 'Désarchiver' : 'Archiver ce sujet'}
                className="btn btn-ghost border-none btn-xs p-1 rounded-full transition-colors text-text-muted hover:text-primary"
              >
                <Archive size={15} />
              </button>
            )}
            <button
              onClick={handlePin}
              title={topic.is_pinned ? 'Sujet épinglé' : topic.user_has_pinned ? "Retirer l'épingle" : 'Épingler ce sujet'}
              className={`btn btn-ghost border-none btn-xs p-1 rounded-full transition-colors ${
                isPinned ? 'text-primary' : 'text-text-muted hover:text-primary'
              } ${topic.is_pinned ? 'cursor-default' : ''}`}
            >
              <Pin size={15} fill={isPinned ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        <h3 className="text-[16px] font-bold text-white leading-snug">{topic.title}</h3>
        <p className="text-[14px] text-text-muted line-clamp-2">{topic.content}</p>

        <div className="flex flex-col gap-3 mt-2">
          <div>
            <span className="text-[10px] font-bold px-3 py-1 bg-primary text-white rounded-full uppercase tracking-wide">
              {topic.category}
            </span>
          </div>
          <div className="flex items-center gap-6 text-text-muted text-sm font-medium">
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
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
      </Card>
    </Link>
  )
}
