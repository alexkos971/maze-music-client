import { combineReducers} from 'redux';
import { playReducer } from './playReducer';
import { songsReducer } from './songsReducer';
import { artistsReducer } from './artistsReducer';
import { profileReducer } from './profileReducer';
import { interfaceReducer } from './interfaceReducer';
import { albumsReducer } from "./albumsReducer";

export const rootReducer = combineReducers({
    onPlay: playReducer,
    songs: songsReducer,
    artists: artistsReducer,
    profile: profileReducer,
    interface: interfaceReducer,
    albums: albumsReducer
})
