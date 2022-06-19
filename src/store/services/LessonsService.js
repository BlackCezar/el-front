import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const lessonsAPI = createApi({
    reducerPath: 'lessonsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/lessons' }),
    tagTypes: ['Lessons'],
    endpoints: (build) => ({
        getLessons: build.query({
            query: (params) => ({ url: '/', params }),
            providesTags: ['Lessons'],
            transformResponse: (response) => response.array
        }),
        getLesson: build.query({
            query: (id) => ({ url: `/${id}` }),
            providesTags: ['Lessons'],
            transformResponse: (response) => response.object
        }),
        createLesson: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Lessons']
        }),
        updateLesson: build.mutation({
            query: ({ data, id }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Lessons']
        }),
        deleteLesson: build.query({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Lessons']
        })
    })
})

export const {
    useCreateLessonMutation,
    useGetLessonsQuery,
    useLazyGetLessonsQuery,
    useGetLessonQuery,
    useDeleteLessonQuery,
    useLazyDeleteLessonQuery,
    useUpdateLessonMutation
} = lessonsAPI
