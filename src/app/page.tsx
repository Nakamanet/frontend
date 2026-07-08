'use client'

import { useAuth } from './context/AuthContext'
import PostList from './components/home/PostList'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './components/home/LandingPage'
import Loader from './components/Loader'

export default function HomePage() {
  const { isLoggedIn, isAuthLoading, user } = useAuth()

  if (isAuthLoading) {
    return <Loader variant="plain" className="min-h-[80vh]" />
  }

  if (!isLoggedIn) {
    return <LandingPage />
  }

  return (
    <AppLayout sidebar>
      <PostList isLoggedIn={isLoggedIn} user={user} />
    </AppLayout>
  )
}
