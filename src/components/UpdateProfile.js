import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function UpdateProfile() {
    const { currentUser } = useAuth()
    
    return (
        <div className='profile-wrapper'>
            <h1>Update {currentUser.email}'s Profile</h1>
            <button className='profile-button'>Save Changes</button>
            <button className='cancel'>Cancel</button>
        </div>
    )
}
