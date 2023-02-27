import React from 'react';

function Registration() {

    return (
        <div className='container'>
            <form className='form'>
                <h1 className='title'>Register</h1>
                <label className='name_lbl label' for='name'>Login</label>
                <span className='error-name error-text'>Enter login!</span>
                <input className='name inp' 
                    type='text' 
                    placeholder='Your Name' 
                    name='name' 
                    required/>
                <label className='email_lbl label' for='email'>Email</label>
                <span className='error-email error-text'>Enter email!</span>
                <span className='wrong-email error-text'>Этот имейл уже существует!</span>
                <input className='email inp' 
                    type='text' 
                    placeholder='Your Email' 
                    name='email' 
                    required/>
                <label className='label' for='password'>Password</label>
                <input className='password' 
                    inp type='password' 
                    placeholder='Password' 
                    name='password' 
                    required/>
                <label className='password_lbl label' for='password_rpt'>Repeat Password</label>
                <span className='error-password error-text'>Check password!</span>
                <input className='password_rpt inp' 
                    type='password' 
                    placeholder='Repeat Password' 
                    name='password_rpt' 
                    required/>
                <button className='submit_btn btn' type='submit'>Register</button>
            </form>
        </div>
    );
}

export default Registration;