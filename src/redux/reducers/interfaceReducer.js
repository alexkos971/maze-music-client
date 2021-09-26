import { 
    SET_FULLPLAYER, 
    SET_NIGHT, 
    SET_HEADER, 
    CHANGE_DIR, 
    CHANGE_AUTH, 
    SHOW_ALERT, 
    HIDE_ALERT,
    LOADING
} from '../types/interfaceTypes';

let initialState = {
    fullPlayer: false,
    night: JSON.parse(localStorage.getItem('userNight')),
    header: false,
    path: {
        name: 'For you',
        path: '/for-you'
    },
    loading: false,
    auth: false,
    serverUrl: 'http:/localhost:5050/',
    alert: []
}

export const interfaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FULLPLAYER:
            return {...state, fullPlayer: action.payload}

        case SET_NIGHT:
            localStorage.setItem('userNight', !state.night);
            return {...state, night: !state.night};

        case SET_HEADER:
            return {...state, header: action.payload}

        case CHANGE_DIR:
            return {...state, path: action.payload}

        case CHANGE_AUTH:
            return {...state, auth: action.payload};

        case SHOW_ALERT:
            return { ...state, alert: [...state.alert, action.payload] }
        
        case HIDE_ALERT:
            return { ...state, alert: action.payload }

        case LOADING:
            return { ...state, loading: action.payload }
        
        default: return state;
    }
}