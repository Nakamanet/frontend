'use client'

import { useParams } from 'next/navigation'
import { getPostById } from '../../lib/post'
import { Post } from '../../types/post'
import PostCards from '../../components/PostCards'
import AppLayout from '../../components/layout/AppLayout'
import { useQuery } from '@tanstack/react-query'

export default function PostPage() {
  const { id } = useParams()

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ['posts', Number(id)],
    queryFn: () => getPostById(Number(id)),
    enabled: !!id,
  })

  if (isLoading) return (
    <AppLayout sidebar>
      <div className="flex justify-center items-center p-10 border border-border bg-accent rounded-[15px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    </AppLayout>
  )
  if (!post) return null

  return (
    <AppLayout sidebar>
      <PostCards post={post} />
    </AppLayout>
  )
}
