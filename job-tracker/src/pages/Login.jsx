import React from "react";
import { useState } from "react";
import { Link,useNavigate } from 'react-router-dom'
import supabase from '../helper/supabaseClient';

function Login(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      setMessage(error.message);
      setEmail("");
      setPassword("");
      return;
    }
    
    if (data) {
    navigate('/dashboard');
    return null;
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <br />
      {message && <div className="alert alert-info">{message}</div>}
      <br />
      <form onSubmit={handleSubmit}>
      <input 
      className="form-control mb-2" 
      placeholder="Email" 
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
      type="email"
      required
      />
      <br />
      
      <input 
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
      type="password" 
      required
      className="form-control mb-2" 
      placeholder="Password" />

      <button className="btn btn-primary" type="submit">Login</button>
    </form>
    <span>Don't have an account? <Link to="/signup">Signup</Link></span>
    </div>
  );
};

export default Login;