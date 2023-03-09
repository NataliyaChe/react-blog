import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {HeaderContext} from '../utils/HeaderContext'

function Header() {

    const isVisible = useContext(HeaderContext);
    // const isVisible = useHeader()

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
                <Link to='.' className={`link ${isVisible ? 'show' : 'hide'}`}>
                    Posts
                </Link>
                <Link to='/users' className={`link ${isVisible ? 'hide' : 'show'}`}>
                    Users
                </Link>
            </div>
        </div>
    );
}

export default Header;