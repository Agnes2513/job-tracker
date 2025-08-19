import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../helper/supabaseClient';

function Signup(){ 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate(); 
  const handleSubmit = async (event) => { 
    event.preventDefault(); 
    setMessage(""); 
    if (password !== confirmPassword) { 
      setMessage("Passwords do not match");
       return; }
       const { data, error } = await supabase.auth.signUp({ email, password, }); 
       if (error) { setMessage(error.message); return;
       } 
       if (data.user) { 
        setMessage("User account created!"); 
        navigate("/profile"); // 👈 redirect to profile creation 
      }
      setEmail("");
       setPassword(""); 
       etConfirmPassword(""); 
      }; 
      return ( 
      <div className="container mt-5"> 
      <h2>Signup</h2> 
      {message && <div className="alert alert-info">{message}</div>}
       <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}placeholder="Email" required /> <input className="form-control mb-2" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
       <input className="form-control mb-2" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
       <button className="btn btn-success mt-3" type="submit">Signup</button> 
       </form> <p className="mt-3"> Already have an account? 
       <Link to="/login">Login</Link> </p> </div> ); 
       }
       export default Signup;