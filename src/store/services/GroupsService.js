import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const groupsAPI = createApi({
    reducerPath: 'groupsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/groups' }),
    tagTypes: ['Groups'],
    endpoints: (build) => ({
        getGroups: build.query({
            query: () => ({ url: '/' }),
            providesTags: 'Groups'
        }),
        createGroup: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            })
        }),
        updateGroup: build.mutation({
            query: (data, id) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteGroup: build.query({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            providesTags: 'Users'
        }),
    })
})

export const {
    useCreateGroupMutation,
    useGetGroupsQuery,
    useDeleteGroupQuery,
    useUpdateGroupMutation
} = groupsAPI
