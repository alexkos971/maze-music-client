import { 
    CHANGE_DIR,
    CHANGE_AUTH, 
    PLAY_SONG, 
    SONG_DURATION, 
    SET_SONG_DURATION, 
    ITEM_DURATION, 
    FETCH_RECOMEND_SONGS, 
    NOW_SONG, 
    SAVE_SONG, 
    SET_PROFILE,
    SET_FULLPLAYER,
    SET_NIGHT,
    SET_HEADER ,
    FETCH_MY_SAVED_SONGS
} from './types';

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

export const onPlay = (item) => {
    return async dispatch => {
        await dispatch(setNowSong(item))
        
        return dispatch({
            type: PLAY_SONG,
            song: item
        })
    }
}


// set every second of track
export const setDuration = (dur) => {
    return {
        type: SET_SONG_DURATION,
        payload: dur
    }
}

export const itemDuration = (dur) => {
    return {
        type: ITEM_DURATION,
        payload: dur
    }
}

export const setNowSong = (song) => {
    return {
        type: NOW_SONG,
        payload: song
    }
}

export const saveSong = (item) => {
    // return async (dispatch, getState) => {

        return {
            type: SAVE_SONG,
            payload: item
        }
    // }
}

export const setProfile = (data) => {
    return {
        type: SET_PROFILE,
        payload: data
    }
}

export const getRecomendSongs = (data) => {
    return async (dispatch, getState) => {

        // await dispatch({type: NOW_SONG, payload: result[0] })

        return dispatch({
            type: FETCH_RECOMEND_SONGS,
            payload: data,
            saved: getState().profile.profile.saved_songs
        })
    }
}

export const setSavedSongs = (data) => {
    return async (dispatch, getState) => {

        if (!data) return [];
        let result = data.map(item => {
        
            dispatch(itemDuration(item.src))   

            item.dur = getState().getDuration.itemDuration;
            return item;
        });

        // await dispatch({type: NOW_SONG, payload: result[0] })

        return dispatch({
            type: FETCH_MY_SAVED_SONGS,
            payload: result,
        })
    }
}
