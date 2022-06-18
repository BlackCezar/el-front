import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../reducers/user'
import { GradesAPI } from './services/GradesService'
import { groupsAPI } from './services/GroupsService'
import { lessonsAPI } from './services/LessonsService'
import { pointsAPI } from './services/PointsService'
import { userAPI } from './services/UserService'

export const createStore = (options) =>
    configureStore({
        reducer: {
            user: usersReducer,
            [userAPI.reducerPath]: userAPI.reducer,
            [groupsAPI.reducerPath]: groupsAPI.reducer,
            [lessonsAPI.reducerPath]: lessonsAPI.reducer,
            [GradesAPI.reducerPath]: GradesAPI.reducer,
            [pointsAPI.reducerPath]: pointsAPI.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                userAPI.middleware,
                groupsAPI.middleware,
                lessonsAPI.middleware,
                GradesAPI.middleware,
                pointsAPI.middleware
            ),
        ...options
    })

export const store = createStore()
