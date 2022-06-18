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
            query: () => ({ url: '/check' }),
            invalidatesTags: ['Users']
        }),
        logoutUser: build.query({
            query: () => ({ url: '/logout' }),
            invalidatesTags: ['Users']
        }),
        getUsers: build.query({
            query: (params) => {
                return { url: '/', params }},
            providesTags: ['Users'],
            transformResponse: (response) => response.array
        }),
        createUser: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        }),
        getUser: build.query({
            query: (id) => ({ url: `/${id}` }),
            transformResponse: (response) => response.object
        }),
        updateUser: build.mutation({
            query: ({ data, id }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Users']
        }),
        deleteUsers: build.query({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useAuthUserMutation,
    useLogoutUserQuery,
    useCheckConnectionQuery,
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useCreateUserMutation,
    useDeleteUsersQuery,
    useLazyDeleteUsersQuery,
    useUpdateUserMutation,
    useGetUserQuery
} = userAPI
