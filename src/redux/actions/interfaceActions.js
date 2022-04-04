import { 
    SET_FULLPLAYER, 
    SET_NIGHT, 
    SET_HEADER, 
    CHANGE_DIR, 
    CHANGE_AUTH,
    COLLAPSE_SIDEBAR, 
    SHOW_ALERT, 
    HIDE_ALERT, 

    SHOW_MODAL,
    HIDE_MODAL,
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

export const collapseSidebar = (payload) => {
    return {
        type: COLLAPSE_SIDEBAR,
        payload
    }
}

export const hideAlert = (index) => {
    return (dispatch, getState) => {
        let alerts = getState().interface.alert;

        return dispatch({
            type: HIDE_ALERT,
            payload: alerts.filter((_, i) => i !== index)
        })
    }
}


export const showAlert = (alert) => {
   return async (dispatch) => {
    
        dispatch({
            type: SHOW_ALERT,
            payload: alert
        })
    }
}

export const showModal = (modal) => {
    return {
        type: SHOW_MODAL,
        payload: modal
    }
}

export const hideModal = () => {
    return {
        type: HIDE_MODAL
    }
}

export const loading = (state) => {
    return {
        type: LOADING,
        payload: state
    }
}