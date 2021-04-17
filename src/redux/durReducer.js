import { SONG_DURATION, SET_SONG_DURATION, ITEM_DURATION } from './types';

let audio = new Audio();

// // Template of song time
let timeTemplate = s => {
    return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s);
}


let initialState = {
    currentDuration: '0:00',
    // duration: 0,
    itemDuration: '0:00'
}

export const durReducer = (state = initialState, action) => {

    switch (action.type) {
        // case SONG_DURATION:
        //     return {...state, duration: timeTemplate(action.payload)}
        
        // set every second of track
        case SET_SONG_DURATION:
            return {...state, currentDuration: timeTemplate(action.payload)}

        case ITEM_DURATION:
            return {...state, itemDuration: timeTemplate(action.payload)}
            
        default: return state;
    }
}