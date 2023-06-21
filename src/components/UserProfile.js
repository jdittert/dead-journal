/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { query, collection, where, getDocs } from 'firebase/firestore';
import '../styles/profile.css'
import ProfileTemplate from './ProfileTemplate';

export default function UserProfile() {
    const { user } = useParams()
    const [userProfile, setUserProfile] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const usersRef = collection(db, 'users')

    const q = query(usersRef, where('username', '==', user))

    useEffect(() => {
        async function getInfo() {
            setError('')
    
            try {  
                setLoading(true)      
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setUserProfile(doc.data())
                })         
            } catch {
                setError('Profile failed to load.')
            } finally {
                setLoading(false)
            }
        }

        getInfo()
    }, [])
    
    

    return  (
        <div className='profile-wrapper'>
            {error && <div className='error-message'>{error}</div>} 
            {loading ? <div>Loading</div> : 
            userProfile ? <ProfileTemplate userProfile={userProfile} /> :
            <div className='error-message'>Profile does not exist.</div>}                             
        </div>
    )
}