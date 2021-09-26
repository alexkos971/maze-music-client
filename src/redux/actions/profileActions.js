import { SET_PROFILE, SET_MY_SONGS, SET_SAVED_SONGS, FETCH_MY_ALBUMS, SAVE_SONG, CHANGE_PROFILE_DESCRIPTION, CHANGE_PROFILE_NAME } from '../types/profileTypes'
import axios from "../../core/axios";

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