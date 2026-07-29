'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { replyToForum } from '@/app/lib/forum'
import { useToast } from '@/app/context/ToastContext'
import { useAuth } from '@/app/context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import Button from '@/app/components/ui/Button'

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
      <div className="flex flex-col items-center justify-center gap-3 border border-border bg-accent rounded-card p-6 text-center">
        <p className="text-[15px] text-text-muted">Vous devez être connecté pour participer à la discussion.</p>
        <Button onClick={() => router.push('/login')}>Se connecter</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-border bg-accent rounded-card p-4">
      <h3 className="text-[15px] font-bold text-white">{parentId ? 'Répondre à ce commentaire' : 'Ajouter une réponse au sujet'}</h3>

      <div className="flex flex-col gap-2">
        <textarea
          placeholder="Votre réponse..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="p-3 rounded-xl h-24 resize-y text-white bg-background border border-border outline-none focus:ring-1 focus:ring-primary"
        ></textarea>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? <Loader variant="inline" size="xs" /> : 'Publier'}
        </Button>

        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Annuler
          </Button>
        )}
      </div>
    </form>
  )
}
