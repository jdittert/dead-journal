import React, { useRef, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import '../styles/find-friends.css'

export default function FindFriends() {
    
    const searchRef = useRef()
    const usersRef = collection(db, 'users')
    const [results, setResults] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function onSubmit(e) {
        e.preventDefault();
        try {
        setError('')
        setLoading(true)    
        const tempResults = []
        const q = query(usersRef, where('username', '==', searchRef.current.value))
        const qSnap = await getDocs(q)
        qSnap.forEach((doc) => {
            tempResults.push(doc.data())
        })
        if (tempResults.length === 1) setResults(tempResults)
        if (tempResults.length !== 1) setResults('No users found with that username.')
        } catch {
            setError('Unable to complete search.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='main-wrapper'>
            <div className='small-title'>
            DeadJournal is better with friends!
            </div>
            {error && <div className='error-message'>{error}</div>}
            <div className='search-section'>
                <form id='find-friends' onSubmit={onSubmit}>
                <label htmlFor='search-by-username'>Search by username:</label>
                <input type='text' id='search-by-username' ref={searchRef} />
                <div>
                <button disabled={loading} className='signup-button'>Search</button>
                </div>
                
                </form>                
            </div>
            {results && <>
            <div className='small-title'>Results:</div>
            <div className='results'>{results && results.length === 1 ? <Link to={{pathname: `/${results[0].username}/profile`}}>{results[0].username}</Link> :
            results}</div>
            </>
            }    
        </div>
    )
}