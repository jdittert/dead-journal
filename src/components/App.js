import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Splash from './Splash'
import Header from './Header'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import ForgotPassword from './ForgotPassword'
import Profile from './Profile'
import '../styles/app.css'
import Entries from './Entries'
import NewEntry from './NewEntry'
import Footer from './Footer'
import UpdateProfile from './UpdateProfile'
import { InfoProvider } from '../contexts/InfoContext'
import UserProfile from './UserProfile'
 
 function App() {  
    return (
        <BrowserRouter>
            <AuthProvider>
                <InfoProvider>
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
                            <Route path='/update-profile' element={
                            <PrivateRoute>
                                <UpdateProfile />
                            </PrivateRoute>} />
                            <Route path='/user/:user' element={<UserProfile />} />
                            <Route path='/entries' element={
                            <PrivateRoute>
                                <Entries />
                            </PrivateRoute>} />
                            <Route path='/new-entry' element={
                            <PrivateRoute>
                                <NewEntry />
                            </PrivateRoute>} />
                        
                        <Route path='/signup' element={
                        <PublicRoute>
                            <Splash />
                        </PublicRoute>} />
                        <Route path='/login' element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>} />
                        <Route path='/forgot-password' element={
                            <PublicRoute>
                                <ForgotPassword />
                            </PublicRoute>} />
                    </Routes>
                    <Footer />
                </div>
                </InfoProvider>       
            </AuthProvider>  
        </BrowserRouter>              
    )
}

export default App;
