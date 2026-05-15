'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { CircleUser, MapPin, Calendar, BookOpen, Users, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { getUserProfil } from '../../lib/user'
import Activity from '../components/Activity'
import { useQuery } from '@tanstack/react-query'
import Friends from '../components/Friends'

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState('activities')
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['user', Number(id), 'profile'],
    queryFn: () => getUserProfil(Number(id)),
    enabled: !!id,
  })
  const profileUser = data ?? null

  if (isLoading) return <div className="flex justify-center p-10">Chargement...</div>
  if (!profileUser) return <div className="flex justify-center p-10">Utilisateur introuvable</div>
  const hasAccess = !!profileUser.role

  return (
    <main className="max-w-[1500px] mx-auto min-h-[80vh] h-full p-13">
      <section className="relative w-full h-[20vh] rounded-[15px] mb-8 overflow-visible">
        <div className="absolute inset-0 bg-primary overflow-hidden rounded-[15px]">
          {profileUser.banner_url ? (
            <Image
              src={profileUser.banner_url}
              alt="Bannière"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1500px"
            />
          ) : null}
        </div>
        <div className="relative z-10 flex items-end p-5 h-full gap-4">
          <p className="absolute -bottom-3 left-10 bg-accent p-1 rounded-[15px]">
            {profileUser.avatar_url ? (
              <Image src={profileUser.avatar_url} alt="Avatar" width={60} height={60} />
            ) : (
              <CircleUser size={50} strokeWidth={1.5} className="p-3" />
            )}
          </p>
          <div className="flex flex-col absolute bottom-1 left-30">
            <p className="text-lg">{profileUser.username}</p>
            <p className="text-border">@{profileUser.username}</p>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-4">
        <div className="w-full h-auto flex flex-col gap-5 py-7">
          <div className="flex flex-col justify-center gap-1 bg-accent p-5 border border-border rounded-[15px]">
            <p className="pb-2">{profileUser.bio || 'Pas encore de bio'}</p>
            <p className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" /> {profileUser.localisation || 'Non renseigné'}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={15} className="text-primary" /> Membre depuis le{' '}
              {new Date(profileUser.created_at!).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2">
              <BookOpen size={15} className="text-primary" /> {profileUser.library_count} oeuvres suivies
            </p>
            <p className="flex items-center gap-2">
              <Users size={15} className="text-primary" /> {profileUser.friends_count} amis
            </p>
            <p className="flex items-center gap-2">
              <MessageSquare size={15} className="text-primary" /> {profileUser.posts_count} posts
            </p>
          </div>
          <div className="px-5 py-2 border border-border rounded-[15px] bg-accent">
            <ul className='flex flex-col gap-1'>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'activities' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('activities')}
                  disabled={!hasAccess}
                >
                  Posts
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'forum' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('forum')}
                  disabled={!hasAccess}
                >
                  Forum
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'friends' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('friends')}
                  disabled={!hasAccess}
                >
                  Amis
                </button>
              </li>
              <li>
                <button
                  className={`btn btn-ghost btn-xs text-sm px-5 border-none rounded-full ${activeTab === 'library' ? 'bg-primary text-primary-content' : 'text-border'}`}
                  onClick={() => setActiveTab('library')}
                  disabled={!hasAccess}
                >
                  Bibliothèque
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-3 min-h-[70vh]">
          {!hasAccess 
            ? <p>Ce profil est en privé...</p>
            : <>
                {activeTab === 'activities' && <Activity user={profileUser} />}
                {activeTab === 'forum' && <p className="p-7">Forum à venir</p>}
                {activeTab === 'friends' && <Friends user={profileUser} />}
                {activeTab === 'library' && <p className="p-7">Bibliothèque</p>}
              </>
          }
        </div>
      </section>
    </main>
  )
}
