import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { 
        username, 
        password 
      });
  
      if (response.status === 200 && response.data.message) {
        setSuccess(response.data.message);
        localStorage.setItem('token', response.data.token); // Store JWT token
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        setError(response.data.error || 'Invalid username or password');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error || 'Invalid username or password');
      } else {
        setError('An error occurred during login. Please try again.');
      }
    }
  };
  

  const handleBypass = () => {
    navigate('/dashboard'); // Directly navigate to dashboard
  };

  const handleBack = () => {
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit"> Login</button> <br></br>
      <button type="button" onClick={handleBypass}> Bypass Admin</button>
      <button type="button" onClick={handleBack}> Back</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default LoginForm;
