import React, { useState, useContext, useRef } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// import axios from "../core/axios";

import { useHttp } from '../hooks/http.hook';
import { Context } from '../context';
import { changeAuth, showAlert } from '../redux/actions/interfaceActions';
import { login } from '../redux/actions/profileActions';

import Preloader from "../components/Preloader"
import Button from "../components/Button";
import Alert from "../components/Alert";

import { ReactComponent as Logo } from '../assets/img/Logo.svg';

const AuthPage = ({ dispatch, authType, path, alert, loading, profile }) => {

    const [form, setForm] = useState({
        name: '', email: '', password: ''
    });
    const history = useHistory();
    const ref = useRef('input_teg')

    const [ loadAnimate, setLoadAnimate ] = useState(false);
    

    const auth = useContext(Context);
    const { request } = useHttp();
    const [error, setError] = useState(false)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value });

    }

    let btnDisable = (form.email !== "" && form.password !== "");

    // window.addEventListener('keypress', (event) => {
    //     if (event.key === "Enter") {
    //         if (event.target.nextSibling) {
    //             (event.target.nextSibling).focus();
    //         }
    //     }
    // })

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            if (data) {
                auth.login(data.token, data.userId, data.name, data.email);
                dispatch(showAlert({type: 'success', text: data.message}))
                history.push('/auth/login') 
            }
        }
        catch (e) {
            dispatch(showAlert({type: 'error', text: e.message}))
        }
    }
    
    const loginHandler = async () => {
        const req = await dispatch(login(form));
        
        const profileAuth = req;
        console.log(profileAuth)
        
        if (profileAuth) {
            console.log('must be logined', req)
            
            await auth.login(profileAuth.token, profileAuth.userId, profileAuth.name, profileAuth.email);
            history.push(path)
        }
    }

    const recoveryHandler = async () => {
        try {
            if (!authType) {
                const data = await request('/api/auth/checkEmail', 'POST', { email: form.email});

                if (data) {
                    dispatch(changeAuth(true));
                    console.log(ref.current.value)
                }

            }
            else {

                const pass = await request('/api/auth/recovery', 'POST', { password: form.password});
                if (pass) {
                    history.push('/auth')
                }
            }
        }
        catch (e) {
            dispatch(showAlert({type: 'error', text: e.message}))
        }
    }

    setTimeout(() => {
        setLoadAnimate(true);
    }, 2200);

    return (
       !loading ? ( <div className="music__auth">
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
                    {/* <Redirect to="/register"/> */}
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

const mapStateToProps = (state) => {
    return {
        authType: state.interface.auth,
        path: state.interface.path,
        alert: state.interface.alert,
        profile: state.profile,
        loading: state.interface.loading
    }
}

export default connect(mapStateToProps)(AuthPage);