import React from 'react';
import Signup from './Signup';
import '../styles/splash.css'

function Splash() {
    return (
        <>
        <div className='splash-wrapper'>
            <div className='left-splash'>
            </div>
            <div>
                <Signup />
            </div>
        </div>
        
        </>
    )
}

export default Splash