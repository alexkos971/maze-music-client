import { 
    SET_FULLPLAYER, 
    SET_NIGHT, 
    SET_HEADER, 
    CHANGE_DIR, 
    CHANGE_AUTH, 
    SHOW_ALERT, 
    HIDE_ALERT, 
    LOADING } from '../types/interfaceTypes';

export const changeDir = (newDir) => {
    return {
        type: CHANGE_DIR,
        payload: newDir
    }
}

export const changeAuth = (newDir) => {
    return {
        type: CHANGE_AUTH,
        payload: newDir
    }
}

export const setFullPlayer = (state) => {
    return {
        type: SET_FULLPLAYER,
        payload: state
    }
}

export const setNight = () => {
    return {
        type: SET_NIGHT
    }
}

export const setHeader = (state) => {
    return {
        type: SET_HEADER,
        payload: state
    }
}

export const showAlert = (state) => {
   return async (dispatch, getState) => {

        dispatch({
            type: SHOW_ALERT,
            payload: state
        })

        // return setTimeout(() => {
        //     return dispatch({
        //         type: HIDE_ALERT
        //     })
        // }, 4000)
    }
}

export const hideAlert = (index) => {
    return async (dispatch, getState) => {
        let alerts = getState().interface.alert;

        if (index) {
            return dispatch({
                type: HIDE_ALERT,
                payload: alerts.filter((el, i) => index !== i)
            })
        }
        else {
            return dispatch({
                type: HIDE_ALERT,
                payload: alerts.filter((el, i) => i !== alerts.length - 1)
            })
        }
    }
}

export const loading = (state) => {
    return {
        type: LOADING,
        payload: state
    }
}