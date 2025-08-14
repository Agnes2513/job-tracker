import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import Login from './pages/Login';
import JobCard from './components/JobCard';
import { JobContext } from './context/JobContext';


import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobForm from './components/JobForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add-job" element={<JobForm />} />
      <Route path="/job/:id" element={<JobCard />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
