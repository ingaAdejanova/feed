import React from 'react'
import styles from './page.module.css'
import dynamic from 'next/dynamic'

const DynamicPostList = dynamic(() => import('@/src/components/posts/PostList/PostList'), {
  ssr: false,
})

export default function PostsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Posts</h1>
      <DynamicPostList />
    </div>
  )
}
