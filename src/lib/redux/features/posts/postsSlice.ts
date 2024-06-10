import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPosts, Post } from './postsActions'

type PostsState = {
  posts: Post[]
  isLoading: boolean
  error: string | null
  page: number
  hasMore: boolean
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
  page: 0,
  hasMore: true,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state: PostsState, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state: PostsState) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state: PostsState, action: PayloadAction<Post[]>) => {
        state.isLoading = false
        if (action.payload.length > 0) {
          state.posts = [...state.posts, ...action.payload]
          state.page++
          state.hasMore = true
        } else {
          state.hasMore = false
        }
      })
      .addCase(fetchPosts.rejected, (state: PostsState, action) => {
        state.isLoading = false
        state.error = action.error.message || null
      })
  },
})

export const { addPost } = postsSlice.actions

export default postsSlice.reducer
