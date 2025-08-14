import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <input className="form-control mb-2" placeholder="Email" />
      <input className="form-control mb-2" placeholder="Password" type="password" />
      <button className="btn btn-success" onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;

