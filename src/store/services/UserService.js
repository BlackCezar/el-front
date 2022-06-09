import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/users' }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        authUser: build.mutation({
            query: (data) => ({
                url: '/auth',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {useAuthUserMutation} = userAPI