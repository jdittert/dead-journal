import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useInfo } from '../contexts/InfoContext'
import { db } from '../firebase'
import { doc, updateDoc, arrayUnion, collection, query, where, getDocs, arrayRemove } from 'firebase/firestore'

export default function ProfileTemplate(props) {
    const { userProfile } = props
    const { currentUser } = useAuth()
    const { userInfo } = useInfo()

    async function handleFollow(e) {
        e.preventDefault()

        const followee = []

        const { username } = e.target.dataset
        console.log(userInfo.username, ' follows ', username)

        const follower = doc(db, 'users', currentUser.uid)

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            followee.push(doc.id)
        })

        await updateDoc(follower, {
            follows: arrayUnion(followee[0])
        })
    }

    async function handleUnfollow(e) {
        e.preventDefault()

        const followee = []

        const { username } = e.target.dataset
        console.log(userInfo.username, ' follows ', username)

        const follower = doc(db, 'users', currentUser.uid)

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            followee.push(doc.id)
        })

        await updateDoc(follower, {
            follows: arrayRemove(followee[0])
        })
    }

    return (
            <>
            <div className='profile-header'>
                <h1>{userProfile.username ? userProfile.username : userProfile.email}'s Profile</h1>
            </div>
            <div className='profile-info'>
                <div className='profile-field'>
                    <div>Username:</div>
                    <div>{userProfile.username}</div>
                </div>
                <div className='profile-field'>
                    <div>Birthday:</div>
                    <div>{userProfile.birthday ? userProfile.birthday : ''}</div>
                </div>
                <div className='profile-field'>
                    <div>Location:</div>
                    <div>{userProfile.location ? userProfile.location : ''}</div>
                </div>
                <div className='profile-field'>
                    <div>Education:</div>
                    <div>{userProfile.education ? userProfile.education : ''}</div>
                </div>
                <div className='profile-field'>
                    <div>Hobbies:</div>
                    <div>{userProfile.hobbies ? userProfile.hobbies : ''}</div>
                </div>
                <div className='profile-field'>
                    <div>Follows:</div>
                    <div>{userProfile.follows ? userProfile.follows : 'This user does not currently follow anyone.'}</div>
                </div>
            </div>
            <div className='follow-buttons'>
                {currentUser &&
                <div>
                    <button className='signup-button' data-username={userProfile.username} onClick={handleFollow}>Follow {userProfile.username}</button>
                </div>}
                {currentUser &&
                <div>
                    <button className='signup-button' data-username={userProfile.username} onClick={handleUnfollow}>Unfollow {userProfile.username}</button>
                </div>}
            </div>
            </>
    )
}

