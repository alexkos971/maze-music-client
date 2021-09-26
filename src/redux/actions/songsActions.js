import { FETCH_RECOMEND_SONGS } from '../types/songsTypes';

import axios from "../../core/axios";

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