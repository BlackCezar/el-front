import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        message: '',
        object: null
    },
    reducers: {
        saveUser(state, action) {
            if (state.object && state.object._id) {
                console.log(state.object._id)
                state.object._id = action.payload._id
                state.object.role = action.payload.role
                state.object.login = action.payload.login
                state.object.fullname = action.payload.fullname
                state.object.parent = action.payload.parent
                console.log(state.object._id)

            } else state.object = action.payload
        },
        logoutUser(state) {
            state.object = null
            state.message = ''
        }
    }
})

export const { saveUser, logoutUser } = userSlice.actions

export default userSlice.reducer
