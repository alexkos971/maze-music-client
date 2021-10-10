import { FETCH_RECOMEND_ARTISTS, GET_ARTIST } from '../types/artistsTypes';
import {loading, showAlert} from "../actions/interfaceActions";

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

export const getArtist = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loading(true))

            const {data} = await axios.get(`/api/users/artist/${id}`)
            if (data) {
                dispatch({
                    type: GET_ARTIST,
                    payload: {
                        ...data, description_large: data.description.substr(0, 30) + '...'
                    }
                })
            }

            dispatch(loading(false))
        }
        catch (e) {
            dispatch(showAlert({
                type: 'error',
                text: 'Не удалось загрузить профиль артиста'
            }))
        }
    }
}