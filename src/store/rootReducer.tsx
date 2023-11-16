import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./reducers/interfaceReducer";
import profileReducer from "./reducers/profileReducer";
import playerReducer from "./reducers/playerReducer";

export const store = configureStore({
    reducer: {
        interface: interfaceReducer,
        profile: profileReducer,
        player: playerReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;