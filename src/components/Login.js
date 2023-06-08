import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/signup.css'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value) 
        } catch {
            setError('Failed to create an account')
        } 

        setLoading(false)
    }
    
    return (
        <>
        <h1>Log In</h1>
        {error && <div>
            {error}</div>}
        {currentUser.email}
        <form onSubmit={handleSubmit}
        className='signup-form'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={emailRef} required />
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={passwordRef} required autoComplete='off' />
            <button type='submit' disabled={loading}>Log In</button>
        </form>
        <div>Need an account? <Link to='/signup'>Sign up.</Link></div>
        </>
    )
}