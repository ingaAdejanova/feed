import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../../../api/fetcher'
import { API_URL } from '../../../api/url'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

interface FetchPostsPayload {
  page?: number
  limit?: number
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page = 1, limit = 20 }: FetchPostsPayload): Promise<Post[]> => {
    const url = `${API_URL.POSTS}?_page=${page}&_per_page=${limit}`
    return fetchData<Post[]>(url)
  },
)

export const fetchPostById = createAsyncThunk('post/fetchPostById', async (postId: number): Promise<Post> => {
  const url = API_URL.POST(postId)
  return fetchData<Post>(url)
})
