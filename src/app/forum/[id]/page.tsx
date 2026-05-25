'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getForumById } from '@/app/lib/forum'
import ReplyForum from '../components/ReplyForum'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AppLayout from '@/app/components/layout/AppLayout'

export default function TopicDetailPage() {
  const params = useParams()
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const { data: topic, isLoading, isError } = useQuery({
    queryKey: ['forums', Number(params.id)],
    queryFn: () => getForumById(Number(params.id)),
    enabled: !!params.id,
  })

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center p-10 border border-border bg-accent rounded-[15px]">
          <span className="loading loading-spinner text-alerts"></span>
        </div>
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

        <div className="border border-border bg-accent rounded-[15px] p-6">
          <span className="text-[10px] font-bold px-3 py-1 bg-alerts text-white rounded-full uppercase tracking-wide">
            {topic.category}
          </span>
          <h1 className="text-2xl font-bold text-white mt-6">{topic.title}</h1>
          <p className="text-sm text-border mt-2 mb-6">
            Par <span className="font-bold text-white">{topic.user?.username || 'Anonyme'}</span> •{' '}
            {new Date(topic.created_at).toLocaleDateString('fr-FR')}
          </p>
          <div className="whitespace-pre-wrap text-[15px] text-white">{topic.content}</div>
        </div>

        <div className="border-t border-border pt-6">
          <h2 className="text-xl font-bold text-white mb-4">Participer à la discussion</h2>
          <ReplyForum topicId={topic.id} />
        </div>

        <h2 className="text-xl font-bold text-white">Réponses ({topic.replies?.length || 0})</h2>

        <div className="flex flex-col gap-4">
          {topic.replies && topic.replies.length > 0 ? (
            topic.replies.map((reply) => (
              <div key={reply.id} className={`border border-border bg-accent rounded-[15px] p-4 ${reply.parent_id ? 'ml-8' : ''}`}>
                <p className="text-sm text-border mb-3">
                  <span className="font-bold text-white">{reply.user?.username || 'Anonyme'}</span> •{' '}
                  {new Date(reply.created_at).toLocaleDateString('fr-FR')}
                  {reply.parent_id && <span className="ml-2 text-[10px] font-bold px-2 py-0.5 bg-muted text-border rounded-full uppercase tracking-wide">Sous-réponse</span>}
                </p>
                <div className="whitespace-pre-wrap text-[14px] text-border mb-4">{reply.content}</div>
                <button
                  onClick={() => setReplyingTo(reply.id)}
                  className="btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal hover:bg-alerts rounded-full bg-alerts/20 text-alerts"
                >
                  Répondre
                </button>
                {replyingTo === reply.id && (
                  <div className="mt-4">
                    <ReplyForum topicId={topic.id} parentId={reply.id} onCancel={() => setReplyingTo(null)} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center p-10 text-border text-[15px] border border-border bg-accent rounded-[15px]">
              Aucune réponse pour le moment. Soyez le premier !
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
