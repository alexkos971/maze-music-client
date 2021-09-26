import { FETCH_RECOMEND_ARTISTS } from '../types/artistsTypes';
import axios from "../../core/axios";

export const getRecomendArtists = () => {
    return async (dispatch, getState) => {
        try {
            if (getState().artists.recomendArtists.length > 0) {
                
                return dispatch({
                    type: FETCH_RECOMEND_ARTISTS,
                    payload: getState().artists.recomendArtists
                })
            }
            
            else {   
                const { data } = await axios.get('/api/users/artists');
                
                dispatch({
                    type: FETCH_RECOMEND_ARTISTS,
                    payload: data
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}