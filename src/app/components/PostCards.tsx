'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CircleUser, Heart, MessageCircle, Bookmark, EllipsisVertical } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from "../context/AuthContext"
import { fr } from 'date-fns/locale'
import { Post } from '../types/post'
import { toggleLikePost } from '../lib/likes'
import { useToast } from '../context/ToastContext'
import { useState } from 'react'
import { unsavePost, savePost, deletePost, archivePost, hidePost } from "../lib/post"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { blockFriend } from '../lib/friends'
import EditPostModal from './EditPostModal'
import Card from './ui/Card'

export default function PostCards({ post, detailView = false }: { post: Post, detailView?: boolean }) {
  const { user } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes_count)
  const [likedOverride, setLikedOverride] = useState<boolean | null>(null)
  const liked = likedOverride ?? (post.user_has_liked ?? false)
  const [saved, setSaved] = useState(post.user_has_saved ?? false)
  const isOwner = post.user.id === user?.id 

  const { mutate: like } = useMutation({
    mutationFn: () => toggleLikePost(post.id),
    onSuccess: (res) => {
      setLikeCount(prev => res.liked ? prev + 1 : prev - 1)
      setLikedOverride(res.liked)
    },
    onError: () => showToast('Erreur lors du like du post', 'error'),
  })

  const { mutate: toggleSave } = useMutation({
    mutationFn: () => saved ? unsavePost(post.id) : savePost(post.id),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      saved
        ? showToast('Post retiré des sauvegardes', 'success')
        : showToast('Post sauvegardé', 'success')
      setSaved(prev => !prev)
    },
    onError: () => showToast("Erreur lors de la sauvegarde", "error")
  })
  
  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['user', post.user.id, 'posts'] })
      showToast("Post supprimé", "success")
      if (detailView) router.push('/')
    },
    onError: () => showToast('Erreur lors de la suppression', 'error')
  })

  const handleRemove = () => {
    const confirmed = confirm('Voulez-vous vraiment supprimer le post ?')
    if (confirmed) deleteMutation.mutate()
  }

  const archiveMutation = useMutation({
    mutationFn: () => archivePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['user', post.user.id, 'posts'] })
      showToast("Post archivé", "success")
      if (detailView) router.push('/')
    },
    onError: () => showToast("Erreur lors de l'archivage du post", 'error')
  })

  const blockMutation = useMutation({
    mutationFn: () => blockFriend(post.user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      showToast("Utilisateur bloqué", "success")
      if (detailView) router.push('/')
    },
    onError: () => showToast('Erreur lors du bloquage', 'error')
  })

  const handleBlock = () => {
    const confirmed = confirm('Voulez-vous vraimetn bloquer cet utilisateur ?')
    if (confirmed) blockMutation.mutate()
  }

  const hideMutation = useMutation({
    mutationFn: () => hidePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      showToast("Post masqué", "success")
      if (detailView) router.push('/')
    },
    onError: () => showToast("Erreur pour masquer le post", "error")
  })

  return (
    <Card
      key={post.id}
      onClick={() => router.push(`/post/${post.id}`)}
      className="shadow-sm w-full hover:border-primary/50 transition-colors cursor-pointer"
    >
      <div className="flex gap-3 justify-between">
        <div className='flex gap-3 flex-1 min-w-0'>
          <Link
            href={`/profil/${post.user.id}`}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0"
          >
            {post.user.avatar_url ? (
              <Image
                src={post.user.avatar_url}
                alt="Avatar"
                width={100}
                height={100}
                className="w-12 h-12 rounded-full hover:opacity-80 transition-opacity"
              />
            ) : (
              <div className="w-12 h-12 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70 hover:opacity-80 transition-opacity">
                <CircleUser size={35} strokeWidth={1.5} />
              </div>
            )}
          </Link>
          <div className="flex flex-col gap-3 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 min-w-0">
              <Link
                href={`/profil/${post.user.id}`}
                onClick={(e) => e.stopPropagation()}
                className="font-bold hover:underline"
              >
                {post.user.username}
              </Link>
              <p className="text-sm text-text/60">@{post.user.username}</p>
              <p className="text-sm text-text/60">{formatDistanceToNow(new Date(post.updated_at), { locale: fr })}</p>
            </div>
            <p>{post.content}</p>
            <div className="flex">
              <button
                className='btn btn-ghost flex gap-2 p-2 hover:text-primary transition-colors'
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); like() }}
              >
                <Heart size={20} className={liked ? 'fill-primary text-primary' : 'text-text/70'}/>
                <p>{likeCount}</p>
              </button>
              <button className="btn btn-ghost flex gap-2 p-2 text-text/70 hover:text-primary transition-colors">
                <MessageCircle size={20} />
                <p>{post.comments_count}</p>
              </button>
              <button
                className="btn btn-ghost flex gap-2 p-2 hover:text-primary transition-colors"
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleSave() }}
              >
                <Bookmark size={20} className={saved ? 'fill-primary text-primary' : 'text-text/70'}/>
              </button>
            </div>
          </div>
        </div>
        <div className='dropdown dropdown-end' onClick={(e) => e.stopPropagation()}>
          <div tabIndex={0} role="button" className="btn btn-ghost border-none hover:bg-transparent hover:border-none focus:bg-transparent focus:border-none">
            <EllipsisVertical size={20} />
          </div>
          {isOwner ? (
            <ul tabIndex={-1} className="menu menu-lg dropdown-content w-auto rounded-box z-10 mt-3 p-2 bg-accent border border-border shadow">
              <li>
                <button 
                  className="text-sm border-none rounded-full" 
                  onClick={() => setIsEditOpen(true)}>
                  Modifier
                </button>
              </li>
              <li>
                <button 
                  className="text-sm border-none rounded-full" 
                  onClick={() => archiveMutation.mutate()}
                >
                  Archiver
                </button>
              </li>
              <li>
                <button
                  className="text-sm border-none rounded-full text-primary"
                  onClick={handleRemove}
                >
                  Supprimer
                </button>
              </li>
            </ul>
          ) : (
            <ul tabIndex={-1} className="menu menu-lg dropdown-content w-auto rounded-box z-10 mt-3 p-2 bg-accent border border-border shadow">
              {user && (
                <>
                  <li>
                    <button 
                      className="text-sm border-none rounded-full" 
                      onClick={() => hideMutation.mutate()}
                    >
                      Masquer
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-sm border-none rounded-full text-primary"
                      onClick={handleBlock}
                    >
                      Bloquer l&apos;utilisateur
                    </button>
                  </li>
                  <li>
                    <button className="text-sm border-none rounded-full" >
                      Signaler
                    </button>
                  </li>
                </>
              )}
              <li>
                <Link 
                  href={`/profil/${post.user.id}`}
                  className="text-sm border-none rounded-full" >
                  Voir le profil
                </Link>
              </li>
            </ul>
          )}

          {isEditOpen && (
            <EditPostModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} post={post}/>
          )}
        </div>
      </div>
    </Card>
  )
}
