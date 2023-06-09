import React from 'react';
import '../styles/header.css'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Header() {
    const {currentUser} = useAuth()
    
    return (
        <>
        <div className='page-header'>
            <div className='header-left'>
                <div className='icon'>
                    <div className='blank-icon'></div>
                </div>
                <div className='site-title'>
                    DEADJOURNAL
                </div>
            </div>
            <div className='header-right'>
                <div>
                    <Link to='/login'>LOG IN</Link>
                </div>
                <div>
                    <Link to='/signup'>SIGN UP</Link>
                </div>
            </div>
        </div>
        <div className='header-bottom'>
            <div>{currentUser && currentUser.email}</div>
            {currentUser ? 
            <div>Profile</div> :
            <div></div>}
        </div>
        </>
    )
}

export default Header