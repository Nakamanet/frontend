'use client'

import { useParams } from 'next/navigation'
import { getPostById } from '../../lib/post'
import { Post } from '../../types/post'
import PostCards from '../../components/PostCards'
import AppLayout from '../../components/layout/AppLayout'
import { useQuery } from '@tanstack/react-query'

export default function PostPage() {
  const { id } = useParams()

  const { data: post } = useQuery<Post>({
    queryKey: ['posts', Number(id)],
    queryFn: () => getPostById(Number(id)),
    enabled: !!id,
  })

  if (!post) return null

  return (
    <AppLayout sidebar>
      <PostCards post={post} />
    </AppLayout>
  )
}
