import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { itemDuration, getMySongs } from '../../../../redux/actions';

import { useHttp } from '../../../../hooks/http.hook';
import { useMessage } from '../../../../hooks/message.hook';
import { useAuth } from '../../../../hooks/auth.hook';

import Preloader from "../../../Preloader";
import './Upload.scss';


const Upload = ({ dispatch, duration, mySongs }) => {
    
    const { request } = useHttp();
    const message = useMessage();
    const { token } = useAuth();
    const history = useHistory()
    const [load, setLoad] = useState(false);

    const [form, setForm] = useState({})

    const btnDisable = (form.name && form.track)

    // let audio = new Audio();

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const setFile = (e) => {
        if (!e.target.length) {
            setForm({...form, [e.target.name]: e.target.files[0]})        
        }
    }

    // const setDurationOfTrack = async (e) => {
    //     const url = URL.createObjectURL(e.target.files[0]);

    //     audio.onload = async () => {
    //         console.log(url)
    //         audio.src = await url;
    //         await dispatch(itemDuration(audio.duration));
            
    //         if (duration && duration !== '0:00') {
    //             setForm({ ...form, duration: duration });
    //         }
    //         else {
    //             message('Произошла ошибка, не удалось установить длительность трека \n Заново вставьте ссылку');
    //             setLoad(false)
    //             return;
    //         }
    //     }
    // }
    
    const uploadHandler = async () => {
        try {
            setLoad(true);
            console.log(form)
            let data = await request('api/upload/track', 'POST', {...form}, {
                'Content-Type': 'multipart/form-data',
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
                        <input type="file" name="track" accept="audio/wav, audio/mp3" required onChange={setFile} placeholder="track file"/>
                        
                        <input type="text" name="lyrics" onChange={changeHandler} placeholder="track lyrics"/>
                        
                        <p className="music-form-required">Required field</p>
                        <input type="file" name="cover" accept="image/jpeg, image/png" onChange={setFile} placeholder="track cover"/>

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