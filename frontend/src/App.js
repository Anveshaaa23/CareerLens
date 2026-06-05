import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import CareerDetailPage from './pages/CareerDetailPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Auth Gateway */}
          <Route path="/login" element={<LoginPage />} />

          {/* Connected Application Flow */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/welcome" 
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/career/:id" 
            element={
              <ProtectedRoute>
                <CareerDetailPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />

          {/* Fallback Redirection */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;