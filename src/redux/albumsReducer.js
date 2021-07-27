import {FETCH_MY_ALBUMS} from "./types";

let initialState = {
	myAlbums: []
}

export const albumsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MY_ALBUMS:
			return { ...state, myAlbums: action.payload }

		default: return state;
	}
}