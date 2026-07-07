'use client'
import { useState, useEffect, useRef } from 'react'
import { Smile, SendHorizonal, CircleUser } from 'lucide-react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { User } from '../../types/auth'
import { useChat } from '@/app/hooks/useChat'

export default function Chat({ user }: { user: User | null }) {
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
    <div className="flex flex-col w-full bg-accent h-auto py-2 shadow-sm border border-border rounded-[15px]">
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
              return (
                <div key={message._id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden bg-muted border-2 border-border flex items-center justify-center">
                    {message.avatar_url ? (
                      <Image
                        src={message.avatar_url}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CircleUser size={18} strokeWidth={1.5} className="text-base-content/70" />
                    )}
                  </div>
                  <div className={`flex flex-col gap-0.5 max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`px-3 py-2 rounded-2xl ${isMe ? 'bg-primary rounded-tr-md' : 'bg-muted rounded-tl-md'}`}>
                      <p className="text-xs font-medium opacity-90">{isMe ? 'Moi' : message.username}</p>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-base-content/60 px-1">
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: fr })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-2 mx-2 mt-2 p-2 bg-muted rounded-full border border-border">
            <Smile size={20} className="text-text/50 shrink-0 hover:text-primary transition-colors cursor-pointer" />
            <input
              type="text"
              placeholder="Envoyer un message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="input input-ghost w-full bg-transparent text-sm text-text placeholder:text-text/40 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              className="btn btn-circle btn-ghost btn-sm bg-primary hover:bg-primary/80 shrink-0 transition-colors"
            >
              <SendHorizonal size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
