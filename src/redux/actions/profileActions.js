import { 
    SET_PROFILE, 
    SET_MY_SONGS, 
    SET_SAVED_SONGS, 
    FETCH_MY_ALBUMS, 
    SAVE_SONG, 

    CHANGE_PROFILE_DESCRIPTION, 
    CHANGE_PROFILE_NAME,
    CHANGE_PROFILE_AVATAR,
    
    LOG_IN,
    LOG_OUT,
    REGISTER,
    RECOVERY_PASS
} from '../types/profileTypes';

import { LOADING, SHOW_ALERT } from '../types/interfaceTypes';

import axios from "../../core/axios";
import { showAlert, loading } from './interfaceActions';
import { setNowSong } from './playActions';

export const getNickByAvatar = name => {
    return name.split(" ").reduce((item, acc) => item[0] + acc[0]);
}

export const setProfile = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/users/profile')
            
            if (data) {
                let avatarNick = getNickByAvatar(data.name);

                await data.saved_songs.map(item => item.saved = true);

                return dispatch({
                    type: SET_PROFILE,
                    payload: {...data, avatarNick}
                })
            }
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const changeProfileDescription = (data) => {
    return async (dispatch) => {
        let desc = prompt('Paste the new description');
        
        if (!desc) {
            return alert('Поле пустое !!!');
        }
        
        try {
            const newDesc = await axios.post('/api/changes/description', { description: desc })
            
            if (newDesc) {
                dispatch({
                    type: CHANGE_PROFILE_DESCRIPTION,
                    payload: newDesc.data
                })
                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        type: 'success',
                        text: 'Описание изменено'
                    }
                })
            }
            else {

                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        type: 'error',
                        text: 'Ошибка !'
                    }
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const changeProfileName = (data) => {
    return async (dispatch) => {
        let name = prompt('Paste the new name');
        
        if (!name) {
            dispatch({
                type: SHOW_ALERT,
                payload: {
                    type: 'warning',
                    text: 'Поле пустое !'
                }
            })
            return;
        }
        
        try {
            const { data } = await axios.post('/api/changes/name', { name });
            
            if (data) {
                let avatarNick = data.name.split(" ").reduce((item, acc) => item[0] + acc[0])
                
                dispatch({
                    type: CHANGE_PROFILE_NAME,
                    payload: { name: data.name, avatarNick}
                })
                
                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        type: 'success',
                        text: 'Имя обновлено'
                    }
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const changeProfileAvatar = (file, history) => {
    return async (dispatch) => {
        if (!file) {
            dispatch(showAlert({
                type: 'error',
                text: 'Поле пустое !'
            }));
            return;
        }
        else {
            try {
                dispatch(loading(true));
               
                const formData = new FormData();
                formData.append('avatar', file)
                
                const {data} = await axios.post('/api/upload/avatar', formData);

                if (data.isSuccess) {
                    dispatch({
                        type: CHANGE_PROFILE_AVATAR,
                        payload: data.avatar
                    });
                    dispatch(showAlert({
                        type: 'success',
                        text: data.message
                    }));
                    history.push('/profile')
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
}

export const setMySongs = (data) => {
    return {
        type: SET_MY_SONGS,
        payload: data
    }
}

export const getMyAlbums = (data) => {
    return {
        type: FETCH_MY_ALBUMS,
        payload: data
    }
}

export const setSavedSongs = (data) => {
    return {
        type: SET_SAVED_SONGS,
        payload: data,
    }
}


export const saveSong = (item) => {
    return async (dispatch, getState) => {
        try {   
            const { data } = await axios.put(`/api/songs/save/${item._id}`, {isSaved: item.saved});

            if (data.isSuccess) {
                dispatch(showAlert({
                    type: 'success',
                    text: data.message
                }));
                
                // Change set on Player component
                if (item._id == getState().onPlay.song._id) {
                    dispatch(setNowSong({...item, saved: !item.saved}));
                }

                dispatch({
                    type: SAVE_SONG,
                    payload: item,
                    isSaved: item.saved
                });
            }
            else {
                dispatch(showAlert({
                    type: 'error',
                    text: data.message
                }));
            }
        }
        catch(e) {
            console.log(e)
        }
    }
}


// Auth actions
export const login = (form) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: LOADING,
                payload: true
            })
            
            const {data} = await axios.post('/api/auth/login', form);
            
            if (data.isSuccess) {
                localStorage.setItem('userData', JSON.stringify(data.token));
                
                await dispatch(setProfile());

                dispatch({
                    type: LOG_IN,
                    payload: { isSuccess: true, token: data.token }
                }) 
                
                
                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        type: 'success',
                        text: data.message
                    }
                })
            }    
            else {
                dispatch({
                    type: LOG_IN,
                    payload: {isSuccess: false}
                })
                
                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        type: 'error',
                        text: data.message                        
                    }
                })
            }
            
            return dispatch({
                type: LOADING,
                payload: false
            })
            
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        await localStorage.removeItem('userData');
        
        let name = getState().profile.name;
        dispatch({
            type: LOG_OUT
        })
        
        dispatch({
            type: SHOW_ALERT,
            payload: {
                type: 'success',
                text: `Вы вышли из аккаунта ${name}`
            }
        })
    }
}

export const register = (form) => {
    return async (dispatch, getState) => {
        
        try {
            dispatch({
                type: LOADING,
                payload: true
            })
            
            const { data } = axios.post('/api/auth/register', form)
            
            if (data.isSuccess) {
                
                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        type: 'success',
                        text: data.message
                    }
                })
                
                dispatch({
                    type: REGISTER,
                    payload: data
                })
                
                return data;
            }
            else {
                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        type: 'error',
                        text: data.message
                    }
                })
            }
            dispatch({
                type: LOADING,
                payload: true
            })
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const recoveryPass = (email) => {
    return async (dispatch) => {
        try {
            dispatch({type: LOADING, payload: true})
            const {data} = await axios.post('/api/auth/checkEmail', { email })
            
            if (data.isSuccess) {
                dispatch({
                    type: RECOVERY_PASS,
                    payload: data.pass
                })
                dispatch({
                    type: SHOW_ALERT,
                    payload: {
                        type: 'success',
                        text: 'Пароль обновлен'
                    }
                })
            }

            dispatch({type: LOADING, payload: true})
        }
        catch (e) {
            console.log(e)
        }
    }
}