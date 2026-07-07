'use client'

import { useAuth } from './context/AuthContext'
import PostList from './components/home/PostList'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './components/home/LandingPage'

export default function HomePage() {
  const { isLoggedIn, isAuthLoading, user } = useAuth()

  if (isAuthLoading) {
    return null
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
