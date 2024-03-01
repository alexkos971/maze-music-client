import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes:['Auth'],
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
        }),
        signOut: build.mutation({
           query: (arg: any) => ({ url: 'sign-out', method: 'POST'})
        }),
        getSessionInfo: build.query({
            query: () => ({ url: `session` })
        })
    })
});

export const { useSignInMutation, useLazyGetSessionInfoQuery, useSignOutMutation } = authApi;