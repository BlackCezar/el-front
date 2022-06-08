import { createSlice } from '@reduxjs/toolkit'
import { signInAction } from './users'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 0,
        message: '',
        object: null
    },
    reducers: {},
    extraReducers: {
        [signInAction.fulfilled.type]: (state, user) => {
            state.object = user
            state.isLoading = false
            state.status = 200
        },
        [signInAction.pending.type]: (state) => {
            state.isLoading = true
            state.message = ''
            state.status = 0
        },
        [signInAction.rejected.type]: (state, error) => {
            state.isLoading = false
            state.status = error.status
            state.message = error.message
        }
    }
})

export const { signIn, signInError, signInSuccess } = userSlice.actions

export default userSlice.reducer
