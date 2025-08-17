import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import JobForm from './components/JobForm';
import JobCard from './components/JobCard';
import { JobProvider } from './context/JobContext'; 


function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={< Login/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-job" element={<JobForm />} />
      <Route path="/job/:id" element={<JobCard />} />
    </Routes>
  );
}

export default App; 
