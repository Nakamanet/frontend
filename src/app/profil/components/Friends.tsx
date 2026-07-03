'use client'

import { User } from '../../types/auth'
import { Friendship } from '@/app/types/friends'
import { getFriends, getPendingFriends, getSentFriends, acceptFriend, declineFriend, removeFriend, unblockFriend, getBlockFriends } from '@/app/lib/friends'
import Image from 'next/image'
import { Mail, User2, UserLock, Users } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import FilterTab from '@/app/components/FilterTab'

const FILTER_OPTIONS = [
  { value: 'friends', label: 'Amis', icon: <Users size={18} /> },
  { value: 'block', label: 'Bloqué', icon: <UserLock size={18} /> },
  { value: 'invitation', label: 'Invitation', icon: <Mail size={18} /> },
]

function FriendRow({ friend, children }: { friend: { id: number; username: string; avatar_url: string | null }; children: React.ReactNode }) {
  return (
    <div className='flex items-center gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]'>
      {friend.avatar_url ? (
        <Image src={friend.avatar_url} alt="pp" width={50} height={50} />
      ) : (
        <div className='p-2 bg-accent rounded-full'>
          <User2 size={30} />
        </div>
      )}
      <p className="flex-1">{friend.username}</p>
      {children}
    </div>
  )
}

export default function Friends({ user }: { user: User }) {
  const [filter, setFilter] = useState('friends')

  const queryClient = useQueryClient()
  const { data: friends = [], isLoading: friendsLoading } = useQuery<Friendship[]>({
    queryKey: ['friends'],
    queryFn: getFriends,
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

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['friends'] })
  }

  const acceptMutation = useMutation({
    mutationFn: acceptFriend,
    onSuccess: invalidateAll,
  })

  const declineMutation = useMutation({
    mutationFn: declineFriend,
    onSuccess: invalidateAll,
  })

  const removeMutation = useMutation({
    mutationFn: removeFriend,
    onSuccess: invalidateAll,
  })

  const unblockMutation = useMutation({
    mutationFn: unblockFriend,
    onSuccess: invalidateAll,
  })

  const isLoading = filter === 'friends' ? friendsLoading : filter === 'block' ? blockLoading : pendingLoading || sentLoading

  return (
    <div>
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />

      {isLoading ? (
        <div className="flex justify-center items-center p-10 m-8 border border-border bg-accent rounded-[15px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filter === 'friends' ? (
        friends.length > 0 ? (
          <div className='flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]'>
            {friends.map((f) => {
              const friend = f.requester_id === user.id ? f.addressee : f.requester
              return (
                <FriendRow key={f.id} friend={friend}>
                  <button className='btn btn-ghost btn-sm' onClick={() => removeMutation.mutate(f.id)}>
                    Supprimer
                  </button>
                </FriendRow>
              )
            })}
          </div>
        ) : (
          <div className='flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]'>
            <p>Vous n&apos;avez pas encore d&apos;ami, n&apos;hésitez pas a en ajouter afin de pouvoir discuter avec eux ou encore voir leurs oeuvres préférés</p>
          </div>
        )
      ) : filter === 'block' ? (
        block.length > 0 ? (
          <div className='flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]'>
            {block.map((b) => (
              <FriendRow key={b.id} friend={b.addressee}>
                <button className='btn btn-ghost btn-sm' onClick={() => unblockMutation.mutate(b.id)}>
                  Débloquer
                </button>
              </FriendRow>
            ))}
          </div>
        ) : (
          <div className='flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]'>
            <p>Vous n&apos;avez pas encore d&apos;ami, n&apos;hésitez pas a en ajouter afin de pouvoir discuter avec eux ou encore voir leurs oeuvres préférés</p>
          </div>
        )
      ) : filter === 'invitation' ? (
        <div className='flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]'>
          {pending.length === 0 && sent.length === 0 ? (
            <p>Aucune invitation en cours</p>
          ) : (
            <>
              {pending.map((p) => (
                <FriendRow key={p.id} friend={p.requester}>
                  <button className='btn btn-ghost btn-sm' onClick={() => acceptMutation.mutate(p.id)}>Accepter</button>
                  <button className='btn btn-ghost btn-sm' onClick={() => declineMutation.mutate(p.id)}>Refuser</button>                  
                </FriendRow>
              ))}
              {sent.map((s) => (
                <FriendRow key={s.id} friend={s.addressee}>
                  <button className='btn btn-ghost btn-sm' onClick={() => declineMutation.mutate(s.id)}>Annuler</button>
                </FriendRow>
              ))}
            </>
          )}
        </div>
      ) : null }
    </div>
  )
}
