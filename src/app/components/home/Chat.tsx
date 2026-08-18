'use client'
import { useState, useEffect, useRef } from 'react'
import { Smile, SendHorizonal, CircleUser } from 'lucide-react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { User } from '../../types/auth'
import { useChat } from '@/app/hooks/useChat'
import Button from '@/app/components/ui/Button'
import { useTranslations, useLocale } from 'next-intl'

export default function Chat({ user }: { user: User | null }) {
  const t = useTranslations('chatWidget')
  const locale = useLocale()
  const dateLocale = locale === 'fr' ? fr : enUS

  const { messages, connected, sendMessage } = useChat('general')
  const [input, setInput] = useState('')
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) container.scrollTop = container.scrollHeight
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="flex flex-col w-full bg-accent border border-border rounded-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="text-primary font-bold text-lg leading-none">#</span>
          <p className="text-sm font-semibold">{t('channelName')}</p>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-medium">
          <span className={`relative flex h-1.5 w-1.5`}>
            {connected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            )}
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${connected ? 'bg-success' : 'bg-error'}`} />
          </span>
          <span className={connected ? 'text-success' : 'text-error'}>
            {connected ? t('online') : t('offline')}
          </span>
        </span>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col gap-2 h-[260px] px-2 py-2 overflow-y-auto scrollbar-hide"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-base-content/40">{t('empty')}</p>
          </div>
        ) : (
          messages.map((message) => {
            const isMe = user && message.username === user.username
            return (
              <div key={message._id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden bg-muted border border-border flex items-center justify-center">
                  {message.avatar_url ? (
                    <Image
                      src={message.avatar_url}
                      alt="Avatar"
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CircleUser size={16} strokeWidth={1.5} className="text-base-content/70" />
                  )}
                </div>
                <div className={`flex flex-col gap-0.5 max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`px-2.5 py-1.5 rounded-2xl ${isMe ? 'bg-primary rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                    <p className="text-[11px] font-medium opacity-75 mb-0.5">
                      {isMe ? t('me') : message.username}
                    </p>
                    <p className="text-xs leading-snug">{message.content}</p>
                  </div>
                  <p className="text-[10px] text-base-content/40 px-1">
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: dateLocale })}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-1.5 mx-2 mb-2 px-2 py-1 bg-muted rounded-full border border-border">
        <Smile size={16} className="text-text/40 shrink-0 hover:text-primary transition-colors cursor-pointer" />
        <input
          type="text"
          placeholder={t('placeholder')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="input input-ghost w-full min-w-0 bg-transparent text-xs text-text placeholder:text-text/35 focus:outline-none py-1"
        />
        <Button type="button" variant="icon" onClick={handleSend} aria-label={t('send')}>
          <SendHorizonal size={15} />
        </Button>
      </div>
    </div>
  )
}
