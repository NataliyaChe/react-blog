import React, { useState } from 'react';
import Api from '../utils/Api';

function Login() {
    const [users, setUsers] = useState([]);
    const api = new Api();

    const submitLogin = (event) => {
        event.preventDefault()
        console.log('submit');
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={submitLogin}>
                <h1 className='title'>Sign in</h1>
                <label className='email_lbl label' htmlFor='email'>Email</label>
                <span className='error-email error-text'>Enter email!</span>
                <span className='wrong-email error-text'>
                    Такого имейла не существует!
                </span>
                <input className='email inp' 
                    type='text' 
                    placeholder='Your Email' 
                    name='email' 
                    required/>
                <label className='password_lbl label' htmlFor='password'>Password</label>
                <span className='wrong-pass error-text'>Wrong password</span>
                <input className='password inp' 
                    type='password' 
                    placeholder='Password' 
                    name='password' 
                    required/>
                <button className='signin_btn button' type='submit'>Sign in</button>
            </form>
        </div>
    );
}

export default Login;