import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainHeader from './components/layout/user/Header';
import MainFooter from './components/layout/user/Footer.js';
import HomePage from './pages/user/Home';

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

import LecturerDetail from './pages/user/details/lecturer/LecturerDetail.js';
import LecturerList from './pages/user/details/lecturer/LecturersList.js';

import InstitutionsList from './pages/user/details/Institution/InstitutionsList.js';
import InstitutionsDetail from './pages/user/details/Institution/InstitutionDetail.js';

import DirectorList from './pages/user/details/director/DirectorList.js';
import DirectorDetail from './pages/user/details/director/DirectorDetails.js';

import JobSeekersList from './pages/user/details/jobseeker/JobSeekersList.js';
import JobSeekersDetail from './pages/user/details/jobseeker/JobSeekersDetail.js';

import JobVacanciesList from './pages/user/details/JobVacancies/JobVacancyList.js';
import JobVacanciesDetail from './pages/user/details/JobVacancies/JobVacancyDetail.js';



import ContactUs from './pages/user/ContactUs';
import AboutUs from './pages/user/AboutUs.js';
import Privacy from './pages/user/Privacy.js'
import Term from './pages/user/Term.js'


import './styles/main.css';
import { Cookie } from 'lucide-react';

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
      <MainFooter />
    </div>
  );

  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/" element={<LayoutWithHeader><HomePage /></LayoutWithHeader>} />
          <Route path="/contact" element={<LayoutWithHeader><ContactUs /></LayoutWithHeader>} />
          <Route path="/about" element={<LayoutWithHeader><AboutUs /></LayoutWithHeader>} />
          <Route path="/privacy" element={<LayoutWithHeader><Privacy /></LayoutWithHeader>} />
          <Route path="/terms" element={<LayoutWithHeader><Term /></LayoutWithHeader>} />

          <Route path="/projects" element={<LayoutWithHeader><ProjectsList /></LayoutWithHeader>} />
          <Route path="/projects/:id" element={<LayoutWithHeader><ProjectDetail /></LayoutWithHeader>} />

          <Route path="/consultants" element={<LayoutWithHeader><ConsultantsList /></LayoutWithHeader>} />
          <Route path="/consultants/:id" element={<LayoutWithHeader><ConsultantDetail /></LayoutWithHeader>} />
          
          <Route path="/contractors" element={<LayoutWithHeader><ContractorsList /></LayoutWithHeader>} />
          <Route path="/contractors/:id" element={<LayoutWithHeader><ContractorDetail /></LayoutWithHeader>} />

          <Route path="/agents" element={<LayoutWithHeader><AgentList /></LayoutWithHeader>} />
          <Route path="/agents/:id" element={<LayoutWithHeader><AgentDetail /></LayoutWithHeader>} />

          <Route path="/lecturers" element={<LayoutWithHeader><LecturerList /></LayoutWithHeader>} />
          <Route path="/lecturers/:id" element={<LayoutWithHeader><LecturerDetail /></LayoutWithHeader>} />

          <Route path="/Institutions" element={<LayoutWithHeader><InstitutionsList /></LayoutWithHeader>} />
          <Route path="/Institutions/:id" element={<LayoutWithHeader><InstitutionsDetail/></LayoutWithHeader>} />

          <Route path="/directors" element={<LayoutWithHeader><DirectorList /></LayoutWithHeader>} />
          <Route path="/directors/:id" element={<LayoutWithHeader><DirectorDetail /></LayoutWithHeader>} />

          <Route path="/job-vacancies" element={<LayoutWithHeader><JobVacanciesList /></LayoutWithHeader>} />
          <Route path="/job-vacancies/:id" element={<LayoutWithHeader><JobVacanciesDetail /></LayoutWithHeader>} />

          <Route path="/jobseekers" element={<LayoutWithHeader><JobSeekersList /></LayoutWithHeader>} />
          <Route path="/jobseekers/:id" element={<LayoutWithHeader><JobSeekersDetail /></LayoutWithHeader>} />
        
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