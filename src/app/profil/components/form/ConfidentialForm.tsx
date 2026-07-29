'use client'

import { useState } from 'react'
import { User } from '../../../types/auth'
import { updateVisibility } from '@/app/lib/user'
import { useToast } from '@/app/context/ToastContext'
import { useAuth } from '@/app/context/AuthContext'
import Button from '@/app/components/ui/Button'

export default function ConfidentialForm({ user }: { user: User }) {
  const { showToast } = useToast()
  const [privacy, setPrivacy] = useState(user.profile_visibility ?? 'public')

  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { refreshUser } = useAuth()

  const handleSubmitConfidential = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateVisibility(privacy)
      showToast('Confidentialité du profil mise à jour', 'success')
      await refreshUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Erreur lors de la mise à jour de la confidentialité', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="flex flex-col gap-4 p-5 bg-accent border border-border rounded-card">
      <h3 className='text-2xl font-bold'>Confidentialité</h3>
      <form onSubmit={handleSubmitConfidential} className='flex flex-col w-full gap-4' >
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p>Profil privé</p>
            <p className="text-sm text-text-muted">Seul vos amis peuvent voir votre profil</p>
          </div>

          <label>
            <select value={privacy} className='select' onChange={(e) => setPrivacy(e.target.value as 'public' | 'private' | 'friends_only')}>
            <option value='public'>Public</option>
            <option value='friends_only'>Amis uniquement</option>
            <option value='private'>Privé</option>                
            </select>
          </label>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
        </Button>
      </form>
    </div>
  )
}
