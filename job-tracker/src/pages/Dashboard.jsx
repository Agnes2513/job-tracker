import React from 'react';
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
    const navigate=useNavigate();

   const handleDashboard=()=>{
    navigate('/profile');
   } ;

  return (
    <div>
      <h1>Dashboard</h1>
      <button className="btn btn-primary" onClick={handleDashboard}>Login</button>

    </div>
  );
};

export default Dashboard;