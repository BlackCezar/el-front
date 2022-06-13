import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../reducers/user'
import { groupsAPI } from './services/GroupsService'
import { userAPI } from './services/UserService'

export const createStore = options => configureStore({
    reducer: {
        user: usersReducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [groupsAPI.reducerPath]: groupsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAPI.middleware, groupsAPI.middleware),
    ...options
})

export const store = createStore()