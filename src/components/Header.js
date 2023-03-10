import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../utils/AuthContext'

function Header() {

    // const isVisible = useContext(HeaderContext);
    const {isUser} = useContext(AuthContext);
    console.log('isUser', isUser);

    // useEffect(() => {
    //     if(!authorizedUser) {
    //         setIsVisible(!isVisible);
    //     }
    // }, [authorizedUser]);

    // if(!authorizedUser) {
    //     setIsVisible(!isVisible);
    // }

    return (
        <div className='header'>
            <span className='header-title'>Blog</span>
            <div>
                {/* <div>{isUser}</div> */}
                <Link to='.' className='link'>
                    Posts
                </Link>
                <Link to='/users' className='link'>
                    Users
                </Link>
            </div>
        </div>
    );
}

export default Header;