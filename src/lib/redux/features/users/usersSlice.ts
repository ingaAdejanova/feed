import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { fetchUsers, User } from './usersActions'

type UsersState = {
  users: User[]
  isLoading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state: UsersState, action: PayloadAction<User[]>) => {
        state.isLoading = false
        state.users = [...state.users, ...action.payload]
      })
      .addCase(fetchUsers.rejected, (state: UsersState, action) => {
        state.isLoading = false
        state.error = action.error.message || null
      })
  },
})

export const selectUsers = (state: RootState) => state.users.users

export default usersSlice.reducer
