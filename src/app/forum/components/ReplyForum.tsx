'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { replyToForum } from '@/app/lib/forum'
import { useToast } from '@/app/context/ToastContext'
import { useAuth } from '@/app/context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'

interface ReplyForumProps {
  topicId: number
  parentId?: number
  onCancel?: () => void
}

export default function ReplyForum({ topicId, parentId, onCancel }: ReplyForumProps) {
  const { showToast } = useToast()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')

  const { mutate, isPending: loading } = useMutation({
    mutationFn: () => replyToForum(topicId, content, parentId),
    onSuccess: () => {
      setContent('')
      showToast('Réponse au forum publié avec succès', 'success')
      queryClient.invalidateQueries({ queryKey: ['forums', topicId] })
      onCancel?.()
    },
    onError: () => {
      showToast('Erreur lors de la réponse au forum', 'error')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    if (content.trim()) mutate()
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 border border-border bg-accent rounded-[15px] p-6 text-center">
        <p className="text-[15px] text-border">Vous devez être connecté pour participer à la discussion.</p>
        <button
          onClick={() => router.push('/login')}
          className="btn bg-alerts hover:bg-alerts/90 rounded-full px-6 py-2 font-bold text-white border-none"
        >
          Se connecter
        </button>
      </div>
    )
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
          {loading ? <Loader variant="inline" size="xs" /> : 'Publier'}
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
