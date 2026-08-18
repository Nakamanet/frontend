'use client'

import { useState } from 'react'
import { LogIn, Hash, Tag, BookOpen, Users, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../hooks/useChat'
import { getChannels, type Channel } from '../lib/channels'
import { useQuery } from '@tanstack/react-query'
import Button from '../components/ui/Button'
import Loader from '../components/Loader'
import SectionSwitcher from '../components/ui/SectionSwitcher'
import { useTranslations } from 'next-intl'

const ICON_MAP: Record<string, React.ReactNode> = {
  hash: <Hash size={16} />,
  tag: <Tag size={16} />,
  'book-open': <BookOpen size={16} />,
}

export default function ChatPage() {
  const t = useTranslations('chat')
  const { user, isLoggedIn } = useAuth()
  const [activeRoom, setActiveRoom] = useState('general')
  const { messages, connected, sendMessage } = useChat(activeRoom)
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
            {t('channels')}
          </h1>
          <button
            type="button"
            className="md:hidden btn btn-ghost btn-sm btn-circle"
            onClick={() => setSidebarOpen(false)}
            aria-label={t('close')}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {loadingChannels ? (
            <div className="flex justify-center py-10">
              <Loader variant="inline" size="sm" />
            </div>
          ) : channels.length === 0 ? (
            <p className="text-center text-xs text-base-content/40 px-3 py-6">
              {t('noChannels')}
            </p>
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
          <span className="relative flex h-2 w-2">
            {connected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${connected ? 'bg-success' : 'bg-error'}`} />
          </span>
          <span className="text-base-content/60">
            {connected ? t('connected') : t('disconnected')}
          </span>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        <div className="px-5 py-4 border-b border-base-300 flex items-center gap-2 bg-base-100/50 backdrop-blur-sm">
          <button
            type="button"
            className="md:hidden btn btn-ghost btn-sm btn-circle"
            onClick={() => setSidebarOpen(true)}
            aria-label={t('channels')}
          >
            <Menu size={18} />
          </button>
          <span className="text-primary">
            {activeChannel ? ICON_MAP[activeChannel.icon] ?? <Hash size={18} /> : <Hash size={18} />}
          </span>
          <h2 className="font-semibold">{activeChannel?.label ?? activeRoom}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-2">
              <Hash size={32} className="text-base-content/20" />
              <p className="text-base-content/40 text-sm">{t('noMessages')}</p>
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
              <span>{t('loginToSend')}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-4 border-t border-base-300 flex gap-2">
            <input
              className="input input-bordered flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                connected
                  ? t('inputPlaceholder', { channel: activeChannel?.label ?? activeRoom })
                  : t('connecting')
              }
              disabled={!canSend}
            />
            <Button type="submit" disabled={!canSend || !input.trim()}>
              {t('send')}
            </Button>
          </form>
        )}
      </main>
    </div>
  )
}
