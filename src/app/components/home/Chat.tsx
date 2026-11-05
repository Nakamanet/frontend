'use client'
import { useState, useEffect, useRef } from 'react'
import { Smile, SendHorizonal, CircleUser, Ban, Crown } from 'lucide-react'
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
              const isMe = user && message.username === user.username
              const isBanned = Boolean(message.is_banned || (isMe && isSelfBanned))
              const isAdmin = Boolean(message.is_admin || (isMe && (user?.is_admin || user?.role === 'admin')))

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
                      <p className="text-sm break-words">
                        <EmoteText text={message.content} />
                      </p>
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
    </div>
  )
}
