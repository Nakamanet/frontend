import { MessageSquarePlus, Clock } from 'lucide-react'

export default function Thread() {
  return (
    <div className="border border-border bg-accent rounded-card p-8 flex flex-col items-center gap-4 text-center">
      <MessageSquarePlus size={40} className="text-text-muted" />
      <p className="text-lg font-medium">Pas encore de fil de discussion pour cette œuvre</p>
      <p className="text-text-muted text-sm">
        Les forums dédiés à chaque œuvre arrivent bientôt sur NakamaNet.
      </p>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
        <Clock size={16} />
        Fonctionnalité à venir
      </span>
    </div>
  )
}
