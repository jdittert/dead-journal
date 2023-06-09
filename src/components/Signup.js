import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to create an account')
        } 

        setLoading(false)
    }
    
    return (
        <>
        <h1>Sign Up</h1>
        {error && <div>
            {error}</div>}
        {currentUser && currentUser.email}
        <form onSubmit={handleSubmit}
        className='signup-form'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={emailRef} required />
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={passwordRef} required autoComplete='off' />
            <label htmlFor='passwordConfirmation'>Password Confirmation</label>
            <input id='passwordConfirmation' type='password' ref={passwordConfirmRef} required autoComplete='off' />
            <button type='submit' disabled={loading}>Sign Up</button>
        </form>
        <div>Already have an account? <Link to='/login'><span className="blue">Log in.</span></Link></div>
        </>
    )
}