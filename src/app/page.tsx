'use client'

import { useAuth } from './context/AuthContext'
import PostList from './components/home/PostList'
import AppLayout from './components/layout/AppLayout'

export default function HomePage() {
  const { isLoggedIn, user } = useAuth()

  return (
    <AppLayout sidebar>
      <PostList isLoggedIn={isLoggedIn} user={user} />
    </AppLayout>
  )
}
