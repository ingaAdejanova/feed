import styles from './page.module.css'
import { PostList } from '@/src/components/posts/PostList/PostList'

export default function PostsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Posts</h1>
      <PostList />
    </div>
  )
}
