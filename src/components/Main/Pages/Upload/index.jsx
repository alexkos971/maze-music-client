import React, { useState, useContext } from 'react';
import './Upload.scss';
import { connect } from 'react-redux';
import { setNowSong } from '../../../../redux/actions';

import { useHttp } from '../../../../hooks/http.hook';
import { useMessage } from '../../../../hooks/message.hook';
import { Context } from '../../../../context';

const Upload = ({ dispatch, song }) => {
    
    const { loading, request } = useHttp();
    const message = useMessage();
    const { token } = useContext(Context);

    const [form, setForm] = useState({})

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    
    const uploadHandler = async () => {
        try {
            if (form.name === undefined) {
                message('Некоторые поля не заполненны');
                // return;
            }
            let data = await request('api/songs/upload', 'POST', {...form}, {
                Authorization: `Bearer ${token}`
            });

            if (data) {
                // console.log(data);
                dispatch(setNowSong(data.track))
                message(data.message)
            }
        }
        catch (e) {
            message(e.message);
        }
    }

    return (
        <div className="music__main-upload">
            <h2 className="subtitle">Upload  track</h2>

            <p>Fill the fields</p>

            <div className="music__main-upload-fields">
                
                <form id="uploadTrack">
                    <input type="text" name="name" required={true} onChange={changeHandler} placeholder="name of track"/>

                    {/* <input type="text" name="artist_id" required onChange={changeHandler} placeholder="track author link"/> */}
                    <input type="text" name="album_id" onChange={changeHandler}  placeholder="track album link"/>
                    {/* http://localhost:3000/Artist:601d32d4f439591a2cfb26f8 */}
                
                    <input type="text" name="src" required onChange={changeHandler} placeholder="track link"/>

                    <input type="text" name="lyrics" onChange={changeHandler} placeholder="track lyrics"/>

                    <input type="file" name="cover" onChange={changeHandler} placeholder="track cover"/>
                </form>

                <button type="submit" onClick={uploadHandler} disabled={loading}>Upload</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        song: state.onPlay.song
    }
}

export default connect(mapStateToProps)(Upload);