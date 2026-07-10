'use client'

import { useState } from 'react'
import { LogIn, Hash, Tag, BookOpen, Loader2, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../hooks/useChat'
import { getChannels, type Channel } from '../lib/channels'
import { useQuery } from '@tanstack/react-query'

const ICON_MAP: Record<string, React.ReactNode> = {
  hash: <Hash size={16} />,
  tag: <Tag size={16} />,
  'book-open': <BookOpen size={16} />,
}

export default function ChatPage() {
  const { user, isLoggedIn } = useAuth()
  const [activeRoom, setActiveRoom] = useState('general')
  const { messages, connected, sendMessage } = useChat(activeRoom)
  const [input, setInput] = useState('')

  const { data: channels = [], isLoading: loadingChannels } = useQuery<Channel[]>({
    queryKey: ['channels'],
    queryFn: getChannels,
  })

  const groupedChannels = channels.reduce<Record<string, Channel[]>>((acc, ch) => {
    acc[ch.group] = acc[ch.group] ?? []
    acc[ch.group].push(ch)
    return acc
  }, {})

  const canSend = isLoggedIn && connected
  const activeChannel = channels.find((c) => c.room === activeRoom)

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canSend || !input.trim()) return
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-base-100">
      {/* Sidebar */}
      <aside className="w-72 border-r border-base-300 flex flex-col bg-base-200/30">
        <div className="p-4 border-b border-base-300">
          <h1 className="font-semibold text-lg flex items-center gap-2">
            <Users size={18} className="text-primary" />
            Salons
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {loadingChannels ? (
            <div className="flex justify-center py-10">
              <Loader2 size={20} className="animate-spin text-primary" />
            </div>
          ) : channels.length === 0 ? (
            <p className="text-center text-xs text-base-content/40 px-3 py-6">
              Aucun channel disponible pour le moment.
            </p>
          ) : (
            Object.entries(groupedChannels).map(([group, groupChannels]) => (
              <div key={group} className="mb-5">
                <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                  {group}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {groupChannels.map((channel) => {
                    const isActive = activeRoom === channel.room
                    return (
                      <li key={channel._id}>
                        <button
                          type="button"
                          onClick={() => setActiveRoom(channel.room)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-content font-medium'
                              : 'text-base-content/70 hover:bg-base-300/60 hover:text-base-content'
                          }`}
                        >
                          <span className={isActive ? 'opacity-100' : 'opacity-60'}>
                            {ICON_MAP[channel.icon] ?? <Hash size={16} />}
                          </span>
                          {channel.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-base-300 flex items-center gap-2 text-xs">
          <span className={`relative flex h-2 w-2`}>
            {connected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${connected ? 'bg-success' : 'bg-error'}`} />
          </span>
          <span className="text-base-content/60">{connected ? 'Connecté' : 'Déconnecté'}</span>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        <div className="px-5 py-4 border-b border-base-300 flex items-center gap-2 bg-base-100/50 backdrop-blur-sm">
          <span className="text-primary">
            {activeChannel ? ICON_MAP[activeChannel.icon] ?? <Hash size={18} /> : <Hash size={18} />}
          </span>
          <h2 className="font-semibold">{activeChannel?.label ?? activeRoom}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-2">
              <Hash size={32} className="text-base-content/20" />
              <p className="text-base-content/40 text-sm">
                Aucun message pour l&apos;instant. Soyez le premier à écrire !
              </p>
            </div>
          ) : (
            messages.map((m) => {
              const isMine = m.username === user?.username
              return (
                <div key={m._id} className={`chat ${isMine ? 'chat-end' : 'chat-start'}`}>
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                      <img src={m.avatar_url ?? '/default-avatar.png'} alt={m.username} />
                    </div>
                  </div>
                  <div className="chat-header text-xs opacity-60 mb-0.5">{m.username}</div>
                  <div className={`chat-bubble ${isMine ? 'chat-bubble-primary' : ''}`}>{m.content}</div>
                </div>
              )
            })
          )}
        </div>

        {!isLoggedIn ? (
          <div className="p-4 border-t border-base-300">
            <div className="alert alert-warning text-sm">
              <LogIn size={18} />
              <span>Vous devez être connecté pour envoyer des messages.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-4 border-t border-base-300 flex gap-2">
            <input
              className="input input-bordered flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={connected ? `Écrire dans #${activeChannel?.label ?? activeRoom}...` : 'Connexion en cours...'}
              disabled={!canSend}
            />
            <button type="submit" className="btn btn-primary" disabled={!canSend || !input.trim()}>
              Envoyer
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
