import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        name: 'Alex Kos',
    },
    reducers: {
        setProfile: (state, action) => {
            state = {...action.payload};
        }
    }
});

// Action creators are generated for each case reducer function
// export const { setTheme, setSidebarCollapsed } = profileSlice.actions;

export default profileSlice.reducer;