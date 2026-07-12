'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { MessageSquare, CircleUser } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import { getMyDms, getOtherUserId } from '@/app/lib/dm'
import Loader from '@/app/components/Loader'

export default function MessagesPage() {
  const { user, isLoggedIn } = useAuth()

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ['dms'],
    queryFn: getMyDms,
    enabled: !!user,
  })

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-base-content/60">Vous devez être connecté pour voir vos messages.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <MessageSquare size={22} className="text-primary" />
        Messages
      </h1>

      {isLoading ? (
        <Loader />
      ) : conversations.length === 0 ? (
        <p className="text-base-content/60 text-sm">
          Aucune conversation pour l&apos;instant. Rendez-vous sur le profil de quelqu&apos;un pour lui écrire.
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {conversations.map((conv) => {
            const otherUserId = getOtherUserId(conv._id, user!.id)
            const isMine = conv.lastMessage.username === user?.username
            return (
              <Link
                key={conv._id}
                href={`/messages/${otherUserId}`}
                className="flex items-center gap-3 p-3 rounded-[15px] hover:bg-base-200/60 transition-colors border border-border bg-accent"
              >
                <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70">
                  {conv.lastMessage.avatar_url ? (
                    <Image
                      src={conv.lastMessage.avatar_url}
                      alt={conv.lastMessage.username}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CircleUser size={22} strokeWidth={1.5} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {isMine ? 'Vous' : conv.lastMessage.username}
                  </p>
                  <p className="text-xs text-base-content/60 truncate">{conv.lastMessage.content}</p>
                </div>
                <span className="text-xs text-base-content/40 shrink-0">
                  {formatDistanceToNow(new Date(conv.lastMessage.created_at), { addSuffix: true, locale: fr })}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
