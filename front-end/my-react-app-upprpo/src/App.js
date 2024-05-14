import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes  } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AlienProfilePage from './pages/AlienProfilePage/AlienProfilePage';
import FriendRequestsPage from './pages/FriendRequestPage/FriendRequestsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<SearchPage />} /> {/* Домашняя страница с меню и приветствием */}
        <Route path="/" element={<RegistrationPage />} /> {}
        <Route path="/my-profile" element={<ProfilePage />} /> {}
        <Route path="/friend-requests" element={<FriendRequestsPage />} /> {}
        <Route path="/alien-profile/:id" element={<AlienProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;