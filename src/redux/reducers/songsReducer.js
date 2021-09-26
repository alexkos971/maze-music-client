import { FETCH_RECOMEND_SONGS } from '../types/songsTypes';

let initialState = {
    recomendSongs: [],
}

export const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECOMEND_SONGS:
            return { ...state, recomendSongs: action.payload };

        default: return state;
    }
}