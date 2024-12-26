import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('public');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8000/api/signup/', {
        name,
        username,
        password,
        status,
      });

      if (response.status === 201) {
        setSuccess('User registered successfully');

        // Log the user in immediately after successful registration
        const loginResponse = await axios.post('http://localhost:8000/api/login/', {
          username,
          password,
        });

        if (loginResponse.status === 200) {
          // Redirect to dashboard after successful login
          navigate('/dashboard');
        } else {
          setError('Login failed. Please try again.');
        }

      } else {
        setError(response.data.error || 'An error occurred during sign-up. Please try again.');
      }

    } catch (error) {
      setError('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <button type="submit">Sign Up</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default SignUpForm;
