import { PLAY_SONG, NOW_SONG } from './types';


let initialState = {
    start: false,
    song: JSON.parse(localStorage.getItem('lastSong'))
}

export const playReducer = (state = initialState, action) => {

    switch (action.type) {
        case PLAY_SONG:
            if (action.song._id === state.song._id) {
                if (state.start) {
                    return {...state, start: false, song: action.song};
                }
                else {
                    return {...state, start: true, song: action.song}
                }
            } 
            else {
                return {...state, song: action.song, start: true};
            }
        
        case NOW_SONG:
            return { ...state, song: action.payload }

        default: return state;
    }
}