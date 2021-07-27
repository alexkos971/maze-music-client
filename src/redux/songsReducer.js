import { FETCH_RECOMEND_SONGS, FETCH_MY_SAVED_SONGS, SAVE_SONG } from './types';

let initialState = {
    recomendSongs: [],
    save: false,
    savedSongs: []
}

const checkSaved = (savedSongs, songs) => {

    songs.forEach(recomend => {
        if (savedSongs && !savedSongs.length > 0)  {
            savedSongs.forEach(savedItem => {
                if (recomend._id === savedItem._id) {
                    recomend.saved = true;
                }
                else {
                    recomend.saved = false;
                }
            })
        }
        else {   
            recomend.saved = false;
        }
    })

    return songs;
}

export const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECOMEND_SONGS:
            return { ...state, recomendSongs: checkSaved(action.saved, action.payload) };
        
        case FETCH_MY_SAVED_SONGS:
            return {...state, savedSongs: action.payload}

        case SAVE_SONG:
            return {...state}

        default: return state;
    }
}