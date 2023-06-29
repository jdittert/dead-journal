/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect} from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const InfoContext = React.createContext()

export function useInfo() {
    return useContext(InfoContext)
}

export function InfoProvider({ children }) {
    const { currentUser } = useAuth()
    const [userInfo, setUserInfo] = useState({})  

    useEffect(() => {
        
        if (currentUser) {
            let usersRef = null
            usersRef = doc(db, 'users', currentUser.uid)

            const unsubscribe = onSnapshot((usersRef), (doc) => {
                if(doc.exists()) {
                    setUserInfo(doc.data())
                } else {
                    console.log('error')
                }
                }) 
            
               return () => unsubscribe()
        }      
    
    }, [currentUser])  

    const value = {
        userInfo
    }

    return (
        <InfoContext.Provider value={value}>
            {children}
        </InfoContext.Provider>
    )
}