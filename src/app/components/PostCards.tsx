'use client'

import Image from 'next/image'
import { CircleUser, Heart, MessageCircle, Bookmark } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Post } from '../types/post'
import { toggleLikePost } from '../lib/likes'
import { useToast } from '../context/ToastContext'
import { useState } from 'react'

export default function PostCards({ post }: { post: Post }) {
  const { showToast } = useToast()
  const [likeCount, setLikeCount] = useState(post.likes_count)
  const [liked, setLiked] = useState(false)

  const handleLike = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await toggleLikePost(post.id)
      .then(res => { 
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        res.liked ? showToast('Post liké', 'success') : showToast('Post delike', 'success'); 
        setLikeCount(prev => res.liked ? prev + 1 : prev - 1); 
        setLiked(res.liked)
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(err => showToast('Erreur lors du like du post', 'error'))
  }

  return (
    <div key={post.id} className="bg-accent shadow-sm w-full border border-border rounded-[15px] p-6">
      <div className="flex gap-3">
        <div>
          {post.user.avatar_url ? (
            <Image
              src={post.user.avatar_url}
              alt="Avatar"
              width={100}
              height={100}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70">
              <CircleUser size={35} strokeWidth={1.5} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <p className="font-bold">{post.user.username}</p>
            <p className="text-sm text-border">@{post.user.username}</p>
            <p className="text-sm text-border">{formatDistanceToNow(new Date(post.updated_at), { locale: fr })}</p>
          </div>
          <p>{post.content}</p>
          <div className="flex">
            <button className='btn btn-ghost flex gap-2 p-2' onClick={handleLike}>
              <Heart size={20} className={liked ? 'fill-red-500 text-red-500' : ''}/>
              <p>{likeCount}</p>
            </button>
            <button className="btn btn-ghost flex gap-2 p-2">
              <MessageCircle size={20} />
              <p>{post.comments_count}</p>
            </button>
            <button className="btn btn-ghost flex gap-2 p-2">
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
