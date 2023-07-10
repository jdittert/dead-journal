/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useInfo } from '../contexts/InfoContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot} from 'firebase/firestore';
import Entry from './Entry';
import Error from './Error';

export default function Friends() {
    const { userInfo } = useInfo()
    const [error, setError] = useState('')
    const [entries, setEntries] = useState([])
    const entriesRef = collection(db, 'entries')  

    function resetError(e) {
        e.preventDefault()
        setError('')
    }
    
    useEffect(() => {
        setError('')
        if (userInfo.follows) {
            const q = query(entriesRef, where('user', 'in', userInfo.follows), orderBy('timestamp', 'desc'))

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tempEntries = []
                querySnapshot.forEach((doc) => {
                    tempEntries.push({...doc.data(), id: doc.id})
                })
                setEntries(tempEntries)
            })        
    
            return () => unsubscribe()
        }         

    }, [userInfo])

    if(!entries) setError('Entries failed to load.')

    return (
        <div className='main-wrapper'>
            {error && <Error error={error} resetError={resetError} />}
            <div className='small-title'>{userInfo.username}'s Friends' Entries:</div>
            {entries.length === 0 ? 
            <div>This user has no friend entries.</div> : 
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