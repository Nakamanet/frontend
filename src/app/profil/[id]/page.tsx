'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { CircleUser, MapPin, Calendar, BookOpen, Users, MessageSquare, EllipsisVertical, Spool, Ban, ShieldAlert, Crown, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { getUserProfil, getUserPosts } from '../../lib/user'
import Activity from '../components/Activity'
import { blockFriend, removeFriend, sendFriendRequest, unblockFriend } from '@/app/lib/friends'
import Friends from '../components/Friends'
import MyTopics from '../components/MyTopics'
import Library from '../components/Library'
import { User } from '@/app/types/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import SectionSwitcher from '@/app/components/ui/SectionSwitcher'


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
  const isProfileAdmin = Boolean(profileUser.is_admin || profileUser.role === 'admin')
  const isBanned = Boolean(
    profileUser.is_deleted ||
    (profileUser.banned_until && new Date(profileUser.banned_until) > new Date())
  )
  const hasAccess = !!profileUser.role && profileUser.friendship_status !== 'blocked' && profileUser.friendship_status !== 'blocked_by'

  return (
    <main className="max-w-[1500px] mx-auto min-h-[80vh] h-full p-4 md:p-8 lg:p-13 pb-20 md:pb-13">
      {isBanned && (
        <div className="mb-6 p-4 md:p-5 rounded-card bg-gradient-to-r from-red-950/80 via-red-900/40 to-accent border-2 border-red-500/60 flex items-start sm:items-center gap-4 shadow-xl">
          <div className="w-11 h-11 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0 text-red-400 shadow-inner">
            <ShieldAlert size={24} />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-red-400 text-sm md:text-base tracking-wide uppercase">
                Compte désactivé / banni
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/25 text-red-300 border border-red-500/40">
                <Ban size={10} /> Sanction
              </span>
            </div>
            <p className="text-xs md:text-sm text-red-200/90 mt-1 leading-relaxed">
              Ce compte a été désactivé / banni par un modérateur ou administrateur suite à un comportement non conforme aux règles et à la charte de notre plateforme NakamaNet.
            </p>
          </div>
        </div>
      )}

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
          <div className={`absolute -bottom-6 left-4 md:left-10 w-18 h-18 rounded-[10px] bg-muted border-2 flex items-center justify-center overflow-hidden z-10 text-base-content/70 ${
            isProfileAdmin
              ? 'border-red-500 ring-2 ring-red-500/80 shadow-[0_0_12px_rgba(225,16,72,0.5)]'
              : isBanned
              ? 'border-red-600 ring-2 ring-red-600/50 grayscale'
              : 'border-border'
          }`}>
            {profileUser.avatar_url ? (
              <Image
                src={profileUser.avatar_url}
                alt="Avatar"
                width={65}
                height={65}
                className={`w-full h-full object-cover ${isBanned ? 'opacity-60' : ''}`}
              />
            ) : (
              <CircleUser size={50} strokeWidth={1.5} className={isBanned ? 'opacity-60 text-red-400' : ''} />
            )}
            {isBanned && !isProfileAdmin && (
              <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center pointer-events-none">
                <Ban size={28} className="text-red-500 drop-shadow" />
              </div>
            )}
          </div>
          <div className="absolute bottom-2 right-4 md:right-10 flex items-center justify-center z-10 text-base-content/70">
            {isBanned ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-950/70 border border-red-500/40 text-red-300 backdrop-blur-xs">
                <Ban size={13} className="text-red-400" />
                Compte restreint
              </span>
            ) : profileUser.friendship_status === 'none' ? (
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
            ) : profileUser.friendship_status === 'friends' ? (
              <div className='dropdown dropdown-end'>
                <div tabIndex={0} role="button" className="btn btn-ghost border-none hover:bg-transparent hover:border-none focus:bg-transparent focus:border-none">
                  <p><Users size={15} /> Amis</p>
                </div>
                <ul tabIndex={-1} className="menu menu-lg dropdown-content w-auto rounded-box z-1 mt-3 p-2 bg-accent border border-border shadow">
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
            ) : profileUser.friendship_status === 'pending_sent' ? (
              <p>Invitation envoyée</p>
            ) : profileUser.friendship_status === 'pending_received' ? (
              <p>Invitation reçue</p>
            ) : profileUser.friendship_status === 'blocked' ? (
              <button className="btn btn-ghost border-none hover:bg-transparent hover:border-none focus:bg-transparent focus:border-none rounded-full" onClick={() => unblockMutation.mutate()}>Débloquer</button>
            ) : null}
          </div>
          <div className="flex flex-col absolute bottom-1 left-24 md:left-30 max-w-[160px] md:max-w-none">
            {isProfileAdmin && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-red-500/30 via-pink-500/25 to-purple-500/30 border border-red-500/50 text-amber-300 shadow-sm backdrop-blur-md mb-1 w-fit select-none">
                <Crown size={11} className="text-amber-400 fill-amber-400" />
                <span>Créateur • Staff</span>
              </span>
            )}
            {isBanned && !isProfileAdmin && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-950/80 border border-red-500/60 text-red-400 shadow-sm backdrop-blur-md mb-1 w-fit select-none">
                <Ban size={11} className="text-red-400" />
                <span>Compte Banni</span>
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <p className={`text-lg font-bold truncate ${isBanned && !isProfileAdmin ? 'text-red-400 line-through decoration-red-500/50' : ''}`}>
                {profileUser.username}
              </p>
              {isProfileAdmin && (
                <ShieldCheck size={16} className="text-amber-400 fill-amber-400/20 shrink-0" />
              )}
            </div>
            <p className="text-white/70 text-sm truncate">@{profileUser.handle}</p>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-4">
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
        <div className="lg:col-span-3 min-h-[70vh]">
          {!hasAccess
            ? <ProfilAccessNotice status={profileUser.friendship_status} />
            : <>
                {activeTab === 'activities' && <Activity user={profileUser as User} />}
                {activeTab === 'forum' && <MyTopics user={profileUser as User} />}
                {activeTab === 'friends' && <Friends user={profileUser as User} />}
                {activeTab === 'library' && <Library user={profileUser as User} />}
              </>
          }
        </div>
      </section>
    </main>
  )
}
