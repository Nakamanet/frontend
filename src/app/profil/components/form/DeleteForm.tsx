import { useAuth } from '@/app/context/AuthContext'
import { useToast } from '@/app/context/ToastContext'
import { deleteAccount, disableAccount } from '@/app/lib/user'
import { User } from '@/app/types/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteForm({ user }: { user: User }) {
  const { logout } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleDisable = async (id: number) => {
    const confirmed = confirm(
      'Etes-vous sur de vouloir désactiver votre compte ? Pour le réactiver il faudra prendre contact avec les modérateurs.'
    )
    if (confirmed) {
      setIsSubmitting(true)
      try {
        await disableAccount(id)
        showToast('Compte désactivé avec succès', 'success')
        await logout()
        setTimeout(() => router.push('/'), 1000)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        showToast('Erreur lors de la désactivation du compte', 'error')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      return
    }
  }

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Etes-vous sur de vouloir supprimer votre compte ? Cette actione est irréversible.')
    if (confirmed) {
      setIsSubmitting(true)
      try {
        await deleteAccount(id)
        showToast('Compte supprimé avec succès', 'success')
        // await logout()
        setTimeout(() => router.push('/'), 1000)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        showToast('Erreur lors de la suppression du compte', 'error')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="grid grid-cols-2 border border-primary rounded-[15px] overflow-hidden">
      <button
        onClick={() => handleDisable(user.id)}
        disabled={isSubmitting}
        className="flex flex-col items-center gap-2 p-5 bg-accent hover:bg-primary/10 transition-colors cursor-pointer border-r border-primary disabled:opacity-50"
      >
        <span className="font-semibold text-primary">Désactiver mon compte</span>
        <p className="text-sm text-border text-center">
          Ce compte ne sera plus disponible il faudra prendre contact avec les modérateurs pour le réactiver.
        </p>
      </button>
      <button
        onClick={() => handleDelete(user.id)}
        disabled={isSubmitting}
        className="flex flex-col items-center gap-2 p-5 bg-accent hover:bg-primary/10 transition-colors cursor-pointer disabled:opacity-50"
      >
        <span className="font-semibold text-primary">Supprimer mon compte</span>
        <p className="text-sm text-border text-center">
          Supprimer toute vos données, cette action est irreversible. Vos données seront irrécupérables.
        </p>
      </button>
    </div>
  )
}
