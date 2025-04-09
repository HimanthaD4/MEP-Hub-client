import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainHeader from './components/layout/user/Header';
import HomePage from './pages/user/Home';

import MemberPanel from './pages/user/Member';
import AdminLogin from './components/auth/admin/AdminLogin';
import AdminLayout from './components/layout/admin/AdminLayout';

import ProjectDetail from './pages/user/details/project/ProjectDetail';
import ProjectsList from './pages/user/details/project/ProjectsList';

import ConsultantDetail from './pages/user/details/consultant/ConsultantDetail';
import ConsultantsList from './pages/user/details/consultant/ConsultantsList';

import ContractorDetail from './pages/user/details/contractor/ContractorDetail';
import ContractorsList from './pages/user/details/contractor/ContractorsList';

import AgentDetail from './pages/user/details/agent/AgentDetail.js';
import AgentList from './pages/user/details/agent/AgentsList.js';

import './styles/main.css';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.2rem', color: '#4f46e5' }}>
        Loading...
      </div>
    );
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

  const LayoutWithHeader = ({ children }) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainHeader toggleSidebar={toggleSidebar} />
      <main style={{ flex: 1, padding: '20px' }}>{children}</main>
    </div>
  );

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutWithHeader><HomePage /></LayoutWithHeader>} />

          <Route path="/member" element={<LayoutWithHeader><MemberPanel /></LayoutWithHeader>} />

          <Route path="/projects" element={<LayoutWithHeader><ProjectsList /></LayoutWithHeader>} />

          <Route path="/projects/:id" element={<LayoutWithHeader><ProjectDetail /></LayoutWithHeader>} />

          <Route path="/consultants" element={<LayoutWithHeader><ConsultantsList /></LayoutWithHeader>} />

          <Route path="/consultants/:id" element={<LayoutWithHeader><ConsultantDetail /></LayoutWithHeader>} />

          
          <Route path="/contractors" element={<LayoutWithHeader><ContractorsList /></LayoutWithHeader>} />

          <Route path="/contractors/:id" element={<LayoutWithHeader><ContractorDetail /></LayoutWithHeader>} />

          <Route path="/agents" element={<LayoutWithHeader><AgentList /></LayoutWithHeader>} />

          <Route path="/agents/:id" element={<LayoutWithHeader><AgentDetail /></LayoutWithHeader>} />

          

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