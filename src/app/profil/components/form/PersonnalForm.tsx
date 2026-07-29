'use client'

import { updateProfil } from '@/app/lib/user'
import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { User } from '../../../types/auth'
import { useToast } from '@/app/context/ToastContext'
import Button from '@/app/components/ui/Button'

export default function PersonnalForm({ user }: { user: User }) {
  const { showToast } = useToast()
  const [email, setEmail] = useState(user.email)
  const [username, setUsername] = useState(user.username)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const { refreshUser } = useAuth()

  const handleSubmitPersonal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const payload: Record<string, string> = {
        username,
        email,
      }

      const body = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== '')
      )

      await updateProfil(body)
      showToast('Profil modifié avec succès', 'success')
      await refreshUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Erreur lors de la modification du profil', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-5 bg-accent border border-border rounded-card">
      <h3 className="text-2xl font-bold">Informations personnelles</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitPersonal}>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <label htmlFor="username">Nom d&apos;utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              className="input input-ghost bg-border rounded-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {fieldErrors.username && <p className="text-sm text-primary">{fieldErrors.username}</p>}

          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-ghost bg-border rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {fieldErrors.email && <p className="text-sm text-primary">{fieldErrors.email}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="col-span-2">
          {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
        </Button>
      </form>
    </div>
  )
}
