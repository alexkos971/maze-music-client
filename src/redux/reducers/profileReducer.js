import { 
    SET_PROFILE, 
    SET_MY_SONGS, 
    SET_SAVED_SONGS, 
    FETCH_MY_ALBUMS, 
    SAVE_SONG, 
    
    CHANGE_PROFILE_DESCRIPTION, 
    CHANGE_PROFILE_NAME,
    CHANGE_PROFILE_AVATAR,

    REGISTER,
    LOG_IN, 
    LOG_OUT,
    RECOVERY_PASS 
} from '../types/profileTypes'

import { DELETE_SONG, UPLOAD_SONG } from "../types/songsTypes";
import { DELETE_ALBUM, UPLOAD_ALBUM } from "../types/albumsTypes";

let initialState = {
    // _id: null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, ...action.payload};

        case SET_MY_SONGS:
            return {...state, songs: action.payload }

        case FETCH_MY_ALBUMS:
            return { ...state, albums: action.payload }

        case SET_SAVED_SONGS:
            return {...state, saved_songs: action.payload}

        case SAVE_SONG:
            return { ...state, saved_songs: action.isSaved ? state.saved_songs.filter(el => el._id !== action.payload._id) : [...state.saved_songs, {...action.payload, saved: true}] }
        

        case DELETE_SONG:
            return {...state, songs: state.songs.filter(el => el._id !== action.payload)}
            
        case UPLOAD_SONG: 
            return {...state, songs: [...state.songs, action.payload]}



        case DELETE_ALBUM:
            return {...state, albums: state.albums.filter(el => el._id !== action.payload)}

        case UPLOAD_ALBUM:
            return {...state, albums: [...state.albums, action.payload]}


        case CHANGE_PROFILE_DESCRIPTION:
            return { ...state, description: action.payload.description, description_large: action.payload.description_large }
         
        case CHANGE_PROFILE_NAME:
            return { ...state, name: action.payload.name, avatarNick: action.payload.avatarNick }    

        case CHANGE_PROFILE_AVATAR:
            return {...state, avatar: action.payload}

        case LOG_IN:
            return { ...state, auth: action.payload }    

        case LOG_OUT:
            return state = {}  

        case REGISTER:
            return { ...state, auth: action.payload }   
        
        case RECOVERY_PASS:
            return {...state, auth: action.payload} 
        
        default: return state;
    }
}