import React, { useState } from 'react'; 
// Importing useLogin custom hook
import { useLogin } from '../hooks/useLogin'; 
import { Link, useNavigate } from "react-router-dom"; 
import NavBar from '../components/NavBar'; 

const Login = () => {
  // State for email
  const [email, setEmail] = useState(''); 
  
  // State for password
  const [password, setPassword] = useState(''); 
  
  // Destructuring login, error, and isLoading from useLogin hook
  const { login, error, isLoading } = useLogin(); 
  
  // Initialize navigate function for navigation
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    
    // Prevent default form submission behavior
    e.preventDefault(); 
    try {
      await login(email, password); 
      // Navigate to appointments page upon successful login
      navigate('/appointments');
    } catch (error) {
      console.error('Failed to log in:', error); 
    }
  };

  return (
    <>
      <NavBar /> 
      <div className='login-page'>
        
        {/* Form submission handled by handleSubmit */}
        <form className="login" onSubmit={handleSubmit}> 
          <div>
            <h3>Login</h3>
            <label>Email : </label>
            <input
              type="email"
              
              // Update email state on change
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
            />
            <label>Password : </label>
            <input
              type="password"
              
              // Update password state on change
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
            />
            <button disabled={isLoading}>Login</button> 
            {error && <div>{error}</div>} 
            <br /><br />
            <Link to='/signup'>Signup here</Link> 
          </div>
        </form>
      </div>
    </>
  );
};

export default Login; // Exporting Login component
