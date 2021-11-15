import { 
    FETCH_RECOMEND_SONGS, 
    DELETE_SONG,
    UPLOAD_SONG
} from '../types/songsTypes';

import axios from "../../core/axios";

import { loading, showAlert } from "../actions/interfaceActions";

export const getRecomendSongs = () => {
    return async (dispatch, getState) => {
        try {
            if (getState().songs.recomendSongs.length > 0) {
                return dispatch({
                    type: FETCH_RECOMEND_SONGS,
                    payload: getState().songs.recomendSongs
                })
            }
            else {
                const { data } = await axios.get('/api/songs/recomendation');
                
                dispatch({
                    type: FETCH_RECOMEND_SONGS,
                    payload: data
                })
            }
        }
        catch (e) {
            console.log(e);
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