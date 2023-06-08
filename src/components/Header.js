import React from 'react';
import '../styles/header.css'
import { useAuth } from '../contexts/AuthContext';

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
                <div>LOG IN</div>
                <div>SIGN UP</div>
            </div>
        </div>
        <div className='header-bottom'>
            {currentUser && currentUser.email}
        </div>
        </>
    )
}

export default Header