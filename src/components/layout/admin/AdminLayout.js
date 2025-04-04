import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

import Dashboard from '../../../pages/admin/Dashboard';
import Projects from '../../../pages/admin/Projects';


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
        <style jsx>{`
          .loading-spinner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(26, 86, 219, 0.1);
            border-radius: 50%;
            border-top-color: #1a56db;
            animation: spin 1s ease-in-out infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      backgroundColor: '#f9fafb', 
      paddingTop:'30px',
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
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
           
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;