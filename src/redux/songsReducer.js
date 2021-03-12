import { FETCH_RECOMEND_SONGS, SAVE_SONG, FETCH_MY_SONGS } from './types';

let initialState = {
    recomendSongs: [],
    savedSongs: [],
    mySongs: []
}

const checkSavedSongs = (state, item) => {
    // if (!state.length) {
        // state.push(item);
        // return state;
    // }
    for (let i = 0; i < state.length; i++) {
        if (state[i] === item) {
            state.splice(i, 1);
        }
    }
    state.push(item)
    // state.indexOf(item) == -1 ? state.splice(state.findIndex(item), 1) : state.push(item)
    return state;
}   

export const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECOMEND_SONGS:
            return { ...state, recomendSongs: action.payload };

        case SAVE_SONG:
            console.log(checkSavedSongs(state.savedSongs, action.payload));

            return {...state, savedSongs: checkSavedSongs(state.savedSongs, action.payload)}
        
        case FETCH_MY_SONGS:
            return {...state, mySongs: action.payload}

        default: return state;
    }
}