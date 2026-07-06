'use client'

import { useAuth } from '../context/AuthContext'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { CircleUser, MapPin, Calendar, BookOpen, Users, MessageSquare } from 'lucide-react'
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

  const { data } = useQuery({
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

  if (isAuthLoading) return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  )
  if (!user) redirect('/login')

  return (
    <main className="max-w-[1500px] mx-auto min-h-[80vh] h-full p-13">
      {/* Bannière : même principe que Sidebar */}
      <section className="relative w-full h-[20vh] rounded-[15px] mb-8 overflow-visible">
        <div className="absolute inset-0 bg-primary overflow-hidden rounded-[15px]">
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
          <div className="absolute -bottom-6 left-10 w-18 h-18 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center overflow-hidden z-10 text-base-content/70">
            {user.avatar_url ? (
              <Image src={user.avatar_url} alt="Avatar" width={65} height={65} className="w-full h-full object-cover" />
            ) : (
              <CircleUser size={50} strokeWidth={1.5} />
            )}
          </div>
          <div className="flex flex-col absolute bottom-1 left-30">
            <p className="text-lg text-white font-bold">{user.username}</p>
            <p className="text-white/70">@{user.username}</p>
          </div>
        </div>
      </section>
      {/* main content */}
      <section className="grid grid-cols-4">
        {/* Menu lateral */}
        <div className="w-full h-auto flex flex-col gap-5 py-7 ">
          <div className="flex flex-col justify-center gap-1 bg-accent p-5 border border-border rounded-[15px]">
            <p className="pb-2">{user.bio || 'Pas encore de bio'}</p>
            <p className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" /> {user.localisation || 'Non renseigné'}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={15} className="text-primary" /> Membre depuis le{' '}
              {new Date(user.created_at).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2">
              <BookOpen size={15} className="text-primary" /> {libraryCount} oeuvres suivies
            </p>
            <p className="flex items-center gap-2">
              <Users size={15} className="text-primary" /> {data?.friends_count} amis
            </p>
            <p className="flex items-center gap-2">
              <MessageSquare size={15} className="text-primary" /> {postsCount} posts
            </p>
          </div>
          <div className="px-5 py-2 border border-border rounded-[15px] bg-accent">
            <ul className='flex flex-col gap-1'>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'activities' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => switchTab('activities')}
                >
                  Posts
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'forum' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => switchTab('forum')}
                >
                  Forum
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'friends' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => switchTab('friends')}
                >
                  Amis
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'library' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => switchTab('library')}
                >
                  Bibliothèque
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'groups' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => switchTab('groups')}
                >
                  Groupes
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'profil' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => switchTab('profil')}
                >
                  Paramètres
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* Contenu principal */}
        <div className="col-span-3 min-h-[70vh]">
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
