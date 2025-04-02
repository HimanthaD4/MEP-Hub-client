// src/components/layout/AdminLayout.js
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminLogin from '../admin/adminLoginModal';

// Import all your page components
import Dashboard from '../../pages/admin/Dashboard';
import UpcomingProjects from '../../pages/admin/UpcomingProjects';
import Consultants from '../../pages/admin/Consultants';
import Contractors from '../../pages/admin/Contractors';
import AgentsSuppliersDealers from '../../pages/admin/AgentsSuppliersDealers';
import ApprovalTestingAuthorities from '../../pages/admin/ApprovalTestingAuthorities';
import EducationalInstitutions from '../../pages/admin/EducationalInstitutions';
import Lecturers from '../../pages/admin/Lecturers';
import JobVacancies from '../../pages/admin/JobVacancies';
import JobSeekers from '../../pages/admin/JobSeekers';
import Trainees from '../../pages/admin/Trainees';
import CompanyDirectors from '../../pages/admin/CompanyDirectors';

const AdminLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
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
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const renderComponent = () => {
    switch(activeComponent) {
      case 'Dashboard': return <Dashboard />;
      case 'UpcomingProjects': return <UpcomingProjects />;
      case 'Consultants': return <Consultants />;
      case 'Contractors': return <Contractors />;
      case 'AgentsSuppliersDealers': return <AgentsSuppliersDealers />;
      case 'ApprovalTestingAuthorities': return <ApprovalTestingAuthorities />;
      case 'EducationalInstitutions': return <EducationalInstitutions />;
      case 'Lecturers': return <Lecturers />;
      case 'JobVacancies': return <JobVacancies />;
      case 'JobSeekers': return <JobSeekers />;
      case 'Trainees': return <Trainees />;
      case 'CompanyDirectors': return <CompanyDirectors />;
      default: return <Dashboard />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      position: 'relative'
    }}>
      <AdminHeader 
        toggleSidebar={toggleSidebar} 
        userInitial={user?.name?.charAt(0).toUpperCase() || 'A'} 
      />
      
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