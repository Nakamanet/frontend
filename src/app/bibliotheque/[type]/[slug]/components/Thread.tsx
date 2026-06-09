import Link from 'next/link'
import { MessageSquarePlus } from 'lucide-react'

export default function Thread() {
  return (
    <div className="border border-border bg-accent rounded-[15px] p-8 flex flex-col items-center gap-4 text-center">
      <MessageSquarePlus size={40} className="text-border" />
      <p className="text-lg font-medium">Pas encore de fil de discussion pour cette œuvre</p>
      <p className="text-border text-sm">Sois le premier à lancer une discussion sur le forum !</p>
      <Link
        href="/forum"
        className="btn btn-ghost border-none rounded-full bg-primary text-primary-content px-6"
      >
        Aller sur le forum
      </Link>
    </div>
  )
}
