import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    // const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
    // const [isVisible, setIsVisible] = useState(true);

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
                {/* <Link to='.' className={`link ${isVisible ? 'show' : 'hide'}`}>
                    Posts
                </Link>
                <Link to='/users' className={`link ${isVisible ? 'show' : 'hide'}`}>
                    Users
                </Link> */}
            </div>
        </div>
    );
}

export default Header;