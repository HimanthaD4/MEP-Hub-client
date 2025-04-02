// src/components/layout/AdminSidebar.js
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ isOpen, isMobile, closeSidebar, setActiveComponent }) => {
  const { logout } = useAuth();

  // Main Navigation Items
  const adminNavItems = [
    { path: 'Dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: 'UpcomingProjects', label: 'Upcoming Projects', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { path: 'Consultants', label: 'Consultants', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { path: 'Contractors', label: 'Contractors', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' }
  ];

  // Business Partners
  const businessPartners = [
    { path: 'AgentsSuppliersDealers', label: 'Agents/Suppliers/Dealers', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' }
  ];

  // Authorities
  const authorities = [
    { path: 'ApprovalTestingAuthorities', label: 'Approval/Testing Authorities', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
  ];

  // Education Sector
  const educationSector = [
    { path: 'EducationalInstitutions', label: 'Educational Institutions', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { path: 'Lecturers', label: 'Lecturers', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
  ];

  // Employment Sector
  const employmentSector = [
    { path: 'JobVacancies', label: 'Job Vacancies', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { path: 'JobSeekers', label: 'Job Seekers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { path: 'Trainees', label: 'Trainees', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' }
  ];

  // Management
  const management = [
    { path: 'CompanyDirectors', label: 'Company Directors', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
  ];

  const handleLogout = () => {
    logout();
    if (isMobile) closeSidebar();
  };

  // Styles object
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      backdropFilter: 'blur(2px)'
    },
    sidebar: {
      position: 'fixed',
      top: '70px',
      left: 0,
      bottom: 0,
      width: '260px',
      backgroundColor: 'white',
      zIndex: 1000,
      boxShadow: '2px 0 20px rgba(0, 0, 0, 0.05)',
      borderRight: '1px solid rgba(0, 0, 0, 0.05)',
      overflowY: 'auto',
      padding: '20px 0'
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    navSection: {
      padding: '0 16px 12px 16px',
      marginBottom: '8px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: 600,
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      margin: '0 0 8px 16px'
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      textDecoration: 'none',
      color: '#4b5563',
      backgroundColor: 'transparent',
      border: 'none',
      width: '100%',
      cursor: 'pointer',
      marginBottom: '4px',
      transition: 'all 0.2s ease',
      textAlign: 'left'
    },
    navLabel: {
      fontSize: '14px',
      fontWeight: 500
    },
    logoutSection: {
      padding: '20px 16px 0 16px',
      marginTop: '20px',
      borderTop: '1px solid rgba(0, 0, 0, 0.05)'
    },
    logoutButton: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    }
  };

  // Reusable NavButton component
  const NavButton = ({ item, onClick }) => (
    <button
      onClick={() => onClick(item.path)}
      style={styles.navButton}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={item.icon}></path>
      </svg>
      <span style={styles.navLabel}>{item.label}</span>
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.overlay}
              onClick={closeSidebar}
            />
          )}

          <motion.aside
            initial={{ x: isMobile ? '-100%' : 0 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? '-100%' : 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={styles.sidebar}
          >
            <nav style={styles.nav}>
              {/* Main Navigation */}
              <div style={styles.navSection}>
                <p style={styles.sectionTitle}>Main</p>
                {adminNavItems.map((item) => (
                  <NavButton 
                    key={item.path} 
                    item={item} 
                    onClick={setActiveComponent} 
                  />
                ))}
              </div>

              {/* Business Partners */}
              <div style={styles.navSection}>
                <p style={styles.sectionTitle}>Business Partners</p>
                {businessPartners.map((item) => (
                  <NavButton 
                    key={item.path} 
                    item={item} 
                    onClick={setActiveComponent} 
                  />
                ))}
              </div>

              {/* Authorities */}
              <div style={styles.navSection}>
                <p style={styles.sectionTitle}>Authorities</p>
                {authorities.map((item) => (
                  <NavButton 
                    key={item.path} 
                    item={item} 
                    onClick={setActiveComponent} 
                  />
                ))}
              </div>

              {/* Education Sector */}
              <div style={styles.navSection}>
                <p style={styles.sectionTitle}>Education Sector</p>
                {educationSector.map((item) => (
                  <NavButton 
                    key={item.path} 
                    item={item} 
                    onClick={setActiveComponent} 
                  />
                ))}
              </div>

              {/* Employment Sector */}
              <div style={styles.navSection}>
                <p style={styles.sectionTitle}>Employment Sector</p>
                {employmentSector.map((item) => (
                  <NavButton 
                    key={item.path} 
                    item={item} 
                    onClick={setActiveComponent} 
                  />
                ))}
              </div>

              {/* Management */}
              <div style={styles.navSection}>
                <p style={styles.sectionTitle}>Management</p>
                {management.map((item) => (
                  <NavButton 
                    key={item.path} 
                    item={item} 
                    onClick={setActiveComponent} 
                  />
                ))}
              </div>
            </nav>

            {/* Logout Section */}
            <div style={styles.logoutSection}>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={styles.logoutButton}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminSidebar;