import React from 'react'

export default function ProfileTemplate(props) {
    const { userProfile } = props

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
            </>
    )
}

