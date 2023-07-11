import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function RichTextEditor() {
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

    return (
        <div>
            <div>
                <Editor editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName='wrapper-class'
                editorClassName='editor-class'
                toolbarClassName='toolbar-class' />
            </div>
            <div
            className='preview'
            dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
        </div>
    )
}