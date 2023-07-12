import React from 'react';
import '../styles/header.css'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../assets/imgs/icons8-ghost-60.png'
import { useInfo } from '../contexts/InfoContext';

function Header() {
    const {currentUser, logout} = useAuth()
    const { userInfo } = useInfo()
    const navigate = useNavigate()

    async function HeaderLogOut(e) {
        e.preventDefault()
        await logout()
        navigate('/login')
    }
        
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
                    Hello, {userInfo ? userInfo.username ? userInfo.username : currentUser.email : currentUser.email}
                </div>
                <div>
                    <button className='link-button' onClick={HeaderLogOut}>LOG OUT</button>
                </div>
                </> :
                <>
                <div id='header-login'>
                    <Link to='/login' className='link-white'>LOG IN</Link>
                </div>
                <div id='header-signup'>
                    <Link to='/signup' className='link-white'>SIGN UP</Link>
                </div>
                </>
                }
            </div>
        </div>
        <div className='header-bottom'>
            {currentUser ? 
            <>
            <div><Link to='/' className='link-white'>Dashboard</Link></div>
            <div><Link to='/profile' className='link-white'>Profile</Link></div>
            <div><Link to='/entries' className='link-white'>Entries</Link></div>
            <div><Link to='/new-entry' className='link-white'>New Entry</Link></div>
            <div><Link to='friends' className='link-white'>Friends</Link></div>
            <div><Link to='/find-friends' className='link-white'>Find Friends</Link></div>
            </> :
            <div></div>}
        </div>
        </div>
    )
}

export default Header