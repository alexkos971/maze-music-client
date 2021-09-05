import { SET_PROFILE, SET_MY_SONGS, SET_SAVED_SONGS, FETCH_MY_ALBUMS } from './types'

let initialState = {
    // _id: null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return  action.payload;

        case SET_MY_SONGS:
            return {...state, state: action.payload }

        case FETCH_MY_ALBUMS:
            return { ...state, albums: action.payload }

        case SET_SAVED_SONGS:
            return {...state, saved_songs: action.payload}

        default: return state;
    }
}