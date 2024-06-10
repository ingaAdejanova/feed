import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../../../api/fetcher'
import { API_URL } from '../../../api/url'

export type User = {
  id: number
  name: string
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (userIds: number[]): Promise<User[]> => {
  const url = `${API_URL.USERS}?id=${userIds.join('&id=')}`
  return fetchData<User[]>(url)
})

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId: number): Promise<User> => {
  const url = API_URL.USER(userId)
  return fetchData<User>(url)
})
