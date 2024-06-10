import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUserById, User } from './usersActions'

type UserState = {
  user: User | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state: UserState) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state: UserState) => {
        state.isLoading = true
      })
      .addCase(fetchUserById.fulfilled, (state: UserState, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state: UserState, action) => {
        state.isLoading = false
        state.error = action.error.message || null
      })
  },
})

export const { resetUser } = userSlice.actions

export default userSlice.reducer
