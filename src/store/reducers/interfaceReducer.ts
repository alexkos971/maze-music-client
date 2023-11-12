import { createSlice } from "@reduxjs/toolkit";
import { lsSetItem, lsGetItem } from "@helpers/localstorage";
import { directories, DirType } from "@helpers/directory";

type sidebar_collapsed = {
    type: string,
    payload: false | true
};

export const interfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        theme: lsGetItem('theme') || 'light',
        sidebar_is_collapsed: lsGetItem('sidebar_is_collapsed'),
        // Current directory
        directory: directories['for_you']
    },
    reducers: {
        setTheme: (state, action) => {
            lsSetItem({name: 'theme', value: action.payload});
            state.theme = action.payload;
        },
        setSidebarCollapsed: (state, action: sidebar_collapsed) => {
            lsSetItem({ name: 'sidebar_is_collapsed', value: action.payload });
            return {...state, sidebar_is_collapsed : action.payload};
        },
        setDirectory: (state, action : {type: string, payload: DirType}) => ({...state, directory: action.payload})
    }
});

// Action creators are generated for each case reducer function
export const { setTheme, setSidebarCollapsed, setDirectory } = interfaceSlice.actions;

export default interfaceSlice.reducer;