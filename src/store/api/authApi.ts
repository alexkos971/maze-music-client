import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showToast } from "@store/reducers/interfaceReducer";
import { setProfile } from "@store/reducers/profileReducer";

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
        signUp: build.mutation({
            query: (body: SignUpDto) => {          
                let formData = new FormData();

                for (let key in body) {
                    formData.append(key, body[key]);
                }            

                return {
                    url: 'sign-up',
                    method: 'POST',
                    body: formData,
                    formData: true
                }
            }
        }),
        signOut: build.mutation({
           query: (arg: any) => ({ url: 'sign-out', method: 'POST'})
        }),
        getSessionInfo: build.query({
            query: () => ({ url: `session` }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    if (response.data) {
                        dispatch(setProfile( response.data ))                    
                    } 
                    else if (!response.data) {
                        dispatch(setProfile( null ));                    
                    }
                } catch (e) {
                    dispatch(setProfile( null ));
                }
            },
        })
    })
});

export const { useSignInMutation, useSignUpMutation, useLazyGetSessionInfoQuery, useSignOutMutation } = authApi;