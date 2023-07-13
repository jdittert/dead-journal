import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import icon from '../assets/imgs/icons8-ghost-60.png'

export default function PageNotFound() {
    const { currentUser } = useAuth()

    return (
        <>
        <div className='main-wrapper'>
            <div className='not-found-header'>
            <img className='splash-icon' src={icon} alt='DeadJournal Icon' />
                <h2>The page you are looking for does not exist.</h2>
            </div>
            {currentUser ? <div></div>
             : 
             <div>
                <Link to='/login'>Log in</Link> or <Link to='/signup'>sign up.</Link>
            </div>}
        </div>
        </>
        
    )
}