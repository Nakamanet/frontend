'use client'

import { useState, useEffect } from 'react'
import {
  Flame,
  Clock,
  Users,
  SlidersHorizontal,
  CircleUser,
  Image as ImageIcon,
  SendHorizonal,
  Smile,
} from 'lucide-react'
import Image from 'next/image'
import { User } from '../../types/auth'
import { Post } from '../../types/post'
import PostCards from '../PostCards'
import { getPosts } from '@/app/lib/post'
import { createPost } from '@/app/lib/post'
import Link from 'next/link'
import { useToast } from '@/app/context/ToastContext'

export default function PostList({ isLoggedIn, user }: { isLoggedIn: boolean; user: User | null }) {
  const [filter, setFilter] = useState('all')
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const { showToast } = useToast()

  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err))
  }, [])

  const postPosts = async () => {
    try {
      await createPost({
        content,
        related_anime_id: null,
        related_manga_id: null,
        image_urls: null,
        is_spoiler: false,
      })
      setContent('')
      showToast('Post publié avec succès', 'success')
      getPosts().then((res) => setPosts(res.data))
    } catch (err) {
      showToast('Echec lors de la publication du post', 'error')
    }
  }

  console.log('posts : ', content)

  return (
    <div className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
      {/* Ajouter un post */}
      {isLoggedIn && user ? (
        <div className="flex flex-col bg-accent border border-border rounded-[15px] gap-2 px-6 py-4">
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70">
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt="Avatar"
                  width={35}
                  height={35}
                  className="w-full h-full object-cover"
                />
              ) : (
                <CircleUser size={35} strokeWidth={1.5} />
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Partage ton avis sur un manga, un anime, etc"
                  maxLength={500}
                  className="input text-border input-ghost w-full h-10"
                />
              </div>
              <div className="flex justify-between gap-2">
                <div className="flex gap-2 pt-2">
                  <ImageIcon size={20} />
                  <Smile size={20} />
                </div>
                <button
                  onClick={postPosts}
                  className="btn btn-ghost px-4 border border-border text-border rounded-[15px]"
                >
                  <SendHorizonal size={17} />
                  Poster
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Filtre/Tendances/... */}
      <div className="flex justify-between border border-border bg-accent rounded-full py-1 px-6">
        <div className="flex gap-5">
          <button
            onClick={() => {
              if (filter === 'trends') {
                setFilter('all')
              } else {
                setFilter('trends')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'trends' ? 'bg-alerts text-white' : 'text-border'}`}
          >
            <Flame size={18} />
            <span className="hidden md:inline">Tendances</span>
          </button>
          <button
            onClick={() => {
              if (filter === 'recent') {
                setFilter('all')
              } else {
                setFilter('recent')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'recent' ? 'bg-alerts text-white' : 'text-border'}`}
          >
            <Clock size={18} />
            <span className="hidden md:inline">Récents</span>
          </button>
          <button
            onClick={() => {
              if (filter === 'friends') {
                setFilter('all')
              } else {
                setFilter('friends')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'friends' ? 'bg-alerts text-white' : 'text-border'}`}
          >
            <Users size={18} />
            <span className="hidden md:inline">Amis</span>
          </button>
        </div>
        <div className="flex px-4 gap-2">
          <SlidersHorizontal size={20} />
          <p className="hidden md:inline">Filtres</p>
        </div>
      </div>
      {/* Zone des posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostCards key={post.id} post={post} />
          </Link>
        ))
      ) : (
        <p>Aucun post trouvé</p>
      )}
    </div>
  )
}
