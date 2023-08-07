import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Profile from './components/Profile.js';
import UserContext from './UserContext.js';
import TVSeriesFriends from './components/TVSeriesFriends.js';
import Nav from './components/Nav.js';
import UserProfile from './components/UserProfile.js'
import AuthPage from './components/AuthPage.js';
import Logout from './components/Logout.js';

function App() {
  const [user, setUser] = useState(null);

  // console.log('User => ', user)

  // console.log('LocalStorage=>', localStorage)

  useEffect(() => {
    if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  },[]);


  return (
    <UserContext.Provider value = {{user, setUser}}>
      <Nav/>
      <Routes>
        <Route path="/" element={user ? <Navigate replace to="/profile" /> : <AuthPage />} />
        {/* <Route path="/login" element={user ? <Navigate replace to="/profile" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate replace to="/profile" /> : <Register />} /> */}
        <Route path="/profile" element={user ? <Profile /> : <Navigate replace to="/" />} />
        <Route path="/tvseriesfriends" element={user ? <TVSeriesFriends /> : <Navigate replace to="/" />} />
        <Route path="/profile/:userId" element={user ? <UserProfile /> : <Navigate replace to="/" />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </UserContext.Provider>  
  );
}

export default App;
