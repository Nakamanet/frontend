'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, Bell, User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { CircleUser } from 'lucide-react'
import { useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getNotifications, getUnreadCount, markAllAsRead, markAsRead } from '@/app/lib/notifications'
import SearchModal from '../SearchModal'
import { useRouter } from 'next/navigation'
import { useToast } from '@/app/context/ToastContext'
import { acceptFriend } from '@/app/lib/friends'
import Loader from '@/app/components/Loader'

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { showToast } = useToast()
  const DAY_MS = 24 * 60 * 60 * 1000

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: getUnreadCount,
    refetchInterval: 30000,
  })

  const { data: notifications, isLoading: notificationsLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    select: (data) => ({
      ...data,
      data: data.data.filter(
        (n) => !n.is_read || Date.now() - new Date(n.updated_at).getTime() < DAY_MS
      )
    }),
    refetchInterval: 30000,
  })

  const notificationsList = notifications?.data ?? []

  const invalidateNotifications = () => {
    queryClient.invalidateQueries({ queryKey: ['notifications']})
  }

  const acceptMutation = useMutation({
    mutationFn: acceptFriend,
    onSuccess:() => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['friends'] })
      showToast("Invitation accepté.", "success")
    },
    onError: () => showToast("Erreur lors de l'acceptation.", "error")
  })

  const markAsReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: invalidateNotifications,
    onError: () => showToast("Erreur lors de la lecture des notifications", "error")
  })

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: invalidateNotifications,
    onError: () => showToast("Erreur lors de la lecture des notifications", "error")
  })


  return (
    <header className="w-full border-b border-border bg-accent">
      <div className="navbar justify-between p-2 text-xl max-w-[1500px] mx-auto">
        <div className="pl-4 md:pl-10">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={120} height={150} />
          </Link>
        </div>

        {/* Nav links - desktop only */}
        <div className="hidden md:flex gap-20">
          <Link href="/bibliotheque" className="hover:text-primary transition-colors">Bibliothèque</Link>
          <Link href="/forum" className="hover:text-primary transition-colors">Forum</Link>
          <Link href="/chat" className="hover:text-primary transition-colors">Chat</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 pr-4 md:pr-10">
          {isLoggedIn && user ? (
            <>
            {/* Search */}
              <span className='tooltip tooltip-bottom hidden md:block' data-tip="Recherche">
                <Search
                  size={27}
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setSearchModalOpen(true)}
                />
              </span>
              {/* Notifications */}
              <div className='dropdown dropdown-end relative hidden md:block tooltip tooltip-bottom' data-tip="Notifications">
                <div tabIndex={0} role='button' className='relative'>
                  <Bell size={27} className="cursor-pointer hover:text-primary transition-colors" />
                  {unreadCount > 0 && (
                    <span className='absolute -top-1 -right-1 bg-alerts text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>{unreadCount}</span>
                  )}
                </div>
                <div tabIndex={-1} className='dropdown-content w-100 rounded-box z-10 mt-3 p-3 bg-accent border-border shadow'>
                  <div className='flex justify-between items-center gap-2 p-3'>
                    <span className='font-bold'>Notifications</span>
                    <button className='btn btn-ghost text-xs text-primary' onClick={() => markAllAsReadMutation.mutate()}>Tout marquer comme lu</button>
                  </div>
                  <ul className='menu menu-lg p-2 pt-0'>
                    {notificationsLoading ? (
                      <li><Loader variant="plain" size="md" className="py-4" /></li>
                    ) : notificationsList.length === 0 ? (
                      <li><span className='text-border'>Aucune notifications</span></li>
                    ) : (
                      notificationsList.map((n) => (
                        <li key={n.id}>
                          <div
                            className= {`flex justify-center items-center cursor-pointer mb-1 ${!n.is_read ? 'bg-border' : 'bg-bg'}`}
                            onClick={() => { markAsReadMutation.mutate(n.id); router.push('/profil#amis') } }
                          >
                            {n.type === 'friend_request' && (
                              <div className='flex text-base'>
                                {n.sender.avatar_url ? (
                                  <Image
                                    src={n.sender.avatar_url}
                                    alt='pp'
                                    width={55}
                                    height={20}
                                    className='rounded-full m-2'
                                  />
                                ) : (
                                  <User size={40} className='rounded-full m-2' />
                                )}
                                <p className=''>
                                  <Link onClick={(e) => e.stopPropagation()} href={`/profil/${n.sender.id}`}>{n.sender.username}</Link>
                                {" "} vous a envoyé une demande d&apos;ami
                                </p>
                                <button onClick={(e) => {e.stopPropagation(); acceptMutation.mutate(n.payload.friendship_id as number)}}>Accepter</button>
                              </div>
                            )}
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              {/* PP */}
              <div className="dropdown dropdown-end tooltip tooltip-bottom z-10" data-tip="Profil">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {user.avatar_url ? (
                      <Image src={user.avatar_url} alt="Avatar" width={32} height={32} />
                    ) : (
                      <CircleUser size={32} />
                    )}
                  </div>
                </div>
                <ul tabIndex={-1} className="menu menu-lg dropdown-content rounded-box z-10 mt-3 p-2 bg-accent border border-border shadow">
                  <li>
                    <div className='flex'>
                      <User size={20} /> 
                      <Link href="/profil">Profil</Link>
                    </div>
                  </li>
                  <li>
                    <div className='flex'> 
                      <LogOut size={20} />
                      <button onClick={logout}>Déconnexion</button>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="hidden md:flex gap-5 p-2">
              <Link href="/login">Se connecter</Link>
              <Link href="/register">S&apos;inscrire</Link>
            </div>
          )}

          {/* Burger button - mobile only */}
          <label className="md:hidden btn btn-ghost border-none btn-circle swap swap-rotate" aria-label="Menu">
            <input type="checkbox" checked={menuOpen} onChange={() => setMenuOpen((prev) => !prev)} />

            {/* hamburger icon */}
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col bg-accent border-t border-border px-6 py-4 gap-5 text-lg">
          <Link href="/list" onClick={() => setMenuOpen(false)}>
            Bibliothèque
          </Link>
          <Link href="/forum" onClick={() => setMenuOpen(false)}>
            Forum
          </Link>
          <Link href="/chat" onClick={() => setMenuOpen(false)}>
            Chat
          </Link>
          {!isLoggedIn && (
            <>
              <hr className="border-border" />
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Se connecter
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>
                S&apos;inscrire
              </Link>
            </>
          )}
        </nav>
      )}

      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </header>
  )
}
