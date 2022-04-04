import { SET_NOW_ALBUM, DELETE_ALBUM, UPLOAD_ALBUM} from "../types/albumsTypes";
import { loading, showAlert } from "../actions/interfaceActions";
import checkSavedSongs from "../actions/songsActions"

import store from "../../index.js";
import axios from "../../core/axios"

export const setNowAlbum = (id, newAlbum) => {
    if (!newAlbum) {
        return async (dispatch, getState) => {
            try {
                dispatch(loading(true));
                
                const {data} = await axios.get(`/api/albums/album/${id}`);

                if (data.isSuccess) {

                    let albumSongs = await checkSavedSongs(data.album.songs, getState().profile.saved_songs);
                    
                    data.album.songs = albumSongs;

                    dispatch({
                        type: SET_NOW_ALBUM,
                        payload: data.album
                    });
                }

                else {
                    dispatch(showAlert({
                        type: 'error',
                        text: 'Не удалосб загрузить альбом'
                    }));
                }
                
                return dispatch(loading(false))
            }
            catch(e) {
                console.log(e)
            }
        }
    }
    else {
        return {
            type: SET_NOW_ALBUM,
            payload: {...newAlbum, songs: checkSavedSongs(newAlbum.songs, store.getState().profile.saved_songs)}
        }
    }
}

export const uploadAlbum = (form) => {
    return async (dispatch) => {
        try {
            dispatch(loading(true));

            const { data } = await axios.post('/api/upload/album', form);

            if (data.isSuccess) {
                dispatch(showAlert({
                    type: 'success',
                    text: data.message
                }));
                dispatch({
                    type: UPLOAD_ALBUM,
                    payload: data.album
                })
            }
            else {
                dispatch(showAlert({
                    type: 'error',
                    text: data.message
                }));
            }

            dispatch(loading(false));
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const deleteAlbum = (id, name) => {
    return async (dispatch) => {
        let question = window.confirm(`Are you sure delete album [${name}] ?`);

        if (question) {

            try {
                dispatch(loading(true))

                const {data } = await axios.delete(`/api/albums/delete/${id}`);
                if (data.isSuccess) {

                    dispatch(showAlert({
                        type: 'success',
                        text: data.message
                    }));

                    dispatch({
                        type: DELETE_ALBUM,
                        payload: id
                    });
                }
                else {
                    dispatch(showAlert({
                        type: 'error',
                        text: data.message
                    }));
                }
                
                dispatch(loading(false))
            }
            catch(e) {
                console.log(e)
            }
        }
    }
}
