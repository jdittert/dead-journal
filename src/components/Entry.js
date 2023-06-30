/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import '../styles/entry.css'
import heart from '../assets/imgs/favorite-heart.svg'
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, arrayUnion, Timestamp, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Comment from './Comment';
import { useInfo } from '../contexts/InfoContext';

export default function Entry(props) {
    const { entry } = props
    const { currentUser } = useAuth()
    const { userInfo } = useInfo()
    const commentRef = useRef()
    const [entryUser, setEntryUser] = useState('Anonymous')
    const [message, setMessage] = useState('')
    
    async function handleFavorite(e) {
        e.preventDefault();
        const {id} = e.target.dataset

        const currentEntry = doc(db, 'entries', id)

        await updateDoc(currentEntry, {
            likes: arrayUnion(currentUser.uid)
        })

    }

    function toggleComments(e) {
        e.preventDefault()
        const {id} = e.target.dataset
        if (entry.comments.length > 0 ) document.getElementById(`comments-${id}`).classList.toggle('hidden')
    }

    function leaveComment(e) {
        e.preventDefault()
        const {id} = e.target.dataset
        document.getElementById(`leave-comment-${id}`).classList.remove('hidden')
    }

    async function handleComment(e) {
        e.preventDefault()
        const {id} = e.target.dataset

        const currentEntry = doc(db, 'entries', id)

        await updateDoc(currentEntry, {
            comments: arrayUnion({
            user: currentUser.uid,
            username: userInfo.username,
            timestamp: Timestamp.now(),
            comment: commentRef.current.value
            })
            
        })
        e.target.reset()
        document.getElementById(`leave-comment-${id}`).classList.add('hidden')

    }

    function cancelComment(e) {
        e.preventDefault();
        const {id} = e.target.dataset
        document.getElementById(`leave-comment-${id}`).classList.add('hidden')
    }

    async function handleDelete(e) {
        e.preventDefault()
        const {id} = e.target.dataset

        await deleteDoc(doc(db, 'entries', id))
        setMessage('Entry deleted.')
    }

    useEffect(() => {
        async function getEntryUser() {
            try{
                const person = await getDoc(doc(db, 'users', entry.user))
                const personName = person.data().username
                setEntryUser(personName)
            } catch {
                setEntryUser('Anonymous')
            }            
        }

        getEntryUser()

    })

    return (
        <>
        {message && <div className='error-message'>{message}</div>}
        <div className='entry' data-id={entry.id} key={entry.id}>
            <div className='entry-heading'>
                <div className='entry-title'>{entry.title}</div>
                <div className='entry-user'>
                    <div className='entry-username'>{entryUser}</div>
                    <div className='entry-profile-pic'></div>
                </div>
            </div>
            <div className='entry-date'>{entry.timestamp.toDate().toDateString()}</div>
            <div className='entry-entry'>{entry.entry}</div>
            <div className='entry-details'>
                {entry.mood && <div className='entry-mood'><strong>Mood:</strong> {entry.mood}</div>}                
                {entry.location && <div className='entry-location'><strong>Location:</strong> {entry.location}</div>}
                {entry.music && <div className='entry-music'><strong>Music:</strong> {entry.music}</div>}
            </div>
            <div className='comment-bar'>
                <div className='comment-bar-left'>
                    <div className='favorite-info'>
                        <div>{entry.likes.length}</div>
                        <div className='favorite-image'>
                            <button className='favorite-button' onClick={handleFavorite} data-id={entry.id} disabled={!currentUser}>
                                <img src={heart} alt='Like' className='favorite' data-id={entry.id} />
                            </button>
                        </div>
                    </div>
                    <div className='blue'>|</div>
                    <div><button className='favorite-button' onClick={toggleComments} data-id={entry.id}>
                        {entry.comments.length} {entry.comments.length === 1 ? 'Comment' : 'Comments'}
                        </button>
                    </div>
                    <div className='blue'>|</div>
                    <div><button className='favorite-button' onClick={leaveComment} data-id={entry.id} disabled={!currentUser}>Leave a Comment</button></div>
                </div>
                <div className='comment-bar-right'>
                    {currentUser.uid === entry.user ? 
                    <button className='cancel' data-id={entry.id} onClick={handleDelete}>Delete Entry</button> :
                    <></>}
                    
                </div>
            </div>
            <div id={`comments-${entry.id}`} className='hidden comment-section'>
                {entry.comments.map((comment) => {
                    return (
                        <Comment comment={comment} index={entry.comments.indexOf(comment)} />
                    )
                }
                )}
            </div>
            <div className='leave-comment hidden' id={`leave-comment-${entry.id}`}>
                <div className='comment-form'>
                    <form id='leave-comment-form' data-id={entry.id} onSubmit={handleComment}>
                        <label htmlFor='new-comment'><strong>Leave a comment:</strong></label>
                        <textarea id='new-comment' name='new-comment' ref={commentRef} rows='5' />                        
                        <div className='comment-buttons'>
                            <button type='submit' className='comment-button'>Submit</button>
                            <button className='cancel' onClick={cancelComment} data-id={entry.id}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        </>
    )
}