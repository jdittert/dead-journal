import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Entries() {
    const { currentUser } = useAuth()

    return (
        <>
        <div>{currentUser.email}'s Entries</div>
        <div>Some entry thing here. </div>
        </>
    )
}