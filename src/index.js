import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPage from './ForgotPage';
import HomePage from './HomePage';
import ExplorePage from "./ExplorePage";
import GroupPage from "./GroupPage";
import EventPage from "./EventPage";
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
  </React.StrictMode>
);