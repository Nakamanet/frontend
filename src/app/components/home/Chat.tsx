import { Smile, SendHorizonal, CircleUser } from 'lucide-react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { User } from '../../types/auth'

export default function Chat({ user }: { user: User | null }) {
  const chatMessages = [
    {
      id: 1,
      username: 'John Doe',
      content: 'Comming soon...',
      avatar_url: '/logo.png',
      created_at: '2026-03-10T12:00:00.000000Z',
    },
    {
      id: 2,
      username: 'Jane Doe',
      content: 'Comming soon...',
      created_at: '2026-03-10T13:00:00.000000Z',
    },
    {
      id: 3,
      username: user?.username,
      content: 'Le chat arriveras dans une prochaine mise à jour',
      created_at: '2026-03-10T13:00:00.000000Z',
    },
    {
      id: 4,
      username: user?.username,
      content: 'Le chat arriveras dans une prochaine mise à jour',
      created_at: '2026-03-10T13:00:00.000000Z',
    },
    {
      id: 5,
      username: user?.username,
      content: 'Le chat arriveras dans une prochaine mise à jour',
      created_at: '2026-03-10T13:00:00.000000Z',
    },
    {
      id: 6,
      username: user?.username,
      content: 'Le chat arriveras dans une prochaine mise à jour',
      created_at: '2026-03-10T13:00:00.000000Z',
    },
  ]

  return (
    <div className="flex flex-col w-full bg-accent h-auto py-2 shadow-sm border border-border rounded-[15px]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-3 pr-5">
          <div className="flex">
            <span className="text-primary text-4xl px-3">#</span>
            <p className="text-xl py-2">Général</p>
          </div>
          <p className="text-primary">X en lignes</p>
        </div>
        <div>
          <div className="flex flex-col gap-2 max-h-[280px] h-[280px] px-2 pb-2 overflow-y-auto scrollbar-hide">
            {chatMessages.map((message) => {
              const isMe = user && message.username === user.username
              return (
                <div key={message.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
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
                  {/* Bulle + heure */}
                  <div className={`flex flex-col gap-0.5 max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-3 py-2 rounded-2xl ${
                        isMe ? 'bg-primary rounded-tr-md' : 'bg-muted rounded-tl-md'
                      }`}
                    >
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
            <Smile size={20} className="text-border shrink-0" />
            <input
              type="text"
              placeholder="Envoyer un message"
              className="input input-ghost w-full bg-transparent text-sm text-border focus:outline-none"
            />
            <button type="button" className="btn btn-circle btn-ghost btn-sm bg-primary shrink-0">
              <SendHorizonal size={18} className="text-primary-content" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
