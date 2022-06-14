import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const groupsAPI = createApi({
    reducerPath: 'groupsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/groups' }),
    tagTypes: ['Groups'],
    endpoints: (build) => ({
        getGroups: build.query({
            query: (params) => ({ url: '/', params }),
            providesTags: ['Groups'],
            transformResponse: (response) => response.array
        }),
        getGroup: build.query({
            query: (id) => ({ url: `/${id}` }),
            providesTags: ['Groups'],
            transformResponse: (response) => response.object
        }),
        createGroup: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Groups']
        }),
        updateGroup: build.mutation({
            query: ({ data, id }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Groups']
        }),
        deleteGroup: build.query({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Groups']
        })
    })
})

export const {
    useCreateGroupMutation,
    useGetGroupsQuery,
    useGetGroupQuery,
    useDeleteGroupQuery,
    useLazyDeleteGroupQuery,
    useUpdateGroupMutation
} = groupsAPI
