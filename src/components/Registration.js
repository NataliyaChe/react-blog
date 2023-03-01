import React, { useState, useEffect } from 'react';
import Api from '../utils/Api'

function Registration() {
    const [users, setUsers] = useState([]);
    const api = new Api('http://localhost:3004/users');
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        password_rpt: '',
    }); 

    const [isError, setIsError] = useState({})
    
    useEffect(() => {
        const fetchUsers = async () => {
          const users = await api.get()
          setUsers(users)
        }
        fetchUsers()
    }, []);

    const validateForm = () => {
        const error = {}

        if(newUser.name === '') {
            error.name = 'Enter login!'
        } else if (!/^[a-zA-Z]+$/.test(newUser.name)) {
            error.name = 'Invalid login!'
        }

        if(newUser.email === '') {
            error.email = 'Enter email!'
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(newUser.email)) {
            error.email = 'Invalid email!'
        } else if (users.find(user => user.email === newUser.email)) {
            error.email = 'Email already registered!'
        }

        if(newUser.password === '' || newUser.password_rpt === '') {
            error.password = 'Enter Password and Confirm password!'
        } else if (newUser.password.length < 6) {
            error.password = 'Password need 6 or more characters!'
        } else if (newUser.password !== newUser.password_rpt) {
            error.password = 'Check password!'
        }

        setIsError({...error});
        console.log(Object.keys(error));
        return Object.keys(error).length < 1
    }

    const getData = (event) => {
        setNewUser(() => ({
            ...newUser,
            [event.target.name]: event.target.value
        }))
    }

    console.log('users start', users);
    const submitRegistration = (event) => {
        event.preventDefault();
        console.log(newUser)
        console.log('keys', validateForm())
        const isValid = validateForm()
        
        if(isValid) {
            delete newUser.password_rpt;
            newUser.id = Date.now()
            console.log('newUser', newUser);
            api.post(newUser)
            setUsers(
                [...users, newUser]
            ) 
        }
        
        // if(!isError) {
        //     const user = {
        //         login,
        //         email,
        //         password,
        //         id: Date.now()
        //     }

            // api.post(newUser)
            // setUsers(
            //     [...users, newUser]
            // ) 
        //     console.log('users', users);
        //     event.target.reset()
        // }
    
        console.log('submit');
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={submitRegistration}>
                <h1 className='title'>Register</h1>
                <label className='name_lbl label' htmlFor='name'>
                    Login
                </label>
                <input className='name inp' 
                    type='text' 
                    placeholder='Your Name' 
                    name='name'
                    value={newUser.name}
                    onChange={getData} 
                    />
                <span className='error-name error-text'>
                    {isError.name}
                </span>
                <label className='email_lbl label' htmlFor='email'>
                    Email
                </label>
                <input className='email inp' 
                    type='text' 
                    placeholder='Your Email' 
                    name='email'
                    value={newUser.email}
                    onChange={getData} 
                    />
                <span className='error-email error-text'>
                    {isError.email}
                </span>
                <label className='label' htmlFor='password'>
                    Password
                </label>
                <input className='password inp' 
                    type='password' 
                    placeholder='Password' 
                    name='password' 
                    value={newUser.password}
                    onChange={getData}
                    />
                <span className='error-password error-text'>
                    {isError.password}
                </span>
                <label className='password_lbl label' htmlFor='password_rpt'>Confirm Password</label>
                <input className='password_rpt inp' 
                    type='password' 
                    placeholder='Repeat Password' 
                    name='password_rpt' 
                    // value={newUser.password_rpt}
                    onChange={getData}
                    />
                <button className='submit_btn button' type='submit'>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Registration;