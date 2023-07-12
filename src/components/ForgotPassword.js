import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Message from './Message';
import '../styles/signup.css'
import ErrorMessage from './ErrorMessage';

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    function resetError(e) {
        e.preventDefault()
        setError('')
    }

    function resetMessage(e) {
        e.preventDefault()
        setMessage('')
    }
    
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions.')
        } catch {
            setError('Failed to reset password.')
        } 

        setLoading(false)
    }
    
    return (
        <>
        <div className='splash-wrapper'>
            <div className='signup-form'>
                <h1 className='center-text'>Password Reset</h1>
                {error && <ErrorMessage error={error} resetError={resetError} />}
                {message && <Message message={message} resetMessage={resetMessage} />}
                <form onSubmit={handleSubmit}
                className='signup-inputs'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' ref={emailRef} required />
                    <button className='signup-button' type='submit' disabled={loading}>Reset Password</button>
                </form>
                <div className='center-text'><Link to='/login'><span className='blue'>Log in.</span></Link></div>
                <div className='center-text'>Need an account? <Link to='/signup'><span className='blue'>Sign up.</span></Link></div>
            </div>
        </div>
        </>
    )
}