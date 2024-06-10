import { configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import postsReducer, { addPost } from '../../lib/redux/features/posts/postsSlice'

describe('postsSlice', () => {
  let store: any

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
      },
    })
  })

  it('fetchPosts action is working correctly', async () => {
    const response = [
      { id: 1, title: 'Test Post 1', userId: 1, body: 'test1' },
      { id: 2, title: 'Test Post 2', userId: 2, body: 'test2' },
    ]
    const mockFetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
      return response
    })

    await store.dispatch(mockFetchPosts())

    const state = store.getState().posts

    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.posts).toEqual(response)
    expect(state.page).toBe(1)
    expect(state.hasMore).toBe(true)
  })

  it('addPost action is working correctly', () => {
    const post = { id: 3, title: 'Test Post 3', userId: 3, body: 'test3' }

    store.dispatch(addPost(post))

    const state = store.getState().posts

    expect(state.posts[0]).toEqual(post)
  })

  it('fetchPosts action handles rejection correctly', async () => {
    const errorMessage = 'Error fetching posts'
    const mockFetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
      throw new Error(errorMessage)
    })

    await store.dispatch(mockFetchPosts())

    const state = store.getState().posts

    expect(state.isLoading).toBe(false)
    expect(state.error).toBe(errorMessage)
  })
})
