// src/app/admin/components/AdminGuard.tsx
'use client'

import { useAuth } from '@/app/context/AuthContext'
import Loader from '@/app/components/Loader'
import { ReactNode } from 'react'

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isAuthLoading } = useAuth()

  if (isAuthLoading) return <Loader />

  if (!user?.is_admin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text/60">Accès refusé.</p>
      </div>
    )
  }

  return <>{children}</>
}
