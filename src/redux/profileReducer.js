import { SET_PROFILE, SET_MY_SONGS } from './types'

let initialState = {
    profile: {}
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, profile: action.payload }

        case SET_MY_SONGS:
            return {...state, profile: {...state.profile.profile, songs: action.payload} }

        default: return state;
    }
}