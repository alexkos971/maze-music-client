import {combineReducers} from 'redux';
import { dirReducer } from './dirReducer';
import { playReducer } from './playReducer';
import { durReducer } from './durReducer'
import { songsReducer } from './songsReducer';
import { profileReducer } from './profileReducer';
import { interfaceReducer } from './interfaceReducer';

export const rootReducer = combineReducers({
    changeDir: dirReducer,
    onPlay: playReducer,
    getDuration: durReducer,
    songs: songsReducer,
    profile: profileReducer,
    interface: interfaceReducer
})
