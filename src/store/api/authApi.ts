import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProfile } from "@store/reducers/profileReducer";

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes:['Auth'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth/`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (build) => ({
        signIn: build.mutation({
            query: (body) => ({
                url: body.login_type == 'local' ? 'sign-in' : '/google/sign-in',
                method: 'POST',
                body: body.login_type == 'local' ? body.data : { token: body.token }
            })
        }),
        signUp: build.mutation({
            query: ({ data, loginType } : { 
                data: SignUpDto | SignInGoogleDto, loginType: LoginType 
            }) => {          
                let formData = new FormData();

                for (let key in data) {
                    // @ts-ignore
                    if ( key == 'avatar' && !data[key] ) {
                        continue;
                    }

                    // @ts-ignore 
                    formData.append(key, data[key]);
                }            

                return {
                    url: loginType == 'local' ? 'sign-up' : 'google/sign-up',
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
        }),
        verifyEmail: build.query({
            query: (email: string) => ({ url: `/verify-email/${email}`, method: 'GET' })
        })
    })
});

export const { 
    useSignInMutation, 
    
    useSignUpMutation, 
    useLazyGetSessionInfoQuery, 
    useSignOutMutation, 
    useLazyVerifyEmailQuery 
} = authApi;