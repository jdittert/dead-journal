import React, { useRef } from 'react';

export default function FindFriends() {
    
    const searchRef = useRef()

    function onSubmit(e) {
        e.preventDefault();
        console.log(searchRef.current.value)
    }
    return (
        <div className='main-wrapper'>
            <div>
            DeadJournal is better with friends!
            </div>
            <div className='search-section'>
                <form id='find-friends' onSubmit={onSubmit}>
                <label htmlFor='search-by-username'>Search by username:</label>
                <input type='text' id='search-by-username' ref={searchRef} />
                <button>Search</button>
                </form>                
            </div>
        </div>
    )
}