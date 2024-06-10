import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPostById, Post } from './postsActions'

type PostState = {
  post: Post | null
  isLoading: boolean
  error: string | null
}

const initialState: PostState = {
  post: null,
  isLoading: false,
  error: null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state: PostState) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPostById.fulfilled, (state: PostState, action: PayloadAction<Post>) => {
        state.isLoading = false
        state.post = action.payload
      })
      .addCase(fetchPostById.rejected, (state: PostState, action) => {
        state.isLoading = false
        state.error = action.error.message || null
      })
  },
})

export default postSlice.reducer
