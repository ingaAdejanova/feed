import React from 'react'
import dynamic from 'next/dynamic'

const DynamicPost = dynamic(() => import('@/src/components/posts/Post/Post'), {
  ssr: false,
})

type Props = {
  params: {
    postId: string
  }
}

export default function PostPage({ params }: Props) {
  const { postId } = params
  return <DynamicPost postId={postId} />
}
