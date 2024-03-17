import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./reducers/interfaceReducer";
import profileReducer from "./reducers/profileReducer";
import playerReducer from "./reducers/playerReducer";

// API
import { authApi } from "./api/authApi";
import { profileApi } from "./api/profileApi";

export const store = configureStore({
    reducer: {
        interface: interfaceReducer,
        profile: profileReducer,
        player: playerReducer,
        
        // Connect API
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,  
        profileApi.middleware
    )
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;