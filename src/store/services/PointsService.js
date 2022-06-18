import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const pointsAPI = createApi({
    reducerPath: 'pointsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/points' }),
    tagTypes: ['Points'],
    endpoints: (build) => ({
        getPoints: build.query({
            query: (params) => ({ url: '/', params }),
            providesTags: ['Points'],
            transformResponse: (response) => response.array
        }),
        getPoint: build.query({
            query: (id) => ({ url: `/${id}` }),
            providesTags: ['Points'],
            transformResponse: (response) => response.object
        }),
        createPoint: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Points']
        }),
        updatePoint: build.mutation({
            query: ({ data, id }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Points']
        }),
        deletePoint: build.query({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Points']
        })
    })
})

export const {
    useCreatePointMutation,
    useGetPointsQuery,
    useGetPointQuery,
    useDeletePointQuery,
    useLazyDeletePointQuery,
    useUpdatePointMutation
} = pointsAPI
