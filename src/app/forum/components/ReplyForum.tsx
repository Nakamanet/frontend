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
    <form onSubmit={handleSubmit} className="mt-4 p-4 flex flex-col gap-4 border border-white text-white">
      <h3 className="text-lg font-bold">{parentId ? 'Répondre à ce commentaire' : 'Ajouter une réponse au sujet'}</h3>

      <div className="flex flex-col gap-2">
        <textarea
          placeholder="Votre réponse..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="p-2 h-24 resize-y text-white bg-transparent border border-white outline-none focus:ring-1 focus:ring-white"
        ></textarea>
      </div>

      <div className="flex gap-4 mt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 font-bold disabled:opacity-50 border border-white"
        >
          {loading ? 'Envoi...' : 'Publier'}
        </button>

        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 font-bold border border-white opacity-70">
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}
