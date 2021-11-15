import { SET_NOW_ALBUM, DELETE_ALBUM, UPLOAD_ALBUM} from "../types/albumsTypes";
import { loading, showAlert } from "../actions/interfaceActions";

import axios from "../../core/axios"

export const setNowAlbum = (id, my) => {
    return async (dispatch) => {
        try {
            dispatch(loading(true))
            
            const {data} = await axios.get(`/api/albums/album/${id}`);
            
            if (data.isSuccess) {
                dispatch({
                    type: SET_NOW_ALBUM,
                    payload: data.album
                })
            }
            dispatch(loading(false))
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const uploadAlbum = (form) => {
    return async (dispatch) => {
        try {
            dispatch(loading(true));

            const { data } = await axios.post('/api/upload/album', form);

            if (data.isSuccess) {
                dispatch(showAlert({
                    type: 'success',
                    text: data.message
                }));
                dispatch({
                    type: UPLOAD_ALBUM,
                    payload: data.album
                })
            }
            else {
                dispatch(showAlert({
                    type: 'error',
                    text: data.message
                }));
            }

            dispatch(loading(false));
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const deleteAlbum = (id, name) => {
    return async (dispatch) => {
        let question = window.confirm(`Are you sure delete album [${name}] ?`);

        if (question) {

            try {
                dispatch(loading(true))

                const {data } = await axios.delete(`/api/albums/delete/${id}`);
                if (data.isSuccess) {

                    dispatch(showAlert({
                        type: 'success',
                        text: data.message
                    }));

                    dispatch({
                        type: DELETE_ALBUM,
                        payload: id
                    });
                }
                else {
                    dispatch(showAlert({
                        type: 'error',
                        text: data.message
                    }));
                }
                
                dispatch(loading(false))
            }
            catch(e) {
                console.log(e)
            }
        }
    }
}
