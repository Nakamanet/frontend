import { User } from '../../types/auth'

export default function Likes({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-card">
      <h3 className="text-2xl font-bold">Mes posts likés</h3>
      <p>Cette partie sera disponible dans une prochaine mise à jour</p>
    </div>
  )
}
