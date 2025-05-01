import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const feedbacksApi = createApi({
  reducerPath: 'feedbacksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => 'feedback',
      providesTags: ['Feedback'],
    }),
    addFeedback: builder.mutation({
      query: (newFeedback) => ({
        url: 'feedback',
        method: 'POST',
        body: newFeedback,
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `feedback/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
})

export const {
  useGetFeedbacksQuery,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbacksApi
