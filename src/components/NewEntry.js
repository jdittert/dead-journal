import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/new-entry.css'

export default function NewEntry() {
    const moodRef = useRef()
    const locationRef = useRef()
    const musicRef = useRef()
    const entryRef = useRef()
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setLoading(true)
            setError('')
            console.log(`User: ${currentUser.email}, Mood: ${moodRef.current.value}, Loc: ${locationRef.current.value}, Music: ${musicRef.current.value}, Entry: ${entryRef.current.value}`)
            e.target.reset();
            setMessage('Entry added.')
        } catch {
            setError('Failed to log entry.')
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
        <div className='main-wrapper'>            
            <div className='entry-form'>
                <h1>New Entry</h1>
                {message && <div>{message}</div>}
                {error && <div>{error}</div>}
                <form id='new-entry-form' onSubmit={handleSubmit}>
                    <div className='signup-inputs'>
                        <label htmlFor='new-entry-mood'>Mood:</label>
                        <input type='text' ref={moodRef} />
                        <label htmlFor='new-entry-location'>Location:</label>
                        <input type='text' ref={locationRef} />
                        <label htmlFor='new-entry-music'>Music:</label>
                        <input type='text' ref={musicRef} />
                        <label htmlFor='new-entry-entry'>Entry:</label>
                        <textarea id='new-entry-entry' name='new-entry-entry' rows='20' ref={entryRef}/>
                    </div>
                <button type='submit' disabled={loading} className='signup-button'>Post Entry</button>
                </form>
                

            </div>
        </div>
        
        </>
    )
}