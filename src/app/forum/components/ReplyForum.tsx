'use client'

import { useState } from 'react'
import { replyToForum } from '@/app/lib/forum'
import { useToast } from '@/app/context/ToastContext'

interface ReplyForumProps {
  topicId: number
  parentId?: number
  onCancel?: () => void
}

export default function ReplyForum({ topicId, parentId, onCancel }: ReplyForumProps) {
  const { showToast } = useToast()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await replyToForum(topicId, content, parentId)
      setContent('')
      showToast('Réponse au forum publié avec succès', 'success')
      window.location.reload()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Erreur lors de la réponse au forum', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-border bg-accent rounded-[15px] p-4">
      <h3 className="text-[15px] font-bold text-white">{parentId ? 'Répondre à ce commentaire' : 'Ajouter une réponse au sujet'}</h3>

      <div className="flex flex-col gap-2">
        <textarea
          placeholder="Votre réponse..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="p-3 rounded-xl h-24 resize-y text-white bg-background border border-border outline-none focus:ring-1 focus:ring-alerts"
        ></textarea>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn bg-alerts hover:bg-alerts/90 rounded-full px-4 py-2 font-bold text-white border-none disabled:opacity-50"
        >
          {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Publier'}
        </button>

        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-ghost border border-border rounded-full px-4 py-2 font-bold text-border hover:text-white">
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}
