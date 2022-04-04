import { 
    FETCH_RECOMEND_SONGS, 
    DELETE_SONG,
    UPLOAD_SONG
} from '../types/songsTypes';

import axios from "../../core/axios";

import { loading, showAlert } from "../actions/interfaceActions";
import store from "../../index.js";

const checkSavedSongs = (list, savedSongs) => {
    let newList = list.map(item => {
        if (savedSongs.length > 0) {
            item.saved = savedSongs.some(elem => elem._id === item._id);
        }
        else {
            item.saved = false;
        }
        return item;
    });
    return newList;
}

export default checkSavedSongs;

export const setRecomendSongs = (newSongs) => {
    if (!newSongs) {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.get('/api/songs/recomendation');
                
                dispatch({
                    type: FETCH_RECOMEND_SONGS,
                    payload: checkSavedSongs(data, getState().profile.saved_songs)
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    else {
        return {
            type: FETCH_RECOMEND_SONGS,
            payload: checkSavedSongs(newSongs, store.getState().profile.saved_songs)
        }
    }
}

export const deleteSong = (id) => {
    return async (dispatch) => {
        let qustion = window.confirm("Вы точно хотите удалить этот трек ?");
        
        if (qustion) {
            try {
                dispatch(loading(true));    
                let { data } = await axios.delete(`/api/songs/delete/${id}`);
                
                if (data.isSuccess) {
                    dispatch(showAlert({type: 'success', text: data.message}))
                    
                    dispatch({
                        type: DELETE_SONG,
                        payload: data.song
                    })
                }
                else {
                    showAlert({type: 'error', text: data.message})
                }
                dispatch(loading(false));    
            }
            catch (e) {
                showAlert({type: 'error', text: e.message})   
            }
        }
    }
}

export const uploadSong = (form) => {
    return async (dispatch) => {
        try {
            dispatch(loading(true));

            const { data } = await axios.post('/api/upload/track', form)
            
            if (data.isSuccess) {
                dispatch(showAlert({type: 'success', text: data.message }))
                dispatch({
                    type: UPLOAD_SONG,
                    payload: data.track
                })
            }
            else {
                dispatch(showAlert({type: 'error', text: data.message }))
            }
            dispatch(loading(false));
            return data.isSuccess;
        }
        catch(e) {
            console.log(e)
        }
    }
}