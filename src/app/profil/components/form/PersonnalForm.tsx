'use client'

import { updateProfil } from '@/app/lib/user'
import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { User } from '../../../types/auth'
import { useToast } from '@/app/context/ToastContext'
import Button from '@/app/components/ui/Button'
import { AtSign } from 'lucide-react'

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
    } catch (err: any) {
      const errors = err?.response?.data?.errors
      if (errors) {
        const flat: Record<string, string> = {}
        Object.entries(errors).forEach(([key, msgs]) => {
          flat[key] = Array.isArray(msgs) ? (msgs[0] as string) : String(msgs)
        })
        setFieldErrors(flat)
      }
      showToast('Erreur lors de la modification du profil', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 p-5 bg-accent border border-border rounded-[15px]">
      <div>
        <h3 className="text-2xl font-bold">Informations personnelles</h3>
        <p className="text-sm text-text/50 mt-0.5">
          Votre identifiant <span className="font-medium text-text/70">@{user.handle}</span> reste fixe et vous
          identifie de manière unique.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmitPersonal}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm font-medium text-text/70">
              Nom d&apos;utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="input input-ghost bg-border rounded-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {fieldErrors.username && (
              <p className="text-sm text-primary">{fieldErrors.username}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text/70">Identifiant unique</label>
            <div className="input input-ghost bg-border/50 rounded-full flex items-center gap-1.5 text-text/50 cursor-not-allowed">
              <AtSign size={15} />
              {user.handle}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-text/70">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input input-ghost bg-border rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && <p className="text-sm text-primary">{fieldErrors.email}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
        </Button>
      </form>
    </div>
  )
}
