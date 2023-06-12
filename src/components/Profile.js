import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/profile.css'


export default function Profile() {
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function updateProfile() {
        setError('')
        setLoading(true)

        try {
            await setDoc(doc(db, 'users', currentUser.email), {
                email: currentUser.email,
                name: 'test2'
            })
        } catch {
            setError('Failed to create user.')
        } finally {
            setLoading(false)
        }
    }

    return  (
        <div className='profile-wrapper'>
            {error && <div className='error-message'>{error}</div>}
            
            <h1>{currentUser.email}'s Profile</h1>
            <div className='profile-info'>
                <div className='profile-field'>
                    <div>Username:</div>
                    <div>testaccount</div>
                </div>
                <div className='profile-field'>
                    <div>Email:</div>
                    <div>{currentUser.email}</div>
                </div>
                <div className='profile-field'>
                    <div>Birthday:</div>
                    <div>January 1, 1776</div>
                </div>
                <div className='profile-field'>
                    <div>Location:</div>
                    <div>Toronto, ON Canada</div>
                </div>
                <div className='profile-field'>
                    <div>Friends:</div>
                    <div>testfriend1, otherfriend2, totallyrealperson</div>
                </div>
            </div>
            <button className='signup-button' onClick={updateProfile} disabled={loading}>Update Profile</button>
        </div>
    )
}