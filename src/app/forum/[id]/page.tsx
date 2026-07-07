'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getForumById, voteOnTopic, voteOnReply, pinTopic, archiveTopic } from '@/app/lib/forum'
import ReplyForum from '../components/ReplyForum'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AppLayout from '@/app/components/layout/AppLayout'
import { ThumbsUp, Pin, Archive } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import type { ForumReply } from '@/app/types/forum'
import Loader from '@/app/components/Loader'
import { useToast } from '@/app/context/ToastContext'

function groupReplies(replies: ForumReply[]): ForumReply[] {
  const topLevel = replies.filter(r => !r.parent_id).sort((a, b) => (b.votes_count ?? 0) - (a.votes_count ?? 0))
  const byParent = new Map<number, ForumReply[]>()
  for (const r of replies) {
    if (r.parent_id != null) {
      if (!byParent.has(r.parent_id)) byParent.set(r.parent_id, [])
      byParent.get(r.parent_id)!.push(r)
    }
  }
  const result: ForumReply[] = []
  for (const reply of topLevel) {
    result.push(reply)
    result.push(...(byParent.get(reply.id) ?? []))
  }
  return result
}

export default function TopicDetailPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const { isLoggedIn, user } = useAuth()
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const topicVoteMutation = useMutation({
    mutationFn: (id: number) => voteOnTopic(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['forums', Number(params.id)] }),
    onError: () => showToast("Erreur lors du vote", 'error')
  })

  const topicArchiveMutation = useMutation({
    mutationFn: (id: number) => archiveTopic(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['forums'] }),
    onError: () => showToast("Erreur lors de l'archivage", 'error')
  })

  const topicPinMutation = useMutation({
    mutationFn: (id: number) => pinTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums', Number(params.id)] })
      queryClient.invalidateQueries({ queryKey: ['user-pins'] })
    },
    onError: () => showToast("Erreur lors de l'épinglage", 'error')
  })

  const replyVoteMutation = useMutation({
    mutationFn: (id: number) => voteOnReply(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['forums', Number(params.id)] }),
    onError: () => showToast("Erreur lors du vote", 'error')
  })

  const handleVote = (type: 'topic' | 'reply', id: number) => {
    if (!isLoggedIn) { router.push('/login'); return }
    if (type === 'topic') topicVoteMutation.mutate(id)
    else replyVoteMutation.mutate(id)
  }

  const { data: topic, isLoading, isError } = useQuery({
    queryKey: ['forums', Number(params.id)],
    queryFn: () => getForumById(Number(params.id)),
    enabled: !!params.id,
  })

  if (isLoading) {
    return (
      <AppLayout>
        <Loader size="md" color="alerts" />
      </AppLayout>
    )
  }

  if (isError || !topic) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center p-10 border border-border bg-accent rounded-[15px] text-border text-[15px] gap-4">
          Impossible de charger ce sujet.
          <Link href="/forum" className="btn bg-alerts hover:bg-alerts/90 rounded-full px-4 py-2 font-bold text-white border-none">
            Retour au forum
          </Link>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide pb-10">
        <Link href="/forum" className="btn btn-ghost border border-border rounded-full px-4 font-bold text-border hover:text-white w-fit">
          ← Retour au forum
        </Link>

        {topic.is_archived && (
          <div className="flex items-center gap-2 px-4 py-3 bg-border/20 border border-border rounded-[15px] text-border text-sm">
            <Archive size={15} />
            Ce sujet est archivé. Les nouvelles réponses sont désactivées.
          </div>
        )}

        <div className="border border-border bg-accent rounded-[15px] p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="text-[10px] font-bold px-3 py-1 bg-alerts text-white rounded-full uppercase tracking-wide">
              {topic.category}
            </span>
            {!!user && (user.id === topic.user_id || ['moderator', 'admin'].includes(user.role)) && (
              <button
                onClick={() => topicArchiveMutation.mutate(topic.id)}
                title={topic.is_archived ? 'Désarchiver' : 'Archiver ce sujet'}
                className="btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal rounded-full px-3 transition-colors text-border hover:bg-alerts/20 hover:text-alerts flex items-center gap-1.5 shrink-0"
              >
                <Archive size={14} />
                {topic.is_archived ? 'Désarchiver' : 'Archiver'}
              </button>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mt-6">{topic.title}</h1>
          <p className="text-sm text-border mt-2 mb-6">
            Par <span className="font-bold text-white">{topic.user?.username || 'Anonyme'}</span> •{' '}
            {new Date(topic.created_at).toLocaleDateString('fr-FR')}
          </p>
          <div className="whitespace-pre-wrap text-[15px] text-white">{topic.content}</div>
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => handleVote('topic', topic.id)}
              className={`flex items-center gap-1.5 btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal rounded-full px-3 transition-colors ${
                topic.user_has_voted ? 'bg-alerts/20 text-alerts' : 'text-border hover:bg-alerts/20 hover:text-alerts'
              }`}
            >
              <ThumbsUp size={14} />
              {topic.votes_count ?? 0}
            </button>
            {!topic.is_pinned && (
              <button
                onClick={() => {
                  if (!isLoggedIn) { router.push('/login'); return }
                  topicPinMutation.mutate(topic.id)
                }}
                title={topic.user_has_pinned ? "Retirer l'épingle" : 'Épingler ce sujet'}
                className={`flex items-center gap-1.5 btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal rounded-full px-3 transition-colors ${
                  topic.user_has_pinned ? 'bg-alerts/20 text-alerts' : 'text-border hover:bg-alerts/20 hover:text-alerts'
                }`}
              >
                <Pin size={14} fill={topic.user_has_pinned ? 'currentColor' : 'none'} />
                {topic.user_has_pinned ? 'Épinglé' : 'Épingler'}
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h2 className="text-xl font-bold text-white mb-4">Participer à la discussion</h2>
          <ReplyForum topicId={topic.id} />
        </div>

        <h2 className="text-xl font-bold text-white">Réponses ({topic.replies?.length || 0})</h2>

        <div className="flex flex-col gap-4">
          {topic.replies && topic.replies.length > 0 ? (() => {
            const replyMap = new Map(topic.replies!.map(r => [r.id, r]))
            return groupReplies(topic.replies!).map((reply) => {
              const parentAuthor = reply.parent_id ? replyMap.get(reply.parent_id)?.user?.username : null
              return (
              <div key={reply.id} className={`border border-border bg-accent rounded-[15px] p-4 ${reply.parent_id ? 'ml-8' : ''}`}>
                <p className="text-sm text-border mb-3">
                  <span className="font-bold text-white">{reply.user?.username || 'Anonyme'}</span> •{' '}
                  {new Date(reply.created_at).toLocaleDateString('fr-FR')}
                  {parentAuthor && (
                    <span className="ml-2 text-[10px] font-bold px-2 py-0.5 bg-muted text-border rounded-full uppercase tracking-wide">
                      ↩ {parentAuthor}
                    </span>
                  )}
                </p>
                <div className="whitespace-pre-wrap text-[14px] text-border mb-4">{reply.content}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVote('reply', reply.id)}
                    className={`flex items-center gap-1.5 btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal rounded-full px-3 transition-colors ${
                      reply.user_has_voted ? 'bg-alerts/20 text-alerts' : 'text-border hover:bg-alerts/20 hover:text-alerts'
                    }`}
                  >
                    <ThumbsUp size={14} />
                    {reply.votes_count ?? 0}
                  </button>
                  {!reply.parent_id && (
                    <button
                      onClick={() => setReplyingTo(reply.id)}
                      className="btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal hover:bg-alerts rounded-full bg-alerts/20 text-alerts"
                    >
                      Répondre
                    </button>
                  )}
                </div>
                {replyingTo === reply.id && (
                  <div className="mt-4">
                    <ReplyForum topicId={topic.id} parentId={reply.id} onCancel={() => setReplyingTo(null)} />
                  </div>
                )}
              </div>
            )})
          })() : (
            <div className="flex justify-center items-center p-10 text-border text-[15px] border border-border bg-accent rounded-[15px]">
              Aucune réponse pour le moment. Soyez le premier !
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
