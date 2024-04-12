import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showToast } from "@store/reducers/interfaceReducer";
import { setProfile } from "@store/reducers/profileReducer";
// import { toggleModal } from "@store/reducers/interfaceReducer";

export const tracksApi = createApi({
    reducerPath: 'tracksApi',
    tagTypes:['Tracks'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/tracks/`,
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
                    }                    

                } catch {}
            }
        }),
        getAllTracks: build.query({
            query: (arg: any) => ({ url: '/', method: 'GET'})
        }),
        saveTrack: build.mutation({
            query: ({ track_id, action } : { track_id: string, action: "save" | "unsave" }) => ({
                url: `${track_id}/${action}`,
                method: 'PUT'
            }),
            
            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                try {
                    const response = await queryFulfilled;

                    if (response.data) {
                        // @ts-ignore 
                        let profile = getState()?.profile;

                        let is_saved = response.data.is_saved;
                        let track_id = arg.track_id; 

                        dispatch(showToast({
                            type: 'success',
                            text: is_saved ? 'interface.saved' : 'interface.unsaved' 
                        }));

                        if (profile) {
                            let savedTracks = is_saved 
                                ? [...profile.saved_tracks, track_id]
                                : profile.saved_tracks.filter((el: string) => el != track_id );
                
                            dispatch(setProfile({ ...profile, saved_tracks: savedTracks }));
                        }
                    }
                } catch (e) {
                    dispatch(showToast({
                        type: 'error',
                        text: 'server_error'
                    }));
                }
            },
        })
    })
});

export const { useUploadTrackMutation, useGetAllTracksQuery, useSaveTrackMutation } = tracksApi;