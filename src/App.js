import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';

import FactoryVisualization from './pages/FactoryVisualization';
import InvestmentMap from './pages/InvestmentMap';
import Optimizer from './pages/Optimizer';
import PlantOptimizer from './pages/PlantOptimizer';
import Analytics from './pages/Analytics';
import Collaboration from './pages/Collaboration';
import Settings, { CurrencyProvider } from './pages/Settings';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <CurrencyProvider>
        <Router>
          <Layout>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/infrastructure-planning" element={<InvestmentMap />} />
            <Route path="/factory" element={<FactoryVisualization />} />
            <Route path="/investment-map" element={<InvestmentMap />} />
            <Route path="/optimizer" element={<Optimizer />} />
            <Route path="/plant-optimizer" element={<PlantOptimizer />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </CurrencyProvider>
    </UserProvider>
  );
}

export default App;