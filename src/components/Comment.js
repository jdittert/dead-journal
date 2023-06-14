import React from 'react';

export default function Comment(props) {
    const {comment} = props
    const {index} = props

    return (
        <div className='comment' key={index}>
            <div><strong>{comment.user}</strong></div>
            <div className='comment-time'>{comment.timestamp.toDate().toDateString()}</div>
            <div className='comment-content'>{comment.comment}</div>
            
        </div>
    )
}