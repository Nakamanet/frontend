import { useAuth } from "@/app/context/AuthContext"
import { useToast } from "@/app/context/ToastContext"
import { updateProfil } from "@/app/lib/user"
import { User } from "@/app/types/auth"
import { useState } from "react"

export default function ThemeForm({ user }: { user: User }) {
    const { showToast } = useToast()
    const { refreshUser } = useAuth()

    const [theme_preference, setTheme_preference] = useState(user.theme_preference ?? 'system')

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const handleSubmitMedias = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFieldErrors({})
        setIsSubmitting(true)
    
        try {
          const payload: Record<string, string> = {
            theme_preference: theme_preference ?? 'system',
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

    return(
        <div className="flex flex-col gap-4 p-5 bg-accent border border-border rounded-[15px]">
            <h3 className="text-2xl font-bold">Médias</h3>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmitMedias}>
                <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <label htmlFor="theme_preference">Préférence de thème</label>
                    <select
                    id="theme_preference"
                    name="theme_preference"
                    className="input input-ghost bg-border rounded-full"
                    value={theme_preference || ''}
                    onChange={(e) => setTheme_preference(e.target.value)}
                    >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                    </select>
                </div>
                {fieldErrors.theme_preference && <p className="text-sm text-alerts">{fieldErrors.theme_preference}</p>}
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