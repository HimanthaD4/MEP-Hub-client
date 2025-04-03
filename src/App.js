// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Added useAuth import
import MainHeader from './components/layout/Header';
import AdminHeader from './components/layout/AdminHeader';
import AdminSidebar from './components/layout/AdminSidebar';
import HomePage from './pages/Home';
import AdminPanel from './pages/admin/Dashboard';
import MemberPanel from './pages/Member';
import AdminLogin from './pages/admin/AdminLogin';
import './styles/main.css';

// Moved ProtectedRoute component outside of App component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.2rem',
      color: '#4f46e5'
    }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (adminOnly && user.userType !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => isMobile && setSidebarOpen(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <MainHeader toggleSidebar={toggleSidebar} />
              <main style={{ flex: 1, padding: '20px' }}>
                <HomePage />
              </main>
            </div>
          } />
          
          <Route path="/member" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <MainHeader toggleSidebar={toggleSidebar} />
              <main style={{ flex: 1, padding: '20px' }}>
                <MemberPanel />
              </main>
            </div>
          } />

          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute adminOnly>
              <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                backgroundColor: '#f9fafb' 
              }}>
                <AdminSidebar 
                  isOpen={sidebarOpen} 
                  onClose={closeSidebar}
                  isMobile={isMobile}
                />
                
                <div style={{
                  flex: 1,
                  marginLeft: sidebarOpen && !isMobile ? '260px' : '0',
                  transition: 'margin-left 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <AdminHeader 
                    toggleSidebar={toggleSidebar}
                    sidebarOpen={sidebarOpen}
                  />
                  
                  <main style={{ 
                    flex: 1, 
                    padding: '24px',
                    overflowX: 'hidden'
                  }}>
                    <Routes>
                      <Route index element={<AdminPanel />} />
                      {/* Add other admin routes here */}
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;