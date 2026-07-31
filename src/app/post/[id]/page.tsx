'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CircleUser, SendHorizonal, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { getPostById, getComments, createComment, deleteComment } from '../../lib/post'
import { Post } from '../../types/post'
import PostCards from '../../components/PostCards'
import AppLayout from '../../components/layout/AppLayout'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import { useAuth } from '@/app/context/AuthContext'
import { useToast } from '@/app/context/ToastContext'
import { isAxiosError } from 'axios'

const shouldRetry = (failureCount: number, error: Error) => {
  if (isAxiosError(error) && error.response) {
    if (error.response.status >= 400 && error.response.status < 500) {
      return false
    }
  }
  return failureCount < 3
}

export default function PostPage() {
  const { id } = useParams()
  const postId = Number(id)
  const { user, isLoggedIn } = useAuth()
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')

  const { data: post, isLoading, isError } = useQuery<Post>({
    queryKey: ['posts', postId],
    queryFn: () => getPostById(postId),
    enabled: !!id,
    retry: shouldRetry
  })

  const { data: commentsData, isLoading: loadingComments } = useQuery({
    queryKey: ['posts', postId, 'comments'],
    queryFn: () => getComments(postId),
    enabled: !!id,
    retry: shouldRetry
  })
  const comments = commentsData?.data ?? []

  const { mutate: postComment, isPending: isSubmitting } = useMutation({
    mutationFn: () => createComment(postId, { content }),
    onSuccess: () => {
      setContent('')
      queryClient.invalidateQueries({ queryKey: ['posts', postId, 'comments'] })
      queryClient.invalidateQueries({ queryKey: ['posts', postId] })
      showToast('Commentaire publié', 'success')
    },
    onError: () => showToast('Erreur lors de la publication du commentaire', 'error'),
  })

  const { mutate: removeComment } = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', postId, 'comments'] })
      queryClient.invalidateQueries({ queryKey: ['posts', postId] })
      showToast('Commentaire supprimé', 'success')
    },
    onError: () => showToast('Erreur lors de la suppression', 'error'),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    postComment()
  }

  const handleDelete = (commentId: number) => {
    const confirmed = confirm('Voulez-vous vraiment supprimer ce commentaire ?')
    if (confirmed) removeComment(commentId)
  }

  if (isLoading) return (
    <AppLayout sidebar>
      <Loader />
    </AppLayout>
  )

  if (isError || !post) return (
    <AppLayout sidebar>
      <div className="flex flex-col items-center gap-2 p-10">
        <p>Ce post est indisponible</p>
        <Link href={"/"}>Retour vers la liste des posts</Link>
      </div>
    </AppLayout>
  )

  return (
    <AppLayout sidebar>
      <div className="flex flex-col gap-5">
        <PostCards post={post} detailView />

        <div className="bg-accent border border-border rounded-[15px] p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-lg">
            Commentaires {comments.length > 0 && `(${comments.length})`}
          </h2>

          {isLoggedIn && user ? (
            <form onSubmit={handleSubmit} className="flex gap-2 items-start">
              <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70">
                {user.avatar_url ? (
                  <Image src={user.avatar_url} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  <CircleUser size={24} strokeWidth={1.5} />
                )}
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Écrire un commentaire..."
                  maxLength={1000}
                  className="input input-bordered flex-1"
                />
                <button
                  type="submit"
                  disabled={!content.trim() || isSubmitting}
                  className="btn btn-primary"
                >
                  <SendHorizonal size={17} />
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-text/60">Connectez-vous pour laisser un commentaire.</p>
          )}

          <div className="flex flex-col gap-4">
            {loadingComments ? (
              <Loader />
            ) : comments.length === 0 ? (
              <p className="text-sm text-text/60 text-center py-4">Aucun commentaire pour l&apos;instant.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Link href={`/profil/${comment.user.id}`} className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center overflow-hidden text-base-content/70 hover:opacity-80 transition-opacity">
                      {comment.user.avatar_url ? (
                        <Image src={comment.user.avatar_url} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        <CircleUser size={24} strokeWidth={1.5} />
                      )}
                    </div>
                  </Link>
                  <div className="flex-1 bg-base-200/40 rounded-[15px] px-4 py-2">
                    <div className="flex items-center justify-between">
                      <Link href={`/profil/${comment.user.id}`} className="font-semibold text-sm hover:underline">
                        {comment.user.username}
                      </Link>
                      {user?.id === comment.user_id && (
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-text/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
