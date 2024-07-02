import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import NavBar from '../components/NavBar';
import { useNavigate } from "react-router-dom"; // Importing useNavigate

const Signup = () => {
  // State for email
  const [email, setEmail] = useState('');
  
  // State for password
  const [password, setPassword] = useState('');
  
  // Destructuring signup, error, and isLoading from useSignup hook
  const { signup, error, isLoading } = useSignup();
  
  // Initialize navigate function for navigation
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    
    // Try to signup with provided email and password
    await signup(email, password);
    
    // Navigate to login page upon successful signup
    navigate('/appointments');
  };

  return (
    <>
      <NavBar />
      <div className='login-page'>
        {/* Form submission handled by handleSubmit */}
        <form className='login' onSubmit={handleSubmit}>
          <div>
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input
              type="email"
              
              // Update email state on change
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>Password:</label>
            <input
              type="password"
              
              // Update password state on change
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {/* Disable button if loading */}
            <button disabled={isLoading}>Sign Up</button>
            {error && <div>{error}</div>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
