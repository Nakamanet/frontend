'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CircleUser, SendHorizonal, Trash2, Smile, Crown, Ban } from 'lucide-react'
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
import AnimeEmojiPicker from '@/app/components/AnimeEmojiPicker'
import EmoteText from '@/app/components/EmoteText'

export default function PostPage() {
  const { id } = useParams()
  const postId = Number(id)
  const { user, isLoggedIn } = useAuth()
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ['posts', postId],
    queryFn: () => getPostById(postId),
    enabled: !!id,
  })

  const { data: commentsData, isLoading: loadingComments } = useQuery({
    queryKey: ['posts', postId, 'comments'],
    queryFn: () => getComments(postId),
    enabled: !!id,
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
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Erreur lors de la publication du commentaire'
      showToast(message, 'error')
    },
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

  const isSelfBanned = Boolean(
    user?.is_deleted || (user?.banned_until && new Date(user.banned_until) > new Date())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSelfBanned) {
      showToast('Votre compte est suspendu. Commentaire impossible.', 'error')
      return
    }
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
  if (!post) return null

  return (
    <AppLayout sidebar>
      <div className="flex flex-col gap-5">
        <PostCards post={post} detailView />

        <div className="bg-accent border border-border rounded-card p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-lg">
            Commentaires {comments.length > 0 && `(${comments.length})`}
          </h2>

          {isLoggedIn && user ? (
            isSelfBanned ? (
              <div className="flex items-center gap-3 border border-red-500/40 bg-red-950/40 rounded-card p-4 text-red-300 text-sm">
                <Ban size={18} className="text-red-400 shrink-0" />
                <span>Votre compte est actuellement suspendu. Vous ne pouvez pas poster de commentaire.</span>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 items-start">
              <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70">
                {user.avatar_url ? (
                  <Image src={user.avatar_url} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  <CircleUser size={24} strokeWidth={1.5} />
                )}
              </div>
              <div className="flex-1 flex gap-2 items-center relative">
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Écrire un commentaire..."
                  maxLength={1000}
                  className="input input-bordered flex-1"
                />
                <div className="relative flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                      showEmojiPicker ? 'text-primary bg-primary/10' : 'text-base-content/60 hover:text-primary'
                    }`}
                    title="Ajouter un emoji ou emote anime"
                  >
                    <Smile size={20} />
                  </button>
                  {showEmojiPicker && (
                    <AnimeEmojiPicker
                      onSelect={(emoji) => {
                        setContent((prev) => (prev ? `${prev} ${emoji} ` : `${emoji} `))
                      }}
                      onClose={() => setShowEmojiPicker(false)}
                      align="right"
                      placement="top"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!content.trim() || isSubmitting}
                  className="btn btn-primary"
                >
                  <SendHorizonal size={17} />
                </button>
              </div>
            </form>
            )
          ) : (
            <p className="text-sm text-text/60">Connectez-vous pour laisser un commentaire.</p>
          )}

          <div className="flex flex-col gap-4">
            {loadingComments ? (
              <Loader />
            ) : comments.length === 0 ? (
              <p className="text-sm text-text/60 text-center py-4">Aucun commentaire pour l&apos;instant.</p>
            ) : (
              comments.map((comment) => {
                const isCommentAuthorAdmin = Boolean(comment.user?.is_admin || comment.user?.role === 'admin')
                const isCommentAuthorBanned = Boolean(
                  comment.user?.is_deleted ||
                  (comment.user?.banned_until && new Date(comment.user.banned_until) > new Date())
                )
                return (
                  <div key={comment.id} className="flex gap-3">
                    <Link href={`/profil/${comment.user.id}`} className="shrink-0">
                      <div className={`w-10 h-10 rounded-full bg-muted border-2 flex items-center justify-center overflow-hidden text-base-content/70 hover:opacity-80 transition-all ${
                        isCommentAuthorAdmin
                          ? 'border-red-500 ring-2 ring-red-500/60 ring-offset-1 ring-offset-[#111827]'
                          : isCommentAuthorBanned
                          ? 'grayscale opacity-60 border-red-500/70'
                          : 'border-border'
                      }`}>
                        {comment.user.avatar_url ? (
                          <Image src={comment.user.avatar_url} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                        ) : (
                          <CircleUser size={24} strokeWidth={1.5} className={isCommentAuthorBanned ? 'text-red-400' : ''} />
                        )}
                      </div>
                    </Link>
                    <div className={`flex-1 rounded-card px-4 py-2 ${
                      isCommentAuthorAdmin
                        ? 'bg-gradient-to-r from-red-500/10 via-base-200/50 to-purple-500/10 border border-red-500/30'
                        : isCommentAuthorBanned
                        ? 'bg-red-950/20 border border-red-950/40'
                        : 'bg-base-200/40'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Link
                            href={`/profil/${comment.user.id}`}
                            className={`font-semibold text-sm hover:underline ${
                              isCommentAuthorBanned && !isCommentAuthorAdmin ? 'text-red-400/90' : ''
                            }`}
                          >
                            {comment.user.username}
                          </Link>
                          {isCommentAuthorAdmin && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40 shadow-xs">
                              <Crown size={10} className="text-amber-400 fill-amber-400" />
                              Staff
                            </span>
                          )}
                          {isCommentAuthorBanned && !isCommentAuthorAdmin && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-500/40 shadow-xs">
                              <Ban size={10} className="text-red-400" />
                              Banni
                            </span>
                          )}
                        </div>
                        {user?.id === comment.user_id && (
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="text-text/40 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <p className="text-sm break-words mt-0.5">
                        <EmoteText text={comment.content} />
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
