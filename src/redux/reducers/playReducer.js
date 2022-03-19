import { 
    PLAY_SONG, 
    NOW_SONG, 
    SWITCH_SONG, 
    SET_SONG_DURATION, 
    ITEM_DURATION, 
    SET_START,
    SET_CURRENT_PLAYLIST 
} from '../types/playTypes';

// Template of song time
let timeTemplate = s => {
    return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s);
}


const checkLocalStorage = () => {
    let storageSong = localStorage.getItem('lastSong');

    if (!storageSong) {
        return {};
    }
    else {
        return {};
        // return JSON.parse(storageSong);
    }
}

let initialState = {
    start: false,
    song: checkLocalStorage(),
    songFrom: [],
    currentDuration: '0:00',
    currentPlaylist: [],
    itemDuration: '0:00'
}

const switchSong = (to, list) => {
    list.map((item, index) => {
        if (initialState.song._id === item._id) {
            if (to === "next") {
                // return item[index + 1]
            }
            else if (to === "prev") {
            // return item[index - 1]
            }
            return item;
        }    
    }); 
    return list[0];
}

export const playReducer = (state = initialState, action) => {

    switch (action.type) {
        case PLAY_SONG:
            localStorage.setItem('lastSong', JSON.stringify(action.song));

            if (action.song._id === state.song._id) {
                return {...state, start: !state.start}
            }
            else {            
                return {...state, 
                    song: action.song, 
                    start: true, 
                    songFrom: action.list 
                };
        }
                 
        case NOW_SONG:
            return { ...state, song: action.payload }
        
        case SWITCH_SONG: 
            return { ...state, song: switchSong(action.to, action.list) }
            
        case SET_SONG_DURATION:
            return {...state, currentDuration: timeTemplate(action.payload)}
    
        case ITEM_DURATION:
            return {...state, itemDuration: timeTemplate(action.payload)}
        case SET_START:
            return { ...state, start: action.payload }

        case SET_CURRENT_PLAYLIST:
            return {...state, currentPlaylist: action.payload }
                
        default: return state;
    }
}