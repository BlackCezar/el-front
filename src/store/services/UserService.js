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
        checkConnection: build.query({
            query: () => ({ url: '/check' })
        }),
        logoutUser: build.query({
            query: () => ({ url: '/logout' })
        }),
        getUsers: build.query({
            query: () => ({ url: '/' }),
            providesTags: 'Users'
        }),
        createUser: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            })
        }),
        updateUser: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'PUT',
                body: data
            })
        }),
        deleteUsers: build.query({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            providesTags: 'Users'
        }),
    })
})

export const {
    useAuthUserMutation,
    useLogoutUserQuery,
    useCheckConnectionQuery,
    useGetUsersQuery,
    useCreateUserMutation,
    useDeleteUsersQuery,
    useUpdateUserMutation
} = userAPI
