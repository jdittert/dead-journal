import React from 'react';
import '../styles/entry.css'

export default function Entry(props) {
    const {entry} = props

    return (
        <div className='entry' key={entry.id}>
            <div className='entry-title'>{entry.title}</div>
            <div className='entry-date'>{entry.timestamp.toDate().toDateString()}</div>
            <div className='entry-entry'>{entry.entry}</div>
            <div className='entry-details'>
                <div className='entry-mood'><strong>Mood:</strong> {entry.mood}</div>
                <div className='entry-location'><strong>Location:</strong> {entry.location}</div>
                <div className='entry-music'><strong>Music:</strong> {entry.music}</div>
            </div>
            <div className='comment-bar'>
                <div>Like</div>
                <div className='blue'>|</div>
                <div>0 Comments</div>
                <div className='blue'>|</div>
                <div>Leave a Comment</div>
            </div>
        </div>
    )
}