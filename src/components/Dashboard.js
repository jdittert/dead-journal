import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../contexts/InfoContext';
import { updateEmail, updatePassword } from 'firebase/auth';
import '../styles/dashboard.css';
import Error from './Error';
import Message from './Message';

function Dashboard() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const { currentUser, logout } = useAuth()
    const { userInfo } = useInfo()
    const navigate = useNavigate()
    const emailRef = useRef()
    const confirmEmailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const creationDate =  new Date(Date.parse(currentUser.metadata.creationTime))
    const readDate = creationDate.toLocaleDateString(undefined, options)

    async function handleUpdateEmail(e) {
        e.preventDefault()
        setError('')

        if (emailRef.current.value !== confirmEmailRef.current.value) {
            return setError('Emails do not match.')
        }

        try {
            setLoading(true)

            await updateEmail(currentUser, emailRef.current.value)
            setMessage('Email updated.')
        } catch {
            setError('Failed to update information.')
        }

        setLoading(false)
    }

    async function handleUpdatePassword(e) {
        e.preventDefault()
        setError('')

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match.')
        }

        try {
            setLoading(true)

            await updatePassword(currentUser, passwordRef.current.value)
            setMessage('Password updated.')
        } catch {
            setError('Failed to update information.')
        }

        setLoading(false)
    }

    async function handleLogout(e) {
        e.preventDefault()
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out.')
        }
    }

    function resetError(e) {
        e.preventDefault()
        setError('')
    }

    function resetMessage(e) {
        e.preventDefault()
        setMessage('')
    }

    function toggleUpdate(e) {
        e.preventDefault()
        document.querySelector('.dashboard-update').classList.toggle('hidden')
    }

    return (
        <>        
        <div className='main-wrapper'>
            <div className='dashboard-header'>
                <div>Hello, {userInfo ? userInfo.username ? userInfo.username : currentUser.email : currentUser.email}! </div>
                <div>
                    <button onClick={handleLogout} className='signup-button'>Log Out</button>
                </div>
            </div>
            <div>
                You have been a DeadJournal user since {readDate}.
            </div>
            <div><button className='signup-button' onClick={toggleUpdate}>Update your email and/or password</button></div>
            <div className='dashboard-update hidden'>                
                <div><em>If it has been more than 5 minutes since your last login, you will need to logout and login again in order to update your information.</em></div>
                {error && <Error error={error} resetError={resetError} />}
                {message && <Message message={message} resetMessage={resetMessage} />}
                <div className='dashboard-update-forms'>
                    <div className='signup-form'>
                        <h3>Update your email address</h3>
                        <form onSubmit={handleUpdateEmail}
                        className='signup-inputs'>
                            <label htmlFor='email'>Email</label>
                            <input id='email' type='email' ref={emailRef} required />
                            <label htmlFor='confirmEmail'>Confirm new email</label>
                            <input id='confirmEmail' type='email' ref={confirmEmailRef} required />
                            <button type='submit' className='signup-button' disabled={loading} >Update email</button>
                        </form>
                    </div>
                    <div className='signup-form'>
                        <h3>Update your password</h3>
                        <form onSubmit={handleUpdatePassword}
                        className='signup-inputs'>
                            <label htmlFor='password'>New password</label>
                            <input id='password' type='password' ref={passwordRef} required />
                            <label htmlFor='confirmPassword'>Confirm new password</label>
                            <input id='confirmPassword' type='password' ref={confirmPasswordRef} required />
                            <button type='submit' className='signup-button' disabled={loading} >Update password</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default Dashboard