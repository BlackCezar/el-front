import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (build) => ({
        fetchAllUsers: build.query({
            query: (filters) => ({
                url: '/users',
                params: {
                    filters
                }
            })
        }),
        createUser: build.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user
            })
        })
    })
})
