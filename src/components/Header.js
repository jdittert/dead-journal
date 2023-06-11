import React from 'react';
import '../styles/header.css'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import icon from '../assets/imgs/icons8-ghost-60.png'

function Header() {
    const {currentUser, logout} = useAuth()
    
    return (
        <div>
        <div className='page-header'>
            <div className='header-left'>
                <div className='icon'>
                    <img src={icon} alt='DJ Icon' className='icon'/>
                </div>
                <div className='site-title'>
                    DEADJOURNAL
                </div>
            </div>            
            <div className='header-right'>
                {currentUser ?
                <>
                <div id='header-user'>
                    Hello, {currentUser.email}!
                </div>
                <div>
                    <button className='link-button' onClick={logout}>LOG OUT</button>
                </div>
                </> :
                <>
                <div id='header-login'>
                    <Link to='/login'>LOG IN</Link>
                </div>
                <div id='header-signup'>
                    <Link to='/signup'>SIGN UP</Link>
                </div>
                </>
                }
            </div>
        </div>
        <div className='header-bottom'>
            {currentUser ? 
            <>
            <div><Link to='/'>Dashboard</Link></div>
            <div><Link to='/profile'>Profile</Link></div>
            <div><Link to='/entries'>Entries</Link></div>
            <div><Link to='/new-entry'>New Entry</Link></div>
            <div>Friends</div>
            </> :
            <div></div>}
        </div>
        </div>
    )
}

export default Header