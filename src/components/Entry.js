import React from 'react';
import '../styles/entry.css'
import heart from '../assets/imgs/favorite-heart.svg'
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

export default function Entry(props) {
    const {entry} = props
    const { currentUser } = useAuth()

    async function handleFavorite(e) {
        e.preventDefault();
        const {id} = e.target.dataset
        console.log(id)

        const currentEntry = doc(db, 'entries', id)

        await updateDoc(currentEntry, {
            likes: arrayUnion(currentUser.email)
        })

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
                <div>Leave a Comment</div>
            </div>
        </div>
    )
}