import { useAuth } from '@/app/context/AuthContext'
import { useToast } from '@/app/context/ToastContext'
import { updateProfil } from '@/app/lib/user'
import { useState } from 'react'

export default function PasswordForm() {
  const { showToast } = useToast()
  const [password, setPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const { refreshUser } = useAuth()

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const payload: Record<string, string> = {
        password,
        password_confirmation,
      }

      if (password && password_confirmation && password !== password_confirmation) {
        setFieldErrors({ password: 'Les mots de passe ne correspondent pas' })
        setIsSubmitting(false)
        return
      }

      if ((password && !password_confirmation) || (!password && password_confirmation)) {
        setFieldErrors({ password: 'Les deux champs doivent être remplis' })
        setIsSubmitting(false)
        return
      }

      const body = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== '')
      )

      await updateProfil(body)
      showToast('Mots de passe modifié avec succès', 'success')
      await refreshUser()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Erreur lors de la modification du mot de passe', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]">
      <h3 className="text-2xl font-bold">Changer mon mot de passe</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitPassword}>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input input-ghost bg-border rounded-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {fieldErrors.password && <p className="text-sm text-alerts">{fieldErrors.password}</p>}

          <div className="flex flex-col">
            <label htmlFor="password_confirmation">Confirmation</label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              className="input input-ghost bg-border rounded-full"
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
            />
          </div>
          {fieldErrors.password_confirmation && (
            <p className="text-sm text-alerts">{fieldErrors.password_confirmation}</p>
          )}
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
