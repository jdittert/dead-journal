/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Comment(props) {
    const {comment} = props
    const {index} = props
    const [commentor, setCommentor] = useState('blah')
    
    useEffect(() => {
        async function getCommentor() {
            try{
                const person = await getDoc(doc(db, 'users', comment.user))
                const personName = person.data().username
                setCommentor(personName)
            } catch {
                setCommentor('Commentor')
            }            
        }

        getCommentor()

    }, [])
        
    
    

    // const ud = getUsername().then(value => {
    //     const data = value.username
    //     return data
    //     })
    
    // console.log(ud)
    
    return (
        <div className='comment' key={index}>
            <div><strong>{commentor}</strong></div>
            <div className='comment-time'>{comment.timestamp.toDate().toDateString()}</div>
            <div className='comment-content'>{comment.comment}</div>
            
        </div>
    )
}