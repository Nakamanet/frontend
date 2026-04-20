'use client'

import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { User } from '../../../types/auth'
import { updateProfil } from '@/app/lib/user'
import { useToast } from '@/app/context/ToastContext'

export default function NotificationForm({ user }: { user: User }) {
  const { showToast } = useToast()
  // A modifier plus tard quand ce sera en db
  const [comment, setComment] = useState(true)
  const [friendsRequests, setFriendsRequests] = useState(true)
  const [mentions, setMentions] = useState(true)
  const [newSorties, setNewSorties] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const { refreshUser } = useAuth()

  const handleSubmitMedias = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const payload: Record<string, string> = {
        comment: comment ?? '',
        friendsRequests: friendsRequests ?? '',
        mentions: mentions ?? '',
        newSorties: newSorties ?? '',
      }

      const body = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== '')
      )

      await updateProfil(body)
      showToast('Profil modifié avec succès', 'success')
      await refreshUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Erreur lors de la modification des préférences de notifications', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]">
      <h3 className="text-2xl font-bold">Notifications</h3>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmitMedias}>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p>Commentaires</p>
              <p className="text-xs text-border">Quelqu&apos;un commente un de tes posts</p>
            </div>

            <label className={`toggle text-base-content rounded-full ${comment ? 'bg-primary' : 'bg-border'}`}>
              <input type="checkbox" checked={comment} onChange={() => setComment(!comment)} />
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
          {fieldErrors.comment && <p className="text-sm text-alerts">{fieldErrors.comment}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p>Demande d&apos;ami</p>
              <p className="text-xs text-border">Quelqu&apos;un vous envoie une demande d&apos;ami</p>
            </div>

            <label className={`toggle text-base-content rounded-full ${friendsRequests ? 'bg-primary' : 'bg-border'}`}>
              <input type="checkbox" checked={friendsRequests} onChange={() => setFriendsRequests(!friendsRequests)} />
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
          {fieldErrors.friendsRequests && <p className="text-sm text-alerts">{fieldErrors.friendsRequests}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p>Mentions</p>
              <p className="text-xs text-border">Quand vous etes mentionné</p>
            </div>

            <label className={`toggle text-base-content rounded-full ${mentions ? 'bg-primary' : 'bg-border'}`}>
              <input type="checkbox" checked={mentions} onChange={() => setMentions(!mentions)} />
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
          {fieldErrors.mentions && <p className="text-sm text-alerts">{fieldErrors.mentions}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p>Nouvelles sorties</p>
              <p className="text-xs text-border">Nouveau chapitre/tome de vos oeuvres suivies</p>
            </div>

            <label className={`toggle text-base-content rounded-full ${newSorties ? 'bg-primary' : 'bg-border'}`}>
              <input type="checkbox" checked={newSorties} onChange={() => setNewSorties(!newSorties)} />
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
          {fieldErrors.newSorties && <p className="text-sm text-alerts">{fieldErrors.newSorties}</p>}
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
