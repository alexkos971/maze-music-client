import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    savedTracks: [],
};

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        setSavedTracks: (state, action) => {
            return {...state, savedTracks: action.payload};
        },
    }
});

// Action creators are generated for each case reducer function
export const { setSavedTracks } = tracksSlice.actions;

export default tracksSlice.reducer;