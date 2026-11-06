'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CircleUser, Heart, MessageCircle, Bookmark, EllipsisVertical, Crown, ShieldCheck, Ban, AlertTriangle, EyeOff } from 'lucide-react'
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
import { reportContent } from '../lib/reports'
import EditPostModal from './EditPostModal'
import Card from './ui/Card'
import EmoteText from './EmoteText'

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
  const isAuthorAdmin = Boolean(post.user?.is_admin || post.user?.role === 'admin')
  const isAuthorBanned = Boolean(
    post.user?.is_deleted ||
    (post.user?.banned_until && new Date(post.user.banned_until) > new Date())
  ) 
  const isSensitive = Boolean(post.is_hidden)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [isLocallyIgnored, setIsLocallyIgnored] = useState(false)

  const handleIgnorePost = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsLocallyIgnored(true)
    if (user) {
      hideMutation.mutate()
    } else {
      showToast('Publication masquée de votre fil', 'info')
    }
  } 

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

  const reportMutation = useMutation({
    mutationFn: () => reportContent('post', post.id),
    onSuccess: () => showToast('Post signalé, merci', 'success'),
    onError: () => showToast('Erreur lors du signalement', 'error'),
  })

  if (isLocallyIgnored) {
    return null
  }

  return (
    <>
      <Card
        key={post.id}
        onClick={() => router.push(`/post/${post.id}`)}
        className={`shadow-sm w-full hover:border-primary/50 transition-all cursor-pointer ${
          isAuthorAdmin ? 'admin-post-card' : isAuthorBanned ? 'border-red-950/70 bg-red-950/10' : ''
        }`}
      >
      <div className="flex gap-3 justify-between">
        <div className='flex gap-3 flex-1 min-w-0'>
          <div className="relative w-12 h-12 shrink-0 self-start">
            <Link
              href={`/profil/${post.user.id}`}
              onClick={(e) => e.stopPropagation()}
              className="block w-12 h-12"
            >
              {post.user.avatar_url ? (
                <Image
                  src={post.user.avatar_url}
                  alt="Avatar"
                  width={100}
                  height={100}
                  className={`w-12 h-12 rounded-full object-cover hover:opacity-80 transition-all ${
                    isAuthorAdmin
                      ? 'ring-2 ring-red-500/80 ring-offset-2 ring-offset-[#111827] shadow-[0_0_10px_rgba(225,16,72,0.45)]'
                      : isAuthorBanned
                      ? 'grayscale opacity-60 border-2 border-red-500/70'
                      : ''
                  }`}
                />
              ) : (
                <div className={`w-12 h-12 rounded-[10px] bg-muted border-2 flex items-center justify-center shrink-0 overflow-hidden text-base-content/70 hover:opacity-80 transition-all ${
                  isAuthorAdmin
                    ? 'border-red-500/80 ring-2 ring-red-500/50 ring-offset-2 ring-offset-[#111827] shadow-[0_0_10px_rgba(225,16,72,0.45)]'
                    : isAuthorBanned
                    ? 'grayscale opacity-60 border-red-500/70 text-red-400/70'
                    : 'border-border'
                }`}>
                  <CircleUser size={35} strokeWidth={1.5} />
                </div>
              )}
            </Link>
            {isAuthorBanned && !isAuthorAdmin && (
              <div
                title="Compte banni"
                className="absolute -bottom-1 -right-1 bg-red-600 text-white rounded-full p-0.5 border border-[#111827] shadow-sm pointer-events-none z-10"
              >
                <Ban size={10} strokeWidth={2.5} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            {isAuthorAdmin && (
              <div className="flex items-center gap-1.5 -mb-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-red-500/20 via-pink-500/15 to-purple-500/20 border border-red-500/40 text-red-300 shadow-sm backdrop-blur-xs select-none">
                  <Crown size={11} className="text-amber-400 fill-amber-400 animate-pulse shrink-0" />
                  <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 bg-clip-text text-transparent font-extrabold tracking-wider">
                    Créateur • Staff
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] ml-0.5 shrink-0" />
                </span>
              </div>
            )}
            {isAuthorBanned && !isAuthorAdmin && (
              <div className="flex items-center gap-1.5 -mb-0.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-950/70 border border-red-500/40 text-red-400 shadow-sm select-none">
                  <Ban size={11} className="text-red-400 shrink-0" />
                  <span>Compte Banni</span>
                </span>
              </div>
            )}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 min-w-0">
              <Link
                href={`/profil/${post.user.id}`}
                onClick={(e) => e.stopPropagation()}
                className={`font-bold hover:underline inline-flex items-center gap-1 ${
                  isAuthorBanned && !isAuthorAdmin ? 'text-red-400/90' : ''
                }`}
              >
                <span className={isAuthorAdmin ? 'text-white drop-shadow-[0_0_8px_rgba(225,16,72,0.4)]' : ''}>
                  {post.user.username}
                </span>
                {isAuthorAdmin && (
                  <span title="Compte officiel vérifié" className="inline-flex items-center">
                    <ShieldCheck size={14} className="text-amber-400 fill-amber-400/20 shrink-0" />
                  </span>
                )}
                {isAuthorBanned && !isAuthorAdmin && (
                  <span title="Cet utilisateur est actuellement banni de la plateforme" className="inline-flex items-center">
                    <Ban size={13} className="text-red-400 shrink-0" />
                  </span>
                )}
              </Link>
              <p className="text-sm text-text/60">@{post.user.handle}</p>
              <p className="text-sm text-text/60">{formatDistanceToNow(new Date(post.updated_at), { locale: fr })}</p>
            </div>
            {isSensitive && !isRevealed ? (
              <div className="relative my-2 min-h-[145px] rounded-xl overflow-hidden flex items-center justify-center border border-red-500/20 bg-base-100/40">
                <div className="w-full p-4 text-text whitespace-pre-wrap break-words overflow-hidden filter blur-md select-none pointer-events-none transition-all duration-300">
                  <EmoteText text={post.content} />
                </div>

                {/* Overlay flou modération IA */}
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-background/85 backdrop-blur-md text-center gap-2 select-none shadow-lg animate-in fade-in duration-200"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold tracking-wide uppercase shadow-xs">
                    <AlertTriangle size={13} className="text-red-400 shrink-0" />
                    <span>Contenu sensible / vulgaire (+18)</span>
                  </div>

                  <p className="text-xs text-text/70 max-w-sm">
                    Cette publication a été signalée par l&apos;intelligence artificielle pour langage inapproprié ou contenu sensible.
                  </p>

                  <div className="flex flex-col items-center gap-1.5 mt-1">
                    <button
                      type="button"
                      onClick={handleIgnorePost}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <EyeOff size={13} className="shrink-0" />
                      <span>Ignorer la publication</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setShowWarningModal(true)
                      }}
                      className="text-[11px] text-text/40 hover:text-text/80 underline underline-offset-2 transition-colors cursor-pointer mt-0.5"
                    >
                      Voir quand même
                    </button>
                  </div>
                </div>
              </div>
            ) : isSensitive && isRevealed ? (
              <div className="flex flex-col gap-1.5 my-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 border border-red-500/30 text-red-300">
                    <AlertTriangle size={10} className="text-red-400 shrink-0" />
                    Contenu sensible affiché
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      setIsRevealed(false)
                    }}
                    className="text-[10px] text-text/50 hover:text-text underline cursor-pointer"
                  >
                    Masquer à nouveau
                  </button>
                </div>
                <div className="text-text whitespace-pre-wrap break-words overflow-hidden">
                  <EmoteText text={post.content} />
                </div>
              </div>
            ) : (
              <div className="text-text whitespace-pre-wrap break-words overflow-hidden">
                <EmoteText text={post.content} />
              </div>
            )}
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
                    <button
                      className="text-sm border-none rounded-full"
                      onClick={() => reportMutation.mutate()}
                    >
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

    {showWarningModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setShowWarningModal(false)
        }}
      >
        <div
          className="bg-accent border border-red-500/30 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 text-center"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-lg text-text">Avertissement de contenu</h3>
            <p className="text-xs text-text/70 leading-relaxed">
              Cette publication a été signalée par notre modération automatique pour langage inapproprié, contenu vulgaire ou réservé aux adultes (+18).
            </p>
            <p className="text-sm font-semibold text-text pt-1">
              Souhaitez-vous vraiment afficher ce contenu ?
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setShowWarningModal(false)
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-base-100 hover:bg-base-200 border border-border text-text/80 transition-all cursor-pointer active:scale-95"
            >
              Non, garder masqué
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setIsRevealed(true)
                setShowWarningModal(false)
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Oui, afficher le contenu
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}
