import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profile',
    initialState: null,
    reducers: {
        setProfile: (state : ProfileDto | null, action) => {
            return {...state, ...action.payload};
        }
    }
});

// Action creators are generated for each case reducer function
export const { setProfile } = profileSlice.actions;
// export type ProfileState = ReturnType<typeof profileSlice.getInitialState>;

export default profileSlice.reducer;