'use client'

import { useAuth } from '@/app/context/AuthContext'
import SideBar from '@/app/components/home/Sidebar'
import Chat from '@/app/components/home/Chat'
import Calendar from '@/app/components/home/Calendar'

interface AppLayoutProps {
  children: React.ReactNode
  sidebar?: boolean
}

export default function AppLayout({ children, sidebar = false }: AppLayoutProps) {
  const { isLoggedIn, isAuthLoading, user } = useAuth()

  if (sidebar) {
    return (
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
    )
  }

  return (
    <main className="md:grid md:grid-cols-5 max-w-375 mx-auto px-4 md:px-15 py-5 md:py-10 pb-20 md:pb-10">
      <section className="flex flex-col gap-10 w-full h-full md:col-span-4 md:pr-6 overflow-y-auto scrollbar-hide">
        {children}
      </section>
      <section className="hidden md:flex flex-col gap-5">
        <Chat user={user} />
        <Calendar user={user} />
      </section>
    </main>
  )
}
