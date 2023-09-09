import { createSlice } from "@reduxjs/toolkit";
import { lsSetItem, lsGetItem } from "@helpers/localstorage";

export const interfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        theme: lsGetItem('theme') || 'light',
        sidebar_is_collapsed: typeof JSON.parse(lsGetItem('sidebar_is_collapsed')) === 'boolean' ? JSON.parse(lsGetItem('sidebar_is_collapsed')) : true
    },
    reducers: {
        setTheme: (state, action) => {
            lsSetItem({name: 'theme', value: action.payload});
            state.theme = action.payload;
        },
        setSidebarCollapsed: (state, action) => {
            lsSetItem({ name: 'sidebar_is_collapsed', value: action.payload });
            state.sidebar_is_collapsed = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setTheme, setSidebarCollapsed } = interfaceSlice.actions;

export default interfaceSlice.reducer;