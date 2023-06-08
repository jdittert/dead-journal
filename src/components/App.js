import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import Splash from './Splash';
import Header from './Header';
import '../styles/app.css'
 
 function App() {  
    return (
        <AuthProvider>
            <Header />        
            <Splash />
        </AuthProvider>        
    )
}

export default App;
