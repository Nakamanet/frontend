'use client'

import { useState } from 'react'
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import Button from '@/app/components/ui/Button'
import MentionInput from '../MentionInput'
import { useTranslations } from 'next-intl'

export default function PostList({ isLoggedIn, user }: { isLoggedIn: boolean; user: User | null }) {
  const [filter, setFilter] = useState('all')
  const [content, setContent] = useState('')
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const t = useTranslations('postList')

  const { data, isLoading } = useQuery({
    queryKey: ['posts', { userId: user?.id, filter }],
    queryFn: () => getPosts({ filter: filter as GetPostsParams['filter'] }),
  })
  const posts = data?.data ?? []

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
      showToast(t('postSuccess'), 'success')
      queryClient.invalidateQueries({ queryKey: ['posts', { userId: user?.id }] })
    },
    onError: () => {
      showToast(t('postError'), 'error')
    },
  })

  const toggleFilter = (value: string) => {
    setFilter((prev) => (prev === value ? 'all' : value))
  }

  const filterBtnClass = (value: string) =>
    `flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal transition-colors rounded-full ${
      filter === value ? 'bg-primary text-white' : 'text-text-muted hover:bg-primary/20 hover:text-text'
    }`

  return (
    <div className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
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
                  placeholder={t('placeholder')}
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
                  {t('post')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex justify-between border border-border bg-accent rounded-full py-1 px-6">
        <div className="flex gap-5">
          <button onClick={() => toggleFilter('trends')} className={filterBtnClass('trends')}>
            <Flame size={18} />
            <span className="hidden md:inline">{t('trends')}</span>
          </button>
          <button onClick={() => toggleFilter('recent')} className={filterBtnClass('recent')}>
            <Clock size={18} />
            <span className="hidden md:inline">{t('recent')}</span>
          </button>
          <button onClick={() => toggleFilter('friends')} className={filterBtnClass('friends')}>
            <Users size={18} />
            <span className="hidden md:inline">{t('friends')}</span>
          </button>
        </div>
        <button className="flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal text-text-muted hover:text-text transition-colors rounded-full">
          <SlidersHorizontal size={20} />
          <p className="hidden md:inline">{t('filters')}</p>
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <PostCards key={post.id} post={post} />
        ))
      ) : (
        <p className="text-text/60 text-center py-10">{t('empty')}</p>
      )}
    </div>
  )
}
