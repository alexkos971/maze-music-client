import { CHANGE_DIR, CHANGE_AUTH } from './types';

const initialState = {
    dir: 'For you',
    auth: false,
    server_url: "https://cryptic-harbor-47632.herokuapp.com"
}

export const dirReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_DIR:
            return {...state, dir: action.payload};
        
        case CHANGE_AUTH:
            return {...state, auth: action.payload};

        default: return state;
    }
}