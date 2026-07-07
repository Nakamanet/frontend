// src/app/chat/page.tsx
'use client'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../hooks/useChat'

const CHANNELS = [
  { id: 'general', label: '# general' },
  { id: 'one-piece', label: '📚 One Piece' },
  { id: 'chainsaw-man', label: '📚 Chainsaw Man' },
  { id: 'shonen', label: '🏷️ Shonen' },
]

export default function ChatPage() {
  const { user } = useAuth()
  const [activeRoom, setActiveRoom] = useState('general')
  const { messages, connected, sendMessage } = useChat(activeRoom)
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-base-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-base-300 flex flex-col">
        <div className="p-4 font-semibold text-lg">Channels</div>
        <ul className="menu menu-md flex-1 px-2">
          {CHANNELS.map((c) => (
            <li key={c.id}>
                <a 
                role="button"
                tabIndex={0}
                className={activeRoom === c.id ? 'active' : ''}
                onClick={() => setActiveRoom(c.id)}
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="p-3 text-xs text-base-content/60 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${connected ? 'bg-success' : 'bg-error'}`} />
          {connected ? 'Connected' : 'Disconnected'}
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        <div className="p-4 border-b border-base-300 font-medium">
          {CHANNELS.find((c) => c.id === activeRoom)?.label ?? activeRoom}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((m) => {
            const isMine = m.username === user?.username
            return (
              <div key={m._id} className={`chat ${isMine ? 'chat-end' : 'chat-start'}`}>
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
                <div className={`chat-bubble ${isMine ? 'chat-bubble-primary' : ''}`}>
                  {m.content}
                </div>
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-base-300 flex gap-2">
          <input
            className="input input-bordered flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
          />
          <button type="submit" className="btn btn-primary" disabled={!connected}>
            Send
          </button>
        </form>
      </main>
    </div>
  )
}
