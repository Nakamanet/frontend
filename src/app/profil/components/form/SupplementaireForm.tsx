'use client'

import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { User } from '../../../types/auth'
import { updateProfil } from '@/app/lib/user'
import { useToast } from '@/app/context/ToastContext'
import { Info } from 'lucide-react'

export default function SupplementaireForm({ user }: { user: User }) {
  const { showToast } = useToast()
  const [birthdate, setBirthdate] = useState(user.birthdate)
  const [bio, setBio] = useState(user.bio)

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
      <form className="flex flex-col gap-4" onSubmit={handleSubmitSupplementaire}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className='flex gap-2 items-center'>
              <label htmlFor="birthdate">Date de naissance</label>
              <div className='tooltip'>
                <div className='tooltip-content'>
                  <div>Ce champs permet de modérer les accès a certain type de contenue</div>
                </div>
                <Info size={17}/>
              </div>
            </div>
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
        <div className="flex flex-col">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            maxLength={500}
            className="textarea textarea-ghost bg-border rounded-[15px] min-h-[120px] w-full"
            value={bio || ''}
            onChange={(e) => setBio(e.target.value)}
          />
          <span className="text-sm text-right text-text/60">{(bio || '').length}/500</span>
        </div>
        {fieldErrors.bio && <p className="text-sm text-alerts">{fieldErrors.bio}</p>}

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
