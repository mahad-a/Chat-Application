// src/components/authentication/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Entry: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Welcome to new new new Chat Application</h1>
      <button 
        onClick={() => navigate('/login')} 
        style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Login
      </button>
      <button 
        onClick={() => navigate('/signup')} 
        style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Entry;
