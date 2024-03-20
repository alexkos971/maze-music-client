import { createSlice } from "@reduxjs/toolkit";
import { lsSetItem, lsGetItem } from "@helpers/localstorage";

let initialState : Player = {
    // track: lsGetItem('maze-music-last-track') ?? null,
    track: null,
    isPlaying: false,
    currentTime: 0,
    // playList: {
    //     id: string,
    //     tracks: Track[]
    // };

    // ID
    playList: null,
    volume: 1
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setTrack: (state, action) => {
            lsSetItem({name: 'maze-music-last-track', value: action.payload});
            return {
                ...state, 
                currentTime: 0,
                track: action.payload.track, 
                isPlaying: action.payload.play !== undefined ? action.payload.play : false 
            };
        },
        setIsPlaying: (state, action) => {
            return {...state, isPlaying: action.payload};
        },
        setVolume: (state, action) => {
            return {...state, volume: action.payload};
        },
        setCurrentTime: (state, action) => {
            return {...state, currentTime: action.payload};
        },
    }
});

// Action creators are generated for each case reducer function
export const { setTrack, setIsPlaying, setVolume, setCurrentTime } = playerSlice.actions;

export default playerSlice.reducer;