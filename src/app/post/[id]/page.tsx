'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getPostById } from '../../lib/post'
import { Post } from '../../types/post'
import PostCards from '../../components/PostCards'
import AppLayout from '../../components/layout/AppLayout'

export default function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    getPostById(Number(id)).then((res) => setPost(res))
  }, [id])

  if (!post) return null

  return (
    <AppLayout sidebar>
      <PostCards post={post} />
    </AppLayout>
  )
}
