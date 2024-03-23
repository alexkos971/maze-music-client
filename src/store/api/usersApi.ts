import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProfile } from "@store/reducers/profileReducer";
import { toggleModal } from "@store/reducers/interfaceReducer";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes:['Users'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_API_URL + 'users',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (build) => ({
        updateProfile: build.mutation({
            query: (body) => {          
                let formData = new FormData();

                for (let key in body) {
                    formData.append(key, body[key]);
                }            

                return {
                    url: 'update',
                    method: 'PUT',
                    body: formData,
                    formData: true
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    let response = await queryFulfilled;
                    if (response.data) dispatch(setProfile( response.data ))
                    
                    dispatch(toggleModal({isOpened: false}));

                } catch {}
            }
        }),
        getUser: build.query({
            query: (id) => ({ url: `/${id}` })
        }),
        followUser: build.mutation({
            query: (followId) => ({url: `/follow/${followId}`, method: 'PUT'})
        })
    })
});

export const { useUpdateProfileMutation, useGetUserQuery, useFollowUserMutation } = usersApi;