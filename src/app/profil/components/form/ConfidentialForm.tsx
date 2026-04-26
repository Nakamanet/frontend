'use client'

import { useState } from 'react'
import { User } from '../../../types/auth'
import { disableAccount } from '@/app/lib/user'
import { useToast } from '@/app/context/ToastContext'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'

export default function NotificationForm({ user }: { user: User }) {
  const { logout } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleDisable = async (id: number) => {
    const confirmed = confirm('Etes-vous sur de vouloir supprimer votre compte ? Cette action est irréversible.')
    setIsSubmitting(true)
    if (confirmed) {
      try {
        await disableAccount(id)
        showToast('Suppression du compte effectué avec succès', 'success')
        await logout()
        setTimeout(() => router.push('/'), 1000)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        showToast('Erreur lors de la suppression du compte', 'error')
      }
    } else {
      return
    }
  }

  return (
    <div className="flex justify-between items-center p-5 bg-accent border border-border rounded-[15px]">
      <div className="flex flex-col items-center m-auto">
        <label htmlFor="delete_account">
          <button 
            onClick={() => handleDisable(user.id)}
            disabled={isSubmitting}
            className="btn btn-ghost btn-xs text-sm p-0 border-none hover:bg-transparent"
          >
            Suprimer mon compte
          </button>
        </label>
        <p className="text-sm text-border">Supprimer toute vos données, cette action est irreversible</p>
      </div>
    </div>
  )
}
