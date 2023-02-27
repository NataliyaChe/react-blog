import React from 'react';

function Login() {

    return (
        <div className='container'>
            <form className='form'>
                <h1 className='title'>Sign in</h1>
                <label className='email_lbl' label for='email'>Email</label>
                <span className='error-email error-text'>Enter email!</span>
                <span className='wrong-email error-text'>
                    Такого имейла не существует!
                </span>
                <input className='email' 
                    inp type='text' 
                    placeholder='Your Email' 
                    name='email' 
                    required/>
                <label className='password_lbl label' for='password'>Password</label>
                <span className='wrong-pass error-text'>Wrong password</span>
                <input className='password inp' 
                    type='password' 
                    placeholder='Password' 
                    name='password' 
                    required/>
                <button className='signin_btn btn' type='submit'>Sign in</button>
            </form>
        </div>
    );
}

export default Login;