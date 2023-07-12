import React from 'react';

export default function ErrorMessage(props) {
    const { error } = props
    const { resetError } = props

    return (
        <div className='error-message'>
            <div className='error-content'>
            {error}
            <button className='error-button' onClick={resetError}>X</button>
            </div>
        </div>
    )
}