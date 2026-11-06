'use client'
import { useState, useEffect, useRef } from 'react'
import { Smile, SendHorizonal, CircleUser, Ban, Crown, AlertTriangle, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { User } from '../../types/auth'
import { useChat } from '@/app/hooks/useChat'
import Button from '@/app/components/ui/Button'
import AnimeEmojiPicker from '../AnimeEmojiPicker'
import EmoteText from '../EmoteText'

export default function Chat({ user }: { user: User | null }) {
  const { messages, connected, sendMessage } = useChat('general', { allowGuest: true })
  const router = useRouter()
  const goToLogin = () => router.push('/login')
  const [input, setInput] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const isSelfBanned = Boolean(
    user?.is_deleted || (user?.banned_until && new Date(user.banned_until) > new Date())
  )

  const [revealedMessageIds, setRevealedMessageIds] = useState<Set<string>>(new Set())
  const [warningMessage, setWarningMessage] = useState<any | null>(null)
  const [ignoredMessageIds, setIgnoredMessageIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) container.scrollTop = container.scrollHeight
  }, [messages])

  const handleSend = () => {
    if (!user) return goToLogin()
    if (isSelfBanned) return
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="flex flex-col w-full bg-accent h-auto py-2 shadow-sm border border-border rounded-card">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-3 pr-5">
          <div className="flex">
            <span className="text-primary text-4xl px-3">#</span>
            <p className="text-xl py-2">Général</p>
          </div>
          <p className={`text-xs font-medium ${connected ? 'text-green-400' : 'text-primary'}`}>
            {connected ? '● en ligne' : 'X en lignes'}
          </p>
        </div>
        <div>
          <div ref={messagesContainerRef} className="flex flex-col gap-2 max-h-[280px] h-[280px] px-2 pb-2 overflow-y-auto scrollbar-hide">
            {messages.map((message) => {
              if (ignoredMessageIds.has(message._id)) return null
              const isMe = user && message.username === user.username
              const isBanned = Boolean(message.is_banned || (isMe && isSelfBanned))
              const isAdmin = Boolean(message.is_admin || (isMe && (user?.is_admin || user?.role === 'admin')))
              const isSensitive = Boolean(message.is_hidden)
              const isRevealed = revealedMessageIds.has(message._id)

              return (
                <div key={message._id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''} ${isBanned ? 'opacity-85' : ''}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-full overflow-hidden bg-muted border-2 flex items-center justify-center ${
                    isAdmin
                      ? 'border-red-500 ring-2 ring-red-500/50 shadow-[0_0_8px_rgba(225,16,72,0.4)]'
                      : isBanned
                      ? 'grayscale border-red-500/70 opacity-70'
                      : 'border-border'
                  }`}>
                    {message.avatar_url ? (
                      <Image
                        src={message.avatar_url}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CircleUser size={18} strokeWidth={1.5} className={isBanned ? 'text-red-400' : 'text-base-content/70'} />
                    )}
                  </div>
                  <div className={`flex flex-col gap-0.5 max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`px-3 py-2 rounded-2xl ${
                      isMe
                        ? 'bg-primary rounded-tr-md'
                        : isBanned
                        ? 'bg-red-950/40 border border-red-500/40 text-red-200 rounded-tl-md'
                        : 'bg-muted rounded-tl-md'
                    }`}>
                      <div className={`flex items-center gap-1.5 flex-wrap mb-0.5 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <p className={`text-xs font-medium ${isBanned ? 'text-red-400 line-through decoration-red-500/60' : 'opacity-90'}`}>
                          {isMe ? 'Moi' : message.username}
                        </p>
                        {isAdmin && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-500/20 text-amber-300 border border-red-500/30">
                            <Crown size={9} className="text-amber-400 fill-amber-400" />
                            Staff
                          </span>
                        )}
                        {isBanned && !isAdmin && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-500/40">
                            <Ban size={8} /> Banni
                          </span>
                        )}
                      </div>
                      {isSensitive && !isRevealed ? (
                        <div className="flex flex-col gap-1 py-1">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-bold tracking-wide uppercase w-fit">
                            <AlertTriangle size={11} className="text-red-400 shrink-0" />
                            <span>Message sensible (+18)</span>
                          </div>
                          <div className="filter blur-sm select-none pointer-events-none opacity-40 text-sm break-words my-0.5">
                            <EmoteText text={message.content} />
                          </div>
                          <div className="flex items-center gap-2 pt-0.5 text-[10px]">
                            <button
                              type="button"
                              onClick={() => setWarningMessage(message)}
                              className="text-text/60 hover:text-text underline cursor-pointer"
                            >
                              Voir quand même
                            </button>
                            <button
                              type="button"
                              onClick={() => setIgnoredMessageIds(prev => new Set([...prev, message._id]))}
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
                                n.delete(message._id)
                                return n
                              })}
                              className="text-text/50 hover:text-text underline cursor-pointer"
                            >
                              Masquer
                            </button>
                          </div>
                          <p className="text-sm break-words">
                            <EmoteText text={message.content} />
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm break-words">
                          <EmoteText text={message.content} />
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-base-content/60 px-1">
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: fr })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {isSelfBanned ? (
            <div className="p-2.5 mx-2 mt-2 rounded-xl border border-red-500/40 bg-red-950/30 text-red-300 text-xs flex items-center gap-2">
              <Ban size={15} className="text-red-400 shrink-0" />
              <span>Votre compte est suspendu. Envoi désactivé.</span>
            </div>
          ) : (
            <div className="relative mx-2 mt-2">
              {showEmojiPicker && (
                <AnimeEmojiPicker
                  onSelect={(emoji) => {
                    setInput((prev) => (prev ? `${prev} ${emoji} ` : `${emoji} `))
                  }}
                  onClose={() => setShowEmojiPicker(false)}
                  placement="top"
                  align="right"
                  className="w-72 sm:w-80 max-w-[calc(100vw-2rem)] right-0 left-auto"
                />
              )}
              <div className="flex items-center gap-2 p-2 bg-muted rounded-full border border-border">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className={`transition-colors cursor-pointer shrink-0 p-0.5 rounded-full ${
                    showEmojiPicker ? 'text-primary' : 'text-text/50 hover:text-primary'
                  }`}
                  title="Ajouter un emoji ou emote anime"
                >
                  <Smile size={20} />
                </button>
                <input
                  type="text"
                  placeholder={user ? 'Envoyer un message' : 'Connectez-vous pour écrire'}
                  value={input}
                  readOnly={!user}
                  onFocus={() => !user && goToLogin()}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="input input-ghost w-full bg-transparent text-sm text-text placeholder:text-text/40 focus:outline-none"
                />
                <Button type="button" variant="icon" onClick={handleSend} aria-label="Envoyer">
                  <SendHorizonal size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

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
              <h3 className="font-bold text-lg text-text">Avertissement de contenu</h3>
              <p className="text-xs text-text/70 leading-relaxed">
                Ce message a été signalé par l&apos;intelligence artificielle pour langage inapproprié, contenu vulgaire ou réservé aux adultes (+18).
              </p>
              <p className="text-sm font-semibold text-text pt-1">
                Souhaitez-vous vraiment afficher ce message ?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setWarningMessage(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-base-100 hover:bg-base-200 border border-border text-text/80 transition-all cursor-pointer active:scale-95"
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
