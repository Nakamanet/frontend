import Image from 'next/image'
import { CircleUser, Heart, MessageCircle, Bookmark } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Post } from '../types/post'

export default function PostCards({ post }: { post: Post }) {
  return (
    <div
      key={post.id}
      className="bg-accent shadow-sm place-items-center w-full border border-border rounded-[15px] p-6"
    >
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
          <div className="flex gap-2">
            <div className="flex gap-2">
              <Heart size={20} />
              <p>0</p>
            </div>
            <div className="flex gap-2">
              <MessageCircle size={20} />
              <p>0</p>
            </div>
            <div className="flex gap-2">
              <Bookmark size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
