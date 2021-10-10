import { 
    FETCH_RECOMEND_SONGS, 
    DELETE_SONG
} from '../types/songsTypes';

import axios from "../../core/axios";

import { showAlert } from "../actions/interfaceActions";
import { setProfile } from "../actions/profileActions";

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
    return async (dispatch, getState) => {
        try {
            let qustion = window.confirm("Вы точно хотите удалить этот трек ?");
            
            if (qustion) {
                
                let { data } = await axios.delete(`/api/songs/delete/${id}`);
                
                if (data) {
                    const newSongs = getState().profile.songs.filter(item => item._id !== data.song._id);
                    
                    dispatch(setProfile({...getState().profile, songs: newSongs}));
                    showAlert({type: 'success', text: data.message})
                    
                    dispatch({
                        type: DELETE_SONG,
                        payload: data.song
                    })
                }
            }
        }
        catch (e) {
            showAlert({type: 'error', text: e.message})   
        }
    }
}