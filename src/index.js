import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPage from './ForgotPage';
import HomePage from './HomePage';
import './index.css';

ReactDOM.render(
  <Router>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
  </Router>,
  document.getElementById('root')
);