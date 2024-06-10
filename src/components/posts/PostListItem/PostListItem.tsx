'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Post } from '@/src/lib/redux/features/posts/postsActions'
import { User } from '@/src/lib/redux/features/users/usersActions'
import { ROUTES } from '@/src/lib/routes'
import styles from './PostListItem.module.css'

type Props = {
  post: Post
  user: User | undefined
  highlightedPostId: number | null
}

export const PostListItem = ({ post, user, highlightedPostId }: Props) => {
  const router = useRouter()

  const handlePostClick = (postId: number) => {
    router.push(`${ROUTES.POSTS}/${postId}`)
  }
  const postContainerClass = highlightedPostId === post.id ? styles.highlightedContainer : styles.container

  return (
    <div className={postContainerClass} onClick={() => handlePostClick(post.id)}>
      <div className={styles.authorContainer}>
        {user ? (
          <>
            <Image
              className={styles.avatar}
              height={50}
              width={50}
              src={`https://picsum.photos/seed/${user.id}/50`}
              alt="Avatar"
            />
            <span className={styles.authorName}>{user.name}</span>
          </>
        ) : (
          <div className={styles.avatarPlaceholder} />
        )}
      </div>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.body}>{post.body}</p>
    </div>
  )
}
