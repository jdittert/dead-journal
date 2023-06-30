/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useInfo } from '../contexts/InfoContext';
import '../styles/profile.css';

export default function UpdateProfile() {
    const { currentUser } = useAuth()
    const { userInfo } = useInfo()
    const birthdayRef = useRef()
    const locationRef = useRef()
    const hobbiesRef = useRef()
    const educationRef = useRef()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const userRef = doc(db, 'users', currentUser.uid)
    
    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')       

        try {
            await updateDoc(userRef, {
                birthday: birthdayRef.current.value,
                location: locationRef.current.value,
                education: educationRef.current.value,
                hobbies: hobbiesRef.current.value
            })
            
            setMessage('Profile updated.')
        } catch {
            setError('Profile failed to update.')
        } finally {
            setLoading(false)
        }

    }
    
    return (
        <div className='profile-wrapper'>
            <div className='update-form'>
                <div className='update-heading'>
                    <h1>Update Profile</h1>
                    {message && <div className='success-message'>{message}</div>}
                    {error && <div className='error-message'>{error}</div>}
                </div>
                <form id='update-profile-form' onSubmit={handleSubmit}>
                    <div className='profile-field'>
                        <label htmlFor='username'><strong>Username: </strong></label>
                        <div>
                        {userInfo.username && userInfo.username}
                        </div>
                    </div>
                    <div className='profile-field'>
                        <label htmlFor='location'><strong>Location: </strong></label>
                        <input id='location' ref={locationRef} defaultValue={userInfo.location && userInfo.location} type='text' />
                    </div>
                    <div className='profile-field'>
                        <label htmlFor='birthday'><strong>Birthday: </strong></label>
                        <input id='birthday' ref={birthdayRef} defaultValue={userInfo.birthday && userInfo.birthday} type='text' />
                    </div>
                    <div className='profile-field'>
                        <label htmlFor='education'><strong>Education: </strong></label>
                        <textarea id='education' ref={educationRef} defaultValue={userInfo.education && userInfo.education} rows='3' />
                    </div>
                    <div className='profile-field'>
                        <label htmlFor='hobbies'><strong>Hobbies: </strong></label>
                        <textarea id='hobbies' ref={hobbiesRef} defaultValue={userInfo.hobbies && userInfo.hobbies} rows='3' />
                    </div>
                    <div className='comment-buttons'>
                    <button className='signup-button' type='submit' disabled={loading} >Save Changes</button>
                    <Link to='/profile'>
                        <button className='cancel'>Cancel</button>
                    </Link>                  
                    </div>                    
                </form>             
            </div>
        </div>
    )
}
