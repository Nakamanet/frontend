'use client'

import { useParams } from 'next/navigation'
import { getPostById } from '../../lib/post'
import { Post } from '../../types/post'
import PostCards from '../../components/PostCards'
import AppLayout from '../../components/layout/AppLayout'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'

export default function PostPage() {
  const { id } = useParams()

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ['posts', Number(id)],
    queryFn: () => getPostById(Number(id)),
    enabled: !!id,
  })

  if (isLoading) return (
    <AppLayout sidebar>
      <Loader />
    </AppLayout>
  )
  if (!post) return null

  return (
    <AppLayout sidebar>
      <PostCards post={post} />
    </AppLayout>
  )
}
