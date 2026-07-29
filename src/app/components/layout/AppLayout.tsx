'use client'

import { useAuth } from '@/app/context/AuthContext'
import SideBar from '@/app/components/home/Sidebar'
import Chat from '@/app/components/home/Chat'
import Calendar from '@/app/components/home/Calendar'
import Link from 'next/link'
import { Home, BookOpen, MessageSquare, MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface AppLayoutProps {
  children: React.ReactNode
  sidebar?: boolean
}

export default function AppLayout({ children, sidebar = false }: AppLayoutProps) {
  const { isLoggedIn, isAuthLoading, user } = useAuth()
  const pathname = usePathname()

  if (sidebar) {
    return (
      <>
        <main className="md:grid md:grid-cols-5 md:place-items-start px-4 md:px-15 py-5 md:py-10 max-w-375 mx-auto pb-20 md:pb-10">
          <section className="hidden md:flex flex-col w-full gap-5">
            <SideBar isLoggedIn={isLoggedIn} isAuthLoading={isAuthLoading} user={user} />
          </section>
          <section className="flex flex-col md:col-span-3 w-full md:px-6 gap-3">
            {children}
          </section>
          <section className="hidden md:flex flex-col w-full mx-auto gap-5">
            <Chat user={user} />
            <Calendar user={user} />
          </section>
        </main>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-accent border-t border-border flex justify-around items-center h-16 z-50">
          <Link href="/" className={`flex flex-col items-center gap-1 text-xs ${pathname === '/' ? 'text-primary' : 'text-text-muted'}`}>
            <Home size={22} />
            Accueil
          </Link>
          <Link href="/bibliotheque" className={`flex flex-col items-center gap-1 text-xs ${pathname === '/bibliotheque' ? 'text-primary' : 'text-text-muted'}`}>
            <BookOpen size={22} />
            Bibliothèque
          </Link>
          <Link href="/forum" className={`flex flex-col items-center gap-1 text-xs ${pathname === '/forum' ? 'text-primary' : 'text-text-muted'}`}>
            <MessageSquare size={22} />
            Forum
          </Link>
          <Link href="/chat" className={`flex flex-col items-center gap-1 text-xs ${pathname === '/chat' ? 'text-primary' : 'text-text-muted'}`}>
            <MessageCircle size={22} />
            Chat
          </Link>
        </nav>
      </>
    )
  }

  return (
    <main className="md:grid md:grid-cols-5 max-w-375 mx-auto py-10 px-15">
      <section className="flex flex-col gap-10 w-full h-full col-span-4 pr-6 overflow-y-auto scrollbar-hide">
        {children}
      </section>
      <section className="flex flex-col gap-5">
        <Chat user={user} />
        <Calendar user={user} />
      </section>
    </main>
  )
}
