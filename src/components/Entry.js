import React, { useRef } from 'react';
import '../styles/entry.css'
import heart from '../assets/imgs/favorite-heart.svg'
import { useAuth } from '../contexts/AuthContext';
import { addDoc, doc, updateDoc, arrayUnion, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function Entry(props) {
    const {entry} = props
    const { currentUser } = useAuth()
    const commentRef = useRef()

    async function handleFavorite(e) {
        e.preventDefault();
        const {id} = e.target.dataset

        const currentEntry = doc(db, 'entries', id)

        await updateDoc(currentEntry, {
            likes: arrayUnion(currentUser.email)
        })

    }

    function leaveComment(e) {
        e.preventDefault()
        const {id} = e.target.dataset
        document.getElementById(`leave-comment-${id}`).classList.remove('hidden')
    }

    async function handleComment(e) {
        e.preventDefault()
        const {id} = e.target.dataset

        await addDoc(collection(db, 'entries', id, 'comments'), {
            user: currentUser.email,
            timestamp: serverTimestamp(),
            comment: commentRef.current.value
        })
        e.target.reset()
        document.getElementById(`leave-comment-${id}`).classList.add('hidden')

    }

    function cancelComment(e) {
        e.preventDefault();
        const {id} = e.target.dataset
        document.getElementById(`leave-comment-${id}`).classList.add('hidden')
    }

    return (
        <div className='entry' key={entry.id}>
            <div className='entry-title'>{entry.title}</div>
            <div className='entry-date'>{entry.timestamp.toDate().toDateString()}</div>
            <div className='entry-entry'>{entry.entry}</div>
            <div className='entry-details'>
                {entry.mood && <div className='entry-mood'><strong>Mood:</strong> {entry.mood}</div>}                
                {entry.location && <div className='entry-location'><strong>Location:</strong> {entry.location}</div>}
                {entry.music && <div className='entry-music'><strong>Music:</strong> {entry.music}</div>}
            </div>
            <div className='comment-bar'>
                <div className='favorite-info'>
                    <div>{entry.likes.length}</div>
                    <div className='favorite-image'>
                        <button className='favorite-button' onClick={handleFavorite} data-id={entry.id}>
                            <img src={heart} alt='Like' className='favorite' data-id={entry.id} />
                        </button>
                    </div>
                </div>
                <div className='blue'>|</div>
                <div>0 Comments</div>
                <div className='blue'>|</div>
                <div><button className='favorite-button' onClick={leaveComment} data-id={entry.id}>Leave a Comment</button></div>
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
    )
}