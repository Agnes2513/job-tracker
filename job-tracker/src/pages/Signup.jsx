import React from 'react';
import {useNavigate,Link} from 'react-router-dom';

const Signup=()=>{
  const navigate=useNavigate();

  const handleSignup=()=>{
    navigate('/login');
  };

  return(
    <div className="container mt-5">
      <h2>Signup</h2>
      <input className="Form-controler mb-2" placeholder='email'/><br></br>
      <input type="password" className="Form-controler mb-2" placeholder='Password' /><br></br>
      <input type="password" className="Form-controler mb-2" placeholder='Confirm Password' /><br></br>

      <button className="btn btn-success mt-3" onClick={handleSignup}>Signup</button>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>

    </div>
  );
};
 
export default Signup; 