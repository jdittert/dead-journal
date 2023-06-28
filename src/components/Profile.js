/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useInfo } from '../contexts/InfoContext';
import '../styles/profile.css'
import { collection, query, where, documentId, onSnapshot} from 'firebase/firestore';
import { db } from '../firebase';


export default function Profile() {
    const { currentUser } = useAuth()
    const { userInfo } = useInfo()
    const [friends, setFriends] = useState()

    // const q = query(collection(db, 'users'), where(documentId(), 'in', userInfo.follows))
    
    // useEffect(() => {
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const tempFriends = []
    //         querySnapshot.forEach((doc) => {
    //             tempFriends.push(doc.data().username)
    //         })
    //         setFriends(tempFriends)
    //     })        

    //     return () => unsubscribe()

    // }, [])

    return  (
        <div className='profile-wrapper'>            
            <div className='profile-header'>
                <h1>{userInfo.username ? userInfo.username : currentUser.email}'s Profile</h1>
            </div>
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
                    <div>{friends ? friends : ''}</div>
                </div>
                <Link to='/update-profile'>
                    <button className='signup-button'>Update Profile</button>
                </Link>
            </div>
            
        </div>
    )
}