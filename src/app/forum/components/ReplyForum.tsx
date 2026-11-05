'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { replyToForum } from '@/app/lib/forum'
import { useToast } from '@/app/context/ToastContext'
import { useAuth } from '@/app/context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Ban } from 'lucide-react'
import Loader from '@/app/components/Loader'
import Button from '@/app/components/ui/Button'

interface ReplyForumProps {
  topicId: number
  parentId?: number
  onCancel?: () => void
}

export default function ReplyForum({ topicId, parentId, onCancel }: ReplyForumProps) {
  const { showToast } = useToast()
  const { isLoggedIn, user } = useAuth()
  const isBanned = Boolean(user?.is_deleted || (user?.banned_until && new Date(user.banned_until) > new Date()))
  const router = useRouter()
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')

  const { mutate, isPending: loading } = useMutation({
    mutationFn: () => replyToForum(topicId, content, parentId),
    onSuccess: (data: any) => {
      setContent('')
      if (data?.message) {
        showToast(data.message, 'info')
      } else {
        showToast('Réponse publiée avec succès', 'success')
      }
      queryClient.invalidateQueries({ queryKey: ['forums', topicId] })
      onCancel?.()
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || 'Erreur lors de la réponse au forum'
      showToast(msg, 'error')
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

  if (isBanned) {
    return (
      <div className="flex items-center gap-3 border border-red-500/40 bg-red-950/40 rounded-card p-4 text-red-300 text-sm">
        <Ban size={18} className="text-red-400 shrink-0" />
        <span>Votre compte est actuellement suspendu. Vous ne pouvez pas publier de réponses.</span>
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
