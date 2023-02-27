import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <div className='header'>
            <Link to='.' className="link">
                Main
            </Link>
            <Link to='/registration' className="link">
                Registration
            </Link>
            <Link to='/login' className="link">
                Login
            </Link>
        </div>
    );
}

export default Header;