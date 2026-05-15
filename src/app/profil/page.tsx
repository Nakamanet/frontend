'use client'

import { useAuth } from '../context/AuthContext'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { CircleUser, MapPin, Calendar, BookOpen, Users, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import Profile from './components/Profile'
import Activity from './components/Activity'
import MyTopics from './components/MyTopics'
import Friends from './components/Friends'
import Library from './components/Library'
import Groups from './components/Groups'
import { useQuery } from '@tanstack/react-query'
import { getUserProfil } from '../lib/user'

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState('activities')
  const { user } = useAuth()

  if (!user) redirect('/login')

  const { data, isLoading } = useQuery({
    queryKey: ['user', user.id, 'profile'],
    queryFn: () => getUserProfil(user.id),
    enabled: !!user.id,
  })

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
        </div>
        <div className="relative z-10 flex items-end p-5 h-full gap-4">
          <p className="absolute -bottom-3 left-10 bg-accent p-1 rounded-[15px]">
            {user.avatar_url ? (
              <Image src={user.avatar_url} alt="Avatar" width={60} height={60} />
            ) : (
              <CircleUser size={50} strokeWidth={1.5} className="p-3" />
            )}
          </p>
          <div className="flex flex-col absolute bottom-1 left-30">
            <p className="text-lg">{user.username}</p>
            <p className="text-border">@{user.username}</p>
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
              <BookOpen size={15} className="text-primary" /> {data?.library_count} oeuvres suivies
            </p>
            <p className="flex items-center gap-2">
              <Users size={15} className="text-primary" /> {data?.friends_count} amis
            </p>
            <p className="flex items-center gap-2">
              <MessageSquare size={15} className="text-primary" /> {data?.posts_count} posts
            </p>
          </div>
          <div className="px-5 py-2 border border-border rounded-[15px] bg-accent">
            <ul className='flex flex-col gap-1'>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'activities' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('activities')}
                >
                  Posts
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'forum' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('forum')}
                >
                  Forum
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'friends' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('friends')}
                >
                  Amis
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'library' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('library')}
                >
                  Bibliothèque
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'groups' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('groups')}
                >
                  Groupes
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'profil' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('profil')}
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
