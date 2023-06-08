import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import Splash from './Splash';
 
 function App() {  
    return (
        <AuthProvider>
        <div>
            <Splash />
        </div>
        </AuthProvider>        
    )
}

export default App;
