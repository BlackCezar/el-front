import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const signInAction = createAsyncThunk(
    'user/signin_action',
    async (data, thunkApi) => {
        try {
            const resp = await axios.post('/api/users/signin', data)
            return resp.data
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
)
