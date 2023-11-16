import { createSlice } from "@reduxjs/toolkit";
import { lsSetItem, lsGetItem } from "@helpers/localstorage";

let initialState : Player = {
    // track: lsGetItem('maze-music-last-track') ?? null,
    track: { 
        id: 'sdfsd',
        artist: 'sdfsdfs',
        playedCount: 749823,
        // duration: 206,
        name: 'Decode',
        cover: 'https://sefon.pro/img/artist_photos/paramore.jpg',
        src: 'https://cdn6.sefon.pro/prev/1_g6J1XUbWkvypx60Kw2RQ/1700126692/3/Paramore%20-%20Decode%20%28OST%20%D0%A1%D1%83%D0%BC%D0%B5%D1%80%D0%BA%D0%B8%29%20%28192kbps%29.mp3',
    },
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
            return {...state, track: action.payload};
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