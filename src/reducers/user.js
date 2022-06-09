import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        message: '',
        object: null
    },
    reducers: {
        saveUser(state, action) {
            state.object = action.payload
        },
        logoutUser(state) {
            state.object = null
            state.message = ''
        }
    }
})

export const { saveUser, logoutUser } = userSlice.actions

export default userSlice.reducer
