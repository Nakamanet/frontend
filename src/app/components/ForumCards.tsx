'use client'

import { useState } from 'react'
import { Forum } from '../types/forum'
import Link from 'next/link'
import { MessageSquare, Eye, ThumbsUp, Pin, Archive, Ban, Crown, AlertTriangle, EyeOff } from 'lucide-react'
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

  const isSensitive = Boolean(topic.is_hidden)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [isLocallyIgnored, setIsLocallyIgnored] = useState(false)

  const handleIgnoreTopic = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLocallyIgnored(true)
  }

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

  if (isLocallyIgnored) {
    return null
  }

  return (
    <>
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

        {isSensitive && !isRevealed ? (
          <div className="relative my-2 min-h-[140px] rounded-xl overflow-hidden flex items-center justify-center border border-red-500/20 bg-base-100/40">
            <div className="w-full p-4 filter blur-md select-none pointer-events-none transition-all duration-300">
              <h3 className="text-[16px] font-bold text-white leading-snug">{topic.title}</h3>
              <p className="text-[14px] text-text-muted line-clamp-2 mt-1">{topic.content}</p>
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
                  onClick={handleIgnoreTopic}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <EyeOff size={13} className="shrink-0" />
                  <span>Ignorer le sujet</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setShowWarningModal(true)
                  }}
                  className="text-[11px] text-text/40 hover:text-text/80 underline underline-offset-2 transition-colors cursor-pointer mt-0.5"
                >
                  Voir quand même
                </button>
              </div>
            </div>
          </div>
        ) : isSensitive && isRevealed ? (
          <div className="flex flex-col gap-1.5 my-1">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 border border-red-500/30 text-red-300">
                <AlertTriangle size={10} className="text-red-400 shrink-0" />
                Contenu sensible affiché
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsRevealed(false)
                }}
                className="text-[10px] text-text/50 hover:text-text underline cursor-pointer"
              >
                Masquer à nouveau
              </button>
            </div>
            <h3 className="text-[16px] font-bold text-white leading-snug">{topic.title}</h3>
            <p className="text-[14px] text-text-muted line-clamp-2">{topic.content}</p>
          </div>
        ) : (
          <>
            <h3 className="text-[16px] font-bold text-white leading-snug">{topic.title}</h3>
            <p className="text-[14px] text-text-muted line-clamp-2">{topic.content}</p>
          </>
        )}

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

    {showWarningModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setShowWarningModal(false)
        }}
      >
        <div
          className="bg-accent border border-red-500/30 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-center"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-lg text-text">Avertissement de contenu</h3>
            <p className="text-xs text-text/70 leading-relaxed">
              Ce sujet a été signalé par notre modération automatique pour langage inapproprié, contenu vulgaire ou réservé aux adultes (+18).
            </p>
            <p className="text-sm font-semibold text-text pt-1">
              Souhaitez-vous vraiment afficher ce sujet ?
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setShowWarningModal(false)
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-base-100 hover:bg-base-200 border border-border text-text/80 transition-all cursor-pointer active:scale-95"
            >
              Non, garder masqué
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setIsRevealed(true)
                setShowWarningModal(false)
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Oui, afficher le contenu
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}
