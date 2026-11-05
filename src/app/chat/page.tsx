'use client'

import { useState } from 'react'
import { LogIn, Hash, Tag, BookOpen, Users, Menu, X, Smile, Ban, CircleUser } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useChat, GUEST_MESSAGE_LIMIT } from '../hooks/useChat'
import { getChannels, type Channel } from '../lib/channels'
import { useQuery } from '@tanstack/react-query'
import Button from '../components/ui/Button'
import Loader from '../components/Loader'
import SectionSwitcher from '../components/ui/SectionSwitcher'
import AnimeEmojiPicker from '../components/AnimeEmojiPicker'
import EmoteText from '../components/EmoteText'

const ICON_MAP: Record<string, React.ReactNode> = {
  hash: <Hash size={16} />,
  tag: <Tag size={16} />,
  'book-open': <BookOpen size={16} />,
}

export default function ChatPage() {
  const { user, isLoggedIn } = useAuth()
  const isSelfBanned = Boolean(user?.is_deleted || (user?.banned_until && new Date(user.banned_until) > new Date()))
  const [activeRoom, setActiveRoom] = useState('general')
  const { messages, connected, sendMessage } = useChat(activeRoom, { allowGuest: true })
  const [input, setInput] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data: fetchedChannels = [], isLoading: loadingChannels } = useQuery<Channel[]>({
    queryKey: ['channels'],
    queryFn: getChannels,
  })

  const generalChannel = fetchedChannels.find((c) => c.room === 'general') ?? {
    _id: 'general',
    room: 'general',
    label: 'Général',
    group: 'Général',
    icon: 'hash',
    created_by: '',
    created_at: '',
  }
  const channels = [generalChannel, ...fetchedChannels.filter((c) => c.room !== 'general')]

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
    <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] bg-base-100">
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'flex' : 'hidden'} md:flex w-72 max-w-[85vw] border-r border-base-300 flex-col bg-base-200/30 fixed md:static inset-y-0 left-0 z-60 md:z-auto`}
      >
        <div className="p-4 border-b border-base-300 flex items-center justify-between">
          <h1 className="font-semibold text-lg flex items-center gap-2">
            <Users size={18} className="text-primary" />
            Salons
          </h1>
          <button type="button" className="md:hidden btn btn-ghost btn-sm btn-circle" onClick={() => setSidebarOpen(false)} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {loadingChannels ? (
            <div className="flex justify-center py-10">
              <Loader variant="inline" size="sm" />
            </div>
          ) : (
            Object.entries(groupedChannels).map(([group, groupChannels]) => (
              <div key={group} className="mb-5">
                <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                  {group}
                </p>
                <SectionSwitcher
                  bordered={false}
                  active={activeRoom}
                  onChange={(room) => { setActiveRoom(room); setSidebarOpen(false) }}
                  items={groupChannels.map((channel) => ({
                    id: channel.room,
                    label: channel.label,
                    icon: ICON_MAP[channel.icon] ?? <Hash size={16} />,
                  }))}
                />
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
          <button type="button" className="md:hidden btn btn-ghost btn-sm btn-circle" onClick={() => setSidebarOpen(true)} aria-label="Salons">
            <Menu size={18} />
          </button>
          <span className="text-primary">
            {activeChannel ? ICON_MAP[activeChannel.icon] ?? <Hash size={18} /> : <Hash size={18} />}
          </span>
          <h2 className="font-semibold">{activeChannel?.label ?? activeRoom}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {!isLoggedIn && messages.length > 0 && (
            <p className="text-center text-xs text-base-content/50 pb-2">
              Seuls les {GUEST_MESSAGE_LIMIT} derniers messages sont visibles. Connectez-vous pour consulter tout l&apos;historique.
            </p>
          )}
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
              const isBanned = Boolean(m.is_banned || (isMine && isSelfBanned))
              const isAdmin = Boolean(m.is_admin || (isMine && (user?.is_admin || user?.role === 'admin')))
              return (
                <div key={m._id} className={`chat ${isMine ? 'chat-end' : 'chat-start'} ${isBanned ? 'opacity-75' : ''}`}>
                  <div className="chat-image avatar">
                    <div className={`w-8 h-8 rounded-full bg-muted flex! items-center justify-center ${
                      isAdmin ? 'ring-2 ring-red-500/80 shadow-[0_0_8px_rgba(225,16,72,0.4)]' : isBanned ? 'grayscale border border-red-500/70' : 'border-2 border-border'
                    }`}>
                      {m.avatar_url ? (
                        <img src={m.avatar_url} alt={m.username} />
                      ) : (
                        <CircleUser size={18} strokeWidth={1.5} className={isBanned ? 'text-red-400' : 'text-base-content/70'} />
                      )}
                    </div>
                  </div>
                  <div className="chat-header text-xs opacity-80 mb-0.5 flex items-center gap-1.5 flex-wrap">
                    <span className={isBanned ? 'text-red-400 line-through decoration-red-500/50' : ''}>
                      {m.username}
                    </span>
                    {isAdmin && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-500/20 text-amber-300 border border-red-500/30">
                        Staff
                      </span>
                    )}
                    {isBanned && !isAdmin && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-500/40">
                        <Ban size={8} /> Banni
                      </span>
                    )}
                  </div>
                  <div className={`chat-bubble break-words ${
                    isMine ? 'chat-bubble-primary' : isBanned ? 'border border-red-950/70 bg-red-950/30 text-red-200' : ''
                  }`}>
                    <EmoteText text={m.content} />
                  </div>
                </div>
              )
            })
          )}
        </div>

        {isSelfBanned ? (
          <div className="p-4 border-t border-base-300">
            <div className="alert border-red-500/50 bg-red-950/40 text-red-300 text-sm flex items-center gap-2">
              <Ban size={18} className="text-red-400 shrink-0" />
              <span>Votre compte est actuellement suspendu. Vous ne pouvez pas envoyer de messages.</span>
            </div>
          </div>
        ) : !isLoggedIn ? (
          <div className="p-4 border-t border-base-300">
            <div className="alert alert-warning text-sm">
              <LogIn size={18} />
              <span>Vous devez être connecté pour envoyer des messages.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-4 border-t border-base-300 flex items-center gap-2 relative">
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  showEmojiPicker ? 'text-primary bg-primary/10' : 'text-base-content/60 hover:text-primary'
                }`}
                title="Ajouter un emoji ou emote anime"
              >
                <Smile size={20} />
              </button>
              {showEmojiPicker && (
                <AnimeEmojiPicker
                  onSelect={(emoji) => {
                    setInput((prev) => (prev ? `${prev} ${emoji} ` : `${emoji} `))
                  }}
                  onClose={() => setShowEmojiPicker(false)}
                  align="left"
                  placement="top"
                />
              )}
            </div>
            <input
              className="input input-bordered flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={connected ? `Écrire dans #${activeChannel?.label ?? activeRoom}...` : 'Connexion en cours...'}
              disabled={!canSend}
            />
            <Button type="submit" disabled={!canSend || !input.trim()}>
              Envoyer
            </Button>
          </form>
        )}
      </main>
    </div>
  )
}
