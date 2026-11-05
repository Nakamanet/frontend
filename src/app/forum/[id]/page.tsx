'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getForumById, voteOnTopic, voteOnReply, pinTopic, archiveTopic } from '@/app/lib/forum'
import ReplyForum from '../components/ReplyForum'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AppLayout from '@/app/components/layout/AppLayout'
import { ThumbsUp, Pin, Archive, Flag, Ban, ShieldAlert, Crown, AlertTriangle, EyeOff } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import type { ForumReply } from '@/app/types/forum'
import Loader from '@/app/components/Loader'
import { useToast } from '@/app/context/ToastContext'
import { reportContent } from '@/app/lib/reports'

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
  const [isTopicRevealed, setIsTopicRevealed] = useState(false)
  const [showTopicModal, setShowTopicModal] = useState(false)
  const [revealedReplyIds, setRevealedReplyIds] = useState<Set<number>>(new Set())
  const [warningReply, setWarningReply] = useState<ForumReply | null>(null)
  const [ignoredReplyIds, setIgnoredReplyIds] = useState<Set<number>>(new Set())

  const handleReport = async (type: 'forum_topic' | 'forum_reply', id: number) => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    try {
      await reportContent(type, id, 'Contenu signalé par un utilisateur')
      showToast(type === 'forum_topic' ? 'Sujet signalé à la modération' : 'Réponse signalée à la modération', 'success')
    } catch {
      showToast('Erreur lors du signalement', 'error')
    }
  }

  const topicVoteMutation = useMutation({
    mutationFn: (id: number) => voteOnTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums', Number(params.id)] })
      queryClient.invalidateQueries({ queryKey: ['user', user?.id, 'forums'] })
    },
    onError: () => showToast("Erreur lors du vote", 'error')
  })

  const topicArchiveMutation = useMutation({
    mutationFn: (id: number) => archiveTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums'] })
      queryClient.invalidateQueries({ queryKey: ['user', topic?.user_id] })
    },
    onError: () => showToast("Erreur lors de l'archivage", 'error')
  })

  const topicPinMutation = useMutation({
    mutationFn: (id: number) => pinTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forums', Number(params.id)] })
      queryClient.invalidateQueries({ queryKey: ['user-pins'] })
      queryClient.invalidateQueries({ queryKey: ['user', user?.id, 'forums'] })
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
        <Loader size="md" color="primary" />
      </AppLayout>
    )
  }

  if (isError || !topic) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center p-10 border border-border bg-accent rounded-card text-text-muted text-[15px] gap-4">
          Impossible de charger ce sujet.
          <Link href="/forum" className="inline-flex items-center justify-center gap-1.5 rounded-full font-bold px-5 py-2.5 text-[15px] bg-primary text-white hover:bg-primary/85 transition-colors">
            Retour au forum
          </Link>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide pb-10">
        <Link href="/forum" className="inline-flex items-center gap-1.5 rounded-full border border-border text-text hover:border-primary hover:bg-primary/10 px-5 py-2.5 text-[15px] font-bold w-fit transition-colors">
          ← Retour au forum
        </Link>

        {topic.is_archived && (
          <div className="flex items-center gap-2 px-4 py-3 bg-border/20 border border-border rounded-card text-text-muted text-sm">
            <Archive size={15} />
            Ce sujet est archivé. Les nouvelles réponses sont désactivées.
          </div>
        )}

        {(() => {
          const isTopicAuthorAdmin = Boolean(topic.user?.is_admin || topic.user?.role === 'admin')
          const isTopicAuthorBanned = Boolean(
            topic.user?.is_deleted ||
            (topic.user?.banned_until && new Date(topic.user.banned_until) > new Date())
          )
          return (
            <div className={`border rounded-card p-6 ${
              isTopicAuthorBanned ? 'border-red-950/80 bg-red-950/15' : 'border-border bg-accent'
            }`}>
              {isTopicAuthorBanned && (
                <div className="mb-4 p-3 rounded-card bg-red-950/60 border border-red-500/50 flex items-center gap-2.5 text-xs text-red-200 shadow-sm">
                  <ShieldAlert size={18} className="text-red-400 shrink-0" />
                  <span>
                    <strong className="text-red-400 uppercase tracking-wide">Compte désactivé / banni :</strong> L&apos;auteur de ce sujet a été suspendu par un modérateur ou administrateur suite au non-respect des règles.
                  </span>
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold px-3 py-1 bg-primary text-white rounded-full uppercase tracking-wide">
                    {topic.category}
                  </span>
                  {isTopicAuthorAdmin && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40 shadow-xs">
                      <Crown size={10} className="text-amber-400 fill-amber-400" />
                      Staff
                    </span>
                  )}
                  {isTopicAuthorBanned && !isTopicAuthorAdmin && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-500/50 shadow-xs">
                      <Ban size={10} className="text-red-400" />
                      Compte Banni
                    </span>
                  )}
                </div>
                {!!user && (user.id === topic.user_id || ['moderator', 'admin'].includes(user.role)) && (
                  <button
                    onClick={() => topicArchiveMutation.mutate(topic.id)}
                    title={topic.is_archived ? 'Désarchiver' : 'Archiver ce sujet'}
                    className="btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal rounded-full px-3 transition-colors text-text-muted hover:bg-primary/20 hover:text-primary flex items-center gap-1.5 shrink-0"
                  >
                    <Archive size={14} />
                    {topic.is_archived ? 'Désarchiver' : 'Archiver'}
                  </button>
                )}
              </div>
              <p className="text-sm text-text-muted mt-2 mb-6 flex items-center gap-1.5 flex-wrap">
                <span>Par</span>
                <Link
                  href={`/profil/${topic.user?.id}`}
                  className={`font-bold hover:underline inline-flex items-center gap-1 ${
                    isTopicAuthorBanned && !isTopicAuthorAdmin
                      ? 'text-red-400 line-through decoration-red-500/50'
                      : 'text-white'
                  }`}
                >
                  {topic.user?.username || 'Anonyme'}
                </Link>
                {isTopicAuthorBanned && !isTopicAuthorAdmin && (
                  <Ban size={13} className="text-red-400 shrink-0" />
                )}
                <span>• {new Date(topic.created_at).toLocaleDateString('fr-FR')}</span>
              </p>

              {topic.is_hidden && !isTopicRevealed ? (
                <div className="relative my-3 min-h-[160px] rounded-xl overflow-hidden flex items-center justify-center border border-red-500/20 bg-base-100/40">
                  <div className="w-full p-4 filter blur-md select-none pointer-events-none transition-all duration-300">
                    <h1 className="text-2xl font-bold text-white">{topic.title}</h1>
                    <div className="whitespace-pre-wrap text-[15px] text-white mt-4">{topic.content}</div>
                  </div>

                  {/* Overlay flou modération IA */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-background/85 backdrop-blur-md text-center gap-2 select-none shadow-lg animate-in fade-in duration-200"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold tracking-wide uppercase shadow-xs">
                      <AlertTriangle size={13} className="text-red-400 shrink-0" />
                      <span>Contenu sensible / vulgaire (+18)</span>
                    </div>

                    <p className="text-xs text-text/70 max-w-sm">
                      Ce sujet a été signalé par l&apos;intelligence artificielle pour langage inapproprié ou contenu sensible.
                    </p>

                    <div className="flex flex-col items-center gap-1.5 mt-1">
                      <button
                        type="button"
                        onClick={() => setShowTopicModal(true)}
                        className="px-4 py-2 text-xs font-semibold rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                      >
                        <EyeOff size={13} className="shrink-0" />
                        <span>Voir quand même</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : topic.is_hidden && isTopicRevealed ? (
                <div className="my-2">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 border border-red-500/30 text-red-300">
                      <AlertTriangle size={10} className="text-red-400 shrink-0" />
                      Contenu sensible affiché
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsTopicRevealed(false)}
                      className="text-[10px] text-text/50 hover:text-text underline cursor-pointer"
                    >
                      Masquer à nouveau
                    </button>
                  </div>
                  <h1 className="text-2xl font-bold text-white">{topic.title}</h1>
                  <div className="whitespace-pre-wrap text-[15px] text-white mt-4">{topic.content}</div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-white mt-6">{topic.title}</h1>
                  <div className="whitespace-pre-wrap text-[15px] text-white mt-4">{topic.content}</div>
                </>
              )}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleVote('topic', topic.id)}
                  className={`flex items-center gap-1.5 btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal rounded-full px-3 transition-colors ${
                    topic.user_has_voted ? 'bg-primary/20 text-primary' : 'text-text-muted hover:bg-primary/20 hover:text-primary'
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
                      topic.user_has_pinned ? 'bg-primary/20 text-primary' : 'text-text-muted hover:bg-primary/20 hover:text-primary'
                    }`}
                  >
                    <Pin size={14} fill={topic.user_has_pinned ? 'currentColor' : 'none'} />
                    {topic.user_has_pinned ? 'Épinglé' : 'Épingler'}
                  </button>
                )}
                <button
                  onClick={() => handleReport('forum_topic', topic.id)}
                  title="Signaler ce sujet à la modération"
                  className="flex items-center gap-1.5 btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal rounded-full px-3 transition-colors text-text-muted hover:bg-red-500/10 hover:text-red-400"
                >
                  <Flag size={14} />
                  Signaler
                </button>
              </div>
            </div>
          )
        })()}

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
              const isReplyAuthorAdmin = Boolean(reply.user?.is_admin || reply.user?.role === 'admin')
              const isReplyAuthorBanned = Boolean(
                reply.user?.is_deleted ||
                (reply.user?.banned_until && new Date(reply.user.banned_until) > new Date())
              )
              const isReplySensitive = Boolean(reply.is_hidden)
              const isReplyRevealed = revealedReplyIds.has(reply.id)
              const isReplyIgnored = ignoredReplyIds.has(reply.id)

              if (isReplyIgnored) {
                return (
                  <div
                    key={reply.id}
                    className={`border border-border/40 bg-accent/40 rounded-card p-3 text-xs text-text-muted flex items-center justify-between ${
                      reply.parent_id ? 'ml-8' : ''
                    }`}
                  >
                    <span className="italic">Cette réponse a été masquée de votre vue.</span>
                    <button
                      type="button"
                      onClick={() => setIgnoredReplyIds(prev => {
                        const next = new Set(prev)
                        next.delete(reply.id)
                        return next
                      })}
                      className="text-primary hover:underline cursor-pointer not-italic"
                    >
                      Restaurer
                    </button>
                  </div>
                )
              }

              return (
              <div
                key={reply.id}
                className={`border rounded-card p-4 ${
                  reply.parent_id ? 'ml-8' : ''
                } ${
                  isReplyAuthorBanned ? 'border-red-950/70 bg-red-950/20' : 'border-border bg-accent'
                }`}
              >
                <div className="flex items-center gap-2 flex-wrap text-sm text-text-muted mb-3">
                  <Link
                    href={`/profil/${reply.user?.id}`}
                    className={`font-bold hover:underline inline-flex items-center gap-1 ${
                      isReplyAuthorBanned && !isReplyAuthorAdmin
                        ? 'text-red-400 line-through decoration-red-500/50'
                        : 'text-white'
                    }`}
                  >
                    {reply.user?.username || 'Anonyme'}
                  </Link>
                  {isReplyAuthorAdmin && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40 shadow-xs">
                      <Crown size={10} className="text-amber-400 fill-amber-400" />
                      Staff
                    </span>
                  )}
                  {isReplyAuthorBanned && !isReplyAuthorAdmin && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-500/40 shadow-xs">
                      <Ban size={10} className="text-red-400" />
                      Banni
                    </span>
                  )}
                  <span>• {new Date(reply.created_at).toLocaleDateString('fr-FR')}</span>
                  {parentAuthor && (
                    <span className="ml-2 text-[10px] font-bold px-2 py-0.5 bg-muted text-text-muted rounded-full uppercase tracking-wide">
                      ↩ {parentAuthor}
                    </span>
                  )}
                </div>

                {isReplySensitive && !isReplyRevealed ? (
                  <div className="relative my-2 min-h-[95px] rounded-xl overflow-hidden flex items-center justify-center border border-red-500/20 bg-base-100/40">
                    <div className="w-full p-3 filter blur-md select-none pointer-events-none transition-all duration-300">
                      <div className="whitespace-pre-wrap text-[14px] text-text-muted">{reply.content}</div>
                    </div>

                    {/* Overlay flou modération IA */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                      }}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center p-3 bg-background/85 backdrop-blur-md text-center gap-1.5 select-none shadow-lg animate-in fade-in duration-200"
                    >
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[11px] font-bold tracking-wide uppercase">
                        <AlertTriangle size={11} className="text-red-400 shrink-0" />
                        <span>Réponse sensible (+18)</span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setIgnoredReplyIds(prev => new Set([...prev, reply.id]))}
                          className="px-3 py-1 text-[11px] font-semibold rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                        >
                          <EyeOff size={11} className="shrink-0" />
                          <span>Ignorer</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setWarningReply(reply)}
                          className="text-[11px] text-text/40 hover:text-text/80 underline underline-offset-2 transition-colors cursor-pointer"
                        >
                          Voir quand même
                        </button>
                      </div>
                    </div>
                  </div>
                ) : isReplySensitive && isReplyRevealed ? (
                  <div className="flex flex-col gap-1 my-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 border border-red-500/30 text-red-300">
                        <AlertTriangle size={10} className="text-red-400 shrink-0" />
                        Contenu sensible affiché
                      </span>
                      <button
                        type="button"
                        onClick={() => setRevealedReplyIds(prev => {
                          const next = new Set(prev)
                          next.delete(reply.id)
                          return next
                        })}
                        className="text-[10px] text-text/50 hover:text-text underline cursor-pointer"
                      >
                        Masquer à nouveau
                      </button>
                    </div>
                    <div className="whitespace-pre-wrap text-[14px] text-text-muted mb-4">{reply.content}</div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-[14px] text-text-muted mb-4">{reply.content}</div>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVote('reply', reply.id)}
                    className={`flex items-center gap-1.5 btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal rounded-full px-3 transition-colors ${
                      reply.user_has_voted ? 'bg-primary/20 text-primary' : 'text-text-muted hover:bg-primary/20 hover:text-primary'
                    }`}
                  >
                    <ThumbsUp size={14} />
                    {reply.votes_count ?? 0}
                  </button>
                  {!reply.parent_id && (
                    <button
                      onClick={() => setReplyingTo(reply.id)}
                      className="btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal hover:bg-primary rounded-full bg-primary/20 text-primary"
                    >
                      Répondre
                    </button>
                  )}
                  <button
                    onClick={() => handleReport('forum_reply', reply.id)}
                    title="Signaler cette réponse à la modération"
                    className="flex items-center gap-1.5 btn btn-ghost border-none btn-xs text-[13px] py-2 font-normal rounded-full px-3 transition-colors text-text-muted hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Flag size={13} />
                    Signaler
                  </button>
                </div>
                {replyingTo === reply.id && (
                  <div className="mt-4">
                    <ReplyForum topicId={topic.id} parentId={reply.id} onCancel={() => setReplyingTo(null)} />
                  </div>
                )}
              </div>
            )})
          })() : (
            <div className="flex justify-center items-center p-10 text-text-muted text-[15px] border border-border bg-accent rounded-card">
              Aucune réponse pour le moment. Soyez le premier !
            </div>
          )}
        </div>
      </div>

      {showTopicModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowTopicModal(false)}
        >
          <div
            className="bg-accent border border-red-500/30 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white">Avertissement de contenu</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Ce sujet a été signalé par notre modération automatique pour langage inapproprié, contenu vulgaire ou réservé aux adultes (+18).
              </p>
              <p className="text-sm font-semibold text-white pt-1">
                Souhaitez-vous vraiment afficher ce sujet ?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowTopicModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-base-100 hover:bg-base-200 border border-border text-white/80 transition-all cursor-pointer active:scale-95"
              >
                Non, garder masqué
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTopicRevealed(true)
                  setShowTopicModal(false)
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Oui, afficher le contenu
              </button>
            </div>
          </div>
        </div>
      )}

      {warningReply && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setWarningReply(null)}
        >
          <div
            className="bg-accent border border-red-500/30 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white">Avertissement de contenu</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Cette réponse a été signalée par notre modération automatique pour langage inapproprié, contenu vulgaire ou réservé aux adultes (+18).
              </p>
              <p className="text-sm font-semibold text-white pt-1">
                Souhaitez-vous vraiment afficher cette réponse ?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setWarningReply(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-base-100 hover:bg-base-200 border border-border text-white/80 transition-all cursor-pointer active:scale-95"
              >
                Non, garder masqué
              </button>
              <button
                type="button"
                onClick={() => {
                  setRevealedReplyIds(prev => new Set([...prev, warningReply.id]))
                  setWarningReply(null)
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Oui, afficher la réponse
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
