import { combineReducers} from 'redux';

import { songsReducer } from "./reducers/songsReducer";
import { albumsReducer } from "./reducers/albumsReducer";
import { profileReducer } from "./reducers/profileReducer";
import { artistsReducer } from "./reducers/artistsReducer";
import { playReducer } from "./reducers/playReducer";
import { interfaceReducer } from "./reducers/interfaceReducer";

export const rootReducer = combineReducers({
    onPlay: playReducer,
    songs: songsReducer,
    artists: artistsReducer,
    profile: profileReducer,
    interface: interfaceReducer,
    albums: albumsReducer
})
