'use client'

import { useState } from 'react'
import { PublicUser } from '../../types/auth'
import { Friendship } from '@/app/types/friends'
import { getFriends, getPendingFriends, getSentFriends, acceptFriend, declineFriend, removeFriend, unblockFriend, getBlockFriends } from '@/app/lib/friends'
import Image from 'next/image'
import { Mail, User2, UserLock, Users } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FilterTab from '@/app/components/FilterTab'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import Link from 'next/link'

const FILTER_OPTIONS = [
  { value: 'friends', label: 'Amis', icon: <Users size={18} /> },
  { value: 'block', label: 'Bloqué', icon: <UserLock size={18} /> },
  { value: 'invitation', label: 'Invitation', icon: <Mail size={18} /> },
]

function FriendRow({ friend, children }: { friend: { id: number; username: string; avatar_url: string | null }; children: React.ReactNode }) {
  return (
    <div className='flex items-center gap-8 p-2 mx-2 bg-accent border border-border rounded-[15px]'>
      {friend.avatar_url ? (
        <Image src={friend.avatar_url} alt="pp" width={50} height={50} />
      ) : (
        <div className='p-2 bg-accent rounded-full'>
          <User2 size={30} />
        </div>
      )}
      <Link className="flex-1" href={`/profil/${friend.id}`}>
        <p>{friend.username}</p>
      </Link>
      {children}
    </div>
  )
}

export default function Friends({ user }: { user: PublicUser }) {
  const [filter, setFilter] = useState('friends')
  const { showToast } = useToast()
  const [friendToRemove, setFriendToRemove] = useState<{ id: number; username: string } | null>(null)

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
    onSuccess: () => invalidateAll("Demande accepté.", 'success'),
    onError: () => showToast("Erreur lors de l'acceptation.", "error")
  })

  const declineMutation = useMutation({
    mutationFn: declineFriend,
    onSuccess: () => invalidateAll("Demande refusé.", 'success'),
    onError: () => showToast("Erreur lors du refus.", "error")
  })

  const removeMutation = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      invalidateAll("Ami supprimé.", 'success')
      setFriendToRemove(null)
    },
    onError: () => showToast("Erreur lors de la suppression", "error")
  })

  const unblockMutation = useMutation({
    mutationFn: unblockFriend,
    onSuccess: () => invalidateAll("Utilisateur débloqué.", 'success'),
    onError: () => showToast("Erreur lors du débloquage", "error")
  })

  const isLoading = filter === 'friends' ? friendsLoading : filter === 'block' ? blockLoading : pendingLoading || sentLoading

  return (
    <div>
      <FilterTab value={filter} onChange={setFilter} options={FILTER_OPTIONS} />

      {isLoading ? (
        <Loader className="m-8" />
      ) : filter === 'friends' ? (
        friends.length > 0 ? (
          <div className='flex flex-col gap-5 p-5 m-8 bg-accent border border-border rounded-[15px]'>
            {friends.map((f) => {
              const friend = f.requester_id === user.id ? f.addressee : f.requester
              return (
                <FriendRow key={f.id} friend={friend}>
                  <button
                    className='btn btn-ghost btn-sm'
                    onClick={() => setFriendToRemove({ id: f.id, username: friend.username })}
                  >
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
          <div className='flex flex-col gap-5 p-5 m-8 bg-accent border border-border rounded-[15px]'>
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
            <p>Vous n&apos;avez encore bloqué personne vous êtes encore une bonne personne !</p>
          </div>
        )
      ) : filter === 'invitation' ? (
        <div className='flex flex-col gap-5 p-5 m-8 bg-accent border border-border rounded-[15px]'>
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
      ) : null}

      {/* Confirmation modal for removing a friend */}
      {friendToRemove && (
        <div className="modal modal-open">
          <div className="modal-box bg-accent border border-border">
            <h3 className="font-bold text-lg">Supprimer cet ami ?</h3>
            <p className="py-4 text-text/70">
              Voulez-vous vraiment supprimer <span className="font-semibold text-text">{friendToRemove.username}</span> de vos amis ?
            </p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setFriendToRemove(null)}>
                Annuler
              </button>
              <button
                className="btn btn-error"
                onClick={() => removeMutation.mutate(friendToRemove.id)}
                disabled={removeMutation.isPending}
              >
                {removeMutation.isPending ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setFriendToRemove(null)} />
        </div>
      )}
    </div>
  )
}
