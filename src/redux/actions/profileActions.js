import { 
    SET_PROFILE, 
    SET_MY_SONGS, 
    SET_SAVED_SONGS, 
    FETCH_MY_ALBUMS, 
    SAVE_SONG, 
    CHANGE_PROFILE_DESCRIPTION, 
    CHANGE_PROFILE_NAME,

    LOG_IN,
    REGISTER
} from '../types/profileTypes'

import { LOADING, SHOW_ALERT } from '../types/interfaceTypes';

import axios from "../../core/axios";
import { combineReducers } from 'redux';

export const setProfile = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/users/profile')

            if (data) {
                return dispatch({
                    type: SET_PROFILE,
                    payload: data
                })
            }
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const changeProfileDescription = (data) => {
    return async (dispatch) => {
        let desc = prompt('Paste the new description');

        if (!desc) {
            return alert('Поле пустое !!!');
        }

        try {
            const newDesc = await axios.post('/api/changes/description', { description: desc })

            if (newDesc) {
                dispatch({
                    type: CHANGE_PROFILE_DESCRIPTION,
                    payload: newDesc.data
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const changeProfileName = (data) => {
    return async (dispatch) => {
        let name = prompt('Paste the new name');

        if (!name) {
            return alert('Поле пустое !!!');
        }

        try {
            const { data } = await axios.post('/api/changes/name', { name });

            if (data) {
                dispatch({
                    type: CHANGE_PROFILE_NAME,
                    payload: data.name
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const setMySongs = (data) => {
    return {
        type: SET_MY_SONGS,
        payload: data
    }
}

export const getMyAlbums = (data) => {
    return {
        type: FETCH_MY_ALBUMS,
        payload: data
    }
}

export const setSavedSongs = (data) => {
    return {
        type: SET_SAVED_SONGS,
        payload: data,
    }
}

export const saveSong = (item) => {
    return {
        type: SAVE_SONG,
        payload: item
    }
}

export const login = (form) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: LOADING,
                payload: true
            })

            return await axios.post('/api/auth/login', form)
                .then((res) => {
                    if (res.statusText == 'OK') {

                        dispatch({
                            type: SHOW_ALERT,
                            payload: {
                                type: 'success',
                                text: res.data.message
                            }
                        })
                    
                        dispatch({
                            type: LOG_IN,
                            payload: res.data
                        })

                        return res.data;
                    }
                })
                .catch((res) => {
                    console.log(res)
                    dispatch({
                        type: SHOW_ALERT,
                        payload: {
                            type: 'error',
                            text: res.message
                        }
                    })

                    dispatch({
                        type: LOADING,
                        payload: false
                    })

                    return res;
                })
        }
        catch (e) {
            console.log(e)
        }
    }
}