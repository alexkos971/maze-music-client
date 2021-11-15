import { SET_NOW_ALBUM} from "../types/albumsTypes";

let initialState = {
	myAlbums: [],
	currentAlbum: {}
}

export const albumsReducer = (state = initialState, action) => {
	switch (action.type) {
		
		case SET_NOW_ALBUM:
			return { ...state, currentAlbum: action.payload }
		default: return state;
	}
}