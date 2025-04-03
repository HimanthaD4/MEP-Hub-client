import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminLogin from '../admin/adminLoginModal';

// Import page components
import Dashboard from '../../pages/admin/Dashboard';
import UpcomingProjects from '../../pages/admin/UpcomingProjects';
// ... other imports ...

const AdminLayout = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Check authentication and admin status
      if (!isAuthenticated || user?.userType !== 'admin') {
        // Store intended path before redirect
        const redirectPath = location.pathname + location.search;
        navigate('/login', { 
          state: { 
            from: redirectPath,
            message: 'Admin access required'
          } 
        });
      }
    }
  }, [user, loading, isAuthenticated, navigate, location]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const renderComponent = () => {
    switch(activeComponent) {
      case 'Dashboard': return <Dashboard />;
      case 'UpcomingProjects': return <UpcomingProjects />;
      // ... other cases ...
      default: return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      position: 'relative'
    }}>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <AdminSidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile}
        closeSidebar={closeSidebar}
        setActiveComponent={setActiveComponent}
      />
      
      <main style={{
        padding: '24px',
        transition: 'margin-left 0.3s ease',
        minHeight: 'calc(100vh - 70px)',
        overflowX: 'hidden',
        marginLeft: sidebarOpen ? '260px' : '0'
      }}>
        {renderComponent()}
      </main>
    </div>
  );
};

export default AdminLayout;