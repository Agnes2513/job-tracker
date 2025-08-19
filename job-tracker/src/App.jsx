import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import JobForm from './components/JobForm';
import Wrapper from './pages/Wrapper';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<><Wrapper><Dashboard /></Wrapper></>} />
      <Route path="/profile" element={<Wrapper><Profile /></Wrapper>} />
      <Route path="/add-job" element={<Wrapper><JobForm /></Wrapper>} />
    </Routes>
  );
}

export default App; 

