/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../styles/profile.css'


export default function Profile() {
    const { currentUser } = useAuth()
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        async function checkForProfile() {
            const docRef = doc(db, 'users', currentUser.uid)
            const docSnap = await getDoc(docRef)
    
            if (docSnap.exists()) {
                setUserInfo(docSnap.data())
            } else {
                await setDoc(doc(db, 'users', currentUser.uid), {
                    username: currentUser.displayName,
                    birthday: '',
                    education: '',
                    hobbies: '',
                    location: '',
                    email: currentUser.email
                })
            }
        }

        checkForProfile()  

    }, [])
      

    return  (
        <div className='profile-wrapper'>            
            <h1>{userInfo.username ? userInfo.username : currentUser.email}'s Profile</h1>
            <div className='profile-info'>
                <div className='profile-field'>
                    <div>Username:</div>
                    <div>{userInfo.username ? userInfo.username : ''}</div>
                </div>
                <div className='profile-field'>
                    <div>Birthday:</div>
                    <div>{userInfo.birthday ? userInfo.birthday : ''}</div>
                </div>
                <div className='profile-field'>
                    <div>Location:</div>
                    <div>{userInfo.location ? userInfo.location : ''}</div>
                </div>
                <div className='profile-field'>
                    <div>Education:</div>
                    <div>{userInfo.education ? userInfo.education : ''}</div>
                </div>
                <div className='profile-field'>
                    <div>Hobbies:</div>
                    <div>{userInfo.hobbies ? userInfo.hobbies : ''}</div>
                </div>
                <div className='profile-field'>
                    <div>Follows:</div>
                    <div>testfriend1, otherfriend2, totallyrealperson</div>
                </div>
            </div>
            <Link to='/update-profile'>
                <button className='signup-button'>Update Profile</button>
            </Link>
        </div>
    )
}