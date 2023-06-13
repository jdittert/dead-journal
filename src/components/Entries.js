import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Entry from './Entry';

export default function Entries() {
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [entries, setEntries] = useState([])
    const q = query(collection(db, 'entries'), where('user', '==', currentUser.email))
    
    useEffect(() => {
        setError('')
        const getEntries = async () => {
            const userEntries = await getDocs(q)
            const firestormEntries = (userEntries.docs.map((doc) => ({...doc.data(), id: doc.id})))
            firestormEntries.sort(function(x, y) {
                return y.timestamp - x.timestamp
            })
            setEntries(firestormEntries)
        }

        getEntries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(!entries) setError('Entries failed to load.')

    return (
        <div className='main-wrapper'>
            <div className='page-title'>{currentUser.email}'s Entries</div>
            {error && <div className='error-message'>{error}</div>}
            {entries.map((entry) => {
                return (
                    <>
                        <Entry entry={entry} />
                    </>
                )
            })}
        </div>
    )
}