// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Adjust path if needed
import LoginForm from './components/authentication/LoginFile';
import SignUpForm from './components/authentication/SignUp';
import Entry from './components/authentication/Entry';
import Dashboard from './components/dashboard/Dashboard';
import Settings from './components/settings/Settings';
import Profile from './components/profile/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
