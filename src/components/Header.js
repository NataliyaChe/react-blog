import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../utils/AuthContext'

function Header() {
    const {user} = useContext(AuthContext);
    console.log('header user', user);

    
    return (
        <div className='header'>
            <span className='header-title'>Blog</span>
            <div>
                <Link to='.' className={`link ${user ? 'show' : 'hide'}`}>
                    Posts
                </Link>
                <Link to='/users' className={`link ${user ? 'show' : 'hide'}`}>
                    Users
                </Link>
            </div>
        </div>
    );
}

export default Header;