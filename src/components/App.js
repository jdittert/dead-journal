import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Splash from './Splash'
import Header from './Header'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import Profile from './Profile'
import '../styles/app.css'
import Entries from './Entries'
import NewEntry from './NewEntry'
import Footer from './Footer'
 
 function App() {  
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className='page-wrapper'>
                    <Header />
                    <Routes>
                        <Route exact path='/' element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>} />
                            <Route path='/profile' element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>} />
                            <Route path='/entries' element={
                            <PrivateRoute>
                                <Entries />
                            </PrivateRoute>} />
                            <Route path='/new-entry' element={
                            <PrivateRoute>
                                <NewEntry />
                            </PrivateRoute>} />
                        <Route path='/signup' element={<Splash />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                    </Routes>
                    <Footer />
                </div>          
            </AuthProvider>  
        </BrowserRouter>              
    )
}

export default App;
