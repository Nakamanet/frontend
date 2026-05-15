import { useAuth } from "@/app/context/AuthContext";
import { useToast } from "@/app/context/ToastContext";
import { deleteAccount, disableAccount } from "@/app/lib/user";
import { User } from "@/app/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteForm({ user }: { user: User}) {
    const { logout } = useAuth()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showToast } = useToast()
  
    const handleDisable = async (id: number) => {
        const confirmed = confirm('Etes-vous sur de vouloir désactiver votre compte ? Pour le réactiver il faudra prendre contact avec les modérateurs.')
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
                await logout()
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
      <div className="grid grid-cols-2 justify-between items-center p-5 bg-accent border border-border rounded-[15px]">
        <div className="flex flex-col items-center m-auto">
            <label htmlFor="disable_account">
                <button 
                onClick={() => handleDisable(user.id)}
                disabled={isSubmitting}
                className="btn btn-ghost btn-xs text-sm p-0 border-none hover:bg-transparent"
                >
                Désactiver mon compte
                </button>
            </label>
            <p className="text-sm text-border text-center">Ce compte ne sera plus disponible il faudra prendre contact avec les modérateurs pour le réactiver.</p>
        </div>
        <div className="flex flex-col items-center m-auto">
            <label htmlFor="delete_account">
                <button 
                onClick={() => handleDelete(user.id)}
                disabled={isSubmitting}
                className="btn btn-ghost btn-xs text-sm p-0 border-none hover:bg-transparent"
                >
                Supprimer mon compte
                </button>
            </label>
            <p className="text-sm text-border">Supprimer toute vos données, cette action est irreversible.</p>
            </div>
      </div>
    )
}