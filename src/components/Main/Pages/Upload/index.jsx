import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { itemDuration, getMySongs, getRecomendSongs } from '../../../../redux/actions';

import { useHttp } from '../../../../hooks/http.hook';
import { useMessage } from '../../../../hooks/message.hook';
import { useAuth } from '../../../../hooks/auth.hook';

import Preloader from "../../../Preloader";
import './Upload.scss';


const Upload = ({ dispatch, duration, mySongs, path }) => {
    
    const { loading, request } = useHttp();
    const message = useMessage();
    const { token } = useAuth();
    const [form, setForm] = useState({})
    const history = useHistory()
    const [load, setLoad] = useState(false);

    const btnDisable = (form.name && form.src && form.cover)

    let audio = new Audio();

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });

        if (form.src && !form.duration) {
            setDurationOfTrack()
        }
    }

    const setDurationOfTrack = async () => {
        audio.src = await form.src;
        audio.onloadeddata = async () => {
            await dispatch(itemDuration(audio.duration));
            
            if (duration && duration !== '0:00') {
                setForm({ ...form, duration: duration });
            }
            else {
                message('Произошла ошибка, не удалось установить длительность трека');
                setLoad(false)
                return;
            }
        }
    }
    
    const uploadHandler = async () => {
        try {
            setLoad(true);

            let data = await request('api/songs/upload', 'POST', {...form}, {
                Authorization: `Bearer ${token}`
            });
            
            if (data.track) {
                await dispatch(getMySongs([...mySongs, data.track]))
                // message(data.message)
                history.push('/Profile')
                // console.log(songs);
            }
            setLoad(false);
        }
        catch (e) {
            message(e.message);
        }
    }

    return (
        <div className="music__main-upload">
            <h2 className="subtitle">Upload  track</h2>

            {!load ? (


                <div className="music__main-upload-fields">
                    <p>Fill the fields</p>
                                        
                    <div className="music-form">
                            
                        <p className="music-form-required">Required field</p>
                        <input type="text" name="name" required={true} onChange={changeHandler} placeholder="name of track"/>
                        
                        {/* <input type="text" name="artist_id" required onChange={changeHandler} placeholder="track author link"/> */}
                        <input type="text" name="album_id" onChange={changeHandler}  placeholder="track album link"/>
                        
                        <p className="music-form-required">Required field</p>
                        <input type="text" name="src" required onChange={changeHandler} placeholder="track link"/>
                        
                        <input type="text" name="lyrics" onChange={changeHandler} placeholder="track lyrics"/>
                        
                        <p className="music-form-required">Required field</p>
                        <input type="text" name="cover" onChange={changeHandler} placeholder="track cover"/>

                        <div  className="music-form-btns">
                            <button type="submit" onClick={uploadHandler} disabled={!btnDisable}>Upload</button> 
                        </div>   
                    </div>
                        
                </div>
                ) : (
                <Preloader/>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        duration: state.onPlay.itemDuration,
        mySongs: state.songs.mySongs,
        path: state.interface.path
    }
}

export default connect(mapStateToProps)(Upload);