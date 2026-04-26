'use client'

import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { User } from '../../../types/auth'
import { updateProfil } from '@/app/lib/user'
import { useToast } from '@/app/context/ToastContext'

export default function SupplementaireForm({ user }: { user: User }) {
  const { showToast } = useToast()
  const [birthdate, setBirthdate] = useState(user.birthdate)
  const [bio, setBio] = useState(user.bio)
  const [privacy, setPrivacy] = useState(user.privacy)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const { refreshUser } = useAuth()

  const handleSubmitSupplementaire = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const payload: Record<string, string> = {
        birthdate: birthdate ?? '',
        // privacy: privacy ?? false,
        bio: bio ?? '',
      }

      const body = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== '')
      )

      await updateProfil(body)
      showToast('Profil modifié avec succès', 'success')
      await refreshUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Erreur lors de la mise à jour du profil', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]">
      <h3 className="text-2xl font-bold">Informations supplémentaires</h3>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmitSupplementaire}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="birthdate">Date de naissance</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              className="input input-ghost bg-border rounded-full"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          {fieldErrors.birthdate && <p className="text-sm text-alerts">{fieldErrors.birthdate}</p>}
        </div>
        <div className="grid row-span-2">
          <div className="flex flex-col">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              className="textarea textarea-ghost bg-border rounded-[15px] min-h-[120px]"
              value={bio || ''}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          {fieldErrors.bio && <p className="text-sm text-alerts">{fieldErrors.bio}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p>Profil privé</p>
              <p className="text-sm text-border">Seul vos amis peuvent voir votre profil</p>
            </div>

            <label className={`toggle text-base-content rounded-full ${privacy ? 'bg-primary' : 'bg-border'}`}>
              <input type="checkbox" checked={privacy} onChange={() => setPrivacy(!privacy)} />
              <svg
                aria-label="disabled"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" fill="none" stroke="currentColor">
                  <path d="M20 6 9 17l-5-5"></path>
                </g>
              </svg>
            </label>
          </div>
          {fieldErrors.privacy && <p className="text-sm text-alerts">{fieldErrors.privacy}</p>}
        </div>

        <button
          type="submit"
          className="grid col-span-2 btn btn-ghost border-none bg-primary text-primary-content"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  )
}
