import React from 'react';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import supabase from '../helper/supabaseClient'; 



function Signup(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      confirmPassword: confirmPassword
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      setMessage("User account created!");
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return(
    <div className="container mt-5">
      <h2>Signup</h2>
      <br></br>
      {message && <div className="alert alert-info">{message}</div>}
      <br></br>
      <br></br>
    <form onSubmit={handleSubmit}>
      <input 
        className="Form-controler mb-2" 
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        type="email" 
        placeholder="Email"
        required
      />
      <br></br>
      <input 
        type="password" 
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        className="Form-controler mb-2" 
        placeholder='Password' 
        required
      />
      <br></br>
      <input 
        type="password"
        onChange={(e)=>setConfirmPassword(e.target.value)}
        value={confirmPassword} 
        className="Form-controler mb-2" 
        placeholder='Confirm Password' 
        required
      />
      <br></br>

      <button className="btn btn-success mt-3" type="submit">Signup</button>
    </form>
      <p className="mt-3">
       <span> Already have an account? <Link to="/login">Login</Link></span>
      </p>

    </div>
  );
};
 
export default Signup; 