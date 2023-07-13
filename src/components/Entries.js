import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy} from 'firebase/firestore';
import Entry from './Entry';
import ErrorMessage from './ErrorMessage';
import { useInfo } from '../contexts/InfoContext';

export default function Entries() {
    const { currentUser } = useAuth()
    const { userInfo } = useInfo()
    const [error, setError] = useState('')
    const [entries, setEntries] = useState([])
    const q = query(collection(db, 'entries'), where('user', '==', currentUser.uid), orderBy('timestamp', 'desc'))
    
    function resetError(e) {
        e.preventDefault()
        setError('')
    }
    
    useEffect(() => {
        setError('')
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userEntries = [];
            querySnapshot.forEach((doc) => {
                userEntries.push({...doc.data(), id: doc.id})
            })
            setEntries(userEntries)
        })

        return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(!entries) setError('Entries failed to load.')

    return (
        <div className='main-wrapper'>
            <div className='page-title'>{userInfo.username ? userInfo.username : currentUser.email}'s Entries</div>
            {error && <ErrorMessage error={error} resetError={resetError} />}
            {entries.length === 0 ? 
            <div>This user has no public entries.</div> : 
            entries.map((entry) => {
                return (
                    <>
                        <Entry key={entry.id} entry={entry} />
                    </>
                )
            })
        }
        </div>
    )
}