import { GET_PROFILE } from './types'

let initialState = {
    profile: {}
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return {...state, profile: action.payload }
        default: return state;
    }
}