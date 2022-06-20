import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const lessonsAPI = createApi({
    reducerPath: 'lessonsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/lessons' }),
    tagTypes: ['Lessons'],
    endpoints: (build) => ({
        getLessons: build.query({
            query: (params) => ({ url: '/', params }),
            transformResponse: (response) => response.array,
            invalidatesTags: () => [{type: 'Lessons', id: 'LIST'}]
        }),
        getLesson: build.query({
            query: (id) => ({ url: `/${id}` }),
            transformResponse: (response) => response.object,
            invalidatesTags: (res, err, id) => [{type: 'Lessons', id}]
        }),
        createLesson: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: () => [{type: 'Lessons', id: 'LIST'}]
        }),
        updateLesson: build.mutation({
            query: ({ data, id }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (res, err, id) => [{type: 'Lessons', id}]
        }),
        deleteLesson: build.query({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            invalidatesTags: (res, err, id) => [{type: 'Lessons', id}]
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
