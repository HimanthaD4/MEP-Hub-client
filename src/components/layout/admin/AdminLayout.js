import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

import Dashboard from '../../../pages/admin/Dashboard';
import Projects from '../../../pages/admin/Projects';
import Consultants from '../../../pages/admin/Consultants';
import Contractors from '../../../pages/admin/Contractors';
import Agents from '../../../pages/admin/Agents';
import Directors from '../../../pages/admin/Directors';

const AdminLayout = ({ sidebarOpen, isMobile, toggleSidebar, closeSidebar }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.userType !== 'admin') {
        const redirectPath = location.pathname + location.search;
        navigate('/admin/login', { 
          state: { 
            from: redirectPath,
            message: 'Admin access required'
          } 
        });
      }
    }
  }, [user, loading, isAuthenticated, navigate, location]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9fafb'
      }}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      backgroundColor: '#f9fafb', 
      paddingTop: '30px',
    }}>
      <AdminSidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile}
        closeSidebar={closeSidebar}
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
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="consultants" element={<Consultants />} />
            <Route path="contractors" element={<Contractors />} />
            <Route path="agents" element={<Agents />} />
            <Route path="directors" element={<Directors />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;