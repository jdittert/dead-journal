import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
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
        <div>
            {error && {error}}
        </div>
        <div>
            Hello, {currentUser && currentUser.email}!
        </div>
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
        </>
    )
}

export default Dashboard