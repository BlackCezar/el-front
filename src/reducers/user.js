import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 0,
        message: '',
        object: null
    },
    reducers: {
        saveUser(state, action) {
            state.object = action.payload
            state.isLoading = false
            state.status = 200
        },
    }
})

export const { saveUser } = userSlice.actions

export default userSlice.reducer
