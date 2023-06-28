/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
import { useInfo } from '../contexts/InfoContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy} from 'firebase/firestore';
import Entry from './Entry';

export default function Friends() {
    // const { currentUser } = useAuth()
    const { userInfo } = useInfo()
    const [error, setError] = useState('')
    const [entries, setEntries] = useState([])
    const entriesRef = collection(db, 'entries')

    const follows = userInfo.follows
    console.log(userInfo)
    const q = query(entriesRef, where('user', 'in', follows), orderBy('timestamp', 'desc'))   
    
    useEffect(() => {
        setError('')
        async function getEntries() {
            const querySnapshot = await getDocs(q)
            const tempEntries = []
            querySnapshot.forEach((doc) => {
                tempEntries.push({...doc.data(), id: doc.id})
            })
            setEntries(tempEntries)
        }

        return () => getEntries() 

    }, [])

    if(!entries) setError('Entries failed to load.')

    return (
        <div className='main-wrapper'>
            {error && <div className='error-message'>{error}</div>}
            <div className='small-title'>{userInfo.username}'s Friends' Entries:</div>
            {entries.length === 0 ? 
            <div>This user has no public entries.</div> : 
            entries.map((entry) => {
                return (
                    <>
                        <Entry entry={entry} />
                    </>
                )
            })
        }
            
        </div>
    )
}