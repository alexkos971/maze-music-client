import { FETCH_RECOMEND_ARTISTS, GET_ARTIST } from '../types/artistsTypes';

let initialState = {
    recomendArtists: [],
    save: false,
    artist: {}
}

export const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECOMEND_ARTISTS:
            return { ...state, recomendArtists: action.payload };

        case GET_ARTIST:
            return { ...state, artist: action.payload }

        default: return state;
    }
}