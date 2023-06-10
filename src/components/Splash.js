import React from 'react';
import Signup from './Signup';
import '../styles/splash.css'

function Splash() {
    return (
        <>
        <div className='splash-wrapper'>
            <div className='left-splash'>
                <h1>Welcome to <span className='brand-font'>DeadJournal!</span></h1>
                <div>
                    <p>Do you long for the time between MySpace and Facebook? Join us here on DeadJournal.</p>
                    <p>It's just like LiveJournal, but it hasn't been sold to a Russian company... yet.</p>
                    <p>DeadJournal is free and will continue to be forever - or at least until it's profitable enough to sell!</p>
                </div>
            </div>
            <div>
                <Signup />
            </div>
        </div>
        
        </>
    )
}

export default Splash