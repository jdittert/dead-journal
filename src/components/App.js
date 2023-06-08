import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Splash from './Splash'
import Header from './Header'
import Dashboard from './Dashboard'
import Login from './Login'
import '../styles/app.css'
 
 function App() {  
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route path='/signup' element={<Splash />} />
                    <Route path='/login' element={<Login />} />
                </Routes>              
            </AuthProvider>  
        </BrowserRouter>              
    )
}

export default App;
