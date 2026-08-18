'use client'

import { useAuth } from '@/app/context/AuthContext'
import PostList from './PostList'
import AppLayout from '@/app/components/layout/AppLayout'
import LandingPage, { type LandingTranslations } from './LandingPage'
import Loader from '@/app/components/Loader'

export default function HomePageClient({ tr }: { tr: LandingTranslations }) {
  const { isLoggedIn, isAuthLoading, user } = useAuth()

  if (isAuthLoading) return <Loader variant="plain" className="min-h-[80vh]" />
  if (!isLoggedIn)   return <LandingPage tr={tr} />

  return (
    <AppLayout sidebar>
      <PostList isLoggedIn={isLoggedIn} user={user} />
    </AppLayout>
  )
}
