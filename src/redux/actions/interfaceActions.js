import { SET_FULLPLAYER, SET_NIGHT, SET_HEADER, CHANGE_DIR, CHANGE_AUTH } from '../types/interfaceTypes';

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