'use client'

import { usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  const { isLoggedIn } = useAuth()

  if (pathname === '/' && !isLoggedIn) {
    return null
  }

  return <Footer />
}
