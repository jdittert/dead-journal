import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/signup.css'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

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
        {error && <div>
            {error}</div>}
        {currentUser && currentUser.email}
        <form onSubmit={handleSubmit}
        className='signup-form'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={emailRef} required />
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={passwordRef} required />
            <label htmlFor='passwordConfirmation'>Password Confirmation</label>
            <input id='passwordConfirmation' type='password' ref={passwordConfirmRef} required />
            <button type='submit' disabled={loading}>Sign Up</button>
        </form>
        </>
    )
}