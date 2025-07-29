import React, { useState, createContext, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';


import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { GRNForm } from './components/GRNForm';
import { GRNListPage } from './components/GRNListPage';
import { DashboardPage } from './components/DashboardPage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function App() {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const authValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/grn" element={<GRNForm />} />
          <Route path="/grn-list" element={<GRNListPage />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
