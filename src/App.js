import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainHeader from './components/layout/user/Header';
import AdminHeader from './components/layout/admin/AdminHeader';
import AdminSidebar from './components/layout/admin/AdminSidebar';
import HomePage from './pages/user/Home';
import AdminPanel from './pages/admin/Dashboard';
import MemberPanel from './pages/user/Member';
import AdminLogin from './components/auth/admin/AdminLogin';
import AdminLayout from './components/layout/admin/AdminLayout';
import './styles/main.css';

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

          <Route path="/admin/*" element={
            <ProtectedRoute adminOnly>
              <AdminLayout 
                sidebarOpen={sidebarOpen} 
                isMobile={isMobile}
                toggleSidebar={toggleSidebar}
                closeSidebar={closeSidebar}
              />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;