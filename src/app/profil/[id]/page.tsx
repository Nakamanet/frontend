'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { CircleUser, MapPin, Calendar, BookOpen, Users, MessageSquare, EllipsisVertical, Spool } from 'lucide-react'
import { useState } from 'react'
import { getUserProfil, getUserPosts } from '../../lib/user'
import Activity from '../components/Activity'
import { blockFriend, removeFriend, sendFriendRequest, unblockFriend } from '@/app/lib/friends'
import Friends from '../components/Friends'
import { User } from '@/app/types/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import SectionSwitcher from '@/app/components/ui/SectionSwitcher'

import Link from 'next/link'

function ProfilAccessNotice({ status }: { status: User['friendship_status'] | undefined}) {
  switch (status) {
    case 'blocked_by':
      return <p className="text-text/60">Ce compte est restreint</p>
    case 'blocked':
      return <p className="text-text/60">Vous avez bloqué cet utilisateur</p>
    default:
      return <p className="text-text/60">Ce profil est en privé...</p>
  }
}

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState('activities')
  const { id } = useParams()
  const profileKey = ['user', Number(id), 'profile']
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const { data, isLoading } = useQuery({
    queryKey: profileKey,
    queryFn: () => getUserProfil(Number(id)),
    enabled: !!id,
  })
  const profileUser = data ?? null

  const sendRequestMutation = useMutation({
    mutationFn: () => sendFriendRequest(profileUser!.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKey })
      showToast("Utilisateur invité.", "success")
    },
    onError: () => showToast("Echec de l'invitation", "error")
  })

  const unblockMutation = useMutation({
    mutationFn: () => unblockFriend(profileUser!.friendship_id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKey })
      showToast("Utilisateur débloqué.", "success")
    },
    onError: () => showToast("Echec du débloquage", "error")
  })

  const blockMutation = useMutation({
    mutationFn: () => blockFriend(profileUser!.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKey })
      showToast("Utilisateur bloqué.", "success")
    },
    onError: () => showToast("Echec du bloquage", "error")
  })

  const handleBlock = () => {
    const confirmed = confirm('Voulez-vous vraiment bloquer cet utilisateur ?')
    if (confirmed) blockMutation.mutate()
  }

  const removeMutation = useMutation({
    mutationFn: () => removeFriend(profileUser!.friendship_id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKey })
      showToast("Ami supprimé.", "success")
    },
    onError: () => showToast("Echec de la suppression de l'ami", "error")
  })

  const handleRemove = () => {
    const confirmed = confirm('Voulez-vous vraiment supprimer cet ami ?')
    if (confirmed) removeMutation.mutate()
  }

  const { data: postsData } = useQuery({
    queryKey: ['user', Number(id), 'posts'],
    queryFn: () => getUserPosts(Number(id)),
    enabled: !!id,
  })
  const postsCount = postsData?.total ?? 0
  const libraryCount = profileUser?.library_count ?? 0
  const threadCount = profileUser?.topics_count ?? 0
  const friendsCount = profileUser?.friends_count ?? 0

  if (isLoading) return <Loader variant="plain" className="min-h-[80vh]" />
  if (!profileUser) return <div className="flex justify-center p-10">Utilisateur introuvable</div>
  const hasAccess = !!profileUser.role && profileUser.friendship_status !== 'blocked' && profileUser.friendship_status !== 'blocked_by'

  return (
    <main className="max-w-[1500px] mx-auto min-h-[80vh] h-full p-4 md:p-13 pb-20 md:pb-13">
      <section className="relative w-full h-40 md:h-[20vh] rounded-card mb-8 overflow-visible">
        <div className="absolute inset-0 bg-primary overflow-hidden rounded-card">
          {profileUser.banner_url ? (
            <Image
              src={profileUser.banner_url}
              alt="Bannière"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1500px"
            />
          ) : null}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60" />
        </div>
        <div className="relative z-10 flex items-end p-5 h-full gap-4">
          <div className="absolute -bottom-6 left-4 md:left-10 w-18 h-18 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center overflow-hidden z-10 text-base-content/70">
            {profileUser.avatar_url ? (
              <Image src={profileUser.avatar_url} alt="Avatar" width={65} height={65} className="w-full h-full object-cover" />
            ) : (
              <CircleUser size={50} strokeWidth={1.5} />
            )}
          </div>
          <div className="absolute bottom-2 right-4 md:right-10 flex items-center justify-center z-10 text-base-content/70">
            {profileUser.friendship_status === 'none' && (
              <div className='dropdown dropdown-end'>
                <div tabIndex={0} role="button" className="btn btn-ghost border-none hover:bg-transparent hover:border-none focus:bg-transparent focus:border-none">
                  <EllipsisVertical size={20} />
                </div>
                <ul tabIndex={-1} className="menu menu-lg dropdown-content w-auto rounded-box z-1 mt-3 p-2 bg-accent border border-border shadow">
                  <li>
                    <button className="btn btn-ghost text-sm border-none rounded-full" onClick={() => sendRequestMutation.mutate()}>
                      Demande d&apos;ami
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-ghost text-sm border-none rounded-full text-primary" onClick={handleBlock}>
                      Bloquer
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {profileUser.friendship_status === 'friends' && (
              <div className='dropdown dropdown-end'>
                <div tabIndex={0} role="button" className="btn btn-ghost border-none hover:bg-transparent hover:border-none focus:bg-transparent focus:border-none">
                  <p><Users size={15} /> Amis</p>
                </div>
                <ul tabIndex={-1} className="menu menu-lg dropdown-content w-auto rounded-box z-1 mt-3 p-2 bg-accent border border-border shadow">
                  <li>
                    <Link
                      href={`/messages/${profileUser.id}`}
                      className="btn btn-ghost border-none rounded-full flex items-center gap-1"
                    >
                      <MessageSquare size={16} />
                      Message
                    </Link>
                  </li>
                  <li>
                    <button className="btn btn-ghost text-sm border-none rounded-full text-primary" onClick={handleRemove}>
                      Supprimer l&apos;ami
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-ghost text-sm border-none rounded-full text-primary" onClick={handleBlock}>
                      Bloquer
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {profileUser.friendship_status === 'pending_sent' && (
              <p>Invitation envoyée</p>
            )}
            {profileUser.friendship_status === 'pending_received' && (
              <p>Invitation reçue</p>
            )}
            {profileUser.friendship_status === 'blocked' && (
              <button className="btn btn-ghost border-none hover:bg-transparent hover:border-none focus:bg-transparent focus:border-none rounded-full" onClick={() => unblockMutation.mutate()}>Débloquer</button>
            )}
          </div>
          <div className="flex flex-col absolute bottom-1 left-24 md:left-30 max-w-[130px] md:max-w-none">
            <p className="text-lg truncate">{profileUser.username}</p>
            <p className="text-white/70 truncate">@{profileUser.username}</p>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-4">
        <div className="w-full h-auto flex flex-col gap-5 py-7">
          <div className="flex flex-col justify-center gap-1 bg-accent p-5 border border-border rounded-card">
            <p className="pb-2 whitespace-pre-wrap">{profileUser.bio || 'Pas encore de bio'}</p>
            <p className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" /> {profileUser.localisation || 'Non renseigné'}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={15} className="text-primary" /> Membre depuis le{' '}
              {new Date(profileUser.created_at!).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2">
              <BookOpen size={15} className="text-primary" /> {libraryCount} oeuvres suivies
            </p>
            <p className="flex items-center gap-2">
              <Users size={15} className="text-primary" /> {friendsCount} amis
            </p>
            <p className="flex items-center gap-2">
              <Spool size={15} className="text-primary" /> {threadCount} sujets
            </p>
            <p className="flex items-center gap-2">
              <MessageSquare size={15} className="text-primary" /> {postsCount} posts
            </p>
          </div>
          {hasAccess && (
            <SectionSwitcher
              items={[
                { id: 'activities', label: 'Posts' },
                { id: 'forum', label: 'Forum' },
                { id: 'friends', label: 'Amis' },
                { id: 'library', label: 'Bibliothèque' },
              ]}
              active={activeTab}
              onChange={setActiveTab}
            />
          )}
        </div>
        <div className="md:col-span-3 min-h-[70vh]">
          {!hasAccess
            ? <ProfilAccessNotice status={profileUser.friendship_status} />
            : <>
                {activeTab === 'activities' && <Activity user={profileUser as User} />}
                {activeTab === 'forum' && <p className="p-7">Forum à venir</p>}
                {activeTab === 'friends' && <Friends user={profileUser as User} />}
                {activeTab === 'library' && <p className="p-7">Bibliothèque</p>}
              </>
          }
        </div>
      </section>
    </main>
  )
}
