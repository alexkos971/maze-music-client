import { SET_PROFILE, SET_MY_SONGS, SET_SAVED_SONGS, FETCH_MY_ALBUMS, SAVE_SONG, CHANGE_PROFILE_DESCRIPTION, CHANGE_PROFILE_NAME } from '../types/profileTypes'

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

        case SAVE_SONG:
            return { ...state, saved_songs: [...state.saved_songs, action.payload] }

        case CHANGE_PROFILE_DESCRIPTION:
            return { ...state, description: action.payload.description, description_large: action.payload.description_large }
         
        case CHANGE_PROFILE_NAME:
            return { ...state, name: action.payload }    
        default: return state;
    }
}