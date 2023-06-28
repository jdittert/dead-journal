/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect} from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';

const InfoContext = React.createContext()

export function useInfo() {
    return useContext(InfoContext)
}

export function InfoProvider({ children }) {
    const { currentUser } = useAuth()
    const [userInfo, setUserInfo] = useState({})
    // let usersRef
    
    // if (currentUser) {
    //     usersRef = doc(db, 'users', currentUser.uid)
    // } 

    // useEffect(() => {
    //     // async function getInfo() {
    //     //     const docRef = doc(db, 'users', currentUser.uid)
    //     //     const currentInfo = await getDoc(docRef)
    //     //     return setUserInfo(currentInfo.data())
    //     // } 
        
    //     const unsubscribe = onSnapshot((usersRef), (doc) => {
    //         if(doc.exists()) {
    //             setUserInfo(doc.data())
    //         } else {
    //             console.log('error')
    //         }
    //         }) 
        
    //        return () => unsubscribe()
        
    
    // }, [currentUser])  

    const value = {
        userInfo
    }

    return (
        <InfoContext.Provider value={value}>
            {children}
        </InfoContext.Provider>
    )
}