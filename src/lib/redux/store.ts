import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { postsSlice } from './features/posts/postsSlice'
import { postSlice } from './features/posts/postSlice'
import { usersSlice } from './features/users/usersSlice'
import { userSlice } from './features/users/userSlice'

const rootReducer = combineSlices(postsSlice, postSlice, usersSlice, userSlice)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>
