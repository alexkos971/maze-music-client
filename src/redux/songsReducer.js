import { FETCH_RECOMEND_SONGS, FETCH_MY_SAVED_SONGS } from './types';

let initialState = {
    recomendSongs: [],
    save: false,
    mySongs: []
}

const checkSaved = (savedSongs, recomendSongs) => {
    savedSongs.map(saved => {
        recomendSongs.map(recomend => {
            if (recomend._id === saved._id) {
                recomend.saved = true;
            }
            else {
                recomend.saved = false;
            }
            // return recomend;
        })
        // return saved;
    })
    return recomendSongs;
}

// const saveSong = (state, item) => {

//     state.savedSongs.map(elem => {
//         if (elem._id == item._id) {
//             elem.saved = false
//         }
//         else {
//             elem.saved = true
//         }
//     })
//     // if (!state.length) {
//         // state.push(item);
//         // return state;
//     // 
//     // for (let i = 0; i < state.length; i++) {
//         // if (state[i] === item) {
//     //         state.splice(i, 1);
//     //     }
//     // }
//     // state.push(item)
//     // state.indexOf(item) == -1 ? state.splice(state.findIndex(item), 1) : state.push(item)
//     return list;
// }   

export const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECOMEND_SONGS:
            return { ...state, recomendSongs: checkSaved(action.saved, action.payload) };
        default: return state;
    }
}