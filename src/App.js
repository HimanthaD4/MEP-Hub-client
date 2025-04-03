import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainHeader from './components/layout/Header';
import AdminHeader from './components/layout/AdminHeader';
import AdminSidebar from './components/layout/AdminSidebar';
import HomePage from './pages/Home';
import AdminPanel from './pages/admin/Dashboard';
import MemberPanel from './pages/Member';
import './styles/main.css';

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
    handleResize(); // Initialize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => isMobile && setSidebarOpen(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes with Main Header */}
          <Route path="/*" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <MainHeader toggleSidebar={toggleSidebar} />
              <main style={{ flex: 1, padding: '20px' }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/member" element={<MemberPanel />} />
                </Routes>
              </main>
            </div>
          } />
          
          {/* Admin Route with Different Header and Sidebar */}
          <Route path="/admin/*" element={
            <div style={{ 
              minHeight: '100vh', 
              display: 'flex', 
              backgroundColor: '#f9fafb' 
            }}>
              <AdminSidebar 
                isOpen={sidebarOpen} 
                onClose={closeSidebar} 
                style={{ 
                  position: 'fixed',
                  left: sidebarOpen ? 0 : '-260px',
                  transition: 'left 0.3s ease',
                  zIndex: 100
                }}
              />
              
              <div style={{
                flex: 1,
                marginLeft: sidebarOpen ? '260px' : '0',
                transition: 'margin-left 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <AdminHeader 
                  toggleSidebar={toggleSidebar} 
                  style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 90
                  }}
                />
                
                <main style={{ 
                  flex: 1, 
                  padding: '24px',
                  overflowX: 'hidden'
                }}>
                  <Routes>
                    <Route path="/" element={<AdminPanel />} />
                    {/* Add other admin routes here */}
                  </Routes>
                </main>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;