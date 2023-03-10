import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../utils/AuthContext'

function Header() {
    const {isUser} = useContext(AuthContext);
    console.log('header isUser', isUser);

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if(isUser) {
            setIsVisible(!isVisible);
        }
    }, [isUser]);

    return (
        <div className='header'>
            <span className='header-title'>Blog</span>
            <div>
                <Link to='.' className={`link ${isVisible ? 'hide' : 'show'}`}>
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