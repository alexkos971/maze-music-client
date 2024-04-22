import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./reducers/interfaceReducer";
import profileReducer from "./reducers/profileReducer";
import playerReducer from "./reducers/playerReducer";
import tracksReducer from "./reducers/tracksReducer";

// API
import { authApi } from "./api/authApi";
import { usersApi } from "./api/usersApi";
import { tracksApi } from "./api/tracksApi";
import { playlistsApi } from "./api/playlistsApi";

export const store = configureStore({
    reducer: {
        interface: interfaceReducer,
        profile: profileReducer,
        player: playerReducer,
        tracks: tracksReducer,
        
        // Connect API
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [tracksApi.reducerPath]: tracksApi.reducer,
        [playlistsApi.reducerPath]: playlistsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,  
        usersApi.middleware,
        tracksApi.middleware,
        playlistsApi.middleware
    )
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;