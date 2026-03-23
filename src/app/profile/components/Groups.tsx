import { User } from '../../types/auth'

export default function Groups({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]">
      <h3 className="text-2xl font-bold">Mes groupes de discussion</h3>
      <p>Cette partie sera disponible dans une prochaine mise à jour</p>
    </div>
  )
}
