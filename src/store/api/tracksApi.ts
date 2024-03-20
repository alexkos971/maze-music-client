import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showToast } from "@store/reducers/interfaceReducer";
// import { setProfile } from "@store/reducers/profileReducer";
// import { toggleModal } from "@store/reducers/interfaceReducer";

export const tracksApi = createApi({
    reducerPath: 'tracksApi',
    tagTypes:['Tracks'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_API_URL + 'tracks',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (build) => ({
        uploadTrack: build.mutation({
            query: (body) => {          
                let formData = new FormData();

                for (let key in body) {
                    formData.append(key, body[key]);
                }            

                return {
                    url: 'upload',
                    method: 'POST',
                    body: formData,
                    formData: true
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    let response = await queryFulfilled;
                    if (response.data) {
                        // dispatch(setProfile( response.data ))
                    }
                    
                    // dispatch(toggleModal({isOpened: false}));

                } catch {}
            }
        }),
        getAllTracks: build.query({
            query: (arg: any) => ({ url: '/', method: 'GET'})
        })
    })
});

export const { useUploadTrackMutation, useGetAllTracksQuery } = tracksApi;