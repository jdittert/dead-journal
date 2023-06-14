import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/profile.css'


export default function Profile() {
    const { currentUser } = useAuth()

    return  (
        <div className='profile-wrapper'>            
            <h1>{currentUser.email}'s Profile</h1>
            <div className='profile-info'>
                <div className='profile-field'>
                    <div>Username:</div>
                    <div>testaccount</div>
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
            <Link to='/update-profile'>
                <button className='signup-button'>Update Profile</button>
            </Link>
        </div>
    )
}