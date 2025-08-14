import React from "react";
import { useNavigate } from 'react-router-dom'

const Login=()=>{
  const navigate = useNavigate();

  const handleLogin=()=>{
    navigate('/dashboard');
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control mb-2" placeholder="Email" />
      <input type="password" className="form-control mb-2" placeholder="Password" />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;