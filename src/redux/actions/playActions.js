import { PLAY_SONG, NOW_SONG, SWITCH_SONG, SET_SONG_DURATION, ITEM_DURATION, SET_START } from '../types/playTypes';

export const onPlay = (item, list) => {
    return {
        type: PLAY_SONG,
        song: item,
        list: list
    }
}

export const setStart = (start) => {
    return {
        type: SET_START,
        payload: start
    }
}

export const switchSong = (direction, list) => {
    return {
        type: SWITCH_SONG,
        to: direction,
        list: list
    }
}

// set every second of track
export const setDuration = (dur) => {
    return {
        type: SET_SONG_DURATION,
        payload: dur
    }
}

// full duration of track
export const itemDuration = (dur) => {
    return {
        type: ITEM_DURATION,
        payload: dur
    }
}

export const setNowSong = (song) => {
    return {
        type: NOW_SONG,
        payload: song
    }
}
