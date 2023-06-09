import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/signup.css'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

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
        <h1>Password Reset</h1>
        {error && <div>
            {error}</div>}
        {message && <div>
            {message}</div>}
        <form onSubmit={handleSubmit}
        className='signup-form'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={emailRef} required />            
            <button type='submit' disabled={loading}>Reset Password</button>
        </form>
        <div><Link to='/login'><span className='blue'>Log in.</span></Link></div>
        <div>Need an account? <Link to='/signup'><span className='blue'>Sign up.</span></Link></div>
        </>
    )
}