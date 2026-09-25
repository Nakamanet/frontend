'use client'

import { useEffect, useRef, useState } from 'react'
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
import PostCards from '../PostCards'
import { getPosts, createPost, GetPostsParams } from '@/app/lib/post'
import { useToast } from '@/app/context/ToastContext'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import Button from '@/app/components/ui/Button'
import MentionInput from '../MentionInput'

// Le back pagine par 20 : on affiche par blocs de 10 côté front
const POSTS_PER_BLOCK = 10

export default function PostList({ isLoggedIn, user }: { isLoggedIn: boolean; user: User | null }) {
  const [filter, setFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_BLOCK)
  const [content, setContent] = useState('')
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts', { userId: user?.id, filter }],
    queryFn: ({ pageParam }) =>
      getPosts({ page: pageParam, filter: filter as GetPostsParams['filter'] }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined,
  })
  const allPosts = data?.pages.flatMap((page) => page.data) ?? []
  const posts = allPosts.slice(0, visibleCount)
  const hasHiddenPosts = visibleCount < allPosts.length

  const changeFilter = (next: string) => {
    setFilter(next)
    setVisibleCount(POSTS_PER_BLOCK)
  }

  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || (!hasHiddenPosts && !hasNextPage)) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        if (hasHiddenPosts) setVisibleCount((count) => count + POSTS_PER_BLOCK)
        else if (!isFetchingNextPage) fetchNextPage()
      },
      { rootMargin: '300px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasHiddenPosts, hasNextPage, isFetchingNextPage, fetchNextPage])

  const { mutate: postPosts } = useMutation({
    mutationFn: () => createPost({
      content,
      related_anime_id: null,
      related_manga_id: null,
      image_urls: null,
      is_spoiler: false,
    }),
    onSuccess: () => {
      setContent('')
      showToast('Post publié avec succès', 'success')
      queryClient.invalidateQueries({ queryKey: ['posts', { userId: user?.id }] })
    },
    onError: () => {
      showToast('Echec lors de la publication du post', 'error')
    },
  })

  return (
    <div className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
      {/* Ajouter un post */}
      {isLoggedIn && user ? (
        <div className="flex flex-col bg-accent border border-border rounded-card gap-2 px-6 py-4">
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
               <MentionInput
                  value={content}
                  onChange={setContent}
                  placeholder="Quoi de neuf?"
                  className="textarea textarea-ghost bg-border w-full resize-none rounded-2xl"
                />
              </div>
              <div className="flex justify-between gap-2">
                <div className="flex gap-2 pt-2">
                  <ImageIcon size={20} className="text-text/50 hover:text-primary transition-colors cursor-pointer" />
                  <Smile size={20} className="text-text/50 hover:text-primary transition-colors cursor-pointer" />
                </div>
                <Button onClick={() => postPosts()} disabled={!content.trim()} size="sm">
                  <SendHorizonal size={16} />
                  Poster
                </Button>
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
                changeFilter('all')
              } else {
                changeFilter('trends')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal transition-colors rounded-full ${filter === 'trends' ? 'bg-primary text-white' : 'text-text-muted hover:bg-primary/20 hover:text-text'}`}
          >
            <Flame size={18} />
            <span className="hidden md:inline">Tendances</span>
          </button>
          <button
            onClick={() => {
              if (filter === 'recent') {
                changeFilter('all')
              } else {
                changeFilter('recent')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal transition-colors rounded-full ${filter === 'recent' ? 'bg-primary text-white' : 'text-text-muted hover:bg-primary/20 hover:text-text'}`}
          >
            <Clock size={18} />
            <span className="hidden md:inline">Récents</span>
          </button>
          <button
            onClick={() => {
              if (filter === 'friends') {
                changeFilter('all')
              } else {
                changeFilter('friends')
              }
            }}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal transition-colors rounded-full ${filter === 'friends' ? 'bg-primary text-white' : 'text-text-muted hover:bg-primary/20 hover:text-text'}`}
          >
            <Users size={18} />
            <span className="hidden md:inline">Amis</span>
          </button>
        </div>
        <button className="flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal text-text-muted hover:text-text transition-colors rounded-full">
          <SlidersHorizontal size={20} />
          <p className="hidden md:inline">Filtres</p>
        </button>
      </div>
      {/* Zone des posts */}
      {isLoading ? (
        <Loader />
      ) : posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <PostCards key={post.id} post={post} />
          ))}
          <div ref={sentinelRef} />
          {isFetchingNextPage && <Loader />}
        </>
      ) : (
        <p className="text-text/60 text-center py-10">Aucun post trouvé</p>
      )}
    </div>
  )
}
