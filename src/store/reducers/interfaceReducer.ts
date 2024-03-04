import { createSlice } from "@reduxjs/toolkit";
import { lsSetItem, lsGetItem } from "@helpers/localstorage";
import { directories, DirType } from "@helpers/directory";

import { ToastProps } from "@components/UI/Toast";

export const interfaceSlice = createSlice({
    name: 'interface',
    initialState: {
        theme: 'light',
        fullplayer_is_expanded: false,
        sidebar_is_collapsed: true,
        header_is_filled: false,
        toast: <ToastProps>{ text: '', type: 'hidden' },
        // Current directory
        directory: directories['for_you']
    },
    reducers: {
        setTheme: (state, action : {type: string, payload: string }) => {
            lsSetItem({name: 'theme', value: action.payload});
            state.theme = action.payload;
        },
        setSidebarCollapsed: (state, action: {type: string, payload: boolean}) => {
            lsSetItem({ name: 'sidebar_is_collapsed', value: action.payload });
            return {...state, sidebar_is_collapsed : action.payload};
        },
        setFullplayerExpanded: (state, action) => {
            return {...state, fullplayer_is_expanded : action.payload};
        },
        showToast: (state, action: { type: string, payload: ToastProps }) => {
            return { ...state, toast: action.payload }
        },
        setHeaderIsFilled: (state, action : {type: string, payload: boolean}) => ({...state, header_is_filled: action.payload}),
        setDirectory: (state, action : {type: string, payload: DirType}) => ({...state, directory: action.payload})
    }
});

// Action creators are generated for each case reducer function
export const { 
    setTheme, 
    setSidebarCollapsed, 
    setDirectory, 
    setFullplayerExpanded, 
    setHeaderIsFilled,
    showToast
} = interfaceSlice.actions;

export default interfaceSlice.reducer;