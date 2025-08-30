import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/Map';
import Optimizer from './pages/Optimizer';
import Analytics from './pages/Analytics';
import Collaboration from './pages/Collaboration';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Map" element={<MapPage />} />
          <Route path="/Optimizer" element={<Optimizer />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Collaboration" element={<Collaboration />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;