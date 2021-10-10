import React, { useState, useRef, useEffect } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { changeAuth, showAlert } from '../redux/actions/interfaceActions';
import { login, recoveryPass, register } from '../redux/actions/profileActions';

import Preloader from "../components/Preloader"
import Button from "../components/Button";
import Alert from "../components/Alert";

import { ReactComponent as Logo } from '../assets/img/Logo.svg';

const AuthPage = ({ dispatch, authType, auth,  defaultPath, alert, loading }) => {
    
    const [form, setForm] = useState({
        name: '', email: '', password: ''
    });
    const history = useHistory();
    const ref = useRef('input_teg')
    
    const [ loadAnimate, setLoadAnimate ] = useState(false);
    
    const [error] = useState(false)
    
    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value });
    }
    
    let btnDisable = (form.email !== "" && form.password !== "");
    
    const registerHandler = async () => {
        try {
            const registerTry = await dispatch(register(form));
            
            if (registerTry.isSuccess) {
                history.push('/auth/login') 
            }
        }
        catch (e) {
            dispatch(showAlert({type: 'error', text: e.message}))
        }
    }
    
    const loginHandler = async () => {
        try {
            await dispatch(login(form));
            
            if (auth?.isSuccess) {
                history.push(defaultPath.src)              
            }
            else {
                loadAnimateFunc()
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    
    const recoveryHandler = async () => {
        try {
            // if (!authType) {
                let recoveryTry = await dispatch(recoveryPass(form.email))
                if (recoveryTry.isSuccess) {
                    dispatch(changeAuth(true));
                }
                
            // }
            // else {
                
            //     const pass = await request('/api/auth/recovery', 'POST', { password: form.password});
            //     if (pass) {
            //         history.push('/auth')
            //     }
            // }
        }
        catch (e) {
            dispatch(showAlert({type: 'error', text: e.message}))
        }
    }
    
    let loadAnimateFunc = () => {
        setLoadAnimate(false);
        
        return setTimeout(() => {
            setLoadAnimate(true);
        }, 2200);
    }
    
    useEffect(() => {
        loadAnimateFunc()
    }, [])
    
    return (
        !loading ? ( 
            
        <div className="music__auth">
            <div className={`music__auth-logo`}>
                <Logo />
            </div>
            
            <div className="music__auth_bg"></div>
            
            {loadAnimate &&  
                <div className="music__auth-box">
                
                <Route path="/auth/login">
                <h1>Login</h1>
                
                {error ? 
                    (<Button type="message" text={error}/>) :
                    (<div className="music-form">
                        <input 
                            type="text" 
                            placeholder="example@gmail.com"
                            id="email"
                            name="email"
                            onChange={changeHandler}/>
                    
                        <input 
                            type={"password"}
                            placeholder="11111111"
                            id="password"
                            name="password"
                            onChange={changeHandler}/>
                    
                        <div className="music-form-btns">
                            <button onClick={loginHandler} disabled={!btnDisable}>Login</button>
                            <Link to="/auth/register" id="btn_nonreg">Register</Link>
                        </div>
                    </div> 
                    )
                }
                </Route>
                
                <Route path="/auth/register">
                    <h1>Register</h1>
                    
                    <div className="music-form">
                        <input 
                            type="text" 
                            placeholder="Your_Name"
                            id="name"
                            name="name"
                            onChange={changeHandler}/>
                            
                            <input 
                                type="text" 
                                placeholder="example@gmail.com"
                                id="email"
                                name="email"
                                onChange={changeHandler}/>
                            
                            <input 
                                type={"password"}
                                placeholder="11111111"
                                id="password"
                                name="password"
                                onChange={changeHandler}/>
                            
                        <div className="music-form-btns">
                            
                            <button onClick={registerHandler} disabled={loading}>Register</button> 
                            <Link to="/auth/login" id="btn_nonreg">Login</Link>
                        </div>
                    </div>
                </Route>
                
                <Route path="/auth/recovery">
                <h1>Recovery password</h1>
                
                {!authType ? 
                    <div className="music-form">
                        <input 
                            type="text" 
                            placeholder="example@gmail.com"
                            id="email"
                            name="email"
                            ref={ref}
                            onChange={changeHandler}/>
                        
                        <div className="music-form-btns">
                            <button onClick={recoveryHandler} disabled={loading}>Send</button>
                        </div>
                    </div>
                    : 
                    
                    <div className="music__auth-box">
                        <input 
                            type="text" 
                            placeholder="password"
                            id="password"
                            name="password"
                            onChange={changeHandler}/>
                        
                        <div className="music-form-btns">
                            <button onClick={recoveryHandler} disabled={loading}>Send</button>
                        </div>
                    </div>
                }
                
                </Route>
                
                    <Link to="/auth/recovery">
                        <span className="music-form-forgot">Forgot password ?</span>
                    </Link>
                </div>        
            }
            {alert.length ? <Alert items={alert}/> : null}
            
        </div>)
        :
            (<Preloader/>)
        );
    }
        
const mapStateToProps = (state) => ({
    authType: state.interface.authType,
    defaultPath: state.interface.defaultPath,
    alert: state.interface.alert,
    loading: state.interface.loading,
    auth: state.profile.auth
})
        
export default connect(mapStateToProps)(AuthPage);