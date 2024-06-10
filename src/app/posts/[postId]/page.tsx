import React from 'react'
import { Post } from '@/src/components/posts/Post/Post'

type Props = {
  params: {
    postId: string
  }
}

export default function PostPage({ params }: Props) {
  const { postId } = params
  return <Post postId={postId} />
}
