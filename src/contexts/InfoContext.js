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
            // const docRef = doc(db, 'users', currentUser.email)
    
        // async function getInfo() {
        //     const currentInfo = await getDoc(docRef)
        //     return setUserInfo(currentInfo.data())
        // }
      
        // getInfo()

        const unsubscribe = onSnapshot(doc(db, 'users', currentUser.email), (doc) => {
            setUserInfo(doc.data())
        })

        unsubscribe()
    } else {
        setUserInfo({})
    }
    }, [])  

    const value = {
        userInfo
    }

    return (
        <InfoContext.Provider value={value}>
            {children}
        </InfoContext.Provider>
    )
}