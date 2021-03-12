import { PLAY_SONG, NOW_SONG } from './types';


let initialState = {
    start: false,
    song: JSON.parse(localStorage.getItem('lastSong'))
}

export const playReducer = (state = initialState, action) => {

    switch (action.type) {
        case PLAY_SONG:
            if (action.song === state.song) {
                if (action.start) {
                    return {...state, start: false, song: action.song};
                }
                return {...state, start: true, song: action.song}
            } 

            return {...state, start: true, song: action.song};
        
        case NOW_SONG:
            return { ...state, song: action.payload }

        default: return state;
    }
}