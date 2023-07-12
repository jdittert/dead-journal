import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/signup.css'
import ErrorMessage from './ErrorMessage';

export default function Signup() {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function resetError(e) {
        e.preventDefault()
        setError('')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const username = usernameRef.current.value.replace(/[\W]/gm,'').toLowerCase()

        

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            const docRef = doc(db, 'users', 'unique-names')         
            const docSnap = await getDoc(docRef)
            const usernames = docSnap.data().usernames
            if (usernames.includes(username)) throw new Error('Username already taken.')
            const cred = await signup(emailRef.current.value, passwordRef.current.value)
            await setDoc((doc(db, 'users', cred.user.uid)), {
                username: username,
                email: cred.user.email
            })
            await updateDoc((doc(db, 'users', 'unique-names')), {
                usernames: arrayUnion(username)
            })
            navigate('/')
        } catch(err) {
            if (err) {
                setError(err.message)
            } else {
                setError('Failed to create an account.')
            }
            
            }
        
            // await updateDoc(docRef, {
            //     usernames: arrayUnion(username)
            // })
            

        setLoading(false)
    }
    
    return (
        <>
        <div className='signup-form'>
            <h1 className='center-text'>Sign Up</h1>
            {error && <ErrorMessage error={error} resetError={resetError} />}
            {currentUser && currentUser.email}
            <form onSubmit={handleSubmit}
            className='signup-inputs'>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' ref={usernameRef} required />
                <label htmlFor='email'>Email</label>
                <input id='email' type='email' ref={emailRef} required />
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' ref={passwordRef} required autoComplete='off' />
                <label htmlFor='passwordConfirmation'>Password Confirmation</label>
                <input id='passwordConfirmation' type='password' ref={passwordConfirmRef} required autoComplete='off' />
                <button className='signup-button' type='submit' disabled={loading}>Sign Up</button>
            </form>
            <div className='center-text'>Already have an account? <Link to='/login'><span className="blue">Log in.</span></Link></div>
        </div>
        </>
    )
}