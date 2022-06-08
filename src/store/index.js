import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../reducers/user'

export const store = configureStore({
    reducer: {
        user: usersReducer
    }
})
