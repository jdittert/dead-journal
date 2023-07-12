import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Message from './Message';
import '../styles/new-entry.css'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ErrorMessage from './ErrorMessage';

export default function NewEntry() {
    const moodRef = useRef()
    const locationRef = useRef()
    const musicRef = useRef()
    const titleRef = useRef()
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())  
    const [convertedContent, setConvertedContent] = useState(null)  

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent())
        setConvertedContent(html)
    }, [editorState])

    function resetError(e) {
        e.preventDefault()
        setError('')
    }

    function resetMessage(e) {
        e.preventDefault()
        setMessage('')
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await addDoc(collection(db, 'entries'), {
                user: currentUser.uid,
                mood: moodRef.current.value,
                location: locationRef.current.value,
                music: musicRef.current.value,
                entry: createMarkup(convertedContent),
                title: titleRef.current.value, 
                timestamp: Timestamp.now(),
                likes: [], 
                comments: []
            }) 
            e.target.reset();
            setMessage('Entry added.')
            setEditorState(() => EditorState.createEmpty())
        } catch {
            setError('Failed to log entry.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <div className='main-wrapper'>            
            <div className='entry-form'>
                <div className='new-entry-heading'>
                    <h1>New Entry</h1>
                    {message && <Message message={message} resetMessage={resetMessage} />}
                    {error && <ErrorMessage error={error} resetError={resetError} />}
                </div>
                <form id='new-entry-form' onSubmit={handleSubmit}>
                    <div className='signup-inputs'>
                        <div className='input-group'>
                            <label htmlFor='new-entry-title'>Title:</label>
                            <input type='text' ref={titleRef} required />
                        </div>
                        <label htmlFor='new-entry-entry'>Entry:</label>
                        <Editor editorState={editorState}
                            onEditorStateChange={setEditorState}
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker']
                            }}
                            />
                        <div className='new-entry-input-group'>
                            <div className='input-group new-entry-mood'>
                                <label htmlFor='new-entry-mood'>Mood:</label>
                                <input type='text' ref={moodRef} />
                            </div>
                            <div className='input-group'>
                                <label htmlFor='new-entry-music'>Music:</label>
                                <input type='text' ref={musicRef} />
                            </div>
                        </div>
                        <div className='input-group'>
                            <label htmlFor='new-entry-location'>Location:</label>
                            <input type='text' ref={locationRef} />
                        </div>
                                                
                    </div>
                <button type='submit' disabled={loading} className='signup-button new-entry-submit'>Post Entry</button>
                </form>
            </div>
        </div>        
        </>
    )
}