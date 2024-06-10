'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/hooks'
import { fetchPostById } from '@/src/lib/redux/features/posts/postsActions'
import { fetchUserById } from '@/src/lib/redux/features/users/usersActions'
import { Loader } from '../../core/Loader/Loader'
import styles from './Post.module.css'

type Props = {
  postId: string
}

const Post = ({ postId }: Props) => {
  const dispatch = useAppDispatch()
  const { post, isLoading: isPostLoading, error: postError } = useAppSelector((state) => state.post)
  const { user, isLoading: isUserLoading } = useAppSelector((state) => state.user)

  const userId = post?.userId

  useEffect(() => {
    dispatch(fetchPostById(parseInt(postId)))
  }, [dispatch, postId])

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId))
    }
  }, [dispatch, userId])

  if (isPostLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    )
  }

  if (postError) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load data. Please try again later.</p>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.author}>
          {isUserLoading ? (
            <div className={styles.avatarPlaceholder} />
          ) : (
            <>
              <Image
                className={styles.avatar}
                width={100}
                height={100}
                src={`https://picsum.photos/seed/${user?.id}/100`}
                alt="Avatar"
              />
              <span className={styles.authorName}>{user?.name}</span>
            </>
          )}
        </div>
        <p className={styles.text}>{post?.body}</p>
      </div>
    </div>
  )
}

export default Post
