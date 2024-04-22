import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    tagTypes:['Playlists'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/playlists/`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (build) => ({
        createPlaylist: build.mutation({
            query: (body) => {
                let formData = new FormData();

                for (let key in body) {
                    formData.append(key, body[key]);
                }

                return {
                    url: 'create',
                    method: 'POST',
                    body: formData,
                    formData: true
                }
            }
        }),
        updatePlaylist: build.mutation({
            query: (props) => {
                let {id, body} = props;
                
                let formData = new FormData();

                for (let key in body) {
                    formData.append(key, body[key]);
                }            

                return {
                    url: `/${id}/update`,
                    method: 'PUT',
                    body: formData,
                    formData: true
                }
            }
        }),
        getPlaylist: build.query({
            query: (id) => ({ url: `/${id}` })
        })
    })
});

export const { useCreatePlaylistMutation, useUpdatePlaylistMutation, useLazyGetPlaylistQuery } = playlistsApi;