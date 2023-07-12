import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, getDocs } from 'firebase/firestore';
import Entry from './Entry';
import { useParams } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

export default function UserEntries() {
    const { user } = useParams()
    const [error, setError] = useState('')
    const [entries, setEntries] = useState([])

    function resetError(e) {
        e.preventDefault()
        setError('')
    }
    
    async function getUser() {
        const u = query(collection(db, 'users'), where('username', '==', user))
        const uSnap = await getDocs(u)
        let userID
        uSnap.forEach((doc) => {
            userID = doc.id
        })  

        return userID
    }  
    
    useEffect(() => {
        setError('')

        const q = async () => query(collection(db, 'entries'), where('user', '==', await getUser()), orderBy('timestamp', 'desc'))
    
        const unsubscribe = async () => onSnapshot(await q(), (querySnapshot) => {
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
            <div className='page-title'>{user}'s Entries</div>
            {error && <ErrorMessage error={error} resetError={resetError} />}
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