import { 
    SET_FULLPLAYER, 
    SET_NIGHT, 
    SET_HEADER, 
    CHANGE_DIR, 
    CHANGE_AUTH, 
    COLLAPSE_SIDEBAR,
    SHOW_ALERT, 
    HIDE_ALERT,

    SHOW_MODAL, 
    HIDE_MODAL, 
    LOADING
} from '../types/interfaceTypes';

let initialState = {
    fullPlayer: false,
    night: JSON.parse(localStorage.getItem('userNight')),
    header: false,
    sidebarCollapsed: typeof JSON.parse(localStorage.getItem('collapsedSidebar')) == "boolean" ? JSON.parse(localStorage.getItem('collapsedSidebar')) : (window.innerWidth > 992 ? false : true),
    path: {
        name: 'For you',
        path: '/for-you'
    },
    defaultPath: {
        src: '/for-you',
        name: 'For you'
    },
    loading: false,
    authType: false,
    alert: [],
    modal: {
        type: 'hidden'
    }
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

        case COLLAPSE_SIDEBAR:
            localStorage.setItem('collapsedSidebar', JSON.stringify(action.payload));
            return {...state, sidebarCollapsed: action.payload}

        case SHOW_ALERT:
            return { ...state, alert: [...state.alert, action.payload] }
            
        case HIDE_ALERT:
            return { ...state, alert: action.payload }
        
        case SHOW_MODAL:
            return { ...state, modal: action.payload }
        
        case HIDE_MODAL:
            return { ...state, modal: {type: 'hidden'} }

        case LOADING:
            return { ...state, loading: action.payload }
        
        default: return state;
    }
}