import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../reducers/user'
import { userAPI } from './services/UserService'

export const createStore = options => configureStore({
    reducer: {
        user: usersReducer,
        [userAPI.reducerPath]: userAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAPI.middleware),
    ...options
})

export const store = createStore()