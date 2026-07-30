'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import { useChat } from '@/app/hooks/useChat'
import { getDmRoom } from '@/app/lib/dm'

export default function DmPage() {
  const { userId } = useParams()
  const router = useRouter()
  const { user, isLoggedIn } = useAuth()
  const [input, setInput] = useState('')

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
    </div>
  )
}
