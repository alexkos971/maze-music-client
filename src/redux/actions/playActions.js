import { 
    PLAY_SONG, 
    NOW_SONG, 
    SWITCH_SONG, 
    SET_SONG_DURATION, 
    ITEM_DURATION, 
    SET_START,
    SET_CURRENT_PLAYLIST 
} from '../types/playTypes';

import checkSavedSongs from "./songsActions";
import store from "../../index.js";

export const onPlay = (item, list) => {
    return {
        type: PLAY_SONG,
        song: item,
        list: checkSavedSongs(list, store.getState().profile.saved_songs)
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

export const setCurrentPlaylist = (playlist) => {
    return {
        type: SET_CURRENT_PLAYLIST,
        payload: playlist
    }
}
