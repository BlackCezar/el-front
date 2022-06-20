import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const GradesAPI = createApi({
    reducerPath: 'GradesAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/grades' }),
    tagTypes: ['Grades'],
    endpoints: (build) => ({
        getGrades: build.query({
            query: (params) => ({ url: '/', params }),
            providesTags: ['Grades'],
            transformResponse: (response) => response.array
        }),
        getGrade: build.query({
            query: (id) => ({ url: `/${id}` }),
            providesTags: ['Grades'],
            transformResponse: (response) => response.object
        }),
        createGrade: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Grades']
        }),
        updateGrade: build.mutation({
            query: ({ data, id }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Grades']
        }),
        getSSO: build.mutation({
            query: (data) => ({ url: `/sso`, method: 'POST', body: data })
        }),
        deleteGrade: build.query({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Grades']
        })
    })
})

export const {
    useCreateGradeMutation,
    useGetGradesQuery,
    useGetGradeQuery,
    useLazyGetGradesQuery,
    useDeleteGradeQuery,
    useGetSSOMutation,
    useLazyDeleteGradeQuery,
    useUpdateGradeMutation
} = GradesAPI
