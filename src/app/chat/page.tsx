'use client'

import { useState, ReactNode } from 'react'
import { LogIn, Hash, Tag, BookOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../hooks/useChat'

interface Channel {
  id: string
  label: string
  icon: ReactNode
}

const CHANNEL_GROUPS: { title: string; channels: Channel[] }[] = [
  {
    title: 'Général',
    channels: [
      {
        id: 'general',
        label: 'general',
        icon: <Hash size={16} />,
      },
    ],
  },
  {
    title: 'Genres',
    channels: [
      {
        id: 'shonen',
        label: 'Shonen',
        icon: <Tag size={16} />,
      },
      {
        id: 'seinen',
        label: 'Seinen',
        icon: <Tag size={16} />,
      },
    ],
  },
  {
    title: 'Œuvres',
    channels: [
      {
        id: 'one-piece',
        label: 'One Piece',
        icon: <BookOpen size={16} />,
      },
      {
        id: 'chainsaw-man',
        label: 'Chainsaw Man',
        icon: <BookOpen size={16} />,
      },
    ],
  },
]

const ALL_CHANNELS = CHANNEL_GROUPS.flatMap((group) => group.channels)

export default function ChatPage() {
  const { user, isLoggedIn } = useAuth()
  const [activeRoom, setActiveRoom] = useState('general')
  const { messages, connected, sendMessage } = useChat(activeRoom)
  const [input, setInput] = useState('')

  const canSend = isLoggedIn && connected

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!canSend || !input.trim()) return

    sendMessage(input)
    setInput('')
  }

  const activeChannel = ALL_CHANNELS.find((c) => c.id === activeRoom)

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-base-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-base-300 flex flex-col bg-base-200/40">
        <div className="p-4 font-semibold text-lg border-b border-base-300">
          Channels
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {CHANNEL_GROUPS.map((group) => (
            <div key={group.title} className="mb-4">
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wide text-base-content/40">
                {group.title}
              </p>

              <ul className="menu menu-sm gap-0.5">
                {group.channels.map((channel) => (
                  <li key={channel.id}>
                    <a
                      role="button"
                      tabIndex={0}
                      className={`flex items-center gap-2 ${
                        activeRoom === channel.id ? 'active' : ''
                      }`}
                      onClick={() => setActiveRoom(channel.id)}
                    >
                      {channel.icon}
                      {channel.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-base-300 text-xs text-base-content/60 flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              connected ? 'bg-success' : 'bg-error'
            }`}
          />
          {connected ? 'Connecté' : 'Déconnecté'}
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        <div className="p-4 border-b border-base-300 font-medium flex items-center gap-2">
          {activeChannel?.icon}
          {activeChannel?.label ?? activeRoom}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 ? (
            <p className="text-center text-base-content/40 text-sm py-10">
              Aucun message pour l&apos;instant. Soyez le premier à écrire !
            </p>
          ) : (
            messages.map((m) => {
              const isMine = m.username === user?.username

              return (
                <div
                  key={m._id}
                  className={`chat ${isMine ? 'chat-end' : 'chat-start'}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={m.avatar_url ?? '/default-avatar.png'}
                        alt={m.username}
                      />
                    </div>
                  </div>

                  <div className="chat-header text-xs opacity-60">
                    {m.username}
                  </div>

                  <div
                    className={`chat-bubble ${
                      isMine ? 'chat-bubble-primary' : ''
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {!isLoggedIn ? (
          <div className="p-4 border-t border-base-300">
            <div className="alert alert-warning flex items-center gap-2 text-sm">
              <LogIn size={18} />
              <span>
                Vous devez être connecté pour envoyer des messages.
              </span>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-base-300 flex gap-2"
          >
            <input
              className="input input-bordered flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                connected ? 'Message...' : 'Connexion en cours...'
              }
              disabled={!canSend}
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canSend || !input.trim()}
            >
              Envoyer
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
