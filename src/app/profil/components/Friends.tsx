'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { User } from '../../types/auth'
import { Friendship } from '@/app/types/friends'
import { getFriends, getPendingFriends, getSentFriends, acceptFriend, declineFriend, removeFriend, unblockFriend, getBlockFriends } from '@/app/lib/friends'
import Image from 'next/image'
import { Mail, User2, UserLock, Users } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FilterTab from '@/app/components/FilterTab'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import Link from 'next/link'

function FriendRow({ friend, children }: { friend: { id: number; username: string; avatar_url: string | null }; children: React.ReactNode }) {
  return (
    <div className='flex items-center gap-3 md:gap-8 p-2 mx-2 bg-accent border border-border rounded-card'>
      {friend.avatar_url ? (
        <Image src={friend.avatar_url} alt="pp" width={50} height={50} className="w-12.5 h-12.5 rounded-full object-cover shrink-0" />
      ) : (
        <div className='p-2 bg-accent rounded-full shrink-0'>
          <User2 size={30} />
        </div>
      )}
      <Link className="flex-1 min-w-0" href={`/profil/${friend.id}`}>
        <p className="truncate">{friend.username}</p>
      </Link>
      <div className="flex flex-wrap justify-end gap-1 shrink-0">{children}</div>
    </div>
  )
}

export default function Friends({ user }: { user: User }) {
  const [filter, setFilter] = useState('friends')
  const { showToast } = useToast()
  const [friendToRemove, setFriendToRemove] = useState<{ id: number; username: string } | null>(null)
  const t = useTranslations('friends')

  const FILTER_OPTIONS = [
    { value: 'friends', label: t('filterFriends'), icon: <Users size={18} /> },
    { value: 'block', label: t('filterBlocked'), icon: <UserLock size={18} /> },
    { value: 'invitation', label: t('filterInvitation'), icon: <Mail size={18} /> },
  ]

  const queryClient = useQueryClient()

  const { data: friends = [], isLoading: friendsLoading } = useQuery<Friendship[]>({
    queryKey: ['friends', user.id],
    queryFn: () => getFriends(user.id),
  })

  const { data: pending = [], isLoading: pendingLoading } = useQuery<Friendship[]>({
    queryKey: ['friends', 'pending'],
    queryFn: getPendingFriends,
  })

  const { data: sent = [], isLoading: sentLoading } = useQuery<Friendship[]>({
    queryKey: ['friends', 'sent'],
    queryFn: getSentFriends,
  })

  const { data: block = [], isLoading: blockLoading } = useQuery<Friendship[]>({
    queryKey: ['friends', 'block'],
    queryFn: getBlockFriends,
  })

  const invalidateAll = (content: string, status: "success" | "error" | "info") => {
    queryClient.invalidateQueries({ queryKey: ['friends'] })
    showToast(content, status)
  }

  const acceptMutation = useMutation({
    mutationFn: acceptFriend,
    onSuccess: () => invalidateAll(t('acceptSuccess'), 'success'),
    onError: () => showToast(t('acceptError'), "error")
  })

  const declineMutation = useMutation({
    mutationFn: declineFriend,
    onSuccess: () => invalidateAll(t('declineSuccess'), 'success'),
    onError: () => showToast(t('declineError'), "error")
  })

  const removeMutation = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      invalidateAll(t('removeSuccess'), 'success')
      setFriendToRemove(null)
    },
    onError: () => showToast(t('removeError'), "error")
  })

  const unblockMutation = useMutation({
    mutationFn: unblockFriend,
    onSuccess: () => invalidateAll(t('unblockSuccess'), 'success'),
    onError: () => showToast(t('unblockError'), "error")
  })

  const isLoading = filter === 'friends' ? friendsLoading : filter === 'block' ? blockLoading : pendingLoading || sentLoading

  return (
    <div>
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />

      {isLoading ? (
        <Loader className="m-4 md:m-8" />
      ) : filter === 'friends' ? (
        friends.length > 0 ? (
          <div className='flex flex-col gap-5 p-3 md:p-5 m-2 md:m-8 bg-accent border border-border rounded-card'>
            {friends.map((f) => {
              const friend = f.requester_id === user.id ? f.addressee : f.requester
              return (
                <FriendRow key={f.id} friend={friend}>
                  <button
                    className='btn btn-ghost btn-sm text-primary'
                    onClick={() => setFriendToRemove({ id: f.id, username: friend.username })}
                  >
                    {t('remove')}
                  </button>
                </FriendRow>
              )
            })}
          </div>
        ) : (
          <div className='flex flex-col gap-8 p-3 md:p-5 m-2 md:m-8 bg-accent border border-border rounded-card'>
            <p>{t('noFriends')}</p>
          </div>
        )
      ) : filter === 'block' ? (
        block.length > 0 ? (
          <div className='flex flex-col gap-5 p-3 md:p-5 m-2 md:m-8 bg-accent border border-border rounded-card'>
            {block.map((b) => (
              <FriendRow key={b.id} friend={b.addressee}>
                <button className='btn btn-ghost btn-sm' onClick={() => unblockMutation.mutate(b.id)}>
                  {t('unblock')}
                </button>
              </FriendRow>
            ))}
          </div>
        ) : (
          <div className='flex flex-col gap-8 p-3 md:p-5 m-2 md:m-8 bg-accent border border-border rounded-card'>
            <p>{t('noBlocked')}</p>
          </div>
        )
      ) : filter === 'invitation' ? (
        <div className='flex flex-col gap-5 p-3 md:p-5 m-2 md:m-8 bg-accent border border-border rounded-card'>
          {pending.length === 0 && sent.length === 0 ? (
            <p>{t('noInvitations')}</p>
          ) : (
            <>
              {pending.map((p) => (
                <FriendRow key={p.id} friend={p.requester}>
                  <button className='btn btn-ghost btn-sm' onClick={() => acceptMutation.mutate(p.id)}>{t('accept')}</button>
                  <button className='btn btn-ghost btn-sm' onClick={() => declineMutation.mutate(p.id)}>{t('decline')}</button>
                </FriendRow>
              ))}
              {sent.map((s) => (
                <FriendRow key={s.id} friend={s.addressee}>
                  <button className='btn btn-ghost btn-sm' onClick={() => declineMutation.mutate(s.id)}>{t('cancel')}</button>
                </FriendRow>
              ))}
            </>
          )}
        </div>
      ) : null}

      {friendToRemove && (
        <div className="modal modal-open">
          <div className="modal-box bg-accent border border-border">
            <h3 className="font-bold text-lg">{t('modalTitle')}</h3>
            <p className="py-4 text-text/70">
              {t('modalBody')} <span className="font-semibold text-text">{friendToRemove.username}</span> {t('modalBodySuffix')}
            </p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setFriendToRemove(null)}>
                {t('cancel')}
              </button>
              <button
                className="btn btn-ghost text-primary"
                onClick={() => removeMutation.mutate(friendToRemove.id)}
                disabled={removeMutation.isPending}
              >
                {removeMutation.isPending ? t('removing') : t('remove')}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setFriendToRemove(null)} />
        </div>
      )}
    </div>
  )
}
