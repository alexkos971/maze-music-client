import { SONG_DURATION, SET_SONG_DURATION, ITEM_DURATION } from './types';

let audio = new Audio();

// // Template of song time
let timeTemplate = s => {
    return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s);
}


let setDuration = (item) => {
    audio.src = item;

    audio.onloadeddata = () => {
        // console.log(audio.duration)
        // return setTimeout(() => {
            return timeTemplate(audio.duration)
        // }, 200)
    }
}

let initialState = {
    currentDuration: '0:00',
    duration: 0,
    itemDuration: '0:00'
}

export const durReducer = (state = initialState, action) => {

    switch (action.type) {
        case SONG_DURATION:
            return {...state, duration: timeTemplate(action.payload)}
        
        case SET_SONG_DURATION:
            return {...state, currentDuration: timeTemplate(action.payload)}

        case ITEM_DURATION:
            return {...state, itemDuration: setDuration(action.item)}
            
        default: return state;
    }
}