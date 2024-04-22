import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showToast } from "@store/reducers/interfaceReducer";
import { setProfile } from "@store/reducers/profileReducer";
import { setSavedTracks } from "@store/reducers/tracksReducer";
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
            query: ({ track, action } : { track: Track, action: "save" | "unsave" }) => ({
                url: `${track._id}/${action}`,
                method: 'PUT'
            }),
            
            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                try {
                    const response = await queryFulfilled;

                    if (response.data) {
                        // @ts-ignore 
                        let profile = getState()?.profile;
                        let savedTracks = getState()?.tracks.savedTracks;

                        let is_saved = response.data.is_saved;
                        let track_id = arg.track._id; 

                        dispatch(showToast({
                            type: 'success',
                            text: is_saved ? 'interface.saved' : 'interface.unsaved' 
                        }));

                        if (profile) {
                            let profileSavedTracks = is_saved 
                                ? [track_id, ...profile.saved_tracks]
                                : profile.saved_tracks.filter((el: string) => el != track_id );
                            
                            dispatch(setProfile({ ...profile, saved_tracks: profileSavedTracks }));
                            
                            savedTracks = is_saved 
                                ? [arg.track, ...savedTracks]
                                : savedTracks.filter((el: Track) => el._id != arg.track._id );
                
                            dispatch(setSavedTracks(savedTracks));
                        }
                    }
                } catch (e) {
                    dispatch(showToast({
                        type: 'error',
                        text: 'server_error'
                    }));
                }
            },
        }),
        getSavedTracks: build.mutation({
            query: (arg: any) => ({ url: 'saved', method: 'GET' })
        })
    })
});

export const { useUploadTrackMutation, useGetAllTracksQuery, useSaveTrackMutation, useGetSavedTracksMutation } = tracksApi;