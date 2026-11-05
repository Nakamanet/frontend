'use client'

import { useAuth } from '../context/AuthContext'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { CircleUser, MapPin, Calendar, BookOpen, Users, MessageSquare, Spool, Crown, ShieldCheck, Ban, ShieldAlert } from 'lucide-react'
import Profile from './components/Profile'
import Activity from './components/Activity'
import MyTopics from './components/MyTopics'
import Friends from './components/Friends'
import Library from './components/Library'
import Groups from './components/Groups'
import { useQuery, useQueries } from '@tanstack/react-query'
import { getUserProfil, getUserPosts } from '../lib/user'
import { getMyAnime, getMyManga } from '../lib/library'
import { useSyncExternalStore } from 'react'
import Loader from '@/app/components/Loader'
import Card from '@/app/components/ui/Card'
import SectionSwitcher from '@/app/components/ui/SectionSwitcher'

function useHash() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('hashchange', onChange)
      window.addEventListener('popstate', onChange)
      return () => {
        window.removeEventListener('hashchange', onChange)
        window.removeEventListener('popstate', onChange)
      }
    },
    () => window.location.hash.replace('#', ''),
    () => '',
  )
}

const HASH_TO_TAB: Record<string, string> = {
  activities:   'activities',
  forum:        'forum',
  amis:         'friends',
  bibliotheque: 'library',
  groupes:      'groups',
  parametres:   'profil',
}

const TAB_TO_HASH: Record<string, string> = {
  activities: 'activities',
  forum:      'forum',
  friends:    'amis',
  library:    'bibliotheque',
  groups:     'groupes',
  profil:     'parametres',
}

export default function ProfilPage() {
  const { user, isAuthLoading } = useAuth()
  const hash = useHash()
  const activeTab = HASH_TO_TAB[hash] ?? 'activities'

  const switchTab = (tab: string) => {
    window.location.hash = TAB_TO_HASH[tab]
  }

  const { data, isLoading: profileLoading } = useQuery({
    queryKey: ['user', user?.id ?? 0, 'profile'],
    queryFn: () => getUserProfil(user!.id),
    enabled: !!user?.id,
  })

  const results = useQueries({
    queries: [
      { queryKey: ['user', user?.id ?? 0, 'posts'], queryFn: () => getUserPosts(user!.id), enabled: !!user?.id },
      { queryKey: ['library', 'anime'], queryFn: getMyAnime, enabled: !!user?.id },
      { queryKey: ['library', 'manga'], queryFn: getMyManga, enabled: !!user?.id },
    ],
  })
  const postsCount = results[0]?.data?.total ?? 0
  const libraryCount = (results[1]?.data?.length ?? 0) + (results[2]?.data?.length ?? 0)
  const postsLoading = results[0]?.isLoading
  const libraryLoading = results[1]?.isLoading || results[2]?.isLoading

  if (isAuthLoading) return (
    <Loader variant="plain" className="min-h-[80vh]" />
  )
  if (!user) redirect('/login')

  const isSelfAdmin = Boolean(user.is_admin || user.role === 'admin')
  const isSelfBanned = Boolean(
    user.is_deleted ||
    (user.banned_until && new Date(user.banned_until) > new Date())
  )

  return (
    <main className="max-w-[1500px] mx-auto min-h-[80vh] h-full p-4 md:p-8 lg:p-13 pb-20 md:pb-13">
      {isSelfBanned && (
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
              Votre compte a été désactivé / banni par un modérateur ou administrateur suite à un comportement non conforme aux règles et à la charte de notre plateforme NakamaNet.
            </p>
          </div>
        </div>
      )}

      {/* Bannière : même principe que Sidebar */}
      <section className="relative w-full h-40 md:h-[20vh] rounded-card mb-8 overflow-visible">
        <div className="absolute inset-0 bg-primary overflow-hidden rounded-card">
          {user?.banner_url ? (
            <Image
              src={user.banner_url}
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
            isSelfAdmin
              ? 'border-red-500 ring-2 ring-red-500/80 shadow-[0_0_12px_rgba(225,16,72,0.5)]'
              : isSelfBanned
              ? 'border-red-600 ring-2 ring-red-600/50 grayscale'
              : 'border-border'
          }`}>
            {user.avatar_url ? (
              <Image src={user.avatar_url} alt="Avatar" width={65} height={65} className={`w-full h-full object-cover ${isSelfBanned ? 'opacity-60' : ''}`} />
            ) : (
              <CircleUser size={50} strokeWidth={1.5} className={isSelfBanned ? 'opacity-60 text-red-400' : ''} />
            )}
            {isSelfBanned && !isSelfAdmin && (
              <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center pointer-events-none">
                <Ban size={28} className="text-red-500 drop-shadow" />
              </div>
            )}
          </div>
          <div className="flex flex-col absolute bottom-1 left-24 md:left-30">
            {isSelfAdmin && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-red-500/30 via-pink-500/25 to-purple-500/30 border border-red-500/50 text-amber-300 shadow-sm backdrop-blur-md mb-1 w-fit select-none">
                <Crown size={11} className="text-amber-400 fill-amber-400" />
                <span>Créateur • Staff</span>
              </span>
            )}
            {isSelfBanned && !isSelfAdmin && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-950/80 border border-red-500/60 text-red-400 shadow-sm backdrop-blur-md mb-1 w-fit select-none">
                <Ban size={11} className="text-red-400" />
                <span>Compte Banni</span>
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <p className={`text-lg font-bold truncate ${isSelfBanned && !isSelfAdmin ? 'text-red-400 line-through decoration-red-500/50' : 'text-white'}`}>
                {user.username}
              </p>
              {isSelfAdmin && (
                <ShieldCheck size={16} className="text-amber-400 fill-amber-400/20 shrink-0" />
              )}
            </div>
            <p className="text-white/70">@{user.handle}</p>
          </div>
        </div>
      </section>
      {/* main content */}
      <section className="grid grid-cols-1 lg:grid-cols-4">
        {/* Menu lateral */}
        <div className="w-full h-auto flex flex-col gap-5 py-7 ">
          <Card className="flex flex-col justify-center gap-1">
            <p className="pb-2 whitespace-pre-wrap">{user.bio || 'Pas encore de bio'}</p>
            <p className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" /> {user.localisation || 'Non renseigné'}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={15} className="text-primary" /> Membre depuis le{' '}
              {new Date(user.created_at).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2">
              <BookOpen size={15} className="text-primary" /> {libraryLoading ? <Loader variant="inline" size="xs" /> : libraryCount} oeuvres suivies
            </p>
            <p className="flex items-center gap-2">
              <Users size={15} className="text-primary" /> {profileLoading ? <Loader variant="inline" size="xs" /> : data?.friends_count} amis
            </p>
            <p className="flex items-center gap-2">
              <Spool size={15} className="text-primary" /> {profileLoading ? <Loader variant="inline" size="xs" /> : data?.topics_count} sujets
            </p>
            <p className="flex items-center gap-2">
              <MessageSquare size={15} className="text-primary" /> {postsLoading ? <Loader variant="inline" size="xs" /> : postsCount} posts
            </p>
          </Card>
          <SectionSwitcher
            items={[
              { id: 'activities', label: 'Posts' },
              { id: 'forum', label: 'Forum' },
              { id: 'friends', label: 'Amis' },
              { id: 'library', label: 'Bibliothèque' },
              { id: 'groups', label: 'Groupes' },
              { id: 'profil', label: 'Paramètres' },
            ]}
            active={activeTab}
            onChange={switchTab}
          />
        </div>
        {/* Contenu principal */}
        <div className="lg:col-span-3 min-h-[70vh]">
          {activeTab === 'activities' && <Activity user={user} />}
          {/* A faire plus tard */}
          {activeTab === 'forum' && <MyTopics user={user} />}
          {activeTab === 'friends' && <Friends user={user} />}
          {activeTab === 'library' && <Library />}
          {activeTab === 'groups' && <Groups user={user} />}
          {activeTab === 'profil' && <Profile user={user} />}
        </div>
      </section>
    </main>
  )
}
