import { SET_NOW_ALBUM} from "../types/albumsTypes";
import { loading } from "../actions/interfaceActions";

import axios from "../../core/axios"

export const setNowAlbum = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loading(true))

            const {data} = await axios.get(`/api/albums/album/${id}`);

            if (data) {
                dispatch({
                    type: SET_NOW_ALBUM,
                    payload: data
                })
            }
            dispatch(loading(false))
        }
        catch(e) {
            console.log(e)
        }
    }
}
