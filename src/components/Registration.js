import React, { useState } from 'react';
import Api from '../utils/Api'

function Registration() {
    const [users, setUsers] = useState([]);
    const [login, setLogin] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isError, setIsError] = useState(true);
    const api = new Api();

    const getLogin = (event) => {
        setLogin(event.target.value)
        setIsError(!/^[a-zA-Z]+$/.test(event.target.value));
        console.log('isError login', isError, login);
    }

    const getEmail = (event) => {
        setEmail(event.target.value)
        setIsError(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value));
        console.log('isError email', isError, email);
        
    }

    const getPassword = (event) => {
        console.log('password', event.target.value);
        setPassword(event.target.value)
    }

    const checkPassword = (event) => {
        setIsError(password !== event.target.value);
        console.log('rpt pass', isError, password);
        
        
    }

    const submitRegistration = (event) => {
        event.preventDefault()
        console.log('submit login', login);
        console.log('submit email', email);
        console.log('submit password', password, isError);
        if(!isError) {
            const user = {
                login: login,
                email: email,
                password: password,
                id: Date.now()
            }
            
            // api.post(post)
            setUsers(
                [...users, user]
            ) 
        }
        
        
        
        console.log('submit');
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={submitRegistration}>
                <h1 className='title'>Register</h1>
                <label className='name_lbl label' htmlFor='name'>
                    Login
                </label>
                <span className='error-name error-text'>
                    Enter login!
                </span>
                <input className='name inp' 
                    type='text' 
                    placeholder='Your Name' 
                    name='name'
                    onChange={getLogin} 
                    required/>
                <label className='email_lbl label' htmlFor='email'>
                    Email
                </label>
                <span className='error-email error-text'>
                    Enter email!
                </span>
                <span className='wrong-email error-text'>
                    Этот имейл уже существует!
                </span>
                <input className='email inp' 
                    type='text' 
                    placeholder='Your Email' 
                    name='email'
                    onChange={getEmail} 
                    />
                <label className='label' htmlFor='password'>
                    Password
                </label>
                <input className='password inp' 
                    type='password' 
                    placeholder='Password' 
                    name='password' 
                    onChange={getPassword}
                    />
                <label className='password_lbl label' htmlFor='password_rpt'>Repeat Password</label>
                <span className='error-password error-text'>
                    Check password!
                </span>
                <input className='password_rpt inp' 
                    type='password' 
                    placeholder='Repeat Password' 
                    name='password_rpt' 
                    onChange={checkPassword}
                    />
                <button className='submit_btn button' type='submit'>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Registration;