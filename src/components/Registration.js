import React, { useState, useEffect } from 'react';
import Api from '../utils/Api'

function Registration() {
    const [users, setUsers] = useState([]);
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [rptPassword, setRptPassword] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const api = new Api('http://localhost:3004/users');
    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [isErrorLogin, setIsErrorLogin] = useState(false);
    const [isWrongEmail, setIsWrongEmail] = useState(false);
    const [isErrorPassword, setIsErrorPassword] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
          const users = await api.get()
          setUsers(users)
        }
        fetchUsers()
    }, []);

    console.log('users start', users);

    const getLogin = (event) => {
        setLogin(event.target.value);
        if(!/^[a-zA-Z]+$/.test(login)) {
            setIsErrorLogin(true);
            setIsError(true);
        } else {
            setIsErrorLogin(false);
            // setIsError(false);
        }
    }

    const getEmail = (event) => {
        setEmail(event.target.value);
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            setIsErrorEmail(true);
            setIsError(true);
        } else {
            setIsErrorEmail(false);
            // setIsError(false);
        }
    }

    const getPassword = (event) => {
        setPassword(event.target.value)
    }

    const checkPassword = (event) => {
        setRptPassword(event.target.value);  
        // if(password !== rptPassword) {
        //     setIsErrorPassword(true);
        //     setIsError(true);
        // } else {
        //     setIsErrorPassword(false);
        //     // setIsError(false);
        // }
    }

    // function findEmail() {
    //     const userEmail = users.find(user => user.email === email)
    //     console.log('userEmail', userEmail, email);
    // }
    const submitRegistration = (event) => {
        event.preventDefault();

        // if(!/^[a-zA-Z]+$/.test(login)) {
        //     setIsErrorLogin(true);
        //     setIsError(true);
        // } else {
        //     setIsErrorLogin(false);
        //     // setIsError(false);
        // }
        console.log('login error', isError);
        // if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        //     setIsErrorEmail(true);
        //     setIsError(true);
        // } else {
        //     setIsErrorEmail(false);
        //     // setIsError(false);
        // }
        console.log('email error', isError);
        if(password !== rptPassword) {
            setIsErrorPassword(true);
            setIsError(true);
        } else {
            setIsErrorPassword(false);
            // setIsError(false);
        }
        console.log('password error', isError);
        // const userEmail = users.find(user => user.email === email)
        //     if(userEmail) {
        //         setIsError(true)
        //         // setIsWrongEmail(true)
        //     } else {
        //         // setIsError(false);
        //         setIsWrongEmail(false)
        //     }
            console.log('find error', isError);
        if(!isError) {
            const user = {
                login,
                email,
                password,
                id: Date.now()
            }

            api.post(user)
            setUsers(
                [...users, user]
            ) 
            console.log('users', users);
            event.target.reset()
        }
    
        console.log('submit');
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={submitRegistration}>
                <h1 className='title'>Register</h1>
                <label className={`name_lbl label ${isErrorLogin ? 'hide' : 'show'}`} htmlFor='name'>
                    Login
                </label>
                <span className={`error-name error-text ${isErrorLogin ? 'show' : 'hide'}`}>
                    Enter login!
                </span>
                <input className='name inp' 
                    type='text' 
                    placeholder='Your Name' 
                    name='name'
                    onChange={getLogin} 
                    required/>
                <label className={`email_lbl label ${isErrorEmail ? 'hide' : 'show'} ${isWrongEmail ? 'hide' : 'show'}`} htmlFor='email'>
                    Email
                </label>
                <span className={`error-email error-text ${isErrorEmail ? 'show' : 'hide'}`}>
                    Enter email!
                </span>
                <span className={`wrong-email error-text ${isWrongEmail ? 'show' : 'hide'}`}>
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
                <label className={`password_lbl label ${isErrorPassword ? 'hide' : 'show'}`} htmlFor='password_rpt'>Repeat Password</label>
                <span className={`error-password error-text ${isErrorPassword ? 'show' : 'hide'}`}>
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