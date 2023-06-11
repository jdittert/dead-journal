import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to sign in.')
        } 

        setLoading(false)
    }
    
    return (
        <>
        <div className='splash-wrapper'>
            <div className='signup-form'>
                <h1 className='center-text'>Log In</h1>
                {error && <div className='error-message'>
                    {error}</div>}
                <form onSubmit={handleSubmit}
                className='signup-inputs'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' ref={emailRef} required />
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' ref={passwordRef} required autoComplete='off' />
                    <button type='submit' className='signup-button' disabled={loading}>Log In</button>
                </form>
                <div className='center-text'><Link to='/forgot-password'><span className='blue'>Forgot password?</span></Link></div>
                <div className='center-text'>Need an account? <Link to='/signup'><span className='blue'>Sign up.</span></Link></div>
            </div>
        </div>
        </>
    )
}