'use client'

import { useEffect, useCallback, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/hooks'
import { fetchPosts } from '@/src/lib/redux/features/posts/postsActions'
import { fetchUsers } from '@/src/lib/redux/features/users/usersActions'
import { addPost } from '@/src/lib/redux/features/posts/postsSlice'
import socket from '@/src/lib/socket'
import { Loader } from '../../core/Loader/Loader'
import styles from './PostList.module.css'
import { PostListItem } from '../PostListItem/PostListItem'

export const PostList = () => {
  const dispatch = useAppDispatch()
  const { posts, page, hasMore } = useAppSelector((state) => state.posts)
  const { users } = useAppSelector((state) => state.users)
  const [highlightedPostId, setHighlightedPostId] = useState<number | null>(null)
  const [fetchedUserIds, setFetchedUserIds] = useState<number[]>([])

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts({}))
    }
  }, [dispatch])

  useEffect(() => {
    if (posts.length) {
      const userIds = posts.map((post) => post.userId)
      const uniqueUserIds = [...new Set(userIds)].filter((userId) => !fetchedUserIds.includes(userId))
      if (uniqueUserIds.length) {
        dispatch(fetchUsers(uniqueUserIds))
        setFetchedUserIds((prevIds) => [...prevIds, ...uniqueUserIds])
      }
    }
  }, [posts, dispatch, fetchedUserIds])

  useEffect(() => {
    socket.on('new-post', (newPost) => {
      setHighlightedPostId(newPost.id)
      dispatch(addPost(newPost))

      if (!fetchedUserIds.includes(newPost.userId)) {
        dispatch(fetchUsers([newPost.userId]))
        setFetchedUserIds((prevIds) => [...prevIds, newPost.userId])
      }
      const timeoutId = setTimeout(() => {
        setHighlightedPostId(null)
      }, 5000)

      return () => {
        clearTimeout(timeoutId)
      }
    })

    return () => {
      socket.off('new-post')
    }
  }, [dispatch, fetchedUserIds])

  const fetchMore = useCallback(() => {
    if (hasMore) {
      dispatch(fetchPosts({ page: page + 1 }))
    }
  }, [dispatch, page, hasMore, posts])

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      }
      endMessage={<p className={styles.endMessage}>No more posts to load</p>}
    >
      {posts.map((post) => {
        const user = users.find((user) => user.id === post.userId)
        return <PostListItem key={post.id} user={user} post={post} highlightedPostId={highlightedPostId} />
      })}
    </InfiniteScroll>
  )
}
