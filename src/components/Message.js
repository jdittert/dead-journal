import React from 'react';

export default function Message(props) {
    const { message } = props
    const { resetMessage } = props

    return (
        <div className='success-message'>
            <div className='success-content'>
            {message}
            <button className='success-button' onClick={resetMessage}>X</button>
            </div>
        </div>
    )
}