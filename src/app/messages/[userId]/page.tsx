'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, CircleUser, AlertTriangle, EyeOff } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import { useChat } from '@/app/hooks/useChat'
import { getDmRoom } from '@/app/lib/dm'

export default function DmPage() {
  const { userId } = useParams()
  const router = useRouter()
  const { user, isLoggedIn } = useAuth()
  const [input, setInput] = useState('')
  const [revealedMessageIds, setRevealedMessageIds] = useState<Set<string>>(new Set())
  const [warningMessage, setWarningMessage] = useState<any | null>(null)
  const [ignoredMessageIds, setIgnoredMessageIds] = useState<Set<string>>(new Set())

  const room = user ? getDmRoom(user.id, userId as string) : ''
  const { messages, connected, sendMessage } = useChat(room)

  const canSend = isLoggedIn && connected

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canSend || !input.trim()) return
    sendMessage(input)
    setInput('')
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
        <p className="text-base-content/60">Vous devez être connecté pour voir vos messages.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] bg-base-100">
      <div className="px-5 py-4 border-b border-base-300 flex items-center gap-3">
        <button onClick={() => router.push('/messages')} className="btn btn-ghost btn-sm btn-circle">
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-semibold">Conversation</h2>
        <span className={`ml-auto w-2 h-2 rounded-full ${connected ? 'bg-success' : 'bg-error'}`} />
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.length === 0 ? (
          <p className="text-center text-base-content/40 text-sm py-10">
            Aucun message. Dites bonjour !
          </p>
        ) : (
          messages.map((m) => {
            if (ignoredMessageIds.has(m._id)) return null
            const isMine = m.username === user?.username
            const isSensitive = Boolean(m.is_hidden)
            const isRevealed = revealedMessageIds.has(m._id)

            return (
              <div key={m._id} className={`chat ${isMine ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-border flex! items-center justify-center">
                    {m.avatar_url ? (
                      <img src={m.avatar_url} alt={m.username} />
                    ) : (
                      <CircleUser size={18} strokeWidth={1.5} className="text-base-content/70" />
                    )}
                  </div>
                </div>
                <div className="chat-header text-xs opacity-60 mb-0.5">{m.username}</div>
                <div className={`chat-bubble break-words ${isMine ? 'chat-bubble-primary' : ''}`}>
                  {isSensitive && !isRevealed ? (
                    <div className="flex flex-col gap-1 py-1">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-bold tracking-wide uppercase w-fit">
                        <AlertTriangle size={11} className="text-red-400 shrink-0" />
                        <span>Message sensible (+18)</span>
                      </div>
                      <div className="filter blur-sm select-none pointer-events-none opacity-40 my-0.5">
                        {m.content}
                      </div>
                      <div className="flex items-center gap-2 pt-0.5 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setWarningMessage(m)}
                          className="text-text/70 hover:text-text underline cursor-pointer"
                        >
                          Voir quand même
                        </button>
                        <button
                          type="button"
                          onClick={() => setIgnoredMessageIds(prev => new Set([...prev, m._id]))}
                          className="text-red-400/80 hover:text-red-400 underline cursor-pointer"
                        >
                          Ignorer
                        </button>
                      </div>
                    </div>
                  ) : isSensitive && isRevealed ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-1 text-[10px] text-red-400/90 mb-0.5">
                        <span className="flex items-center gap-1 font-medium">
                          <AlertTriangle size={10} />
                          Sensible (+18)
                        </span>
                        <button
                          type="button"
                          onClick={() => setRevealedMessageIds(prev => {
                            const n = new Set(prev)
                            n.delete(m._id)
                            return n
                          })}
                          className="text-text/50 hover:text-text underline cursor-pointer"
                        >
                          Masquer
                        </button>
                      </div>
                      {m.content}
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-base-300 flex gap-2">
        <input
          className="input input-bordered flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={connected ? 'Message...' : 'Connexion en cours...'}
          disabled={!canSend}
        />
        <button type="submit" className="btn btn-primary" disabled={!canSend || !input.trim()}>
          Envoyer
        </button>
      </form>

      {warningMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setWarningMessage(null)}
        >
          <div
            className="bg-accent border border-red-500/30 p-6 rounded-2xl max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white">Avertissement de contenu</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Ce message a été signalé par notre système de modération automatique pour langage inapproprié, contenu vulgaire ou réservé aux adultes (+18).
              </p>
              <p className="text-sm font-semibold text-white pt-1">
                Souhaitez-vous vraiment afficher ce message ?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setWarningMessage(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-base-100 hover:bg-base-200 border border-border text-white/80 transition-all cursor-pointer active:scale-95"
              >
                Non, garder masqué
              </button>
              <button
                type="button"
                onClick={() => {
                  setRevealedMessageIds(prev => new Set([...prev, warningMessage._id]))
                  setWarningMessage(null)
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Oui, afficher le message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
