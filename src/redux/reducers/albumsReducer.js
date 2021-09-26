import { SET_NOW_ALBUM} from "../types/albumsTypes";

let initialState = {
	myAlbums: [],
	album: {}
}

export const albumsReducer = (state = initialState, action) => {
	switch (action.type) {
		
		case SET_NOW_ALBUM:
			return { ...state, album: action.payload }

		default: return state;
	}
}