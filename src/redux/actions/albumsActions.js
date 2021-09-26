import { SET_NOW_ALBUM} from "../types/albumsTypes";

export const setNowAlbum = (data) => {
    return {
        type: SET_NOW_ALBUM,
        payload: data
    }
}
