import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    tagTypes:['Upload'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_API_URL + 'auth',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (build) => ({
        signIn: build.mutation({
            query: (body: SignInDto) => ({
                url: 'sign-in',
                method: 'POST',
                body
            })
        })
    })
});

export const { useSignInMutation } = uploadApi;