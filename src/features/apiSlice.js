import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        // AUTH
        login: builder.mutation({
            query: (formData) => ({
                url: '/users/login',
                method: 'POST',
                body: formData,
            }),
        }),

        signup: builder.mutation({
            query: (formData) => ({
                url: '/users/signup',
                method: 'POST',
                body: formData,
            }),
        }),

        // BLOGS 
        fetchBlogs: builder.query({
            query: () => '/blogs/all',
            transformResponse: (response) => response.blogs,
            providesTags: ['Blog'],
        }),

        createBlog: builder.mutation({
            query: (data) => ({
                url: '/blogs/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Blog'],
        }),

        updateBlog: builder.mutation({
            query: ({ id, data }) => ({
                url: `/blogs/update/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Blog'],
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/delete-by-id/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blog'],
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useFetchBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = apiSlice;
