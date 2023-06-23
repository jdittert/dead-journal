import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../contexts/InfoContext';

function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const { userInfo } = useInfo()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out.')
        }
    }

    return (
        <>
        <div className='main-wrapper'>
            <div>
                {error && {error}}
            </div>
            <div>
                Hello, {userInfo ? userInfo.username ? userInfo.username : currentUser.email : currentUser.email}! 
            </div>
            <div>
                <button onClick={handleLogout} className='signup-button'>Log Out</button>
            </div>
        </div>
        </>
    )
}

export default Dashboard