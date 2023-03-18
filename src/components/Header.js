import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Header() {
    const { user } = useAuth();
   
    return (
        <div className='header'>
            <span className='header-title'>Blog</span>
            <div>
                <Link to='.' className={`link ${user ? 'show' : 'hide'}`}>
                    Posts
                </Link>
                <Link to='/Statistics' className={`link ${user ? 'show' : 'hide'}`}>
                    Statistics
                </Link>
            </div>
        </div>
    );
}

export default Header;